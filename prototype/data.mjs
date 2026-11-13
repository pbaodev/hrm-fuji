export const roles = {
  hrbp: { label: 'HR phụ trách khối', name: 'Minh Anh', full: 'Nguyễn Minh Anh', initials: 'MA', job: 'HR phụ trách khối' },
  employee: { label: 'Nhân viên', name: 'Hoàng Nam', full: 'Trần Hoàng Nam', initials: 'HN', job: 'Senior Backend Engineer' },
  manager: { label: 'Quản lý trực tiếp', name: 'Thanh Hà', full: 'Lê Thanh Hà', initials: 'TH', job: 'Quản lý kỹ thuật' },
  recruiter: { label: 'Chuyên viên tuyển dụng', name: 'Thu Trang', full: 'Phạm Thu Trang', initials: 'TT', job: 'Tuyển dụng' },
  ops: { label: 'HR vận hành / Tiền lương', name: 'Hải Yến', full: 'Đỗ Hải Yến', initials: 'HY', job: 'Vận hành nhân sự' },
  bu: { label: 'Trưởng khối', name: 'Đức Minh', full: 'Nguyễn Đức Minh', initials: 'ĐM', job: 'Trưởng khối Digital Products' },
  candidate: { label: 'Ứng viên mới', name: 'Mai Chi', full: 'Vũ Mai Chi', initials: 'MC', job: 'Ứng viên Product Designer' }
};
export const nav = [
  { id: 'overview', label: 'Tổng quan', icon: 'grid', group: 'WORKSPACE' },
  { id: 'assistant', label: 'Trợ lý nhân viên', icon: 'spark', group: 'EMPLOYEE AI', uc: 'UC-01 · 02 · 03' },
  { id: 'learning', label: 'Học tập & nghề nghiệp', icon: 'book', uc: 'UC-04 · 05' },
  { id: 'workforce', label: 'Phân tích nhân lực', icon: 'chart', group: 'HR MANAGEMENT', uc: 'UC-06 · 10' },
  { id: 'recruitment', label: 'Tuyển dụng', icon: 'briefcase', uc: 'UC-07' },
  { id: 'performance', label: 'Hiệu suất & đội nhóm', icon: 'target', uc: 'UC-08 · 14' },
  { id: 'attendance', label: 'Công & tiền lương', icon: 'calendar', uc: 'UC-09' },
  { id: 'workflows', label: 'Điều phối quy trình', icon: 'flow', group: 'HR ECOSYSTEM', uc: 'UC-11 · 15' },
  { id: 'skills', label: 'Bản đồ kỹ năng', icon: 'nodes', uc: 'UC-12' },
  { id: 'staffing', label: 'Bố trí nhân sự', icon: 'users', uc: 'UC-13' },
  { id: 'restructure', label: 'Thu hẹp đơn vị', icon: 'shield', uc: 'UC-16' }
];
export const people = [
  { id: 'EMP-028', name: 'Trần Hoàng Nam', initials: 'HN', role: 'Senior Backend Engineer', unit: 'Digital Products', skills: ['Java', 'Spring Boot', 'AWS'], match: 94, available: true, capacity: 100, start: '01/12/2026', color: 'peach', evidence: 'Payment Gateway · 18 tháng; xác nhận bởi Lê Thanh Hà', gap: 'Cần bổ sung Kafka nâng cao', experience: '6 năm kinh nghiệm' },
  { id: 'EMP-016', name: 'Nguyễn Ngọc Linh', initials: 'NL', role: 'Backend Engineer', unit: 'Enterprise Solutions', skills: ['Java', 'Spring Boot', 'SQL'], match: 87, available: true, capacity: 100, start: '01/12/2026', color: 'lilac', evidence: 'ERP Core · 12 tháng; xác nhận bởi Phạm Đức Sơn', gap: 'Cần học AWS trong 4 tuần', experience: '4 năm kinh nghiệm' },
  { id: 'EMP-042', name: 'Phạm Quang Huy', initials: 'QH', role: 'Cloud Engineer', unit: 'Cloud & Infrastructure', skills: ['AWS', 'Kubernetes', 'Terraform'], match: 81, available: true, capacity: 100, start: '25/11/2026', color: 'mint', evidence: 'Cloud Migration · 9 tháng; xác nhận bởi Trần Gia Bảo', gap: 'Cần bổ sung Spring Boot', experience: '5 năm kinh nghiệm' },
  { id: 'EMP-057', name: 'Lê Tuấn Anh', initials: 'TA', role: 'Tech Lead', unit: 'Digital Products', skills: ['Java', 'AWS', 'Kafka'], match: 0, available: false, capacity: 20, start: '01/02/2027', color: 'blue', evidence: 'Core Platform · 24 tháng', gap: 'Chỉ trống 20%, không đủ 100% yêu cầu', experience: '8 năm kinh nghiệm' },
  { id: 'EMP-063', name: 'Đặng Bảo Ngọc', initials: 'BN', role: 'Product Designer', unit: 'Digital Products', skills: ['Figma', 'UX Research', 'Design Systems'], match: 0, available: false, capacity: 50, start: '15/12/2026', color: 'sand', evidence: 'Design System · 8 tháng', gap: 'Không đúng nhóm kỹ năng yêu cầu', experience: '4 năm kinh nghiệm' }
];
export const jobs = [
  { id: 'job-1', title: 'Senior Backend Engineer', team: 'Project Atlas · Digital Products', tags: ['Java', 'Spring Boot', 'AWS'], match: 94, place: 'Hà Nội · Hybrid', gap: 'Kafka nâng cao', desc: 'Xây dựng nền tảng dịch vụ thanh toán thế hệ mới, phục vụ các sản phẩm số trong hệ sinh thái.' },
  { id: 'job-2', title: 'Platform Engineer', team: 'Cloud Foundation · Infrastructure', tags: ['AWS', 'Docker', 'CI/CD'], match: 82, place: 'Hà Nội · Hybrid', gap: 'Kubernetes', desc: 'Phát triển nền tảng triển khai ứng dụng và trải nghiệm dành cho đội ngũ kỹ sư.' },
  { id: 'job-3', title: 'Technical Mentor', team: 'Engineering Academy · Part-time', tags: ['Java', 'Mentoring', 'System Design'], match: 89, place: 'Remote · 20% thời gian', gap: 'Kỹ năng hướng dẫn', desc: 'Đồng hành cùng các kỹ sư trẻ qua chương trình mentoring kéo dài 8 tuần.' }
];
export const candidates = [
  { id: 'CV-101', name: 'Bùi Gia Khánh', initials: 'GK', score: 92, role: 'Senior Backend Engineer', years: '6 năm', source: 'CV mẫu · trang 2, dự án Payment Hub', detail: 'Java 5 năm, Spring Boot 4 năm; xây dựng hệ thống xử lý 2 triệu giao dịch/ngày. AWS cần xác minh chứng chỉ.', tags: ['Java', 'Spring Boot', 'Microservices'], color: 'blue' },
  { id: 'CV-102', name: 'Ngô Phương Thảo', initials: 'PT', score: 88, role: 'Backend Engineer', years: '5 năm', source: 'CV mẫu · trang 1, dự án Commerce Core', detail: 'Java 4 năm, thiết kế REST API, triển khai AWS ECS; chưa có bằng chứng vận hành Kafka.', tags: ['Java', 'AWS', 'REST API'], color: 'lilac' },
  { id: 'CV-103', name: 'Đinh Việt Long', initials: 'VL', score: 76, role: 'Software Engineer', years: '4 năm', source: 'CV mẫu · trang 2, dự án Logistics', detail: 'Java 3 năm, PostgreSQL; cần hỏi thêm về Spring Boot và kiến trúc phân tán.', tags: ['Java', 'SQL', 'Docker'], color: 'mint' }
];
// UC-16: nhân sự bị ảnh hưởng khi Project Orion thu hẹp. option = kết quả AI tìm phương án nội bộ.
export const affected = [
  { id: 'RS-1', name: 'Vũ Đức Anh', initials: 'ĐA', color: 'mint', role: 'Backend Engineer', tenure: '3 năm tại Orion', skills: ['Java', 'Docker', 'CI/CD'], option: 'full', match: 86, target: 'Platform Engineer · Cloud Foundation', finding: 'Khớp 86% với vị trí đang mở, sẵn sàng từ 01/01/2027.', evidence: 'Orion Pipeline · 14 tháng; kỹ năng Docker, CI/CD đã được quản lý xác thực.' },
  { id: 'RS-2', name: 'Trần Thu Hà', initials: 'TH', color: 'lilac', role: 'QA Engineer', tenure: '2 năm tại Orion', skills: ['Manual Testing', 'SQL', 'API Testing'], option: 'partial', match: 64, target: 'Automation QA · Enterprise Solutions', finding: 'Khớp 64%. Thiếu kỹ năng viết kiểm thử tự động; lộ trình học bù 6 tuần.', evidence: 'Orion QA · 20 tháng; SQL và API Testing đã xác thực. Chưa có bằng chứng về automation.' },
  { id: 'RS-3', name: 'Lý Minh Khôi', initials: 'MK', color: 'sand', role: 'Flash Developer', tenure: '5 năm tại Orion', skills: ['ActionScript', 'Flash', 'Animation'], option: 'none', match: 0, target: '', finding: 'Chưa tìm thấy vị trí nội bộ khả thi sau khi đối chiếu 48 nhu cầu đang mở.', evidence: 'Đã thử 3 hướng: Frontend (khớp 31%, cần học bù trên 6 tháng), Motion Design (không có nhu cầu mở), Technical Support (nhân viên không chọn).' }
];
export const workforce = [
  { name: 'Digital Products', count: 486, demand: 510, ot: 18.4, engagement: 78, turnover: 2.1, color: '#ea0029' },
  { name: 'Enterprise Solutions', count: 352, demand: 360, ot: 12.6, engagement: 82, turnover: 1.4, color: '#3c4658' },
  { name: 'Cloud & Infrastructure', count: 268, demand: 280, ot: 14.2, engagement: 84, turnover: 1.2, color: '#a2a9b5' },
  { name: 'Corporate Functions', count: 142, demand: 146, ot: 8.5, engagement: 86, turnover: 0.7, color: '#e2e5ea' }
];
export const initial = {
  version: 1, leaveBalance: 8, interests: [], enrolled: [], shortlist: [], agenda: '', review: '', healthAction: false,
  requests: [
    { id: 'RQ-1042', title: 'Cấp laptop cho dự án Atlas', person: 'Trần Hoàng Nam', initials: 'HN', category: 'equipment', unit: 'Digital Products', status: 'pending', date: '13/11/2026', due: 'Hôm nay', urgent: true, detail: 'MacBook Pro 14 inch, RAM 32 GB. Phục vụ phát triển backend cho Project Atlas.', stages: [{ label: 'Quản lý phê duyệt', role: 'manager', done: false }, { label: 'HR vận hành phối hợp IT cấp thiết bị', role: 'ops', done: false }] },
    { id: 'RQ-1041', title: 'Xác nhận công ngày 10/11', person: 'Nguyễn Ngọc Linh', initials: 'NL', category: 'attendance', unit: 'Enterprise Solutions', status: 'active', date: '12/11/2026', due: 'Quá hạn 1 ngày', urgent: true, detail: 'Nhân viên thiếu check-out. Đã có xác nhận của quản lý và lịch sử truy cập văn phòng.', stages: [{ label: 'Quản lý xác nhận', role: 'manager', done: true }, { label: 'HR vận hành kiểm tra bằng chứng', role: 'ops', done: false }] },
    { id: 'RQ-1040', title: 'Đăng ký AWS Solutions Architect', person: 'Phạm Quang Huy', initials: 'QH', category: 'learning', unit: 'Cloud & Infrastructure', status: 'pending', date: '12/11/2026', due: '16/11/2026', urgent: false, detail: 'Khóa AWS Solutions Architect, chi phí mẫu 3.200.000đ, thời lượng 6 tuần.', stages: [{ label: 'Quản lý duyệt ngân sách', role: 'manager', done: false }, { label: 'HR vận hành ghi danh', role: 'ops', done: false }] },
    { id: 'RQ-1039', title: 'Onboarding · Vũ Mai Chi', person: 'Vũ Mai Chi', initials: 'MC', category: 'onboarding', unit: 'Digital Products', status: 'active', date: '11/11/2026', due: '18/11/2026', urgent: false, detail: 'Product Designer · nhận việc ngày 18/11. Hợp đồng mẫu đã xác nhận; chờ chuẩn bị thiết bị.', stages: [{ label: 'HR xác nhận hồ sơ', role: 'ops', done: true }, { label: 'Chuẩn bị thiết bị và lịch nhận việc', role: 'ops', done: false }] },
    { id: 'RQ-1038', title: 'Cấp quyền kho tài liệu Design', person: 'Đặng Bảo Ngọc', initials: 'BN', category: 'access', unit: 'Digital Products', status: 'done', date: '10/11/2026', due: 'Đã hoàn tất', urgent: false, detail: 'Quyền đọc kho Design System đã được cấp trong dữ liệu mô phỏng.', stages: [{ label: 'Quản lý duyệt', role: 'manager', done: true }, { label: 'IT cấp quyền', role: 'ops', done: true }] }
  ],
  skills: [
    { id: 'sk-1', name: 'Java', level: 4, status: 'verified', evidenceType: 'Đã xác nhận', source: 'Payment Gateway · 18 tháng', date: '10/11/2026', verifier: 'Lê Thanh Hà' },
    { id: 'sk-2', name: 'Spring Boot', level: 4, status: 'verified', evidenceType: 'Đã xác nhận', source: 'Payment Gateway · 18 tháng', date: '10/11/2026', verifier: 'Lê Thanh Hà' },
    { id: 'sk-3', name: 'AWS', level: 3, status: 'verified', evidenceType: 'Đã xác nhận', source: 'Cloud Deployment · 9 tháng', date: '08/11/2026', verifier: 'Lê Thanh Hà' },
    { id: 'sk-4', name: 'Kafka', level: 2, status: 'suggested', evidenceType: 'Đã làm', source: 'Atlas POC · tài liệu kiến trúc v1.2', date: '12/11/2026', verifier: '' },
    { id: 'sk-5', name: 'System Design', level: 3, status: 'pending', evidenceType: 'Đã học', source: 'LMS · chứng nhận hoàn thành 04/11', date: '12/11/2026', verifier: '' }
  ],
  staffing: null,
  restructure: affected.map(p => ({ id: p.id, status: 'open' })),
  attendance: [
    { id: 'AT-031', name: 'Nguyễn Ngọc Linh', initials: 'NL', unit: 'Enterprise Solutions', date: '10/11/2026', issue: 'Thiếu check-out', severity: 'medium', evidence: 'Quản lý xác nhận 18:05; log ra văn phòng 18:08', proposal: 'Bổ sung giờ ra 18:05', status: 'pending' },
    { id: 'AT-032', name: 'Phạm Quang Huy', initials: 'QH', unit: 'Cloud & Infrastructure', date: '11/11/2026', issue: 'OT chưa được duyệt', severity: 'high', evidence: '', proposal: 'Cần quản lý xác nhận 2 giờ OT', status: 'pending' },
    { id: 'AT-033', name: 'Trần Hoàng Nam', initials: 'HN', unit: 'Digital Products', date: '09/11/2026', issue: 'Lệch ca làm việc', severity: 'medium', evidence: 'Lịch ca B được duyệt ngày 08/11; log chấm công 10:00–19:00', proposal: 'Áp dụng ca B theo lịch đã duyệt', status: 'pending' }
  ],
  offboarding: { name: 'Phan Anh Tuấn', lastDay: '20/11/2026', closed: false, items: [
    { id: 'off-1', label: 'Xác nhận quyết định và ngày làm việc cuối', role: 'ops', done: true },
    { id: 'off-2', label: 'Người nhận xác nhận tài liệu bàn giao', role: 'manager', done: false },
    { id: 'off-3', label: 'Xác nhận thu hồi laptop và thẻ nhân viên', role: 'ops', done: false },
    { id: 'off-4', label: 'Xác nhận kết quả thu hồi quyền từ IAM', role: 'ops', done: false },
    { id: 'off-5', label: 'Xác nhận quyết toán từ Finance', role: 'ops', done: false }
  ] },
  audit: [{ id: 'evt-1', text: 'Lê Thanh Hà xác nhận kỹ năng Java của Trần Hoàng Nam', role: 'manager', at: '2026-11-13T08:30:00+07:00' }]
};

// Phân quyền màn hình theo vai trò. Mục đầu tiên là trang chủ của vai trò đó.
export const access = {
  hrbp: ['overview', 'workforce', 'workflows', 'skills', 'staffing', 'restructure'],
  employee: ['overview', 'assistant', 'learning', 'workflows', 'skills', 'staffing'],
  manager: ['overview', 'assistant', 'learning', 'performance', 'attendance', 'workflows', 'skills', 'staffing'],
  recruiter: ['overview', 'assistant', 'recruitment'],
  ops: ['overview', 'attendance', 'workflows', 'restructure'],
  bu: ['overview', 'workforce', 'staffing', 'restructure'],
  candidate: ['assistant']
};
export const canAccess = (role, route) => !!access[role]?.includes(route);
export const homeOf = role => access[role]?.[0] || 'overview';
// Phạm vi dữ liệu yêu cầu: nhân viên thấy của mình, quản lý thấy việc cần mình duyệt, HR thấy toàn bộ.
export const scopeRequests = (requests, role) => {
  if (role === 'hrbp' || role === 'ops') return requests;
  if (role === 'manager') return requests.filter(r => r.stages.some(t => t.role === 'manager'));
  if (role === 'employee' || role === 'candidate') return requests.filter(r => r.person === roles[role].full);
  if (role === 'recruiter') return requests.filter(r => r.category === 'onboarding');
  if (role === 'bu') return requests.filter(r => r.unit === 'Digital Products');
  return [];
};
