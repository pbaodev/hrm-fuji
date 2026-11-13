// Chú thích luồng: ai = AI xử lý (mô phỏng), rule = quy tắc/hệ thống, human = con người quyết định.
export const kinds = { ai: 'AI', rule: 'Quy tắc', human: 'Con người' };

// Luồng tóm gọn hiển thị dưới tiêu đề mỗi màn hình.
export const flows = {
  assistant: { uc: 'UC-01 · 02 · 03', steps: [['human','Nhân viên hỏi'],['ai','Hiểu câu hỏi, tìm nguồn'],['rule','Kiểm tra số phép, quyền xem'],['ai','Trả lời kèm nguồn'],['human','Xác nhận gửi yêu cầu']] },
  learning: { uc: 'UC-04 · 05', steps: [['human','Chọn mục tiêu'],['rule','So kỹ năng với yêu cầu'],['ai','Gợi ý khóa học, cơ hội'],['human','Đăng ký, bày tỏ quan tâm']] },
  workforce: { uc: 'UC-06 · 10', steps: [['rule','Tổng hợp số liệu theo khối'],['ai','Dự báo, giải thích biến động'],['ai','Đề xuất hành động'],['human','HR phụ trách khối quyết định']] },
  recruitment: { uc: 'UC-07', steps: [['ai','Đọc CV'],['rule','Lọc tiêu chí bắt buộc'],['ai','Chấm điểm kèm bằng chứng'],['human','Chuyên viên tuyển dụng chốt danh sách']] },
  performance: { uc: 'UC-08 · 14', steps: [['rule','Gom bằng chứng trong kỳ'],['ai','Tóm tắt, gợi ý chủ đề'],['human','Quản lý viết nhận xét, chốt agenda']] },
  attendance: { uc: 'UC-09', steps: [['rule','Phát hiện sai lệch công'],['ai','Giải thích nguyên nhân, đề xuất sửa'],['human','Quản lý xác nhận'],['human','HR vận hành duyệt']] },
  workflows: { uc: 'UC-11 · 15', steps: [['ai','Phân loại yêu cầu'],['rule','Giao người, đặt hạn'],['human','Từng người duyệt bước của mình'],['rule','Ghi lịch sử, hoàn tất']] },
  skills: { uc: 'UC-12', steps: [['ai','Rút kỹ năng từ CV, dự án'],['human','Nhân viên xác nhận'],['human','Quản lý xác thực'],['rule','Lưu kèm bằng chứng']] },
  restructure: { uc: 'UC-16', steps: [['rule','Lập danh sách bị ảnh hưởng'],['ai','Tìm vị trí nội bộ, học bù'],['human','Nhân viên đồng ý'],['ai','Soạn hồ sơ rà soát'],['human','Pháp chế rà soát'],['human','Trưởng khối duyệt']] },
  staffing: { uc: 'UC-13', steps: [['rule','Lọc theo lịch, tỷ lệ phân bổ'],['ai','Xếp hạng kèm bằng chứng'],['human','Nhân viên đồng ý'],['human','Quản lý nhả người'],['human','Trưởng khối duyệt']] }
};

const skill = (s, id) => s.skills.find(x => x.id === id);
const leave = s => s.requests.find(r => r.category === 'leave');
const att = (s, id) => s.attendance.find(x => x.id === id);
const rs = (s, id) => s.restructure.find(x => x.id === id);

// Kịch bản demo end-to-end. done(state, view) = điều kiện để tự chuyển sang bước sau.
export const scenarios = [
  { id: 'leave', title: 'Xin nghỉ phép', uc: 'UC-02 · 11', desc: 'Từ câu hỏi trong chat đến lúc quản lý duyệt.', steps: [
    { role: 'employee', route: 'assistant', kind: 'ai', text: 'Bấm gợi ý “Tôi muốn nghỉ phép” trong khung chat.', note: 'AI hiểu câu hỏi, tra số ngày phép và dẫn nguồn chính sách.', target: '[data-action="ask"][data-id="Tôi muốn nghỉ phép"]', done: (s, v) => v.messages.length > 0 },
    { role: 'employee', route: 'assistant', kind: 'rule', text: 'Bấm “Tạo đơn nghỉ phép”, điền ngày và lý do, xem lại rồi xác nhận gửi.', note: 'Quy tắc kiểm tra số phép còn lại và trùng lịch. AI không tự gửi đơn.', target: '.personal-balance [data-action="leave"]', done: s => !!leave(s) },
    { role: 'manager', route: 'workflows', kind: 'human', text: 'Mở đơn nghỉ phép vừa tạo và xác nhận hoàn tất bước duyệt.', note: 'Quyết định duyệt thuộc về quản lý trực tiếp.', target: '[data-action="request"][data-id="RQ-1043"]', done: s => ['done','rejected'].includes(leave(s)?.status) },
    { role: 'employee', route: 'assistant', kind: 'rule', text: 'Xem lại ô “Ngày phép của bạn”: số phép chỉ bị trừ sau khi quản lý duyệt.', note: 'Hệ thống cập nhật số dư và ghi lịch sử xử lý.', target: '.personal-balance' }
  ] },
  { id: 'skill', title: 'Xác thực kỹ năng', uc: 'UC-12', desc: 'AI đề xuất kỹ năng, nhân viên và quản lý xác nhận.', steps: [
    { role: 'employee', route: 'skills', kind: 'ai', text: 'Mở kỹ năng Kafka (đang ở trạng thái “AI đề xuất”) và bấm xác nhận.', note: 'AI rút kỹ năng Kafka từ tài liệu dự án Atlas và đề xuất mức 2/5.', target: '.skill-node[data-id="sk-4"]', done: s => skill(s,'sk-4').status !== 'suggested' },
    { role: 'manager', route: 'skills', kind: 'human', text: 'Mở lại Kafka và bấm “Xác thực bằng chứng kỹ năng”.', note: 'Chỉ kỹ năng được quản lý xác thực mới dùng để ghép người với dự án.', target: '.skill-node[data-id="sk-4"]', done: s => ['verified','declined'].includes(skill(s,'sk-4').status) },
    { role: 'manager', route: 'skills', kind: 'rule', text: 'Xem bảng “Hồ sơ bằng chứng”: Kafka đã có người xác thực và ngày cập nhật.', note: 'Hệ thống lưu loại bằng chứng, nguồn và người xác thực.', target: '#skill-evidence' }
  ] },
  { id: 'staffing', title: 'Bố trí nhân sự cho dự án Atlas', uc: 'UC-13', desc: 'Từ gợi ý của AI đến khi trưởng khối duyệt.', steps: [
    { role: 'hrbp', route: 'staffing', kind: 'ai', text: 'Xem 3 hồ sơ AI xếp hạng. Mở Trần Hoàng Nam và bấm “Gửi đề xuất cho nhân viên”.', note: 'Quy tắc lọc theo lịch và tỷ lệ phân bổ trước; AI xếp hạng mức khớp kỹ năng kèm bằng chứng.', target: '[data-action="person"][data-id="EMP-028"]', done: s => !!s.staffing },
    { role: 'employee', route: 'staffing', kind: 'human', text: 'Bấm “Tiếp tục quy trình” và đồng ý tham gia dự án.', note: 'Nhân viên phải đồng ý thì phương án mới đi tiếp.', target: '[data-action="staff-review"]', done: s => s.staffing?.stage >= 1 || s.staffing?.status === 'declined' },
    { role: 'manager', route: 'staffing', kind: 'human', text: 'Bấm “Tiếp tục quy trình” và xác nhận ngày nhả người.', note: 'Quản lý hiện tại xác nhận kế hoạch bàn giao.', target: '[data-action="staff-review"]', done: s => s.staffing?.stage >= 2 || s.staffing?.status === 'declined' },
    { role: 'bu', route: 'staffing', kind: 'human', text: 'Bấm “Tiếp tục quy trình” và phê duyệt phương án.', note: 'Trưởng khối ra quyết định cuối.', target: '[data-action="staff-review"]', done: s => s.staffing?.stage >= 3 || s.staffing?.status === 'declined' },
    { role: 'hrbp', route: 'staffing', kind: 'rule', text: 'Bấm “Tiếp tục quy trình” để cập nhật phân bổ.', note: 'Hệ thống chỉ cập nhật phân bổ sau khi đủ ba xác nhận.', target: '[data-action="staff-review"]', done: s => s.staffing?.status !== 'pending' }
  ] },
  { id: 'attendance', title: 'Sửa sai lệch chấm công', uc: 'UC-09', desc: 'Giờ làm thêm chưa duyệt được xử lý trước kỳ chốt lương.', steps: [
    { role: 'manager', route: 'attendance', kind: 'ai', text: 'Mở bản ghi AT-032 (Phạm Quang Huy) và xác nhận 2 giờ làm thêm.', note: 'Quy tắc phát hiện giờ làm thêm chưa duyệt; AI gợi ý nguyên nhân và cách sửa.', target: '[data-action="attendance-row"][data-id="AT-032"]', done: s => !!att(s,'AT-032').evidence },
    { role: 'ops', route: 'attendance', kind: 'human', text: 'Mở lại AT-032 và bấm “Duyệt điều chỉnh công mẫu”.', note: 'Dữ liệu công chỉ thay đổi sau khi HR vận hành duyệt.', target: '[data-action="attendance-row"][data-id="AT-032"]', done: s => att(s,'AT-032').status === 'done' }
  ] },
  { id: 'recruitment', title: 'Sàng lọc CV', uc: 'UC-07', desc: 'AI chấm CV, chuyên viên tuyển dụng chốt danh sách.', steps: [
    { role: 'recruiter', route: 'recruitment', kind: 'ai', text: 'Xem bảng điểm AI chấm cho 3 CV. Mở hồ sơ Bùi Gia Khánh, xem bằng chứng rồi bấm “Thêm vào shortlist phỏng vấn”.', note: 'AI đọc CV, chấm theo tiêu chí công việc và dẫn đoạn CV làm bằng chứng. Không tự loại hồ sơ.', target: '[data-action="candidate"][data-id="CV-101"]', done: s => s.shortlist.length > 0 },
    { role: 'recruiter', route: 'recruitment', kind: 'human', text: 'Hồ sơ đã vào danh sách phỏng vấn. Bạn có thể thêm hồ sơ khác.', note: 'Chuyên viên tuyển dụng quyết định danh sách, AI chỉ đề xuất.', target: '.score-text' }
  ] },
  { id: 'offboarding', title: 'Nghỉ việc và bàn giao', uc: 'UC-15', desc: 'Checklist bàn giao, thu hồi tài sản và đóng hồ sơ.', steps: [
    { role: 'manager', route: 'workflows', kind: 'human', text: 'Bấm “Mở checklist bàn giao” và xác nhận mục “Người nhận xác nhận tài liệu bàn giao”.', note: 'Trong thiết kế, AI lập danh sách hạng mục cần bàn giao; prototype dùng checklist mẫu.', target: '[data-action="offboarding"]', done: s => s.offboarding.items.find(i => i.id === 'off-2').done },
    { role: 'ops', route: 'workflows', kind: 'rule', text: 'Mở checklist và xác nhận 3 mục còn lại: thu hồi laptop, thu hồi quyền, quyết toán.', note: 'Quy trình thu hồi quyền chạy theo lịch, không phụ thuộc tiến độ bàn giao.', target: '[data-action="offboarding"]', done: s => s.offboarding.items.every(i => i.done) },
    { role: 'ops', route: 'workflows', kind: 'human', text: 'Mở checklist và bấm “Đóng hồ sơ bàn giao”.', note: 'HR vận hành kiểm tra đủ hạng mục rồi mới đóng hồ sơ.', target: '[data-action="offboarding"]', done: s => s.offboarding.closed }
  ] },
  { id: 'restructure', title: 'Thu hẹp đơn vị, cắt giảm nhân sự', uc: 'UC-16 · 13 · 15', desc: 'Bố trí lại trước; cắt giảm chỉ sau rà soát và phê duyệt.', steps: [
    { role: 'hrbp', route: 'restructure', kind: 'ai', text: 'Mở hồ sơ Vũ Đức Anh và bấm “Ghi nhận nhân viên đồng ý điều chuyển”.', note: 'Quy tắc lập danh sách theo vị trí bị thu hẹp. AI tìm vị trí nội bộ phù hợp cho từng người.', target: '[data-action="rs-person"][data-id="RS-1"]', done: s => rs(s,'RS-1').status !== 'open' },
    { role: 'hrbp', route: 'restructure', kind: 'ai', text: 'Mở hồ sơ Trần Thu Hà và bấm “Xác nhận lộ trình học bù”.', note: 'Khi chỉ khớp một phần, AI đề xuất lộ trình học bù thay vì loại phương án.', target: '[data-action="rs-person"][data-id="RS-2"]', done: s => rs(s,'RS-2').status !== 'open' },
    { role: 'hrbp', route: 'restructure', kind: 'human', text: 'Mở hồ sơ Lý Minh Khôi, đọc hồ sơ rà soát, đánh dấu đã rà soát cùng pháp chế rồi gửi Trưởng khối.', note: 'AI chỉ soạn hồ sơ: phương án đã thử, quyền lợi, điểm pháp chế cần xem. AI không chọn ai bị cắt giảm.', target: '[data-action="rs-person"][data-id="RS-3"]', done: s => rs(s,'RS-3').status !== 'open' },
    { role: 'bu', route: 'restructure', kind: 'human', text: 'Mở hồ sơ Lý Minh Khôi và phê duyệt (hoặc trả lại để tìm thêm phương án).', note: 'Chỉ duyệt được khi những người còn lại đã có hướng nội bộ. Quyết định thuộc về con người.', target: '[data-action="rs-person"][data-id="RS-3"]', done: s => ['approved','exit'].includes(rs(s,'RS-3').status) },
    { role: 'ops', route: 'restructure', kind: 'rule', text: 'Mở hồ sơ Lý Minh Khôi và bấm “Khởi chạy nghỉ việc và bàn giao”.', note: 'Quy trình nghỉ việc (UC-15) chỉ chạy sau khi có phê duyệt; thông báo cho nhân viên do con người thực hiện.', target: '[data-action="rs-person"][data-id="RS-3"]', done: s => rs(s,'RS-3').status === 'exit' }
  ] }
];
