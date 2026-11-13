import { initial, people, roles, jobs, candidates } from './data.mjs';
export const STORAGE_KEY = 'nova-workforce-demo-v1';
export const freshState = () => structuredClone(initial);
const requireThat = (condition, message) => { if (!condition) throw new Error(message); };
const requireRole = (actual, expected) => requireThat(actual === expected, `Chuyển sang vai trò ${roles[expected].label} để thực hiện bước này.`);
export function restoreState(raw) {
  try {
    const s = JSON.parse(raw);
    requireThat(s?.version === initial.version, 'version');
    for (const key of ['requests', 'skills', 'attendance', 'interests', 'enrolled', 'shortlist', 'audit']) requireThat(Array.isArray(s[key]), key);
    requireThat(Number.isFinite(s.leaveBalance) && s.leaveBalance >= 0 && s.offboarding?.items?.length === 5, 'shape');
    requireThat(s.skills.length === initial.skills.length && s.attendance.length === initial.attendance.length, 'fixtures');
    requireThat(s.requests.every(r => r.id && Array.isArray(r.stages) && r.stages.every(t => roles[t.role])), 'requests');
    return s;
  } catch { return freshState(); }
}
export function workdays(start, end) {
  const parse = value => { const d = new Date(`${value}T00:00:00Z`); requireThat(Number.isFinite(+d) && d.toISOString().slice(0, 10) === value, 'Ngày không hợp lệ.'); return d; };
  const a = parse(start), b = parse(end);
  requireThat(a <= b, 'Ngày kết thúc phải từ ngày bắt đầu trở đi.');
  requireThat((b-a)/86400000 <= 366, 'Vui lòng chọn khoảng thời gian trong một năm.');
  let n = 0;
  for (let t = +a; t <= +b; t += 86400000) { const weekday = new Date(t).getUTCDay(); if (weekday !== 0 && weekday !== 6) n++; }
  return n;
}
export const pendingStage = request => request.stages.find(s => !s.done);
export const reservedLeave = s => s.requests.filter(r => r.category === 'leave' && ['pending','active'].includes(r.status)).reduce((n,r) => n+r.days, 0);
export function transition(previous, action) {
  const s = structuredClone(previous), a = action;
  requireThat(roles[a.role], 'Vai trò không hợp lệ.');
  let message = '';
  if (a.type === 'leave') {
    requireRole(a.role, 'employee');
    const days = workdays(a.start, a.end);
    requireThat(a.start >= '2026-11-13', 'Ngày nghỉ phải từ ngày demo 13/11/2026.');
    requireThat(days > 0, 'Khoảng ngày đã chọn không có ngày làm việc.');
    requireThat(a.reason?.trim(), 'Vui lòng nhập lý do.');
    requireThat(days <= s.leaveBalance-reservedLeave(s), 'Số ngày vượt quá số phép còn khả dụng.');
    requireThat(!s.requests.some(r => r.category === 'leave' && r.status !== 'rejected' && r.start <= a.end && r.end >= a.start), 'Yêu cầu bị trùng ngày với một đơn đã có.');
    const id = `RQ-${1043+s.requests.length-initial.requests.length}`;
    s.requests.unshift({ id, title: `Nghỉ phép · ${days} ngày`, person: 'Trần Hoàng Nam', initials: 'HN', unit: 'Digital Products', category: 'leave', status: 'pending', start: a.start, end: a.end, days, detail: a.reason.trim(), date: '13/11/2026', due: 'Chờ quản lý', urgent: false, stages: [{ label: 'Quản lý phê duyệt', role: 'manager', done: false }] });
    message = `Tạo ${id}: nghỉ phép ${days} ngày, chờ quản lý phê duyệt`;
  } else if (a.type === 'request-step' || a.type === 'request-reject') {
    const r = s.requests.find(r => r.id === a.id);
    requireThat(r && ['pending','active'].includes(r.status), 'Yêu cầu không còn chờ xử lý.');
    const step = pendingStage(r); requireRole(a.role, step.role);
    if (a.type === 'request-reject') {
      requireThat(a.reason?.trim(), 'Cần có lý do từ chối.');
      r.status = 'rejected'; r.rejection = a.reason.trim(); message = `${r.id}: từ chối — ${r.rejection}`;
    } else {
      step.done = true; r.status = pendingStage(r) ? 'active' : 'done';
      if (r.status === 'done' && r.category === 'leave') s.leaveBalance -= r.days;
      message = `${r.id}: hoàn tất bước ${step.label}`;
    }
  } else if (['skill-accept','skill-verify','skill-reject'].includes(a.type)) {
    const skill = s.skills.find(x => x.id === a.id); requireThat(skill, 'Không tìm thấy kỹ năng.');
    if (a.type === 'skill-verify') {
      requireRole(a.role, 'manager'); requireThat(skill.status === 'pending', 'Nhân viên cần xác nhận kỹ năng trước.');
      skill.status = 'verified'; skill.evidenceType = 'Đã xác nhận'; skill.verifier = roles.manager.full;
    } else {
      requireRole(a.role, 'employee'); requireThat(skill.status === 'suggested', 'Đề xuất đã được xử lý.');
      skill.status = a.type === 'skill-accept' ? 'pending' : 'declined';
    }
    message = `${skill.name}: ${a.type === 'skill-verify' ? 'quản lý xác thực' : a.type === 'skill-accept' ? 'nhân viên xác nhận, chờ quản lý' : 'nhân viên từ chối đề xuất'}`;
  } else if (a.type === 'staff-propose') {
    requireRole(a.role, 'hrbp');
    const person = people.find(x => x.id === a.id);
    requireThat(person?.available && person.capacity >= 100, 'Nhân sự không đáp ứng lịch hoặc tỷ lệ phân bổ.');
    requireThat(!s.staffing || s.staffing.status === 'declined', 'Dự án đã có một phương án đang xử lý.');
    s.staffing = { personId: a.id, stage: 0, status: 'pending', allocated: false };
    message = `Đề xuất ${person.name} cho Atlas; chờ nhân viên đồng ý`;
  } else if (a.type === 'staff-next') {
    const p = s.staffing;
    requireThat(p?.status === 'pending' && p.stage < 4, 'Không có phương án đang chờ.');
    requireRole(a.role, ['employee','manager','bu','hrbp'][p.stage]);
    p.stage++;
    if (p.stage === 4) { p.status = 'done'; p.allocated = true; }
    message = ['','Nhân viên đồng ý tham gia Atlas','Quản lý xác nhận nhả người ngày 01/12','BU Head phê duyệt phương án Atlas','Hoàn tất mô phỏng phân bổ Atlas'][p.stage];
  } else if (a.type === 'staff-decline') {
    requireRole(a.role, 'employee'); requireThat(s.staffing?.status === 'pending' && s.staffing.stage === 0, 'Phương án không còn chờ phản hồi.');
    requireThat(a.reason?.trim(), 'Vui lòng nêu lý do.');
    s.staffing.status = 'declined'; s.staffing.reason = a.reason.trim(); message = 'Nhân viên từ chối phương án Atlas; trở về HRBP';
  } else if (a.type === 'attendance-approve') {
    requireRole(a.role, 'ops'); const row = s.attendance.find(x => x.id === a.id);
    requireThat(row?.status === 'pending', 'Bản ghi đã được xử lý.');
    requireThat(row.evidence, 'Thiếu bằng chứng: cần quản lý xác nhận trước.');
    row.status = 'done'; message = `${row.id}: duyệt điều chỉnh công — ${row.proposal}`;
  } else if (a.type === 'attendance-evidence') {
    requireRole(a.role, 'manager'); const row = s.attendance.find(x => x.id === a.id);
    requireThat(row && !row.evidence, 'Bản ghi đã có xác nhận.');
    row.evidence = 'Lê Thanh Hà xác nhận 2 giờ OT theo lịch triển khai Cloud ngày 11/11 (mẫu)';
    message = `${row.id}: quản lý bổ sung xác nhận OT`;
  } else if (a.type === 'offboard-check') {
    const item = s.offboarding.items.find(x => x.id === a.id);
    requireThat(item && !item.done && !s.offboarding.closed, 'Hạng mục đã hoàn tất.'); requireRole(a.role, item.role);
    item.done = true; message = `Offboarding: ${item.label}`;
  } else if (a.type === 'offboard-close') {
    requireRole(a.role, 'ops'); requireThat(!s.offboarding.closed && s.offboarding.items.every(x => x.done), 'Cần hoàn tất tất cả hạng mục trước khi đóng hồ sơ.');
    s.offboarding.closed = true; message = 'Đóng hồ sơ offboarding Phan Anh Tuấn';
  } else if (['interest','enroll','shortlist'].includes(a.type)) {
    requireRole(a.role, a.type === 'shortlist' ? 'recruiter' : 'employee');
    const key = { interest: 'interests', enroll: 'enrolled', shortlist: 'shortlist' }[a.type];
    const valid = a.type === 'interest' ? jobs.some(x => x.id === a.id) : a.type === 'shortlist' ? candidates.some(x => x.id === a.id) : ['course-1','course-2','course-3'].includes(a.id);
    requireThat(valid, 'Không tìm thấy mục đã chọn.'); requireThat(!s[key].includes(a.id), 'Bạn đã thực hiện thao tác này.');
    s[key].push(a.id); message = `${{interest:'Bày tỏ quan tâm',enroll:'Đăng ký khóa học nội bộ miễn phí',shortlist:'Recruiter thêm vào shortlist'}[a.type]}: ${a.id}`;
  } else if (['agenda','review'].includes(a.type)) {
    requireRole(a.role, 'manager'); requireThat(a.text?.trim(), 'Vui lòng nhập nội dung trước khi lưu.');
    s[a.type] = a.text.trim(); message = a.type === 'agenda' ? 'Quản lý lưu agenda 1:1' : 'Quản lý lưu bản nháp đánh giá';
  } else if (a.type === 'health-action') {
    requireRole(a.role, 'hrbp'); s.healthAction = true; message = 'Tạo hành động rà soát workload cho Digital Products';
  } else throw new Error('Thao tác không được hỗ trợ.');
  s.audit.unshift({ id: `evt-${s.audit.length+1}`, text: message, role: a.role, at: new Date().toISOString() });
  return s;
}
