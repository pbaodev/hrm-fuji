import { roles, nav, people, jobs, candidates, workforce, canAccess, homeOf, scopeRequests, affected } from './data.mjs';
import { freshState, restoreState, transition, workdays, reservedLeave, pendingStage, STORAGE_KEY } from './model.mjs';
import { esc, icon, avatar, badge, statusBadge, button, link, aiNote, kindTag } from './ui.mjs';
import { scenarios } from './tour.mjs';
import { views } from './views.mjs';

const app = document.querySelector('#app'), dialog = document.querySelector('#detail-dialog');
let storageAvailable = true, state;
try { state = restoreState(localStorage.getItem(STORAGE_KEY)); } catch { state = freshState(); storageAvailable = false; }
const view = { role: 'hrbp', route: 'overview', filter: 'all', query: '', unit: 'all', messages: [] };
let modalContext = null, toastTimer;

// Tour demo: tour = { id, step, min }. Bước tự chuyển khi điều kiện done(state, view) đạt.
const TOUR_SEEN = 'nova-tour-seen';
let tour = null, tourScroll = false;
const scenario = () => scenarios.find(x => x.id === tour?.id);
const tourStep = () => scenario()?.steps[tour.step];
function syncTour() { const sc = scenario(); if (!sc) return; while (sc.steps[tour.step]?.done?.(state, view)) tour.step++; }
function startTour(id) {
  state = freshState(); try { localStorage.removeItem(STORAGE_KEY); } catch {}
  view.messages = []; tour = { id, step: 0, min: false }; closeDialog(); goToStep();
}
function goToStep() {
  const st = tourStep(); if (!st) return render();
  view.role = st.role; tourScroll = true;
  if (view.route !== st.route) location.hash = `#/${st.route}`; else render();
}
function tourPanel() {
  const sc = scenario(); if (!sc) return '';
  const st = tourStep(), total = sc.steps.length;
  const head = `<header><div><span class="eyebrow">KỊCH BẢN DEMO · ${sc.uc}</span><strong>${sc.title}</strong></div>${button(icon(tour.min?'up':'down',16),'tour-min','','icon-btn',`aria-label="${tour.min?'Mở rộng':'Thu gọn'} hướng dẫn"`)}${button(icon('close',16),'tour-exit','','icon-btn','aria-label="Thoát hướng dẫn"')}</header>`;
  const dots = `<div class="tour-dots" aria-hidden="true">${sc.steps.map((x,i)=>`<i class="${i<tour.step?'done':i===tour.step?'current':''}"></i>`).join('')}</div>`;
  if (!st) return `<aside class="tour-panel" aria-label="Hướng dẫn demo">${head}${dots}<div class="tour-body"><p><strong>${icon('check',15)} Đã xong kịch bản.</strong></p><div class="tour-recap">${sc.steps.map(x=>`<div>${kindTag(x.kind)}<span>${x.note}</span></div>`).join('')}</div><div class="tour-actions">${button('Chọn kịch bản khác','help','','btn small primary')}${button('Đóng','tour-exit','','btn small')}</div></div></aside>`;
  const away = view.role !== st.role || view.route !== st.route;
  return `<aside class="tour-panel ${tour.min?'min':''}" aria-label="Hướng dẫn demo">${head}${dots}<div class="tour-body"><div class="tour-meta"><b>Bước ${tour.step+1}/${total}</b>${badge(roles[st.role].label)}</div><p>${st.text}</p><div class="tour-note ${st.kind}">${kindTag(st.kind)}<span>${st.note}</span></div><div class="tour-actions">${away?button(`Chuyển sang ${roles[st.role].label} ${icon('arrow',14)}`,'tour-go','','btn small primary'):`<span class="subtle">Làm theo phần được viền đỏ.</span>`}${button(st.done?'Bỏ qua bước':'Xong',  'tour-next','','btn small')}</div></div></aside>`;
}
const roleGate = role => view.role === role ? '' : `<div class="role-gate"><span>${icon('users',18)} Bước này dành cho <strong>${roles[role].label}</strong>.</span>${button(`Chuyển vai trò demo ${icon('arrow',15)}`,'switch-role',role,'btn small')}</div>`;
const confirmForm = (action,label,role,extra='') => `${roleGate(role)}<form id="confirm-form" data-payload="${esc(JSON.stringify(action))}">${extra}<button class="btn primary full-width" ${view.role!==role?'disabled':''}>${label}</button></form>`;
const sourceButton = (label,id) => button(`${icon('file',15)} ${label}`,'source',id,'source-button');

function shell() {
  const current = nav.find(n=>n.id===view.route);
  let group = '';
  const items = nav.map(n=>{ if(n.group) group=n.group; return {...n, g: group}; }).filter(n=>canAccess(view.role,n.id));
  return `<div class="app-shell"><aside class="sidebar" aria-label="Điều hướng chính"><a class="brand" href="#/${homeOf(view.role)}" aria-label="NOVA Workforce, trang chủ"><span class="brand-mark">n<span>↗</span></span><span>NOVA<small>WORKFORCE</small></span></a><div class="workspace-label"><span class="workspace-dot">N</span><span>NOVA Technology<small>People & Organization</small></span>${icon('down',14)}</div><nav>${items.map((n,i)=>`${!i||items[i-1].g!==n.g?`<div class="nav-group">${n.g}</div>`:''}<a href="#/${n.id}" class="nav-item ${view.route===n.id?'active':''}" ${view.route===n.id?'aria-current="page"':''}>${icon(n.icon,19)}<span>${n.label}</span>${n.id==='workflows'?`<b>${scopeRequests(state.requests,view.role).filter(r=>['pending','active'].includes(r.status)).length}</b>`:n.id==='assistant'?'<span class="nav-ai">AI</span>':''}</a>`).join('')}</nav><div class="sidebar-bottom"><div class="demo-status"><span class="demo-dot"></span> Prototype · Dữ liệu mẫu</div>${button(`${icon('help',18)} Hướng dẫn trải nghiệm`,'help','','sidebar-button')}${button(`${icon('reset',17)} Khôi phục dữ liệu mẫu`,'reset','','sidebar-button')}<div class="sidebar-version">NOVA Workforce <span>v0.1</span></div></div></aside><button class="sidebar-backdrop" aria-label="Đóng menu" data-action="menu"></button><div class="workspace"><header class="topbar"><div class="breadcrumb">${button(icon('menu',22),'menu','','icon-btn mobile-menu','aria-label="Mở menu"')}<span>Workspace</span>${icon('chevron',13)}<strong>${current.label}</strong></div><div class="topbar-tools">${button(`${icon('search',18)}<span>Tìm trong workspace</span><kbd>⌘ K</kbd>`,'search','','global-search')}${button(`${icon('bell',20)}<i class="notification-dot"></i>`,'notifications','','icon-btn notification-button','aria-label="Thông báo"')}<span class="topbar-divider"></span><label class="role-select"><span>VAI TRÒ DEMO</span><select id="role-select" aria-label="Vai trò demo">${Object.entries(roles).map(([id,r])=>`<option value="${id}" ${view.role===id?'selected':''}>${r.label}</option>`).join('')}</select></label>${avatar(roles[view.role].initials,'peach')}</div></header><main id="main" tabindex="-1">${views[view.route](state,view)}</main><footer class="page-footer"><span>NOVA Workforce <i>·</i> Con người là trung tâm.</span><span>Dữ liệu giả lập · AI mô phỏng</span></footer></div>${tourPanel()}</div>`;
}
function render() {
  syncTour(); app.innerHTML = shell();
  const st = tourStep();
  if (st && view.role === st.role && view.route === st.route) { const el = document.querySelector(st.target); el?.classList.add('tour-target'); if (tourScroll) { tourScroll = false; el?.scrollIntoView({ block: 'center' }); } }
  document.title = `${nav.find(n=>n.id===view.route).label} — NOVA Workforce`; }
function route() {
  const requested = location.hash.replace(/^#\/?/,'').split('?')[0] || 'overview';
  view.route = views[requested] && canAccess(view.role, requested) ? requested : homeOf(view.role); view.filter='all'; view.query='';
  if (view.route !== requested) history.replaceState(null, '', `#/${view.route}`);
  document.body.classList.remove('menu-open'); closeDialog(); window.scrollTo(0,0); render();
}
function toast(text) { const el=document.querySelector('#toast'); el.textContent=text; el.classList.add('visible'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>el.classList.remove('visible'),4000); }
function showDialog(title,body,wide=false) {
  const st = tourStep();
  if (st && !['help','reset','search','notifications'].includes(modalContext?.action)) body = `<div class="tour-inline">${kindTag(st.kind)}<span><strong>Bước ${tour.step+1}/${scenario().steps.length}.</strong> ${st.text}</span></div>${body}`;
  dialog.className=wide?'wide':'';
  dialog.innerHTML=`<header class="dialog-header"><div><span class="eyebrow">NOVA WORKFORCE</span><h2 id="dialog-title">${title}</h2></div>${button(icon('close',21),'close','','icon-btn','aria-label="Đóng cửa sổ"')}</header><div class="dialog-body">${body}<div id="dialog-error" role="alert"></div></div>`;
  if(!dialog.open) dialog.showModal();
}
function closeDialog() { if(dialog.open) dialog.close(); modalContext=null; }
function mutate(action) {
  state=transition(state,{...action,role:view.role});
  try { localStorage.setItem(STORAGE_KEY,JSON.stringify(state)); } catch { storageAvailable=false; }
  closeDialog(); render(); toast(storageAvailable?'Đã lưu thay đổi trong prototype.':'Đã cập nhật trong phiên; trình duyệt không cho phép lưu dữ liệu.');
}
function handleError(error) { const el=dialog.open&&document.querySelector('#dialog-error'); if(el) el.textContent=error.message; else toast(error.message); }

function openModal(action,id='') {
  modalContext={action,id};
  if(action==='request') {
    const r=state.requests.find(x=>x.id===id), next=pendingStage(r);
    showDialog(r.title,`<div class="detail-meta">${badge(r.id)}${statusBadge(r.status)}</div><div class="person-detail">${avatar(r.initials,'peach')}<div><strong>${esc(r.person)}</strong><small>${r.unit} · ${r.date}</small></div></div><p class="detail-description">${esc(r.detail)}</p>${r.category==='leave'?`<div class="info-box">${r.start} → ${r.end} · <strong>${r.days} ngày làm việc</strong></div>`:''}<h3>Tiến trình xử lý</h3><div class="vertical-steps">${r.stages.map((stage,i)=>`<div class="vertical-step ${stage.done?'complete':''}"><span>${stage.done?icon('check',14):i+1}</span><div><strong>${stage.label}</strong><small>${roles[stage.role].label} · ${stage.done?'Đã hoàn tất':'Chưa hoàn tất'}</small></div></div>`).join('')}</div>${r.status==='rejected'?`<div class="info-box">Lý do từ chối: ${esc(r.rejection)}</div>`:next?`${confirmForm({type:'request-step',id},`${icon('check',17)} Xác nhận hoàn tất bước này`,next.role)}${button('Từ chối yêu cầu','reject-request',id,'btn full-width spaced')}`:`<div class="success-note">${icon('check',18)} Quy trình đã hoàn tất.</div>`}`);
  } else if(action==='reject-request') {
    const r=state.requests.find(x=>x.id===id);
    showDialog('Từ chối yêu cầu',`<p class="body-copy">${esc(r.title)} · ${r.id}</p>${confirmForm({type:'request-reject',id},'Xác nhận từ chối',pendingStage(r).role,`<label class="form-label">Lý do từ chối<textarea name="reason" rows="3" required maxlength="500" placeholder="Nêu rõ nội dung cần bổ sung hoặc lý do từ chối..."></textarea></label>`)}`);
  } else if(action==='new-request') {
    showDialog('Bạn cần hỗ trợ gì?',`<p class="body-copy">Bắt đầu một yêu cầu. NOVA sẽ đưa bạn tới đúng quy trình.</p><div class="request-options">${button(`${icon('calendar',25)}<span><strong>Nghỉ phép</strong><small>Kiểm tra số dư, gửi quản lý duyệt</small></span>${icon('arrow',18)}`,'leave','','request-option')}${button(`${icon('briefcase',25)}<span><strong>Thiết bị & quyền truy cập</strong><small>Điều phối giữa quản lý, HR và IT</small></span>${icon('arrow',18)}`,'generic-request','','request-option')}${button(`${icon('logout',25)}<span><strong>Theo dõi bàn giao</strong><small>Mở checklist offboarding đang có</small></span>${icon('arrow',18)}`,'offboarding','','request-option')}</div>`);
  } else if(action==='leave') {
    showDialog('Tạo yêu cầu nghỉ phép',`${roleGate('employee')}<div class="info-box"><strong>${state.leaveBalance-reservedLeave(state)} ngày khả dụng</strong> · ${reservedLeave(state)} ngày chờ duyệt<br><small>Chính sách mẫu: nghỉ thứ Bảy, Chủ nhật; không có ngày lễ trong giai đoạn demo.</small></div><form id="leave-preview-form"><div class="form-grid"><label class="form-label">Từ ngày<input type="date" name="start" value="2026-11-16" min="2026-11-13" required></label><label class="form-label">Đến ngày<input type="date" name="end" value="2026-11-17" min="2026-11-13" required></label></div><label class="form-label">Lý do<textarea name="reason" required maxlength="500" rows="3" placeholder="Ví dụ: giải quyết việc gia đình"></textarea></label><p class="subtle">Người duyệt: Lê Thanh Hà · Quản lý trực tiếp</p><button class="btn primary full-width" ${view.role!=='employee'?'disabled':''}>Xem lại trước khi gửi ${icon('arrow',17)}</button></form>`);
  } else if(action==='generic-request') {
    showDialog('Tạo yêu cầu hỗ trợ',`${roleGate('employee')}<form id="request-preview-form"><label class="form-label">Loại yêu cầu<select name="category"><option value="equipment">Cấp thiết bị</option><option value="access">Cấp quyền truy cập</option></select></label><label class="form-label">Tiêu đề<input name="title" required maxlength="100" placeholder="Ví dụ: Cấp màn hình cho dự án Atlas"></label><label class="form-label">Nội dung<textarea name="detail" required maxlength="1000" rows="4" placeholder="Nhu cầu cụ thể và mục đích sử dụng..."></textarea></label><p class="subtle">Quy trình: Quản lý duyệt → HR vận hành phối hợp thực hiện</p><button class="btn primary full-width" ${view.role!=='employee'?'disabled':''}>Xem lại yêu cầu ${icon('arrow',17)}</button></form>`);
  } else if(action==='skill') {
    const sk=state.skills.find(x=>x.id===id);
    showDialog(`Kỹ năng ${sk.name}`,`<div class="detail-meta">${statusBadge(sk.status)}${badge(`Mức ${sk.level}/5`)}</div><div class="evidence-panel"><span class="eyebrow">NGUỒN BẰNG CHỨNG MẪU</span><h3>${sk.source}</h3><p>Loại: ${sk.evidenceType} · Cập nhật ${sk.date}</p><p>${sk.name==='Kafka'?'Tài liệu Atlas POC ghi nhận Hoàng Nam triển khai producer/consumer cho thử nghiệm. Chưa có bằng chứng vận hành production.':sk.name==='System Design'?'Chứng nhận hoàn thành khóa học chưa thay thế bằng chứng đã áp dụng trong công việc.':`Kỹ năng đã thể hiện qua nhiệm vụ dự án, được ${sk.verifier} xác nhận.`}</p></div>${sk.status==='suggested'?`${aiNote('Mức thành thạo là đề xuất mẫu. Bạn có thể từ chối nếu bằng chứng chưa phản ánh đúng năng lực.')}${confirmForm({type:'skill-accept',id},'Xác nhận và chuyển quản lý','employee')}${button('Từ chối đề xuất','skill-reject',id,'btn full-width spaced')}`:sk.status==='pending'?confirmForm({type:'skill-verify',id},'Xác thực bằng chứng kỹ năng','manager'):sk.status==='verified'?`<div class="success-note">${icon('shield',20)} Đã xác thực bởi ${sk.verifier}.</div>`:'<p>Đề xuất đã bị từ chối và không được dùng như kỹ năng xác thực.</p>'}`);
  } else if(action==='person') {
    const p=people.find(x=>x.id===id);
    showDialog('Phương án bố trí nhân sự',`<div class="person-detail">${avatar(p.initials,p.color,true)}<div><h3>${p.name}</h3><p>${p.role} · ${p.unit}</p></div></div><div class="evidence-panel"><span class="eyebrow">BẰNG CHỨNG ĐỐI CHIẾU</span><h3>${p.available?`${p.match}% khớp kỹ năng`:'Chưa đạt ràng buộc cứng'}</h3><p>${p.evidence}</p><p><strong>Điểm cần bổ sung:</strong> ${p.gap}</p><p>Ngày sẵn sàng: ${p.start} · Tỷ lệ phân bổ: ${p.capacity}%</p></div>${p.available?`${aiNote('Đề xuất cho Atlas, 100% phân bổ, bắt đầu 01/12/2026. Chưa thay đổi phân bổ hiện tại.')}${!state.staffing||state.staffing.status==='declined'?confirmForm({type:'staff-propose',id},'Gửi đề xuất cho nhân viên','hrbp'):`<div class="info-box">Atlas đã có một phương án ${state.staffing.status==='done'?'hoàn tất':'đang xử lý'}. Xem tiến trình tại đầu trang.</div>`}`:'<p class="red-text">Chưa thể đề xuất vì lịch, phân bổ hoặc nhóm kỹ năng không đáp ứng nhu cầu dự án.</p>'}`);
  } else if(action==='staff-review') {
    const p=state.staffing, person=people.find(x=>x.id===p.personId);
    const role=['employee','manager','bu','hrbp'][p.stage], label=['Tôi đồng ý tham gia dự án','Xác nhận nhả người ngày 01/12','Phê duyệt phương án bố trí','Cập nhật phân bổ mô phỏng'][p.stage];
    showDialog('Xác nhận phương án Atlas',`<div class="person-detail">${avatar(person.initials,person.color,true)}<div><h3>${person.name}</h3><p>Senior Backend Engineer → Project Atlas</p></div></div><div class="info-box">100% phân bổ · 01/12/2026–31/05/2027 · Hà Nội</div><p class="body-copy">${['Phản hồi dưới vai trò nhân viên được đề xuất. Việc tham gia cần có sự đồng ý của nhân viên.','Xác nhận kế hoạch bàn giao và ngày có thể nhả người cho dự án mới.','Các bước nhân viên đồng ý và quản lý xác nhận đã hoàn tất. Trưởng khối xem xét quyết định cuối.','Đã có đủ xác nhận. Bước này cập nhật dữ liệu phân bổ trong prototype.'][p.stage]}</p>${confirmForm({type:'staff-next'},label,role)}${p.stage===0?button('Từ chối phương án','staff-decline','','btn full-width spaced'):''}`);
  } else if(action==='staff-decline') {
    showDialog('Phản hồi phương án',confirmForm({type:'staff-decline'},'Gửi phản hồi từ chối','employee',`<label class="form-label">Lý do<textarea name="reason" required rows="3" maxlength="500" placeholder="Chia sẻ điều kiện hoặc nguyện vọng chưa phù hợp..."></textarea></label>`));
  } else if(action==='rs-person') {
    const p=affected.find(x=>x.id===id), row=state.restructure.find(x=>x.id===id);
    const steps={
      open: p.option==='full' ? `${aiNote('AI tìm thấy vị trí phù hợp. Chỉ ghi nhận sau khi HR đã trao đổi trực tiếp và nhân viên đồng ý.')}${confirmForm({type:'rs-redeploy',id},'Ghi nhận nhân viên đồng ý điều chuyển','hrbp')}`
        : p.option==='partial' ? `${aiNote('AI đề xuất lộ trình học bù 6 tuần. Nhân viên giữ vị trí hiện tại trong thời gian học.')}${confirmForm({type:'rs-reskill',id},'Xác nhận lộ trình học bù','hrbp')}`
        : `<div class="evidence-panel"><span class="eyebrow">HỒ SƠ RÀ SOÁT · AI SOẠN NHÁP</span><p><strong>Phương án đã thử:</strong> ${p.evidence}</p><p><strong>Quyền lợi theo chính sách mẫu:</strong> báo trước 45 ngày, trợ cấp thôi việc, hỗ trợ tìm việc 3 tháng.</p><p><strong>Điểm pháp chế cần xem:</strong> không có cờ bảo vệ (thai sản, nghỉ ốm dài ngày, đang khiếu nại).</p></div>${row.returned?`<div class="info-box">Trưởng khối đã trả lại: ${esc(row.returned)}</div>`:''}${aiNote('AI chỉ soạn hồ sơ. Quyết định cắt giảm thuộc về người có thẩm quyền.')}${confirmForm({type:'rs-review',id},'Gửi Trưởng khối xem xét','hrbp',`<label class="check-line"><input type="checkbox" name="checked" required> Tôi đã rà soát hồ sơ này cùng pháp chế</label>`)}`,
      review: `<div class="info-box">HR phụ trách khối và pháp chế đã rà soát. Chỉ phê duyệt được khi những người còn lại đã có hướng xử lý nội bộ.</div>${confirmForm({type:'rs-approve',id},'Phê duyệt phương án cắt giảm','bu')}${button('Trả lại, yêu cầu tìm thêm phương án','rs-return',id,'btn full-width spaced')}`,
      approved: `<div class="info-box">Đã có phê duyệt. Quản lý và HR thông báo trực tiếp cho nhân viên; hệ thống không gửi thông báo tự động.</div>${confirmForm({type:'rs-exit',id},'Khởi chạy nghỉ việc và bàn giao','ops')}`,
      redeployed: `<div class="success-note">${icon('check',18)} Nhân viên đã đồng ý điều chuyển sang ${p.target}.</div>`,
      reskill: `<div class="success-note">${icon('book',18)} Đang học bù để chuyển sang ${p.target}.</div>`,
      exit: `<div class="success-note">${icon('logout',18)} Đã chuyển sang quy trình nghỉ việc và bàn giao (UC-15).</div>`
    };
    showDialog('Hồ sơ nhân sự bị ảnh hưởng',`<div class="detail-meta">${badge(p.id)}${statusBadge(row.status)}</div><div class="person-detail">${avatar(p.initials,p.color,true)}<div><h3>${p.name}</h3><p>${p.role} · ${p.tenure}</p></div></div>${p.option==='none'?'':`<div class="evidence-panel"><span class="eyebrow">PHƯƠNG ÁN NỘI BỘ · AI ĐỀ XUẤT</span><h3>${p.target}</h3><p>${p.finding}</p><p>${p.evidence}</p></div>`}${steps[row.status]}`);
  } else if(action==='rs-return') {
    showDialog('Trả lại hồ sơ',confirmForm({type:'rs-return',id},'Gửi yêu cầu tìm thêm phương án','bu',`<label class="form-label">Lý do<textarea name="reason" required rows="3" maxlength="500" placeholder="Ví dụ: xem thêm nhu cầu ở khối Enterprise Solutions..."></textarea></label>`));
  } else if(action==='attendance-row') {
    const r=state.attendance.find(x=>x.id===id);
    showDialog('Kiểm tra bất thường công',`<div class="detail-meta">${badge(r.id)}${statusBadge(r.status)}</div><h3>${r.name} · ${r.date}</h3><p>${r.issue}</p><div class="evidence-panel"><span class="eyebrow">BẰNG CHỨNG</span><p>${r.evidence||'Chưa có xác nhận từ quản lý.'}</p><strong>Đề xuất: ${r.proposal}</strong></div>${r.status==='done'?'<div class="success-note">Điều chỉnh mẫu đã được duyệt.</div>':r.evidence?confirmForm({type:'attendance-approve',id},'Duyệt điều chỉnh công mẫu','ops'):confirmForm({type:'attendance-evidence',id},'Xác nhận 2 giờ OT theo lịch triển khai','manager')}`);
  } else if(action==='offboarding') {
    showDialog('Bàn giao & offboarding',`<h3>${state.offboarding.name}</h3><p>Ngày làm việc cuối: <strong>${state.offboarding.lastDay}</strong></p><div class="info-box">IAM được lên lịch thu hồi quyền ngày 20/11, độc lập với bàn giao. Trong demo, HR vận hành xác nhận kết quả từ hệ thống giả lập.</div><div class="offboard-items">${state.offboarding.items.map(i=>`<div class="offboard-item"><span class="check-circle ${i.done?'checked':''}">${i.done?icon('check',14):''}</span><div><strong>${i.label}</strong><small>${roles[i.role].label}</small></div>${!i.done?button('Xác nhận','offboard-check',i.id,'btn small'):''}</div>`).join('')}</div>${state.offboarding.closed?'<div class="success-note">Hồ sơ đã đóng.</div>':confirmForm({type:'offboard-close'},'Đóng hồ sơ bàn giao','ops')}`);
  } else if(action==='offboard-check') {
    const item=state.offboarding.items.find(x=>x.id===id);
    showDialog('Xác nhận hạng mục bàn giao',`<h3>${item.label}</h3><p class="body-copy">Xác nhận kết quả xử lý trong kịch bản mô phỏng của Phan Anh Tuấn.</p>${confirmForm({type:'offboard-check',id},'Xác nhận đã hoàn tất',item.role)}`);
  } else if(action==='job') {
    const j=jobs.find(x=>x.id===id);
    showDialog(j.title,`<p>${j.team}</p><div class="detail-meta">${badge(`${j.match}% khớp kỹ năng`,'green')}${badge(j.place)}</div><p class="detail-description">${j.desc}</p><div class="evidence-panel"><h3>Vì sao phù hợp?</h3><p>Các kỹ năng đã xác thực trong hồ sơ phù hợp với ${j.tags.join(', ')}.</p><p><strong>Cần phát triển:</strong> ${j.gap}</p></div>${state.interests.includes(id)?'<div class="success-note">Đã bày tỏ quan tâm. Bên nhận sẽ xem xét trong kịch bản demo.</div>':confirmForm({type:'interest',id},'Tôi quan tâm cơ hội này','employee')}<p class="subtle">Bày tỏ quan tâm chưa phải quyết định điều chuyển.</p>`);
  } else if(action==='candidate') {
    const c=candidates.find(x=>x.id===id);
    showDialog(c.name,`<p>${c.role} · ${c.years} kinh nghiệm</p><div class="evidence-panel"><span class="eyebrow">${c.source}</span><h3>${c.score}/100 điểm đối chiếu mẫu</h3><p>${c.detail}</p></div><p class="body-copy">Kiểm tra bằng chứng và các điểm chưa rõ trước khi quyết định shortlist.</p>${state.shortlist.includes(id)?'<div class="success-note">Chuyên viên tuyển dụng đã đưa hồ sơ vào shortlist.</div>':confirmForm({type:'shortlist',id},'Thêm vào shortlist phỏng vấn','recruiter')}`);
  } else if(action==='criteria') {
    showDialog('Tiêu chí Senior Backend Engineer','<div class="evidence-panel"><h3>Bắt buộc · 70 điểm</h3><p>Java từ 3 năm: 30 điểm; Spring Boot thực tế: 25 điểm; API & cơ sở dữ liệu: 15 điểm.</p><h3>Ưu tiên · 30 điểm</h3><p>AWS: 15 điểm; Kafka: 10 điểm; kinh nghiệm hệ thống thanh toán: 5 điểm.</p></div><p>Điểm là fixture mô phỏng cho prototype. Thông tin thiếu được đánh dấu để trao đổi thêm; không tự loại ứng viên.</p>');
  } else if(action==='source') {
    const sources={
      'leave-policy':['Chính sách nghỉ phép · Mẫu','Hiệu lực 01/01/2026 · HR-POL-01','Ngày làm việc từ thứ Hai đến thứ Sáu. Hoàng Nam có số dư ban đầu 8 ngày. Ngày chờ duyệt được giữ chỗ; ngày phép chỉ trừ sau quản lý duyệt. Yêu cầu không được trùng lịch hoặc vượt số dư. Đây là chính sách giả lập cho demo, không phải tư vấn pháp luật.'],
      'atlas-guide':['Hướng dẫn dự án Atlas · Mẫu','Cập nhật 10/11/2026 · Wiki / Atlas / Getting started','Atlas xây dựng nền tảng thanh toán. Dịch vụ backend dùng Java, Spring Boot và AWS. Tài liệu khởi đầu gồm thiết lập môi trường, quy ước API và luồng xử lý sự kiện. Owner: Lê Thanh Hà.'],
      onboarding:['Checklist nhận việc · Mẫu','Phiên bản 2.1 · HR vận hành','Vũ Mai Chi nhận việc ngày 18/11/2026 lúc 09:00. Hồ sơ cơ bản đã xác nhận. Còn thiếu xác nhận thông tin tài khoản nhận lương; thiết bị đang được chuẩn bị. Buddy: Đặng Bảo Ngọc. Nội dung về offer cần trao đổi trực tiếp với Chuyên viên tuyển dụng.']
    };
    const src=sources[id]||sources['atlas-guide'];
    showDialog(src[0],`<div class="source-document"><span class="eyebrow">TÀI LIỆU MÔ PHỎNG</span><p class="subtle">${src[1]}</p><p>${src[2]}</p></div>`);
  } else if(action==='notifications') {
    showDialog('Thông báo của bạn',`<div class="notification-list">${state.requests.filter(r=>['pending','active'].includes(r.status)).map(r=>button(`${icon('flow',18)}<span><strong>${esc(r.title)}</strong><small>${pendingStage(r)?.label} · ${r.due}</small></span>${icon('chevron',16)}`,'request',r.id,'notification-item')).join('') || '<p>Bạn đã xử lý hết yêu cầu.</p>'}</div>`);
  } else if(action==='search') {
    showDialog('Tìm trong workspace',`<label class="search-field big">${icon('search',20)}<input id="global-query" placeholder="Tìm màn hình, nhân sự, yêu cầu..." aria-label="Tìm trong workspace" autofocus></label><div id="search-results">${searchResults('')}</div>`);
  } else if(action==='meeting') {
    showDialog('Rà soát nhân lực Atlas',`<p>13/11/2026 · 10:00–10:30 · Phòng họp 5A (mẫu)</p><h3>Nội dung trao đổi</h3><ol class="body-copy"><li>Xác nhận nhu cầu một Senior Backend.</li><li>Đối chiếu bằng chứng kỹ năng của 3 hồ sơ khả thi.</li><li>Thống nhất phương án để hỏi nguyện vọng nhân viên.</li></ol>${link('staffing',`Mở phương án Atlas ${icon('arrow',17)}`,'btn primary')}`);
  } else if(action==='help') {
    showDialog('Khám phá NOVA Workforce',`<p class="body-copy">Chọn một kịch bản để đi từng bước qua các vai trò. Mỗi bước ghi rõ phần việc của AI, của quy tắc và của con người.</p><div class="kind-legend"><span>${kindTag('ai')} AI xử lý (mô phỏng)</span><span>${kindTag('rule')} Quy tắc, hệ thống</span><span>${kindTag('human')} Con người quyết định</span></div><div class="tour-list">${scenarios.map(sc=>button(`<span class="tour-option-text"><strong>${sc.title}</strong><small>${sc.uc} · ${sc.steps.length} bước · ${[...new Set(sc.steps.map(st=>roles[st.role].label))].join(' → ')}</small><small>${sc.desc}</small><span class="tour-kinds">${sc.steps.map(st=>kindTag(st.kind)).join('<i>→</i>')}</span></span>${icon('arrow',18)}`,'tour-start',sc.id,'tour-option')).join('')}</div><div class="info-box">Bắt đầu một kịch bản sẽ khôi phục dữ liệu mẫu. Vai trò demo chỉ đổi góc nhìn, không phải đăng nhập hay phân quyền. Dữ liệu và phản hồi AI đều là giả lập; chưa kết nối hệ thống nhân sự hay mô hình AI thật.</div>`);
  } else if(action==='reset') {
    showDialog('Khôi phục dữ liệu mẫu?',`<p class="body-copy">Các đơn, xác nhận và thay đổi bạn đã thử trong prototype này sẽ trở về trạng thái ban đầu.</p>${button(`${icon('reset',17)} Khôi phục prototype`,'confirm-reset','','btn primary full-width')}`);
  }
}

function searchResults(query) {
  const q=query.trim().toLocaleLowerCase('vi');
  const results=[...nav.filter(n=>canAccess(view.role,n.id)&&n.label.toLocaleLowerCase('vi').includes(q)).map(n=>link(n.id,`${icon(n.icon,19)}<span><strong>${n.label}</strong><small>Màn hình · ${n.uc||'Workspace'}</small></span>${icon('arrow',16)}`,'search-result')),...people.filter(p=>['hrbp','bu'].includes(view.role)&&`${p.name} ${p.skills.join(' ')}`.toLowerCase().includes(q)).map(p=>button(`${avatar(p.initials,p.color)}<span><strong>${p.name}</strong><small>${p.role}</small></span>`,'person',p.id,'search-result')),...scopeRequests(state.requests,view.role).filter(r=>`${r.title} ${r.person} ${r.id}`.toLowerCase().includes(q)).map(r=>button(`${icon('flow',19)}<span><strong>${esc(r.title)}</strong><small>${r.id}</small></span>`,'request',r.id,'search-result'))];
  return results.slice(0,12).join('')||'<p class="empty-search">Không tìm thấy kết quả. Thử “kỹ năng”, “Atlas” hoặc tên nhân viên.</p>';
}
function ask(text) {
  view.messages.push({kind:'user',text});
  const q=text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  let response;
  if(view.role==='candidate' && !/nhan viec|onboard|ung tuyen|ho so|offer|checklist/.test(q)) response='Với ứng viên, mình chỉ hỗ trợ tra cứu hồ sơ ứng tuyển và thủ tục nhận việc. Bạn có thể hỏi “Lịch nhận việc của tôi” hoặc “Hồ sơ của tôi còn thiếu gì?”.';
  else if(/nghi|phep/.test(q)) response=`Hồ sơ mẫu của Hoàng Nam còn <strong>${state.leaveBalance-reservedLeave(state)} ngày phép khả dụng</strong>, với ${reservedLeave(state)} ngày đang chờ duyệt. ${/muon|tao|xin|nghi/.test(q)?'Bạn có thể điền ngày và lý do, rồi xem lại trước khi gửi.':''}<div class="chat-actions">${button('Tạo yêu cầu nghỉ phép','leave','','btn small primary')}${sourceButton('Chính sách nghỉ phép · 01/01/2026','leave-policy')}</div>`;
  else if(/nhan viec|onboard|ung tuyen|ho so|offer|checklist/.test(q)) response=`Trong hồ sơ ứng viên mẫu, <strong>Vũ Mai Chi</strong> dự kiến nhận việc lúc <strong>09:00 ngày 18/11/2026</strong>. Hồ sơ cơ bản đã xác nhận; cần bổ sung thông tin tài khoản nhận lương. Thiết bị đang được chuẩn bị. Nội dung offer cần Chuyên viên tuyển dụng hỗ trợ.<div class="chat-actions">${sourceButton('Checklist nhận việc · v2.1','onboarding')}${button('Theo dõi tiến độ','request','RQ-1039','btn small')}</div>`;
  else if(/atlas|tai lieu|tri thuc|wiki/.test(q)) response=`Theo <strong>Hướng dẫn dự án Atlas</strong>, backend dùng Java, Spring Boot và AWS. Tài liệu khởi đầu gồm thiết lập môi trường, quy ước API và luồng xử lý sự kiện. Owner: Lê Thanh Hà.<div class="chat-actions">${sourceButton('Wiki / Atlas · 10/11/2026','atlas-guide')}</div>`;
  else if(/ky nang|hoc|co hoi|career/.test(q)) response=`Hoàng Nam có <strong>${state.skills.filter(s=>s.status==='verified').length} kỹ năng đã xác thực</strong>. Kafka là điểm nên phát triển cho Atlas. Bạn có thể xem bằng chứng hoặc chọn lộ trình học nội bộ.<div class="chat-actions">${link('skills','Hồ sơ kỹ năng','btn small')}${link('learning','Lộ trình phát triển','btn small primary')}</div>`;
  else response='Mình chưa có nguồn dữ liệu mẫu để trả lời câu hỏi này. Bạn có thể thử “Tôi còn bao nhiêu ngày phép?”, “Tìm tài liệu Atlas”, “Lịch nhận việc” hoặc “Lộ trình học”. Với câu hỏi khác, đầu mối mẫu là HR vận hành.';
  view.messages.push({kind:'bot',text:response}); render(); const area=document.querySelector('#chat-messages'); if(area)area.scrollTop=area.scrollHeight;
}

document.addEventListener('click',event=>{
  const el=event.target.closest('[data-action]');
  if(!el) { if(event.target.closest('dialog a[href^="#/"]'))closeDialog(); return; }
  const {action,id}=el.dataset;
  try {
    if(action==='close')closeDialog();
    else if(action==='menu')document.body.classList.toggle('menu-open');
    else if(action==='tour-start')startTour(id);
    else if(action==='tour-go')goToStep();
    else if(action==='tour-next'){tour.step++;render();}
    else if(action==='tour-min'){tour.min=!tour.min;render();}
    else if(action==='tour-exit'){tour=null;closeDialog();render();}
    else if(action==='switch-role') { const context=modalContext; view.role=id; if(!canAccess(id,view.route)) { closeDialog(); location.hash=`#/${homeOf(id)}`; return; } render(); if(context)openModal(context.action,context.id); }
    else if(action==='filter') {view.filter=id;render();}
    else if(action==='staff-filter') {view.filter=view.filter==='all'?'available':'all';render();}
    else if(action==='skill-focus') { const skill=state.skills.find(s=>['suggested','pending'].includes(s.status)); if(skill)openModal('skill',skill.id); else toast('Tất cả đề xuất kỹ năng đã được xử lý.'); }
    else if(action==='ask')ask(id);
    else if(action==='confirm-reset') {state=freshState();try{localStorage.removeItem(STORAGE_KEY);}catch{} view.messages=[];tour=null;closeDialog();render();toast('Đã khôi phục dữ liệu mẫu.');}
    else if(action==='export')exportCsv();
    else if(action==='enroll') { modalContext={action,id};showDialog('Đăng ký khóa học',`<p class="body-copy">Khóa học nội bộ miễn phí. Bạn xác nhận tham gia lộ trình này?</p>${confirmForm({type:'enroll',id},'Xác nhận đăng ký','employee')}`); }
    else if(action==='health-action') {modalContext={action,id};showDialog('Theo dõi sức khỏe tổ chức',`<p class="body-copy">Tạo hành động: HR phụ trách khối trao đổi với Trưởng khối để rà soát workload Digital Products trước 20/11/2026.</p>${confirmForm({type:'health-action'},'Xác nhận tạo hành động','hrbp')}`);}
    else if(action==='skill-reject') {modalContext={action:'skill',id};showDialog('Từ chối đề xuất kỹ năng',`<p class="body-copy">Kỹ năng này sẽ không được đưa vào nhóm kỹ năng đã xác thực.</p>${confirmForm({type:'skill-reject',id},'Xác nhận từ chối','employee')}`);}
    else openModal(action,id);
  }catch(error){handleError(error);}
});
document.addEventListener('change',event=>{
  if(event.target.id==='role-select'){view.role=event.target.value;view.messages=[];if(canAccess(view.role,view.route))render();else location.hash=`#/${homeOf(view.role)}`;toast(`Đang trải nghiệm vai trò ${roles[view.role].label}`);}
  if(event.target.id==='unit-select'){view.unit=event.target.value;render();}
});
document.addEventListener('input',event=>{
  if(event.target.id==='global-query')document.querySelector('#search-results').innerHTML=searchResults(event.target.value);
  if(event.target.id==='list-search') {const pos=event.target.selectionStart;view.query=event.target.value;render();const input=document.querySelector('#list-search');input.focus();input.setSelectionRange(pos,pos);}
});
document.addEventListener('submit',event=>{
  const form=event.target; event.preventDefault(); const fields=Object.fromEntries(new FormData(form));
  try {
    if(form.id==='confirm-form')mutate({...JSON.parse(form.dataset.payload),...fields});
    if(form.id==='leave-preview-form') {
      const action={type:'leave',...fields}; transition(state,{...action,role:view.role});
      showDialog('Xác nhận yêu cầu nghỉ phép',`<div class="summary-grid"><span>Nhân viên</span><strong>Trần Hoàng Nam</strong><span>Thời gian</span><strong>${fields.start} → ${fields.end}</strong><span>Ngày làm việc</span><strong>${workdays(fields.start,fields.end)} ngày</strong><span>Lý do</span><strong>${esc(fields.reason)}</strong><span>Người duyệt</span><strong>Lê Thanh Hà</strong></div>${confirmForm(action,'Xác nhận gửi yêu cầu','employee')}`);
    }
    if(form.id==='request-preview-form') {
      const action={type:'request-create',...fields};transition(state,{...action,role:view.role});
      showDialog('Xác nhận yêu cầu hỗ trợ',`<h3>${esc(fields.title)}</h3><p class="detail-description">${esc(fields.detail)}</p><p class="subtle">Quản lý duyệt → HR vận hành phối hợp thực hiện</p>${confirmForm(action,'Xác nhận gửi yêu cầu','employee')}`);
    }
    if(form.id==='chat-form') {if(fields.message.trim())ask(fields.message.trim());}
    if(form.id==='agenda-form')mutate({type:'agenda',text:fields.text});
    if(form.id==='review-form')mutate({type:'review',text:fields.text});
  }catch(error){handleError(error);}
});
document.addEventListener('keydown',event=>{if((event.metaKey||event.ctrlKey)&&event.key==='k'){event.preventDefault();openModal('search');}});
dialog.addEventListener('cancel',()=>{modalContext=null;});
dialog.addEventListener('click',event=>{if(event.target===dialog){const b=dialog.getBoundingClientRect();if(event.clientX<b.left||event.clientX>b.right||event.clientY<b.top||event.clientY>b.bottom)closeDialog();}});
function exportCsv() {
  const rows=[['Đơn vị','Nguồn lực','Nhu cầu','Chênh lệch'],...workforce.filter(w=>view.unit==='all'||w.name===view.unit).map(w=>[w.name,w.count,w.demand,w.demand-w.count])];
  const blob=new Blob(['\uFEFF'+rows.map(row=>row.map(x=>`"${String(x).replaceAll('"','""')}"`).join(',')).join('\r\n')],{type:'text/csv;charset=utf-8'});
  const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='nova-nhan-luc-mau-2026-11.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('Đã xuất dữ liệu nhân lực mẫu.');
}
window.addEventListener('hashchange',route);
route();
// Lần đầu mở prototype: hiện danh sách kịch bản demo.
try { if (!localStorage.getItem(TOUR_SEEN)) { localStorage.setItem(TOUR_SEEN,'1'); openModal('help'); } } catch {}
