# Bảng use case tổng hợp

Tài liệu này liệt kê 16 use case của AI Workforce Ecosystem. UC-01 đến UC-15 ứng với 15 feature gốc; UC-16 (thu hẹp đơn vị, layoff) được bổ sung sau để lấp khoảng trống giữa UC-13 và UC-15. Mỗi feature trong [AI_Workforce_Ecosystem.md](../01-overview/AI_Workforce_Ecosystem.md) có một use case đại diện. Sơ đồ nằm ở [UC_02_Diagrams.md](UC_02_Diagrams.md), đặc tả chi tiết nằm ở [UC_03_Specifications.md](UC_03_Specifications.md).

Quy ước dùng trong cả ba tài liệu:

- **Use case** là một mục tiêu của actor, đạt được trong một phiên làm việc với hệ thống và cho ra kết quả có giá trị. Một feature có thể chứa nhiều use case; ở đây mỗi feature chỉ đặc tả một use case tiêu biểu nhất.
- **Actor chính** là người khởi động use case để đạt mục tiêu của mình. **Actor phụ** là người được hệ thống kéo vào để duyệt, xác nhận hoặc xử lý.
- **Line Manager** cũng là một Employee, nên có thể thực hiện mọi use case của Employee.

## 1. Danh mục

| ID | Use case | Feature nguồn | Actor chính | Actor phụ | Kết quả mong đợi |
|---|---|---|---|---|---|
| UC-01 | Tra cứu trạng thái ứng tuyển và thủ tục nhận việc | 1. Candidate & New Hire Concierge | Candidate, New Hire | Recruiter, HR Ops | Biết hồ sơ đang ở bước nào và còn phải làm gì, không cần hỏi Recruiter |
| UC-02 | Tạo và theo dõi yêu cầu nghỉ phép qua hội thoại | 2. Employee Self-service Agent | Employee | Line Manager, HR Ops | Yêu cầu hợp lệ được tạo, duyệt và nhân viên luôn biết trạng thái |
| UC-03 | Tìm và tóm tắt tri thức nội bộ | 3. Work Copilot | Employee | Không có | Câu trả lời có trích dẫn tới tài liệu nhân viên được phép xem |
| UC-04 | Lập & thực thi lộ trình phát triển (IDP/PIP) kèm bài test thích ứng | 4. Learning & Skill Growth Coach | Employee | Line Manager, Mentor, L&D | Lộ trình IDP cán bộ nguồn hoặc PIP 90 ngày được theo dõi; bài test checkpoint qua LMS xác thực năng lực |
| UC-05 | Khám phá và bày tỏ quan tâm tới cơ hội nội bộ | 5. Career & Opportunity Navigator | Employee | Hiring Manager, Project Manager, HRBP | Danh sách cơ hội kèm lý do phù hợp; bên có nhu cầu nhận được quan tâm |
| UC-06 | Phân tích chênh lệch cung–cầu nhân lực của đơn vị | 6. Workforce Planning & Forecasting | HRBP | BU Head, Finance | Bản phân tích gap theo vai trò, kỹ năng, thời gian kèm phương án đóng gap |
| UC-07 | Sàng lọc hồ sơ & sinh đề test ứng viên theo role | 7. Talent Acquisition Copilot | Recruiter | Hiring Manager | Shortlist kèm kết quả chấm bài test sơ loại thích ứng theo role do AI sinh |
| UC-08 | Đánh giá hiệu suất, điều phối phân phối chuẩn & phân bổ quỹ thưởng (Calibration & Merit Planning) | 8. AI Performance Calibration & Merit Planning Engine | Line Manager, Hội đồng HR (HRBP, BU Head) | Employee, Finance, CHRO | Kết quả chuẩn hóa theo Bell Curve, quỹ thưởng tối ưu theo trần ngân sách, thư thông báo và kế hoạch IDP/PIP được tự động sinh |
| UC-09 | Phát hiện và xử lý bất thường công/OT trước kỳ chốt lương | 9. Payroll & Attendance Intelligence | Payroll Specialist (HR Ops) | Employee, Line Manager | Dữ liệu công sạch trước ngày chốt, mọi điều chỉnh có người duyệt |
| UC-10 | Phân tích sức khỏe tổ chức ở cấp đơn vị | 10. Organizational Health & Retention Intelligence | HRBP | BU Head, CHRO | Báo cáo xu hướng và rủi ro cấp nhóm kèm hành động được theo dõi |
| UC-11 | Điều phối một yêu cầu xuyên phòng ban | 11. HR Workflow Orchestrator | Employee, Line Manager (người yêu cầu) | HR Ops, IT, Finance, người duyệt | Yêu cầu hoàn tất đúng hạn; mỗi bước có người chịu trách nhiệm |
| UC-12 | Xây dựng và xác thực hồ sơ kỹ năng | 12. Skills Graph & Internal Talent Marketplace | Employee | Line Manager, HRBP | Hồ sơ kỹ năng có mức thành thạo, loại bằng chứng, nguồn và ngày cập nhật |
| UC-13 | Đề xuất phương án bố trí nhân sự cho một nhu cầu dự án | 13. Project Staffing & Redeployment Agent | HRBP | Project Manager, Line Manager, BU Head, Employee | Phương án được duyệt và thực hiện, hoặc kết luận chưa có phương án nội bộ |
| UC-14 | Chuẩn bị buổi 1:1 với thành viên nhóm | 14. Manager Team Operations Copilot | Line Manager | Employee | Bản chuẩn bị 1:1 và action items được theo dõi |
| UC-15 | Điều phối offboarding và bàn giao tri thức | 15. Offboarding & Knowledge Continuity Agent | HR Ops | Employee nghỉ việc, Line Manager, IT, Finance | Tri thức được bàn giao, tài sản và quyền truy cập được thu hồi đúng hạn |
| UC-16 | Xử lý nhân sự bị ảnh hưởng khi thu hẹp đơn vị | 16. Restructuring & Transition Agent (bổ sung) | HRBP | BU Head, CHRO, pháp chế, Line Manager, Employee, HR Ops | Mỗi người bị ảnh hưởng có phương án nội bộ, hoặc có quyết định cắt giảm đã qua rà soát và phê duyệt |

## 2. Phân vai giữa AI, rules và con người

Bảng này áp dụng nguyên tắc ở mục 9 của tài liệu gốc: AI dùng cho hiểu ngôn ngữ, tìm kiếm, tổng hợp và đề xuất; rules và workflow engine giữ quy tắc, trạng thái, phê duyệt; quyết định nhân sự do người có thẩm quyền đưa ra.

| ID | Hệ thống tích hợp | AI đảm nhận | Rules/workflow đảm nhận | Người quyết định |
|---|---|---|---|---|
| UC-01 | ATS, HRIS, IAM, ITSM | Hiểu câu hỏi, soạn câu trả lời | Xác thực, phạm vi dữ liệu, trạng thái hồ sơ | Recruiter (mọi nội dung về offer và kết quả) |
| UC-02 | HRIS, Attendance, kho chính sách | Trích xuất yêu cầu, diễn giải chính sách | Kiểm tra hợp lệ, luồng duyệt, số dư phép | Line Manager |
| UC-03 | Wiki, kho tài liệu, IAM | Tìm kiếm ngữ nghĩa, tóm tắt, soạn nháp | Lọc theo quyền truy cập | Nhân viên tự chịu trách nhiệm nội dung dùng |
| UC-04 | Hồ sơ kỹ năng, LMS, Test Engine | Phân tích gap, sinh bài test checkpoint mốc lộ trình, sinh đề test định kỳ qua LMS, gợi ý khóa học & mentor | Quy chuẩn IDP/PIP, ngân sách, duyệt, ghi danh LMS | Nhân viên chọn; Line Manager / Mentor nghiệm thu mốc qua kết quả test |
| UC-05 | Hồ sơ kỹ năng, ATS, PM, HRIS | Xếp hạng cơ hội, giải thích | Điều kiện luân chuyển, quyền riêng tư | Nhân viên; Hiring Manager |
| UC-06 | HRIS, PM, hồ sơ kỹ năng, Finance | Dự báo, tóm tắt gap, đề xuất phương án | Phạm vi dữ liệu, ngân sách headcount | BU Head; Finance |
| UC-07 | ATS, LMS/Test Platform | Trích xuất CV, so khớp tiêu chí, sinh đề test theo role, chấm điểm test sơ loại tự động | Tiêu chí bắt buộc, trạng thái, ngưỡng điểm qua bài test | Recruiter (shortlist); Hiring Manager (phỏng vấn) |
| UC-08 | HRIS, Jira/GitHub/PM, OKR/KPI, Kho 360/Feedback, Finance | Evidence Synthesizer, Bias/Outlier Detector, Calibration Optimizer (Bell Curve), Merit Simulator, Auto-generator IDP/PIP | Trần ngân sách tài chính, khung tỷ lệ Bell Curve, ma trận phân quyền, lưu vết | Line Manager (xếp loại sơ bộ); Hội đồng HR / BU Head (duyệt ngoại lệ HITL, chốt Bell Curve & quỹ thưởng); Finance |
| UC-09 | Attendance, Payroll, HRIS | Phân loại nguyên nhân, xếp ưu tiên | Phát hiện vi phạm, tính toán, duyệt | Payroll Specialist |
| UC-10 | HRIS, Attendance, khảo sát, PM | Phát hiện biến động, diễn giải | Ngưỡng ẩn danh, phạm vi dữ liệu | HRBP; BU Head |
| UC-11 | Workflow engine, HRIS, ITSM, Finance | Phân loại yêu cầu, trích xuất dữ liệu | Toàn bộ trạng thái, phân công, SLA | Người duyệt theo ma trận phân quyền |
| UC-12 | HRIS, PM, LMS, danh mục kỹ năng | Trích xuất và ánh xạ kỹ năng; cập nhật độ tin cậy từ kết quả test LMS | Vòng đời xác nhận, quyền xem | Nhân viên; Line Manager |
| UC-13 | Hồ sơ kỹ năng, PM, HRIS | Xếp hạng phương án, giải thích | Ràng buộc cứng, phê duyệt, cập nhật | Project Manager, nhân viên, BU Head |
| UC-14 | PM, Attendance, HRIS, lịch | Tóm tắt, gợi ý chủ đề, trích action items | Quyền xem, nhắc hạn | Line Manager |
| UC-15 | HRIS, IAM, ITSM, Payroll | Lập danh sách bàn giao, soạn khung tài liệu | Checklist, thu hồi quyền, quyết toán | HR Ops; Line Manager |
| UC-16 | HRIS, PM, hồ sơ kỹ năng, workflow engine | Tìm phương án nội bộ, đề xuất học bù, soạn hồ sơ rà soát | Danh sách bị ảnh hưởng theo tiêu chí đã duyệt, thứ tự bước, lưu vết | BU Head đề xuất; CHRO phê duyệt; pháp chế rà soát |

## 3. Phụ thuộc, ưu tiên và phần chưa đặc tả

Cột "Ưu tiên" là đề xuất, chưa được chốt. Cột cuối liệt kê các hành động khác của cùng feature trong tài liệu gốc mà use case đại diện chưa bao phủ.

| ID | Phụ thuộc | Ưu tiên đề xuất | Use case khác của feature (chưa đặc tả) |
|---|---|---|---|
| UC-01 | UC-11 khi cần xử lý thủ tục | Sau pilot | Hỏi đáp về offer; xem và đổi lịch; hướng dẫn onboarding tuần đầu |
| UC-02 | UC-11 | Sớm, vì là kênh vào của UC-11; cân nhắc mua | Tra cứu chính sách, OT, công, lương, phúc lợi; tạo các loại yêu cầu khác |
| UC-03 | Không có | Cân nhắc mua; nằm ngoài phạm vi HR | Hỗ trợ soạn báo cáo; hỗ trợ công việc lặp lại |
| UC-04 | UC-12, UC-08 (tiếp nhận IDP/PIP) | Sau pilot | Sinh bài test checkpoint mốc qua LMS; sinh đề test benchmark định kỳ toàn công ty; tìm mentor |
| UC-05 | UC-12 | Sau pilot | Khám phá dự án ngắn hạn |
| UC-06 | UC-12, dữ liệu phân bổ dự án | Sau khi có nền dữ liệu | Dự báo headcount theo kịch bản; dự báo nhu cầu kỹ năng dài hạn |
| UC-07 | Không có | Cân nhắc mua | Soạn JD; sinh đề test ứng viên theo role; chấm điểm sơ loại tự động; tổng hợp feedback phỏng vấn |
| UC-08 | UC-14 (ghi chú 1:1), Dữ liệu hiệu suất 1 năm (KPI, Jira, 360) | Trọng tâm kỳ Year-end Review; đầu ra tích hợp trực tiếp lộ trình UC-04 (IDP/PIP) | Tự động sinh lộ trình IDP cho loại A (cán bộ nguồn/kế nhiệm) & PIP 90 ngày cho loại C; chi trả thưởng sang Payroll |
| UC-09 | UC-11 khi cần xác nhận | Sau pilot; phần lớn là rules | Phát hiện bất thường lương; đối soát trước chi lương |
| UC-10 | Dữ liệu tổng hợp nhiều nguồn | Sau khi có nền dữ liệu | Cảnh báo sớm theo ngưỡng; báo cáo toàn tập đoàn cho CHRO |
| UC-11 | Không có | Pilot | Tạo quy trình mới từ mô tả; theo dõi trạng thái yêu cầu |
| UC-12 | Danh mục kỹ năng chuẩn | Pilot | Tìm người theo kỹ năng; matching với mentor |
| UC-13 | UC-12, UC-11, dữ liệu phân bổ dự án | Pilot | Phát hiện skill gap cấp dự án (phần thu hẹp đã tách thành UC-16) |
| UC-14 | Không có | Sau pilot | Tổng hợp workload cả đội; theo dõi onboarding thành viên mới |
| UC-15 | UC-11 | Sau pilot | Exit interview; quản lý mạng lưới alumni |
| UC-16 | UC-13, UC-04, UC-15, UC-11 | Sau khi UC-13 chạy ổn; cần pháp chế duyệt quy trình trước | Tính gói hỗ trợ thôi việc; hỗ trợ tìm việc bên ngoài; truyền thông nội bộ |
