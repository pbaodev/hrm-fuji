# AI Workforce Ecosystem (bản chi tiết)

Bản giải thích cho [Product_Mindmap.md](Product_Mindmap.md). Mỗi `##` là một feature; mỗi bullet là một **thành phần** của feature đó, không phải feature độc lập.

Nhãn loại thành phần:

- `[AI]`: năng lực do AI xử lý
- `[Rules]`: quy tắc hoặc workflow xác định, không dùng AI
- `[Người]`: điểm con người quyết định

In đậm là feature ưu tiên và thành phần AI của chúng.

## Employee Assistant (Trợ lý nhân viên)

Một cửa hội thoại cho ứng viên và nhân viên. Gộp feature gốc 1, 2, 3.

- [AI] Hỏi đáp chính sách, phép, công, lương
  - Trả lời từ văn bản chính sách, kèm tên văn bản và ngày hiệu lực
  - Số liệu cá nhân lấy từ HRIS, AI không tự tính
- [AI] Concierge cho ứng viên và nhân viên mới
  - Trả lời trạng thái hồ sơ, lịch, giấy tờ còn thiếu
  - Câu hỏi về offer chuyển cho Recruiter
- [AI] Tìm và tóm tắt tri thức nội bộ
  - Tìm trong wiki, tài liệu dự án; trả lời có trích dẫn
  - Chỉ hiện tài liệu người hỏi có quyền xem
- [Rules] Tạo và theo dõi yêu cầu
  - Kiểm tra hợp lệ, nhân viên xác nhận, chuyển Workflow Orchestrator

## Learning & Career Navigator (Định hướng học tập và nghề nghiệp)

Giúp nhân viên biết cần học gì và có thể đi đâu trong tập đoàn. Gộp feature gốc 4, 5.

- [AI] Phân tích skill gap
  - So hồ sơ kỹ năng với yêu cầu của vai trò mục tiêu
- [AI] Gợi ý khóa học, lộ trình, mentor
  - Đề xuất thứ tự học kèm lý do
  - Khóa có phí cần manager duyệt
- [AI] Gợi ý vị trí và dự án nội bộ
  - Xếp hạng cơ hội theo kỹ năng và nguyện vọng
  - Việc tìm kiếm không lộ cho manager hiện tại
- [Người] Bày tỏ quan tâm, theo dõi trạng thái
  - Nhân viên quyết định ứng tuyển; bên nhận quyết định tiếp nhận

## Talent Acquisition Copilot (Trợ lý tuyển dụng)

Giảm thời gian sàng lọc cho Recruiter. Feature gốc 7.

- [AI] Soạn JD
  - Nháp JD từ yêu cầu tuyển, tách tiêu chí bắt buộc và ưu tiên
- [AI] Phân tích và xếp hạng CV
  - Chấm theo từng tiêu chí, dẫn đoạn CV làm bằng chứng
  - Không dùng tuổi, giới tính, ảnh; không tự loại hồ sơ
- [AI] Tổng hợp feedback phỏng vấn
  - Gom nhận xét của người phỏng vấn theo tiêu chí
- [Người] Recruiter quyết định shortlist
  - Quyết định khác đề xuất được ghi lại để đánh giá AI

## Performance & Manager Copilot (Trợ lý đánh giá và quản lý đội nhóm)

Hỗ trợ manager đánh giá và vận hành đội nhóm. Gộp feature gốc 8, 14.

- [AI] Tổng hợp bằng chứng đánh giá
  - Gom mục tiêu, kết quả, feedback cả kỳ theo từng mục tiêu
- [AI] Soạn nháp nhận xét
  - Mỗi ý gắn với bằng chứng có nguồn
- [AI] Chuẩn bị 1:1, trích action items
  - Tóm tắt workload, OT, việc còn dở từ lần trước
  - Không suy đoán ý định nghỉ việc
- [Người] Manager tự xếp loại
  - AI không đề xuất điểm, xếp loại hay mức thưởng

## Payroll & Attendance Intelligence (Phân tích công và lương)

Làm sạch dữ liệu công trước ngày chốt lương. Feature gốc 9.

- [Rules] Phát hiện vi phạm công, OT
  - Thiếu chấm công, OT vượt giới hạn, OT chưa duyệt
- [AI] Phát hiện bất thường thống kê
  - Lệch nhiều so với lịch sử cá nhân hoặc nhóm
- [AI] Phân loại nguyên nhân, đề xuất xử lý
  - Quên chấm, lỗi thiết bị, sai ca; gom lỗi hàng loạt thành một sự cố
- [Người] Payroll duyệt điều chỉnh
  - Không dữ liệu công, lương nào bị sửa tự động

## Workforce Intelligence (Phân tích nguồn nhân lực)

Bức tranh cung–cầu nhân lực và sức khỏe tổ chức cho HRBP, BU Head. Gộp feature gốc 6, 10.

- [AI] Dự báo headcount và kỹ năng
  - Dự báo phần chưa chắc chắn, kèm khoảng tin cậy
- [AI] Phân tích gap cung–cầu
  - Gap theo vai trò, kỹ năng, tháng; đề xuất điều chuyển, reskill hoặc tuyển
- [AI] Xu hướng workload, turnover, engagement
  - So với lịch sử và đơn vị tương đương; nêu tương quan, không khẳng định nguyên nhân
- [Rules] Chỉ số cấp đơn vị, không theo cá nhân
  - Nhóm nhỏ hơn ngưỡng ẩn danh thì gộp lên cấp trên

## **Workflow Orchestrator** (Điều phối quy trình)

Điều phối yêu cầu qua nhiều bộ phận. Gộp feature gốc 11, 15.

- **[AI] Hiểu và phân loại yêu cầu**
  - Chọn quy trình mẫu, trích dữ liệu cần thiết, hỏi lại phần thiếu
  - Không chắc thì chuyển HR Ops phân loại
- [Rules] Định tuyến, phê duyệt, SLA
  - Workflow engine giữ trạng thái; AI không bỏ qua được bước duyệt
- [Rules] Nhắc hạn, escalation
  - Luôn có một người chịu trách nhiệm hiện tại
- [Rules] Offboarding: bàn giao, thu hồi quyền
  - Thu hồi quyền đúng ngày làm việc cuối; AI chỉ hỗ trợ lập danh sách bàn giao

## **Skills Graph & Talent Marketplace** (Bản đồ kỹ năng và sàn nhân tài nội bộ)

Nguồn dữ liệu kỹ năng chung cho học tập, cơ hội nội bộ và staffing. Feature gốc 12.

- **[AI] Trích xuất kỹ năng từ CV, dự án, khóa học**
  - Đề xuất kỹ năng và mức thành thạo kèm nguồn
- **[AI] Ánh xạ về danh mục kỹ năng chuẩn**
  - Gộp các tên gọi khác nhau của cùng một kỹ năng
  - Kỹ năng mới đưa vào hàng chờ duyệt
- [Người] Nhân viên và manager xác nhận
  - Kỹ năng chưa xác nhận không dùng cho quyết định
- [Rules] Bằng chứng: tự khai, đã học, đã làm, đã xác nhận
  - Bốn loại không gộp lẫn; quá hạn thì xác nhận lại

## **Staffing & Redeployment** (Bố trí và điều chuyển nhân sự)

Đáp ứng nhu cầu dự án bằng người nội bộ; bố trí lại người bị ảnh hưởng khi thu hẹp. Feature gốc 13.

- [Rules] Lọc theo lịch, tỷ lệ phân bổ, địa điểm
  - Loại phương án không khả thi trước khi xếp hạng
- **[AI] Xếp hạng phương án kèm bằng chứng**
  - Nêu điểm khớp, gap, điều kiện chưa thỏa
  - Không xếp hạng ai nên bị cắt giảm
- **[AI] Đề xuất reskill khi khớp một phần**
  - Lộ trình học và thời gian ước tính để đủ điều kiện
- [Người] Nhân viên đồng ý, BU Head duyệt
  - "Không khớp" không phải căn cứ cho layoff
