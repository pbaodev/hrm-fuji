import { roles, nav, people, jobs, candidates, workforce, canAccess, scopeRequests, affected } from './data.mjs';
import { pendingStage, reservedLeave } from './model.mjs';
import { icon, esc, avatar, badge, statusBadge, button, link, empty, aiNote, pageHead, kindTag } from './ui.mjs';
import { flows } from './tour.mjs';

const cardHead = (title, detail = '', action = '') => `<div class="card-heading"><div><h2>${title}</h2>${detail ? `<p>${detail}</p>` : ''}</div>${action}</div>`;
const personCell = (p, sub = '') => `<div class="person-cell">${avatar(p.initials,p.color)}<div><strong>${esc(p.name || p.person)}</strong><small>${esc(sub || p.role || p.unit)}</small></div></div>`;
const tags = list => `<div class="tags">${list.map(t => badge(t)).join('')}</div>`;
const progress = (n, color = '') => `<span class="progress"><span style="width:${n}%;${color ? `background:${color}` : ''}"></span></span>`;
const metrics = list => `<div class="metrics">${list.map(([label,value,note,ico,tone]) => `<article class="metric"><div class="metric-top"><span>${label}</span><span class="metric-icon ${tone || ''}">${icon(ico)}</span></div><strong>${value}</strong><small>${note}</small></article>`).join('')}</div>`;

export function overview(s, v) {
  const open = scopeRequests(s.requests, v.role).filter(r => !['done','rejected'].includes(r.status));
  const critical = open.filter(r => r.urgent).length;
  const mine = open.filter(r => pendingStage(r)?.role === v.role);
  const names = roles[v.role];
  const can = route => canAccess(v.role, route);
  const self = ['employee','manager'].includes(v.role);
  const heroTo = self ? 'learning' : ['staffing','recruitment','workflows'].find(can);
  const heroLabel = { staffing: 'Khám phá cơ hội nội bộ', learning: 'Khám phá cơ hội nội bộ', recruitment: 'Mở danh sách ứng viên', workflows: 'Xem yêu cầu cần xử lý' }[heroTo];
  const verified = s.skills.filter(x => x.status === 'verified').length;
  const toVerify = s.skills.filter(x => x.status !== 'verified' && x.status !== 'declined').length;
  const attPending = s.attendance.filter(x => x.status === 'pending').length;
  const two = n => String(n).padStart(2, '0');
  const roleMetrics = {
    employee: [['Ngày phép khả dụng', s.leaveBalance - reservedLeave(s), `${reservedLeave(s)} ngày đang chờ duyệt`, 'calendar'], ['Yêu cầu của bạn', two(open.length), 'Đang được xử lý', 'flow', 'red'], ['Kỹ năng đã xác thực', `${verified}/${s.skills.length}`, `${toVerify} kỹ năng cần xem xét`, 'nodes'], ['Khóa học đã đăng ký', `${s.enrolled.length}/3`, 'Lộ trình 6 tuần', 'book']],
    manager: [['Việc chờ bạn duyệt', two(mine.length), 'Đang ở bước của quản lý', 'check', 'red'], ['Yêu cầu của đội', two(open.length), `${critical} yêu cầu cần ưu tiên`, 'flow'], ['Kỹ năng chờ xác thực', two(toVerify), 'Hồ sơ của Trần Hoàng Nam', 'nodes'], ['Bất thường công', two(attPending), 'Cần xử lý trước 25/11', 'calendar']],
    recruiter: [['Hồ sơ đang sàng lọc', two(candidates.length), 'Senior Backend Engineer', 'briefcase'], ['Danh sách phỏng vấn', two(s.shortlist.length), 'Do bạn quyết định', 'check', 'red'], ['Vị trí đang tuyển', '01', 'Project Atlas', 'target'], ['Nhận việc sắp tới', two(open.length), 'Vũ Mai Chi · 18/11', 'users']],
    ops: [['Yêu cầu cần xử lý', two(open.length), `${critical} yêu cầu cần ưu tiên`, 'flow', 'red'], ['Việc ở bước của bạn', two(mine.length), 'Chờ HR vận hành', 'check'], ['Bất thường công', two(attPending), 'Cần xử lý trước 25/11', 'calendar'], ['Bàn giao nghỉ việc', s.offboarding.closed ? 'Đã đóng' : '01', 'Ngày cuối: 20/11/2026', 'logout']]
  }[v.role];
  const brief = [
    can('staffing') && ['Atlas đang chờ người phù hợp', self ? 'Project Atlas cần một Senior Backend Engineer. Phương án bố trí chỉ đi tiếp khi nhân viên đồng ý.' : '3 hồ sơ đáp ứng điều kiện phân bổ. Hoàng Nam khớp tốt với Java và AWS.', link('staffing', `Xem phương án ${icon('arrow',14)}`)],
    can('skills') && ['Kỹ năng mới, cơ hội mới', `${toVerify} kỹ năng cần xác nhận để hoàn thiện hồ sơ của Hoàng Nam.`, link('skills', `Xem hồ sơ ${icon('arrow',14)}`)],
    can('attendance') && ['Chủ động trước kỳ chốt công', `${attPending} bất thường cần xử lý trước ngày 25/11.`, link('attendance', `Kiểm tra ngay ${icon('arrow',14)}`)],
    can('recruitment') && ['Hồ sơ mới cho Atlas', `${candidates.length} hồ sơ đã được chấm theo tiêu chí. Danh sách phỏng vấn do bạn quyết định.`, link('recruitment', `Xem hồ sơ ${icon('arrow',14)}`)],
    can('workflows') && !can('skills') && ['Yêu cầu đang mở', `${open.length} yêu cầu đang chờ xử lý, ${critical} cần ưu tiên.`, link('workflows', `Xem yêu cầu ${icon('arrow',14)}`)]
  ].filter(Boolean).slice(0, 3);
  return `<div class="welcome-line"><span>${icon('calendar',16)} THỨ SÁU, 13 THÁNG 11, 2026</span><span class="live-dot">Không gian làm việc của bạn</span></div>
    <div class="welcome-heading"><div><h1>Chào buổi sáng, ${names.name}<span class="greeting-dot">.</span></h1><p>Một góc nhìn rõ ràng. Những quyết định tốt hơn.</p></div>${button(`${icon('plus',17)} Tạo yêu cầu`,'new-request','','btn primary')}</div>
    <section class="hero-banner"><div class="hero-copy"><span class="eyebrow">PEOPLE FIRST. FUTURE READY.</span><h2>Kết nối con người.<br>Mở lối tiềm năng.</h2><p>${self ? 'Khám phá cơ hội tiếp theo từ chính những kỹ năng bạn có.' : 'Biến dữ liệu nhân lực thành hành động thiết thực cho đội ngũ.'}</p>${heroTo ? link(heroTo,`${heroLabel} ${icon('arrow',17)}`,'btn dark') : ''}</div><div class="hero-art" aria-hidden="true"><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><div class="orbit orbit-three"></div><span class="orbit-node node-one"></span><span class="orbit-node node-two"></span><div class="floating-card"><span class="mini-spark">${icon('spark',22)}</span><div><strong>Đúng người. Đúng cơ hội.</strong><small>Kết nối bằng năng lực</small></div></div><div class="art-caption">HUMAN POTENTIAL, CONNECTED.</div></div></section>
    ${metrics(roleMetrics || [
      ['Nhân sự đang hoạt động','1.248',`<span class="positive">${icon('up',13)} +24</span> so với tháng trước`,'users'],
      ['Yêu cầu cần xử lý',String(open.length).padStart(2,'0'),`<span class="warning-dot"></span> ${critical} yêu cầu cần ưu tiên`,'flow','red'],
      ['Nhu cầu nhân lực','48',`<span class="positive">16 vị trí</span> có thể tìm nội bộ`,'briefcase'],
      ['Hồ sơ kỹ năng xác thực','86%',`<span class="positive">${icon('up',13)} +8%</span> so với tháng trước`,'nodes']
    ])}
    <div class="dashboard-columns"><div class="dashboard-main"><section class="card queue-card">${cardHead('Việc cần chú ý',`${mine.length} việc đang ở bước của ${names.label}`,can('workflows') ? link('workflows',`Xem tất cả ${icon('arrow',15)}`) : '')}<div class="mini-tabs"><span class="selected">Ưu tiên hôm nay <b>${open.length}</b></span><span>Được giao cho bạn <b>${mine.length}</b></span></div>${open.slice(0,4).map(r => `<button class="task-row" data-action="request" data-id="${r.id}"><span class="task-type ${r.urgent ? 'red' : ''}">${icon({equipment:'briefcase',attendance:'calendar',learning:'book',onboarding:'users',leave:'calendar'}[r.category] || 'file')}</span><span class="task-content"><strong>${esc(r.title)}</strong><small>${esc(r.person)} <i>·</i> ${r.id}</small></span><span class="task-meta">${statusBadge(r.status)}<small class="${r.urgent ? 'red-text' : ''}">${r.due}</small></span>${icon('chevron',16)}</button>`).join('') || empty('Bạn đã xử lý hết yêu cầu','Không còn yêu cầu đang chờ trong dữ liệu mẫu.')}</section>
    ${can('workforce') ? `<section class="card workforce-card">${cardHead('Nhân lực theo khối','Phân bổ nguồn lực · Tháng 11/2026',link('workforce',`Chi tiết ${icon('arrow',15)}`))}<div class="workforce-summary"><strong>1.248 <small>nhân sự</small></strong><span class="badge green">+1,96% tháng này</span></div><div class="stacked-bar">${workforce.map(w => `<span style="width:${w.count/1248*100}%;background:${w.color}" title="${w.name}: ${w.count}"></span>`).join('')}</div><div class="workforce-legend">${workforce.map(w => `<div><span class="legend-dot" style="background:${w.color}"></span><span>${w.name}</span><strong>${w.count}</strong></div>`).join('')}</div><div class="card-footnote">Nguồn mô phỏng: HRIS · Cập nhật 08:30 hôm nay</div></section>` : ''}</div>
    <aside class="dashboard-side"><section class="brief-card"><div class="brief-top"><span class="ai-emblem">${icon('spark',21)}</span><strong>Điểm tin nhân lực</strong><span class="ai-label">AI</span></div><h3>${brief.length} điều đáng chú ý<br>để bắt đầu ngày mới.</h3>${brief.map(([t,p,l],i)=>`<div class="brief-item"><b>0${i+1}</b><div><strong>${t}</strong><p>${p}</p>${l}</div></div>`).join('')}<div class="brief-source">${icon('shield',14)} Bản tóm tắt mẫu · Có nguồn tham chiếu</div></section>
    <section class="card schedule-card">${cardHead('Sắp diễn ra', 'Thứ sáu · 13/11',icon('calendar',18))}<div class="event-row"><div class="event-time">10:00<span>10:30</span></div><div class="event-details"><strong>Rà soát nhân lực Atlas</strong><small>HR phụ trách khối · Digital Products</small><div class="avatar-stack">${avatar('MA','peach')}${avatar('TH','lilac')}${avatar('ĐM','blue')}<span>+2</span></div></div></div>${button(`Xem nội dung cuộc họp ${icon('arrow',15)}`,'meeting','','text-link')}</section></aside></div>
    <section class="quick-strip"><div><span class="eyebrow">YOUR NEXT MOVE</span><h3>Mỗi kỹ năng, một cơ hội mới.</h3></div>${[['skills','nodes','Hồ sơ kỹ năng'],['learning','book','Lộ trình phát triển'],['assistant','spark','Hỏi trợ lý NOVA'],['workforce','chart','Phân tích nhân lực'],['recruitment','briefcase','Tuyển dụng'],['attendance','calendar','Công & tiền lương'],['workflows','flow','Điều phối quy trình']].filter(([r])=>can(r)).slice(0,3).map(([r,ic,t])=>link(r,`${icon(ic,20)} ${t} ${icon('arrow',17)}`,'quick-link')).join('')}</section>`;
}

export function workflows(s, v) {
  const scoped = scopeRequests(s.requests, v.role), handover = ['manager','ops','hrbp'].includes(v.role);
  const filtered = scoped.filter(r => (v.filter === 'all' || r.status === v.filter) && `${r.title} ${r.person} ${r.id}`.toLowerCase().includes(v.query.toLowerCase()));
  return `${pageHead('HR ECOSYSTEM', 'Điều phối quy trình', 'Mọi yêu cầu đều có người phụ trách. Mọi bước xử lý đều có thể theo dõi.',button(`${icon('plus',17)} Tạo yêu cầu`,'new-request','','btn primary'))}
  ${metrics([['Đang mở',scoped.filter(x=>['pending','active'].includes(x.status)).length,'Yêu cầu đang chờ các bộ phận','flow'],['Cần ưu tiên',scoped.filter(x=>x.urgent && !['done','rejected'].includes(x.status)).length,'Cần xử lý hôm nay','clock','red'],['Hoàn tất',scoped.filter(x=>x.status==='done').length,'Trong danh sách mô phỏng','check'],handover ? ['Offboarding',s.offboarding.closed ? 'Đã đóng' : '01','Ngày cuối: 20/11/2026','logout'] : ['Bị từ chối',scoped.filter(x=>x.status==='rejected').length,'Có ghi lý do','close']])}
  <section class="card"><div class="table-toolbar"><div class="filter-tabs">${[['all','Tất cả'],['pending','Chờ duyệt'],['active','Đang xử lý'],['done','Hoàn tất'],['rejected','Từ chối']].map(([id,label])=>button(label,'filter',id,`tab ${v.filter===id?'active':''}`)).join('')}</div><label class="search-field">${icon('search',17)}<input id="list-search" placeholder="Tìm yêu cầu, nhân viên..." value="${esc(v.query)}" aria-label="Tìm yêu cầu"></label></div><div class="table-wrap"><table><thead><tr><th>Yêu cầu</th><th>Người yêu cầu</th><th>Bước hiện tại</th><th>Trạng thái</th><th>Thời hạn</th><th></th></tr></thead><tbody>${filtered.map(r=>`<tr><td><button class="cell-button" data-action="request" data-id="${r.id}"><strong>${esc(r.title)}</strong><small>${r.id} · ${r.date}</small></button></td><td>${personCell(r)}</td><td>${esc(pendingStage(r)?.label || (r.status==='rejected'?'Đã dừng':'Đã hoàn tất'))}</td><td>${statusBadge(r.status)}</td><td class="${r.urgent && r.status!=='done'?'red-text':''}">${r.due}</td><td>${button(icon('chevron',17),'request',r.id,'icon-btn',`aria-label="Xem ${r.id}"`)}</td></tr>`).join('')}</tbody></table></div>${!filtered.length?empty('Không có yêu cầu phù hợp','Thử tìm tên hoặc chọn trạng thái khác.'):''}<div class="table-footer">Hiển thị ${filtered.length} / ${scoped.length} yêu cầu trong phạm vi của bạn <span>Trạng thái được lưu trên trình duyệt này</span></div></section>
  ${handover ? `<div class="two-columns lower-section"><section class="card">${cardHead('Bàn giao không đứt gãy','Offboarding · Phan Anh Tuấn',badge(s.offboarding.closed?'Đã đóng':'Đang thực hiện',s.offboarding.closed?'green':'amber'))}<p class="body-copy">Ngày làm việc cuối: <strong>20/11/2026</strong>. Thu hồi quyền theo lịch độc lập với tiến độ bàn giao.</p>${progress(s.offboarding.items.filter(i=>i.done).length/5*100)}<p class="subtle">${s.offboarding.items.filter(i=>i.done).length}/5 hạng mục hoàn tất</p>${button(`Mở checklist bàn giao ${icon('arrow',16)}`,'offboarding','','btn')}</section><section class="card">${cardHead('Lịch sử xử lý','Các thay đổi mới nhất trong phiên demo')}${s.audit.slice(0,3).map(a=>`<div class="audit-row"><span class="audit-dot"></span><div><p>${esc(a.text)}</p><small>${roles[a.role].label}</small></div></div>`).join('')}</section></div>` : ''}`;
}

export function skills(s,v) {
  return `${pageHead('HR ECOSYSTEM','Bản đồ kỹ năng','Kỹ năng có bằng chứng. Tiềm năng có cơ hội.',button(`${icon('spark',17)} Xem đề xuất AI`,'skill-focus','','btn primary'))}
  <div class="profile-header">${avatar('HN','peach',true)}<div><h2>Trần Hoàng Nam ${badge('EMP-028')}</h2><p>Senior Backend Engineer · Digital Products</p><span class="subtle">${icon('pin',14)} Hà Nội &nbsp; · &nbsp; Quản lý: Lê Thanh Hà</span></div><div class="profile-complete"><strong>${s.skills.filter(x=>x.status==='verified').length}<span> / ${s.skills.length}</span></strong><small>Kỹ năng đã xác thực</small></div></div>
  <div class="skills-layout"><section class="card skill-map-card">${cardHead('Kết nối năng lực','Chọn một kỹ năng để xem nguồn bằng chứng')}<div class="skill-map"><svg class="map-lines" viewBox="0 0 500 350" aria-hidden="true"><path d="M250 175 110 75M250 175 390 75M250 175 430 225M250 175 250 300M250 175 70 225" fill="none" stroke="#e1e3e7" stroke-width="1.5" stroke-dasharray="5 5"/></svg><div class="map-center">${avatar('HN','peach',true)}<strong>Hoàng Nam</strong><small>Backend Engineer</small></div>${s.skills.map((sk,i)=>`<button class="skill-node skill-node-${i} ${sk.status==='verified'?'verified':'pending'}" data-action="skill" data-id="${sk.id}">${icon(sk.status==='verified'?'check':'spark',15)}<strong>${sk.name}</strong><small>Mức ${sk.level}/5</small></button>`).join('')}</div><div class="map-legend"><span><i class="legend-dot green-bg"></i> Đã xác thực</span><span><i class="legend-dot red-bg"></i> Cần xem xét</span></div></section><section class="card skill-insight">${cardHead('Phát triển từ thế mạnh','Hồ sơ của Hoàng Nam')}${aiNote('Java và Spring Boot là nền tảng tốt cho vai trò Senior Backend tại Atlas.')}<h3>Kỹ năng mục tiêu</h3><div class="gap-line"><span>Java</span>${progress(80)}<b>4/5</b></div><div class="gap-line"><span>Spring Boot</span>${progress(80)}<b>4/5</b></div><div class="gap-line"><span>AWS</span>${progress(60)}<b>3/5</b></div><div class="gap-line"><span>Kafka</span>${progress(40,'#d5d9e0')}<b>2/5</b></div><p class="subtle">Kafka đang là đề xuất; chưa dùng như kỹ năng đã xác thực khi matching.</p>${link('learning',`Xem lộ trình bù kỹ năng ${icon('arrow',16)}`,'btn full-width')}</section></div>
  <section class="card lower-section" id="skill-evidence">${cardHead('Hồ sơ bằng chứng','Tự khai, đã học, đã làm và đã xác nhận được phân biệt rõ ràng')}<div class="table-wrap"><table><thead><tr><th>Kỹ năng</th><th>Mức thành thạo</th><th>Nguồn bằng chứng</th><th>Loại bằng chứng</th><th>Trạng thái</th><th></th></tr></thead><tbody>${s.skills.map(sk=>`<tr><td><strong>${sk.name}</strong><small>Cập nhật ${sk.date}</small></td><td><span class="level-dots">${Array.from({length:5},(_,i)=>`<i class="${i<sk.level?'filled':''}"></i>`).join('')}</span><small>${sk.level}/5 · ${sk.level>3?'Thành thạo':'Đang phát triển'}</small></td><td>${sk.source}<small>${sk.verifier ? `Xác thực bởi ${sk.verifier}` : 'Chờ xác thực của quản lý'}</small></td><td>${badge(sk.evidenceType)}</td><td>${sk.status==='pending'?badge('Chờ quản lý','amber'):statusBadge(sk.status)}</td><td>${button('Xem xét','skill',sk.id,'btn small')}</td></tr>`).join('')}</tbody></table></div></section>`;
}

export function staffing(s,v) {
  const choices = people.filter(p=>(v.filter==='all'||p.available) && `${p.name} ${p.skills.join(' ')}`.toLowerCase().includes(v.query.toLowerCase()));
  const proposal = s.staffing, selected = people.find(x=>x.id===proposal?.personId);
  const planner = ['hrbp','bu'].includes(v.role), showProposal = proposal && (v.role !== 'employee' || proposal.personId === 'EMP-028');
  return `${pageHead('HR ECOSYSTEM','Bố trí nhân sự','Kết nối nhu cầu dự án với năng lực và nguyện vọng của đội ngũ.',badge('Ưu tiên nguồn lực nội bộ','red'))}
  <div class="project-banner"><span class="project-monogram">A<span>↗</span></span><div><div class="eyebrow">NHU CẦU ĐÃ PHÊ DUYỆT · PRJ-026</div><h2>Project Atlas</h2><p>Nền tảng thanh toán · Digital Products</p></div><div class="project-meta"><strong>Senior Backend Engineer</strong><span>01 vị trí · 100% phân bổ · Hà Nội</span><span>Bắt đầu 01/12/2026 · 6 tháng</span></div>${tags(['Java','Spring Boot','AWS'])}</div>
  ${showProposal ? `<section class="card proposal-card"><div class="card-heading"><div><span class="eyebrow">PHƯƠNG ÁN ĐANG THEO DÕI</span><h2>${selected.name} → Project Atlas</h2></div>${badge(proposal.status==='done'?'Đã phân bổ':proposal.status==='declined'?'Nhân viên từ chối':'Chờ xác nhận',proposal.status==='done'?'green':proposal.status==='declined'?'red':'amber')}</div><div class="stepper">${['Nhân viên đồng ý','Quản lý nhả người','Trưởng khối phê duyệt','Cập nhật phân bổ'].map((label,i)=>`<div class="step ${i<proposal.stage?'complete':i===proposal.stage?'current':''}"><span>${i<proposal.stage?icon('check',14):i+1}</span><strong>${label}</strong></div>`).join('')}</div>${proposal.status==='pending'?button(`Tiếp tục quy trình ${icon('arrow',17)}`,'staff-review','','btn primary'):proposal.status==='declined'?`<p class="body-copy">Lý do: ${esc(proposal.reason)}. HR phụ trách khối có thể chọn phương án khác.</p>`:`<p class="positive">Đã cập nhật phân bổ mô phỏng sau đầy đủ xác nhận.</p>`}</section>`:''}
  ${planner ? `<div class="staffing-toolbar"><div><h2>${people.filter(x=>x.available).length} hồ sơ khả thi</h2><p>Lọc điều kiện trước, đối chiếu kỹ năng sau.</p></div><div class="toolbar-right"><label class="search-field">${icon('search',17)}<input id="list-search" placeholder="Tên hoặc kỹ năng..." value="${esc(v.query)}" aria-label="Tìm nhân sự"></label>${button(v.filter==='all'?'Ẩn hồ sơ chưa đủ điều kiện':'Xem cả hồ sơ chưa đủ điều kiện','staff-filter','','btn small')}</div></div>
  <div class="talent-grid">${choices.map(p=>`<article class="card talent-card ${!p.available?'unavailable':''}"><div class="talent-top">${avatar(p.initials,p.color,true)}${p.available?`<span class="match-score"><strong>${p.match}<small>%</small></strong><span>khớp kỹ năng</span></span>`:badge('Chưa đủ điều kiện','amber')}</div><h3>${p.name}</h3><p>${p.role}</p><span class="subtle">${p.unit}</span>${tags(p.skills)}<div class="talent-facts"><span>${icon('calendar',15)} Sẵn sàng ${p.start}</span><span>${icon('briefcase',15)} Có thể phân bổ ${p.capacity}%</span></div><div class="evidence-snippet">${icon('shield',16)}<span>${p.evidence}</span></div><div class="skill-gap"><span>Điểm cần bổ sung</span><p>${p.gap}</p></div>${button(`Xem phương án ${icon('arrow',16)}`,'person',p.id,'btn full-width')}</article>`).join('') || empty('Không có hồ sơ phù hợp','Thử một tên hoặc kỹ năng khác.')}</div>` : showProposal ? '' : empty(v.role === 'employee' ? 'Chưa có đề xuất dành cho bạn' : 'Chưa có phương án chờ bạn xác nhận', 'Khi HR phụ trách khối gửi đề xuất, bước của bạn sẽ hiện ở đây.')}
  ${aiNote('Điểm khớp là dữ liệu minh họa, dựa trên kỹ năng và bằng chứng. Việc phân bổ chỉ thực hiện sau khi nhân viên, quản lý và Trưởng khối xác nhận.')}`;
}

export function assistant(s,v) {
  return `${pageHead('EMPLOYEE AI','Một trợ lý. Nhiều việc nhẹ hơn.','Tra cứu chính sách, tìm tri thức và bắt đầu yêu cầu ngay tại đây.',badge('Phản hồi mô phỏng','red'))}
  <div class="assistant-layout"><section class="card chat-card"><div class="chat-header"><span class="ai-emblem">${icon('spark',22)}</span><div><strong>Trợ lý NOVA</strong><small>Đồng hành trong công việc</small></div><span class="live-dot">Demo</span></div><div class="chat-messages" id="chat-messages"><div class="chat-welcome"><span class="chat-orb">${icon('spark',38)}</span><h2>Hôm nay mình có thể<br>giúp gì cho bạn?</h2><p>Chọn một gợi ý hoặc nhập câu hỏi về nghỉ phép,<br>onboarding, kỹ năng hay tài liệu dự án.</p><div class="chat-prompts">${(v.role === 'candidate' ? ['Lịch nhận việc của tôi','Hồ sơ của tôi còn thiếu gì?','Checklist nhận việc'] : ['Tôi còn bao nhiêu ngày phép?','Tôi muốn nghỉ phép','Tìm tài liệu dự án Atlas','Lịch nhận việc của tôi']).map(text=>button(`${text} ${icon('arrow',15)}`,'ask',text,'prompt-button')).join('')}</div></div>${v.messages.map(m=>`<div class="chat-message ${m.kind}">${m.kind==='bot'?`<span class="small-ai">${icon('spark',16)}</span>`:''}<div>${m.kind==='user'?esc(m.text):m.text}</div></div>`).join('')}</div><form id="chat-form" class="chat-input"><input name="message" placeholder="Hỏi NOVA về công việc của bạn..." aria-label="Tin nhắn cho NOVA" required maxlength="500" autocomplete="off"><button class="send-button" aria-label="Gửi tin nhắn">${icon('arrow',22)}</button></form><div class="chat-disclaimer">Dữ liệu và phản hồi mẫu · Mọi yêu cầu đều cần bạn xác nhận</div></section>
  <aside class="assistant-side">${v.role === 'candidate' ? '' : `<section class="card personal-balance">${cardHead('Ngày phép của bạn', 'Trần Hoàng Nam · Năm 2026',icon('calendar',20))}<strong>${s.leaveBalance-reservedLeave(s)}<small> ngày khả dụng</small></strong><p>${reservedLeave(s)} ngày đang chờ duyệt · ${s.leaveBalance} ngày chưa sử dụng</p>${button(`Tạo đơn nghỉ phép ${icon('arrow',16)}`,'leave','','btn primary full-width')}<small class="source-line">HRIS mẫu · 13/11/2026</small></section>`}<section class="card">${cardHead('Tài liệu thường dùng','Nguồn tri thức dành cho bạn')}${[['leave-policy','Chính sách nghỉ phép','Hiệu lực 01/01/2026'],['atlas-guide','Hướng dẫn dự án Atlas','Cập nhật 10/11/2026'],['onboarding','Checklist nhận việc','Phiên bản 2.1']].filter(([id]) => v.role !== 'candidate' || id === 'onboarding').map(([id,t,d])=>`<button class="document-row" data-action="source" data-id="${id}">${icon('file',20)}<span><strong>${t}</strong><small>${d}</small></span>${icon('chevron',15)}</button>`).join('')}</section><div class="privacy-note">${icon('lock',18)}<p>Các nguồn và danh tính trong prototype đều là dữ liệu giả. Bộ chuyển vai trò giúp trải nghiệm các góc nhìn.</p></div></aside></div>`;
}

export function learning(s,v) {
  const courses = [
    {id:'course-1',title:'Kafka for Backend Engineers',time:'Tuần 1–2 · 6 giờ',desc:'Event streaming, producer và consumer. Bài thực hành xây dựng luồng thanh toán.',tag:'Ưu tiên cho Atlas',type:'01',test:'Test Checkpoint: Kafka Architecture (LMS)'},
    {id:'course-2',title:'Cloud Architecture Essentials',time:'Tuần 3–4 · 8 giờ',desc:'Thiết kế hệ thống trên AWS, tối ưu tính sẵn sàng và quan sát hệ thống.',tag:'Nâng cao AWS',type:'02',test:'Test Checkpoint: AWS Cloud Resilience (LMS)'},
    {id:'course-3',title:'System Design Practice',time:'Tuần 5–6 · 4 giờ',desc:'Thực hành thiết kế hệ thống cùng mentor và phản biện quyết định kiến trúc.',tag:'Mentoring',type:'03',test:'Bài tập Capstone: Thiết kế Payment Gateway'}
  ];
  return `${pageHead('EMPLOYEE AI','Lộ trình phát triển & Đánh giá năng lực','Hiện thực hóa kế hoạch IDP/PIP từ kỳ đánh giá. Đề thi thích ứng đồng bộ tự động qua LMS.',badge('Lộ trình IDP · Trần Hoàng Nam'))}
  <div class="learning-hero"><div><span class="eyebrow" style="color:#ffffff;">KẾ HOẠCH PHÁT TRIỂN CÁ NHÂN (IDP - CÁN BỘ NGUỒN)</span><h2>Từ Senior Backend Engineer<br>đến Tech Lead / System Architect.</h2><p>Tự động kích hoạt từ kết quả xếp loại A (UC-08) · 6 tuần · Đề thi checkpoint đồng bộ qua LMS · Có Mentor lãnh đạo đồng hành</p><div class="inline-person">${avatar('ĐM','peach')}<span>Mentor cấp cao: <strong>Nguyễn Đức Minh (Trưởng khối)</strong> &amp; Lê Thanh Hà</span></div></div><div class="learning-art" aria-hidden="true"><span>IDP</span><span>TEST</span><span>GROW ↗</span></div></div>

  <div class="section-heading"><div><h2>Khóa học trong lộ trình &amp; Bài thi Checkpoint LMS</h2><p>Hoàn thành khóa học và vượt qua bài test checkpoint ($\ge 80\%$) để tự động xác thực kỹ năng lên UC-12</p></div><span class="subtle">${s.enrolled.length}/3 khóa đã đăng ký</span></div>
  <div class="course-grid">${courses.map(c=>`<article class="card course-card"><span class="course-number">${c.type}</span>${badge(c.tag,'red')}<h3>${c.title}</h3><span class="subtle">${icon('clock',14)} ${c.time}</span><p>${c.desc}</p><div style="margin:8px 0;padding:6px 8px;background:#f8fafc;border-radius:4px;font-size:12px;color:#475569;"><strong>${icon('check',12)} ${c.test}</strong></div>${button(s.enrolled.includes(c.id)?`${icon('check',16)} Đã đăng ký (Mở LMS)`:`Đăng ký học &amp; Thi test ${icon('arrow',16)}`,'enroll',c.id,`btn full-width ${s.enrolled.includes(c.id)?'success':''}`,s.enrolled.includes(c.id)?'disabled':'')}</article>`).join('')}</div>

  <section class="card lower-section">
    ${cardHead('AI Adaptive Assessment Engine','Hệ thống sinh đề thi & đánh giá năng lực tự động chuyển qua LMS',badge('LMS Integrated','green'))}
    <div class="two-columns">
      <div class="evidence-block">
        <span class="eyebrow">1. ĐỀ TEST ĐỊNH KỲ CHUẨN HÓA TOÀN CÔNG TY (LMS BENCHMARK)</span>
        <div style="margin:10px 0;padding:12px;background:#f0fdf4;border-radius:6px;border-left:3px solid #16a34a;">
          <strong>Kỳ thi Benchmark Kỹ thuật Backend 2026</strong> · <span class="badge green">Đã hoàn thành</span>
          <p style="margin:6px 0;font-size:13px;color:#475569;">AI tự động sinh bộ đề chuẩn hóa 40 câu trắc nghiệm chuyên sâu + 1 bài code refactoring. Hoàng Nam đạt <strong>88/100 điểm</strong> (Top 8% khối). Điểm số tự động nâng cấp độ tin cậy kỹ năng Java lên Level 4 trên Bản đồ kỹ năng (UC-12).</p>
          <small class="subtle">Kỳ benchmark tiếp theo: Tháng 05/2027 (chu kỳ 6 tháng)</small>
        </div>
        <span class="eyebrow" style="margin-top:14px;display:block;">2. ĐỀ TEST ỨNG VIÊN THEO ROLE (TUYỂN DỤNG UC-07)</span>
        <div style="margin:8px 0;padding:12px;background:#f8fafc;border-radius:6px;border-left:3px solid #0284c7;">
          <strong>Senior Backend Engineer Challenge (Atlas Project)</strong>
          <p style="margin:6px 0;font-size:13px;color:#475569;">AI đọc trực tiếp JD &amp; bài toán hệ thống Payment Atlas để tạo đề test thích ứng (Xử lý Idempotency &amp; Race condition). Ứng viên làm bài trên Test Portal; AI tự động chấm và xuất báo cáo trước phỏng vấn.</p>
        </div>
      </div>
      <div class="evidence-block">
        <span class="eyebrow">3. CƠ CHẾ THỰC THI LỘ TRÌNH IDP (LOẠI A) &amp; PIP (LOẠI C)</span>
        <div style="margin:10px 0;padding:10px;background:#ffffff;border:1px solid #e2e8f0;border-radius:6px;">
          <strong style="color:#0f172a;">Nhân sự loại A (Cán bộ nguồn / IDP):</strong>
          <p style="margin:4px 0 8px;font-size:13px;color:#475569;">Lộ trình thăng tiến nhanh, ghép cặp Mentor lãnh đạo, giao dự án chiến lược, kiểm tra năng lực quản trị.</p>
          <span class="badge green">Trần Hoàng Nam · Đang thực hiện IDP</span>
        </div>
        <div style="margin:10px 0;padding:10px;background:#fff7ed;border:1px solid #fed7aa;border-radius:6px;">
          <strong style="color:#9a3412;">Nhân sự loại C (Cần cải thiện / PIP 90 ngày):</strong>
          <p style="margin:4px 0 8px;font-size:13px;color:#475569;">Trích xuất đúng 3 điểm yếu lớn nhất trong năm, gán khóa học bổ trợ bắt buộc trên LMS và lịch check-in 30-60-90 ngày.</p>
          <span class="badge amber">Quy trình chuẩn hóa tự động qua LMS</span>
        </div>
      </div>
    </div>
  </section>

  <div class="section-heading"><div><h2>Cơ hội ngay trong hệ sinh thái</h2><p>Đề xuất dựa trên kỹ năng đã xác thực và nguyện vọng phát triển</p></div><span class="privacy-inline">${icon('lock',15)} Tìm kiếm riêng tư</span></div><div class="jobs-list">${jobs.map(j=>`<article class="card job-row"><span class="job-icon">${icon('briefcase',25)}</span><div class="job-info"><h3>${j.title}</h3><p>${j.team}</p>${tags(j.tags)}</div><div class="job-match"><strong>${j.match}%</strong><span>khớp kỹ năng</span></div><div class="job-place">${icon('pin',15)} ${j.place}</div>${button(s.interests.includes(j.id)?'Đã quan tâm':`Khám phá ${icon('arrow',16)}`,'job',j.id,'btn')}</article>`).join('')}</div>${aiNote('Bạn chủ động bày tỏ quan tâm. Trạng thái chỉ được mô phỏng cho bên nhận; tìm kiếm cơ hội không tự động thông báo cho quản lý hiện tại.')}`;
}

export function workforceView(s,v) {
  const unit = v.unit || 'all';
  const rows = unit==='all' ? workforce : workforce.filter(x=>x.name===unit);
  const supply = rows.reduce((a,r)=>a+r.count,0), demand = rows.reduce((a,r)=>a+r.demand,0);
  return `${pageHead('HR MANAGEMENT','Góc nhìn nhân lực','Hiểu cung–cầu hôm nay. Chủ động cho nhu cầu ngày mai.',`<label class="select-wrap"><select id="unit-select" aria-label="Chọn khối"><option value="all">Toàn hệ sinh thái</option>${workforce.map(w=>`<option ${unit===w.name?'selected':''}>${w.name}</option>`).join('')}</select></label>${button(`${icon('download',17)} Xuất dữ liệu`,'export','','btn')}`)}
  ${metrics([['Nguồn lực hiện tại',supply.toLocaleString('vi-VN'),'Headcount đang hoạt động','users'],['Nhu cầu đã duyệt',demand.toLocaleString('vi-VN'),'Kế hoạch tháng 12/2026','briefcase'],['Chênh lệch cung–cầu',`+${demand-supply}`,'Vị trí cần bổ sung','chart','red'],['Kỳ dữ liệu','11/2026','Số liệu tổng hợp mô phỏng','calendar']])}
  <div class="analytics-grid"><section class="card">${cardHead('Nguồn lực & nhu cầu','So sánh theo đơn vị · Đơn vị: người',`<div class="chart-key"><span><i class="legend-dot red-bg"></i>Nguồn lực</span><span><i class="legend-dot dark-bg"></i>Nhu cầu</span></div>`)}<div class="horizontal-chart">${rows.map(w=>`<div class="bar-group"><div class="bar-label"><strong>${w.name}</strong><span>Thiếu ${w.demand-w.count}</span></div><div class="bar-row"><div style="width:${w.count/550*100}%;background:#ea0029"></div><b>${w.count}</b></div><div class="bar-row"><div style="width:${w.demand/550*100}%;background:#353e4d"></div><b>${w.demand}</b></div></div>`).join('')}</div><div class="card-footnote">Nguồn HRIS & kế hoạch dự án mẫu · Đã duyệt ngày 12/11/2026</div></section><section class="card forecast-card">${cardHead('Chuẩn bị cho tháng 12', 'Kịch bản tăng trưởng · Dự báo mẫu')}<div class="forecast-number">1.296 <span>nhân sự</span></div><p class="subtle">Khoảng dự báo minh họa: 1.280–1.320</p><div class="forecast-chart" aria-label="Xu hướng nhân sự mẫu từ tháng 8 đến tháng 12"><svg viewBox="0 0 400 170" role="img" aria-label="Xu hướng tăng từ 1160 lên 1296 nhân sự"><defs><linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ea0029" stop-opacity=".12"/><stop offset="1" stop-color="#ea0029" stop-opacity="0"/></linearGradient></defs><path d="M15 135H385M15 90H385M15 45H385" stroke="#eef0f3"/><path d="M15 140 105 112 195 100 285 64 385 25V165H15Z" fill="url(#chart-fill)"/><path d="m15 140 90-28 90-12 90-36" fill="none" stroke="#ea0029" stroke-width="3"/><path d="m285 64 100-39" fill="none" stroke="#ea0029" stroke-width="3" stroke-dasharray="6 5"/><circle cx="285" cy="64" r="5" fill="#ea0029"/></svg><div><span>T8</span><span>T9</span><span>T10</span><span>T11</span><span>T12</span></div></div>${aiNote('Ưu tiên tìm nội bộ cho 16 vị trí trước khi mở tuyển ngoài. Giả định tiến độ dự án giữ nguyên.')}${link('staffing',`Xem phương án nội bộ ${icon('arrow',16)}`,'btn full-width')}</section></div>
  <section class="card lower-section">${cardHead('Sức khỏe tổ chức','Chỉ số cấp đơn vị · Không suy luận rủi ro của từng nhân viên',badge('Dữ liệu tổng hợp','blue'))}<div class="table-wrap"><table><thead><tr><th>Đơn vị</th><th>Quy mô nhóm</th><th>OT trung bình / tháng</th><th>Engagement</th><th>Tỷ lệ nghỉ việc / tháng</th></tr></thead><tbody>${rows.map(w=>`<tr><td><strong>${w.name}</strong></td><td>${w.count}</td><td>${w.ot} giờ ${w.ot>16?badge('Cần xem xét','amber'):''}</td><td>${w.engagement}/100</td><td>${w.turnover}%</td></tr>`).join('')}</tbody></table></div><div class="health-action">${icon('heart',22)}<div><strong>Rà soát phân bổ công việc tại Digital Products</strong><p>OT cao hơn các đơn vị còn lại; cần trao đổi để hiểu bối cảnh, chưa kết luận nguyên nhân.</p></div>${button(s.healthAction?'Đã theo dõi':'Tạo hành động','health-action','','btn',s.healthAction?'disabled':'')}</div><div class="card-footnote">Ngưỡng ẩn danh minh họa: tối thiểu 10 người. Các đơn vị mẫu đều đạt ngưỡng.</div></section>`;
}

export function recruitment(s,v) {
  return `${pageHead('HR MANAGEMENT','Tìm đúng người, với đủ bằng chứng','AI hỗ trợ đối chiếu hồ sơ. Chuyên viên tuyển dụng quyết định danh sách phỏng vấn.',badge(`${s.shortlist.length} hồ sơ trong shortlist`,'red'))}<div class="recruitment-brief"><span class="job-icon">${icon('briefcase',26)}</span><div><span class="eyebrow">REC-026 · DIGITAL PRODUCTS</span><h2>Senior Backend Engineer</h2><p>03 hồ sơ mẫu · Hà Nội · Java, Spring Boot, AWS</p></div>${button(`${icon('file',17)} Tiêu chí tuyển dụng`,'criteria','','btn')}</div>${aiNote('Điểm đối chiếu mẫu chỉ dùng tiêu chí công việc; không dùng tuổi, giới tính hay ảnh. Không tự động loại hồ sơ.')}
  <section class="card lower-section">${cardHead('Hồ sơ ứng viên','Xếp theo mức đáp ứng tiêu chí đã công bố')}<div class="table-wrap"><table><thead><tr><th>Ứng viên</th><th>Đối chiếu tiêu chí</th><th>Kỹ năng</th><th>Bằng chứng</th><th>Trạng thái</th><th></th></tr></thead><tbody>${candidates.map(c=>`<tr><td>${personCell(c,c.role)}</td><td><strong class="score-text">${c.score}/100</strong><small>${c.years} kinh nghiệm liên quan</small></td><td>${tags(c.tags)}</td><td class="evidence-cell">${c.source}</td><td>${badge(s.shortlist.includes(c.id)?'Đã shortlist':'Chờ xem xét',s.shortlist.includes(c.id)?'green':'amber')}</td><td>${button('Xem hồ sơ','candidate',c.id,'btn small')}</td></tr>`).join('')}</tbody></table></div></section><div class="two-columns lower-section"><section class="card">${cardHead('Tiêu chí bắt buộc','Được dùng thống nhất cho mọi hồ sơ')}<ul class="clean-list"><li>${icon('check',16)} Tối thiểu 3 năm xây dựng dịch vụ Java</li><li>${icon('check',16)} Kinh nghiệm thực tế với Spring Boot</li><li>${icon('check',16)} Thiết kế API và cơ sở dữ liệu</li></ul></section><section class="card">${cardHead('Tiêu chí ưu tiên','Dùng để trao đổi thêm trong phỏng vấn')}<ul class="clean-list"><li>${icon('plus',16)} Triển khai, vận hành dịch vụ trên AWS</li><li>${icon('plus',16)} Event streaming với Kafka</li><li>${icon('plus',16)} Hiểu hệ thống thanh toán và observability</li></ul></section></div>`;
}

export function performance(s,v) {
  const calibMetrics = metrics([
    ['Phân phối Bell Curve', '10% A · 72% B · 18% C', 'Mục tiêu: 10% - 70% - 20%', 'chart', 'green'],
    ['Quỹ thưởng mô phỏng', '14.2 / 15.0 tỷ', 'Dư 800 triệu (an toàn trần quỹ)', 'briefcase', 'green'],
    ['Lệch chuẩn cảnh báo', '02 ngoại lệ', 'Rating inflation & Edge cases', 'shield', 'red'],
    ['Kế hoạch kích hoạt', '01 IDP · 01 PIP', 'Tích hợp tự động lộ trình UC-04', 'book']
  ]);
  const calibSection = `
  <section class="card lower-section">
    ${cardHead('AI Calibration & Merit Planning Engine','Hội đồng HR điều phối phân phối chuẩn Bell Curve & kiểm soát trần ngân sách quỹ thưởng',badge('HITL Review Active','red'))}
    ${calibMetrics}

    <div class="card" style="background:#181b22;border:1px solid #2d3340;border-radius:10px;padding:22px;margin:20px 0;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
        <div>
          <span class="eyebrow" style="color:#f87171;font-size:9px;letter-spacing:1.5px;">LUỒNG TỰ ĐỘNG HÓA · AI AUTOMATION WORKFLOW &amp; HITL</span>
          <h3 style="color:#ffffff;font-size:16px;margin-top:4px;">Kiến trúc 7 bước: AI Performance Calibration &amp; Merit Planning Engine</h3>
        </div>
        <span class="badge" style="background:#282f3d;color:#94a3b8;border:1px solid #3b4252;">7 Steps Pipeline</span>
      </div>
      
      <div style="display:flex;flex-direction:column;align-items:center;gap:8px;max-width:760px;margin:0 auto;">
        <div style="width:100%;background:#222731;border:1px solid #374151;border-radius:6px;padding:11px 16px;text-align:center;">
          <strong style="color:#e2e8f0;font-size:12px;">Dữ liệu 1 năm: KPI/OKR, Task Jira/GitHub, Đánh giá 360, Khen thưởng/Kỷ luật</strong>
        </div>
        <div style="color:#64748b;font-size:14px;line-height:1;">↓</div>
        
        <div style="width:100%;background:#222731;border:1px solid #374151;border-radius:6px;padding:11px 16px;text-align:center;">
          <strong style="color:#e2e8f0;font-size:12px;">AI Evidence Synthesizer: Tóm tắt hiệu suất cả năm của từng nhân sự kèm dẫn chứng</strong>
        </div>
        <div style="color:#64748b;font-size:14px;line-height:1;">↓</div>

        <div style="width:100%;background:#222731;border:1px solid #374151;border-radius:6px;padding:11px 16px;text-align:center;">
          <strong style="color:#e2e8f0;font-size:12px;">AI Bias &amp; Outlier Detector: Phát hiện lệch chuẩn đánh giá giữa các phòng ban</strong>
        </div>
        <div style="color:#64748b;font-size:14px;line-height:1;">↓</div>

        <div style="width:100%;background:#222731;border:1px solid #374151;border-radius:6px;padding:11px 16px;text-align:center;">
          <strong style="color:#e2e8f0;font-size:12px;">AI Calibration Optimizer: Thuật toán giải bài toán tối ưu phân phối chuẩn Bell Curve</strong>
        </div>
        <div style="color:#64748b;font-size:14px;line-height:1;">↓</div>

        <div style="width:100%;background:#222731;border:1px solid #374151;border-radius:6px;padding:11px 16px;text-align:center;">
          <strong style="color:#e2e8f0;font-size:12px;">AI Merit Simulator: Đề xuất mức tăng lương &amp; thưởng theo trần ngân sách tài chính</strong>
        </div>
        <div style="color:#64748b;font-size:14px;line-height:1;">↓</div>

        <div style="width:100%;background:#2d2024;border:1.5px solid #ea0029;border-radius:6px;padding:13px 16px;text-align:center;box-shadow:0 0 16px rgba(234,0,41,0.2);">
          <strong style="color:#ff8598;font-size:12px;">HITL: Dashboard cho Hội đồng HR duyệt, điều chỉnh trực quan &amp; xem tác động ngân sách realtime</strong>
          <small style="display:block;color:#fca5a5;font-size:10.5px;margin-top:4px;">AI không tự quyết định · Chỉ gắn cờ cảnh báo các trường hợp ngoại lệ (Edge cases)</small>
        </div>
        <div style="color:#64748b;font-size:14px;line-height:1;">↓</div>

        <div style="width:100%;background:#222731;border:1px solid #374151;border-radius:6px;padding:11px 16px;text-align:center;">
          <strong style="color:#e2e8f0;font-size:12px;">AI tự động sinh thư thông báo kết quả &amp; kế hoạch phát triển cá nhân IDP cho từng nhân viên</strong>
        </div>
      </div>
    </div>

    ${aiNote('Vai trò HITL: AI đóng vai trò Người phản biện độc lập. AI đối chiếu kết quả tự chấm của phòng ban với dữ liệu thực tế 12 tháng (KPI, Jira, 360) và gắn cờ cảnh báo các trường hợp ngoại lệ (Edge cases). Hội đồng HR chỉ cần can thiệp các ca được gắn cờ, đảm bảo công bằng và giữ an toàn trần ngân sách tài chính.')}
    <div class="two-columns" style="margin-top:16px;">
      <div class="evidence-block">
        <span class="eyebrow" style="color:var(--color-red,#ea0029);">CẢNH BÁO LỆCH CHUẨN · BIAS &amp; OUTLIER DETECTOR</span>
        <div style="margin:10px 0;padding:10px;background:#fdf2f2;border-radius:6px;border-left:3px solid #ea0029;">
          <strong>Đặng Bảo Ngọc (Product Designer)</strong> · Quản lý chấm: <span class="badge red">Loại A (Xuất sắc)</span>
          <p style="margin:6px 0;font-size:13px;color:#555;"><strong>AI Phản biện độc lập:</strong> Output Jira/Figma 12 tháng thấp hơn 32% so với mặt bằng chung loại A của khối. Có dấu hiệu Rating Inflation. Đề xuất chuyển về <strong>Loại B</strong> để cân bằng Bell Curve.</p>
          <div style="display:flex;gap:8px;margin-top:8px;">
            <button class="btn small primary" type="button">${icon('check',14)} Chấp thuận kiến nghị AI (về B)</button>
            <button class="btn small" type="button">Bảo lưu giải trình quản lý (giữ A)</button>
          </div>
        </div>
        <div style="margin:10px 0;padding:10px;background:#f0f9ff;border-radius:6px;border-left:3px solid #0284c7;">
          <strong>Trần Hoàng Nam (Senior Backend Engineer)</strong> · Quản lý chấm: <span class="badge green">Loại A (Xuất sắc)</span>
          <p style="margin:6px 0;font-size:13px;color:#555;"><strong>AI Phản biện độc lập:</strong> Xác nhận hợp lệ. Vượt 112% KPI, P95 Payment API giảm 33%, hoàn thành 3 phiên chia sẻ tri thức. AI tự động kích hoạt <strong>Lộ trình cán bộ nguồn IDP (Succession Planning)</strong>.</p>
        </div>
      </div>
      <div class="evidence-block">
        <span class="eyebrow">MERIT SIMULATOR &amp; TÍCH HỢP LỘ TRÌNH (UC-04)</span>
        <div class="table-wrap" style="margin-top:8px;">
          <table>
            <thead><tr><th>Xếp loại</th><th>Tỷ lệ</th><th>% Tăng lương</th><th>Thưởng</th><th>Trạng thái lộ trình</th></tr></thead>
            <tbody>
              <tr><td><span class="badge green">Loại A</span></td><td>10%</td><td>+15%</td><td>3.0 tháng</td><td>${badge('Kế hoạch IDP nguồn','green')}</td></tr>
              <tr><td><span class="badge blue">Loại B</span></td><td>72%</td><td>+8%</td><td>1.8 tháng</td><td>${badge('Lộ trình chuyên môn','blue')}</td></tr>
              <tr><td><span class="badge amber">Loại C</span></td><td>18%</td><td>0%</td><td>0.5 tháng</td><td>${badge('Cam kết PIP 90 ngày','red')}</td></tr>
            </tbody>
          </table>
        </div>
        <div style="margin-top:12px;padding:10px;background:#f8fafc;border-radius:6px;font-size:13px;">
          <strong>Auto-generator Output cho Trần Hoàng Nam (Loại A):</strong>
          <p style="margin:4px 0;color:#64748b;">Đã tự động sinh Thư thông báo kết quả &amp; Bản kế hoạch phát triển IDP: Định hướng Tech Lead 2027, đăng ký khóa LMS Kiến trúc Microservices &amp; ghép cặp Mentor Đức Minh.</p>
        </div>
      </div>
    </div>
  </section>`;

  return `${pageHead('HR MANAGEMENT','Hiệu suất & Điều phối ngân sách thưởng','Đủ bằng chứng cả năm. Cân bằng Bell Curve và phân bổ quỹ thưởng minh bạch.',badge('Kỳ Q4 · 2026'))}<div class="profile-header">${avatar('HN','peach',true)}<div><h2>Trần Hoàng Nam</h2><p>Senior Backend Engineer · Người quản lý: Lê Thanh Hà</p></div><span class="badge green">1:1 tiếp theo · 16/11</span></div><div class="two-columns"><section class="card">${cardHead('Bằng chứng trong kỳ','Tổng hợp theo mục tiêu, giữ nguyên nguồn')}<div class="evidence-block"><span class="eyebrow">MỤC TIÊU 01 · CHẤT LƯỢNG HỆ THỐNG</span><h3>Giảm độ trễ Payment API</h3><p>P95 từ 420 ms xuống 280 ms, đạt mục tiêu dưới 300 ms.</p>${badge('PM · ATLAS-218','blue')}<small>Đo trong đợt load test 05/11/2026</small></div><div class="evidence-block"><span class="eyebrow">MỤC TIÊU 02 · CHIA SẺ TRI THỨC</span><h3>Đồng hành cùng 2 kỹ sư mới</h3><p>Hoàn thành 3/4 phiên chia sẻ về Java và thiết kế API.</p>${badge('LMS · ENG-042','blue')}<small>Phiên cuối dự kiến 20/11/2026</small></div>${aiNote('Còn thiếu phản hồi của một bên phối hợp. Bản nháp chưa đủ bằng chứng để kết luận toàn kỳ.')}<form id="review-form" class="editor-form"><label for="review-text">Nhận xét của quản lý</label><textarea id="review-text" name="text" rows="5" required placeholder="Viết nhận xét và dẫn bằng chứng...">${esc(s.review)}</textarea><button class="btn primary" type="submit">${icon('check',16)} Lưu bản nháp đánh giá</button></form></section><section class="card">${cardHead('Chuẩn bị buổi 1:1','16/11/2026 · 09:00–09:30',icon('users',20))}<div class="one-on-one-summary"><strong>Điểm đáng trao đổi</strong><p>Atlas đang cần thêm năng lực backend. Nam quan tâm kiến trúc hệ thống; cần trao đổi về lịch bàn giao và kế hoạch học Kafka.</p><span class="subtle">Nguồn mẫu: PM, hồ sơ kỹ năng, agenda lần trước</span></div><ul class="clean-list agenda-suggestions"><li>${icon('target',18)} Mục tiêu nào cần hỗ trợ trong 2 tuần tới?</li><li>${icon('book',18)} Có đủ thời gian dành cho học Kafka?</li><li>${icon('clock',18)} Tiến độ phiên chia sẻ thứ 4 đang thế nào?</li></ul><form id="agenda-form" class="editor-form"><label for="agenda-text">Agenda & việc cần theo dõi</label><textarea id="agenda-text" name="text" rows="6" required placeholder="Chỉnh sửa chủ đề, người phụ trách và hạn hoàn thành...">${esc(s.agenda || '1. Kiểm tra tiến độ Payment API — Hoàng Nam\n2. Thống nhất 2 giờ/tuần học Kafka — Nam & Thanh Hà\n3. Chuẩn bị phiên chia sẻ Java ngày 20/11 — Hoàng Nam')}</textarea><button class="btn primary" type="submit">${icon('check',16)} Xác nhận & lưu agenda</button></form><div class="privacy-note">${icon('lock',16)}<p>Ghi chú 1:1 chỉ dành cho hai bên. Không tự đưa vào hồ sơ đánh giá.</p></div></section></div>${calibSection}`;
}

export function attendance(s,v) {
  const rows = s.attendance.filter(r=>v.filter==='all'||r.status===v.filter);
  return `${pageHead('HR MANAGEMENT','Chốt công với sự rõ ràng','Phát hiện bất thường, kiểm tra bằng chứng và duyệt từng điều chỉnh.',badge('Kỳ công · Tháng 11/2026'))}${metrics([['Bất thường cần xử lý',s.attendance.filter(r=>r.status==='pending').length,'Trong tập dữ liệu mẫu','calendar','red'],['Thiếu bằng chứng',s.attendance.filter(r=>!r.evidence).length,'Cần quản lý xác nhận','file'],['Đã duyệt điều chỉnh',s.attendance.filter(r=>r.status==='done').length,'Có lưu vết người duyệt','check'],['Hạn chốt công','25/11','Còn 12 ngày theo lịch demo','clock']])}
  <section class="card"><div class="table-toolbar"><div class="filter-tabs">${[['all','Tất cả'],['pending','Cần xử lý'],['done','Đã duyệt']].map(([id,t])=>button(t,'filter',id,`tab ${v.filter===id?'active':''}`)).join('')}</div><span class="subtle">Mọi điều chỉnh cần HR vận hành xác nhận</span></div><div class="table-wrap"><table><thead><tr><th>Nhân viên</th><th>Ngày công</th><th>Bất thường</th><th>Bằng chứng</th><th>Trạng thái</th><th></th></tr></thead><tbody>${rows.map(r=>`<tr><td>${personCell(r)}</td><td>${r.date}</td><td>${r.issue}<small>${r.id}</small></td><td>${badge(r.evidence?'Đã có xác nhận':'Chờ quản lý',r.evidence?'green':'amber')}</td><td>${statusBadge(r.status)}</td><td>${button('Kiểm tra','attendance-row',r.id,'btn small')}</td></tr>`).join('')}</tbody></table></div>${!rows.length?empty('Đã xử lý hết','Không còn bản ghi ở trạng thái này.'):''}</section><div class="lower-section">${aiNote('Thiếu chấm công và OT chưa duyệt được phát hiện bằng quy tắc. Phần giải thích nguyên nhân là gợi ý mẫu; dữ liệu công chỉ thay đổi sau bước duyệt của HR vận hành.')}</div><section class="card lower-section">${cardHead('Chuẩn bị dữ liệu trước chốt lương','Prototype tập trung làm sạch công/OT, chưa tính lương')}<div class="checklist-inline"><span>${icon('check',18)} Đồng bộ lịch ca mẫu</span><span>${icon('clock',18)} Xử lý ${s.attendance.filter(x=>x.status==='pending').length} bất thường</span><span>${icon('lock',18)} HR vận hành duyệt điều chỉnh</span></div></section>`;
}

export function restructure(s, v) {
  const rows = affected.map(p => ({ ...p, ...s.restructure.find(x => x.id === p.id) }));
  const count = (...st) => rows.filter(r => st.includes(r.status)).length;
  const optionBadge = p => p.option === 'full' ? badge('Có vị trí phù hợp','green') : p.option === 'partial' ? badge('Khớp một phần','blue') : badge('Chưa có phương án','amber');
  return `${pageHead('HR ECOSYSTEM','Thu hẹp đơn vị, giữ người phù hợp','Bố trí lại trước. Cắt giảm là phương án cuối và do con người quyết định.',badge('Bố trí lại trước','red'))}
  <div class="project-banner"><span class="project-monogram">O<span>↘</span></span><div><div class="eyebrow">QUYẾT ĐỊNH ĐÃ PHÊ DUYỆT · RST-004</div><h2>Project Orion thu hẹp</h2><p>Sản phẩm ngừng phát triển · Digital Products</p></div><div class="project-meta"><strong>${rows.length} vị trí bị ảnh hưởng</strong><span>Hiệu lực 31/12/2026</span><span>Danh sách lập theo vị trí, không theo cá nhân</span></div></div>
  ${metrics([['Bị ảnh hưởng',two(rows.length),'Theo tiêu chí đã duyệt','users'],['Đã có hướng nội bộ',two(count('redeployed','reskill')),'Điều chuyển hoặc học bù','check'],['Chờ xử lý',two(count('open','review')),'Cần HR hoặc Trưởng khối','clock','red'],['Cắt giảm đã duyệt',two(count('approved','exit')),'Sau rà soát của pháp chế','logout']])}
  <div class="talent-grid">${rows.map(p=>`<article class="card talent-card"><div class="talent-top">${avatar(p.initials,p.color,true)}${p.option==='none'?optionBadge(p):`<span class="match-score"><strong>${p.match}<small>%</small></strong><span>khớp kỹ năng</span></span>`}</div><h3>${p.name}</h3><p>${p.role}</p><span class="subtle">${p.tenure}</span>${tags(p.skills)}<div class="evidence-snippet">${icon('spark',16)}<span>${p.target?`<strong>${p.target}.</strong> `:''}${p.finding}</span></div><div class="skill-gap"><span>Trạng thái</span><p>${statusBadge(p.status)}</p></div>${button(`Xem hồ sơ ${icon('arrow',16)}`,'rs-person',p.id,'btn full-width')}</article>`).join('')}</div>
  ${aiNote('AI chỉ tìm vị trí nội bộ, đề xuất học bù và soạn hồ sơ rà soát. AI không chọn và không xếp hạng ai bị cắt giảm. Tuổi, giới tính, lương, thai sản, nghỉ ốm không được dùng làm tiêu chí. Dữ liệu trên màn hình là giả lập.')}`;
}
const two = n => String(n).padStart(2, '0');

// Dải chú thích luồng: bước nào do AI, quy tắc hay con người đảm nhận.
const flowStrip = id => flows[id] ? `<section class="flow-strip" aria-label="Luồng xử lý và phần việc của AI"><span class="eyebrow">LUỒNG · ${flows[id].uc}</span><ol>${flows[id].steps.map(([kind,text]) => `<li>${kindTag(kind)}<span>${text}</span></li>`).join('')}</ol></section>` : '';
const screens = { overview, assistant, learning, workforce: workforceView, recruitment, performance, attendance, workflows, skills, staffing, restructure };
export const views = Object.fromEntries(Object.entries(screens).map(([id, fn]) => [id, (s, v) => fn(s, v).replace('<!--flow-->', flowStrip(id))]));
