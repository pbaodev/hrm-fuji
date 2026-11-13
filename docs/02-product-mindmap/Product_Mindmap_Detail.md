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

## Learning & Career Navigator (Định hướng học tập, nghề nghiệp & Đánh giá năng lực)

Giúp nhân viên phát triển năng lực, thực thi lộ trình phát triển cá nhân (IDP/PIP) và khám phá cơ hội trong tập đoàn; đồng thời quản lý hệ thống kiểm tra đánh giá năng lực tự động qua LMS. Gộp feature gốc 4, 5.

- [AI] Quản lý & thực thi Kế hoạch phát triển cá nhân IDP (cán bộ nguồn) & PIP (90 ngày)
  - Tiếp nhận kết quả đánh giá và xếp loại trực tiếp từ Performance Calibration Engine (UC-08)
  - **Nhân sự loại A (Xuất sắc):** Thiết lập lộ trình IDP (Individual Development Plan) cán bộ nguồn / kế nhiệm (Succession Pipeline); mở cơ hội fast-track thăng tiến, giao dự án trọng điểm, ghép cặp mentor cấp lãnh đạo (BU Head / Technical Director)
  - **Nhân sự loại C (Cần cải thiện):** Thiết lập bản cam kết kế hoạch cải thiện hiệu suất PIP (Performance Improvement Plan) 90 ngày; trích xuất chính xác 3 điểm yếu lớn nhất và gán các khóa đào tạo bắt buộc kèm mốc rà soát (Check-in 30-60-90 ngày)
- [AI] Phân tích skill gap
  - So hồ sơ kỹ năng với yêu cầu của vai trò mục tiêu hoặc yêu cầu cán bộ nguồn
- [AI] Gợi ý khóa học, lộ trình, mentor
  - Đề xuất thứ tự học kèm lý do; khóa có phí cần manager duyệt
- [AI] AI Adaptive Assessment Generator (Động cơ sinh đề thi & kiểm tra năng lực qua LMS)
  - **Đề test mốc hoàn thành lộ trình (Milestone Checkpoint Assessment):** Tự động sinh đề kiểm tra thực hành / trắc nghiệm tình huống sau mỗi module của IDP hoặc PIP; đẩy qua LMS để nhân viên làm bài; xác nhận đạt chuẩn trước khi nghiệm thu đóng skill gap
  - **Đề test định kỳ chuẩn hóa năng lực công ty (Periodic Competency Benchmark):** Định kỳ 6 tháng/1 năm, AI tự động sinh bộ đề benchmark chuyên môn theo từng domain/role (Backend, Cloud, Data, Design...); đẩy trực tiếp qua LMS. Kết quả làm bài tự động cập nhật độ tin cậy của kỹ năng trong Bản đồ kỹ năng (UC-12)
- [AI] Gợi ý vị trí và dự án nội bộ
  - Xếp hạng cơ hội theo kỹ năng và nguyện vọng; tìm kiếm riêng tư không lộ cho manager hiện tại
- [Người] Quản lý & Mentor nghiệm thu mốc hoàn thành
  - Nhân viên chủ động học; Quản lý/Mentor kiểm tra kết quả bài test checkpoint từ LMS và nghiệm thu mốc IDP/PIP

## Talent Acquisition Copilot (Trợ lý tuyển dụng)

Giảm thời gian sàng lọc và chuẩn hóa đánh giá đầu vào cho Recruiter. Feature gốc 7.

- [AI] Soạn JD
  - Nháp JD từ yêu cầu tuyển, tách tiêu chí bắt buộc và ưu tiên
- [AI] Phân tích và xếp hạng CV
  - Chấm theo từng tiêu chí, dẫn đoạn CV làm bằng chứng
  - Không dùng tuổi, giới tính, ảnh; không tự loại hồ sơ
- [AI] Sinh đề thi test ứng viên thích ứng theo từng role (Candidate Adaptive Assessment)
  - Đọc JD và bài toán kỹ thuật thực tế của dự án để tự động tạo đề test chuyên môn (coding, system design, case study) phù hợp với cấp bậc ứng tuyển
  - Tự động chấm điểm bài test sơ loại, phân tích tư duy giải quyết vấn đề và cung cấp báo cáo năng lực khách quan trước vòng phỏng vấn
- [AI] Tổng hợp feedback phỏng vấn
  - Gom nhận xét của người phỏng vấn theo tiêu chí
- [Người] Recruiter quyết định shortlist
  - Quyết định khác đề xuất được ghi lại để đánh giá AI

## Performance Calibration & Merit Planning Engine (Hệ thống điều phối đánh giá, cân bằng phân phối chuẩn & phân bổ quỹ thưởng)

Hỗ trợ manager đánh giá dựa trên bằng chứng, điều phối họp 1:1, đồng thời hỗ trợ Hội đồng HR (HR Committee) giải quyết bài toán cân bằng phân phối chuẩn toàn tập đoàn và tối ưu hóa ngân sách quỹ thưởng. Gộp feature gốc 8, 14.

- [AI] Evidence Synthesizer (Tổng hợp bằng chứng cả năm)
  - Gom toàn bộ dữ liệu 1 năm: KPI/OKR, task Jira/GitHub, đánh giá 360, khen thưởng/kỷ luật
  - Khắc phục triệt để Recency Bias (thiên kiến chỉ nhớ 2 tuần gần nhất, bỏ quên 11 tháng trước)
  - Mỗi nhận định gắn trực tiếp với dẫn chứng có nguồn và mốc thời gian cụ thể
- [AI] Soạn nháp nhận xét & chuẩn bị 1:1
  - Soạn nháp đánh giá theo từng mục tiêu dựa trên hồ sơ bằng chứng
  - Chuẩn bị agenda 1:1, tóm tắt workload, OT, trích xuất action items cần theo dõi
- [AI] Bias & Outlier Detector (Phát hiện lệch chuẩn & lạm phát điểm số)
  - Đo lường độ lệch chuẩn đánh giá giữa các phòng ban: phát hiện quản lý dễ dãi (chấm 90% loại A) vs quản lý quá khắt khe (chỉ chấm 20% loại A)
  - Phân tích tương quan giữa điểm đánh giá của quản lý và output thực tế trên hệ thống
  - Gắn cờ cảnh báo các trường hợp ngoại lệ (Edge Cases): ví dụ nhân viên được chấm A nhưng đóng góp thực tế thấp hơn 30% mặt bằng chung loại A của khối
- [AI] Calibration Optimizer (Thuật toán tối ưu hóa phân phối chuẩn)
  - Giải bài toán tối ưu ép kết quả về đường cong chuẩn (Bell Curve: ví dụ 10% A, 70% B, 20% C)
  - Đề xuất phương án dịch chuyển xếp loại công bằng dựa trên trọng số đóng góp thực tế xuyên phòng ban
- [AI] Merit Simulator (Mô phỏng tăng lương & phân bổ quỹ thưởng)
  - Đề xuất ma trận lương thưởng (Merit Matrix) theo xếp loại sau calibration và compa-ratio
  - Kiểm soát nghiêm ngặt theo trần ngân sách tài chính (Hard budget ceiling), không để vỡ quỹ thưởng hàng chục/hàng trăm tỉ đồng
- [Người] HITL Calibration & Merit Dashboard (Hội đồng HR phê duyệt trực quan)
  - AI không tự quyết định xếp loại hay tiền thưởng; AI đóng vai trò người phản biện độc lập
  - Dashboard trực quan cho phép Hội đồng HR (HRBP, BU Head, CHRO) kéo-thả điều chỉnh xếp loại và xem tác động ngân sách realtime
  - Hội đồng HR chỉ cần tập trung can thiệp các trường hợp ngoại lệ (Edge Cases) do AI gắn cờ cảnh báo, không phải rà soát thủ công hàng nghìn hồ sơ
- [AI] Auto-generator (Tự động sinh thư kết quả & kế hoạch phát triển IDP/PIP)
  - Tự động sinh thư thông báo kết quả đánh giá và quyết định lương thưởng minh bạch cho từng nhân viên
  - Tích hợp trực tiếp vào lộ trình phát triển nhân sự (kết nối với Learning & Career Navigator / UC-04):
    - Nhân sự loại A: Gợi ý lộ trình đào tạo cán bộ nguồn, quy hoạch kế nhiệm và dự án trọng điểm
    - Nhân sự loại C: Trích xuất đúng 3 điểm yếu lớn nhất trong năm và lập bản cam kết kế hoạch cải thiện hiệu suất (PIP) trong 90 ngày kèm mốc rà soát

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

## Restructuring & Transition (Thu hẹp đơn vị và cắt giảm nhân sự)

Xử lý nhân sự bị ảnh hưởng khi một đơn vị hoặc dự án thu hẹp: bố trí lại trước, cắt giảm là phương án cuối. Feature mới 16, nối feature 13 và 15.

- [Rules] Danh sách bị ảnh hưởng theo tiêu chí đã duyệt
  - Lập theo vị trí và dự án bị thu hẹp, không theo cá nhân
  - AI không chọn và không xếp hạng ai bị cắt giảm
- [AI] Tìm phương án nội bộ, học bù cho từng người
  - Dùng lại cơ chế xếp hạng của Staffing & Redeployment
  - Khớp một phần thì kèm lộ trình học và thời gian ước tính
- [AI] Soạn hồ sơ rà soát khi hết phương án
  - Ghi phương án đã thử, lý do không khả thi, quyền lợi theo chính sách
  - Gắn cờ trường hợp cần pháp chế xem kỹ: thai sản, nghỉ ốm dài ngày, đang khiếu nại
- [Người] Pháp chế rà soát, lãnh đạo quyết định
  - HRBP và pháp chế rà soát từng hồ sơ; BU Head đề xuất; CHRO phê duyệt
  - Không dùng tuổi, giới tính, lương, tình trạng sức khỏe làm tiêu chí
