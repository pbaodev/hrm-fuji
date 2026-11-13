# Đặc tả use case

Tài liệu này đặc tả 16 use case trong [UC_01_Catalog.md](UC_01_Catalog.md): mỗi feature của [AI_Workforce_Ecosystem.md](../01-overview/AI_Workforce_Ecosystem.md) một use case, cộng UC-16 (thu hẹp đơn vị, layoff) được bổ sung sau. Sơ đồ nằm ở [UC_02_Diagrams.md](UC_02_Diagrams.md).

Cách đọc:

- Tài liệu gốc chỉ mô tả mỗi feature bằng một dòng. Các luồng, quy tắc nghiệp vụ và ngưỡng trong tài liệu này là **đề xuất để kiểm chứng** với HR, pháp chế và đơn vị vận hành, chưa phải yêu cầu đã chốt. Các giá trị cấu hình được viết là N.
- Mã bước như **3a** nghĩa là nhánh rẽ từ bước 3 của luồng chính.
- **Bảo đảm tối thiểu** là điều hệ thống phải giữ đúng ngay cả khi use case thất bại.

Mục lục:

- Nhóm A, Employee AI: [UC-01](#uc-01-tra-cứu-trạng-thái-ứng-tuyển-và-thủ-tục-nhận-việc), [UC-02](#uc-02-tạo-và-theo-dõi-yêu-cầu-nghỉ-phép-qua-hội-thoại), [UC-03](#uc-03-tìm-và-tóm-tắt-tri-thức-nội-bộ), [UC-04](#uc-04-lập-lộ-trình-học-theo-skill-gap), [UC-05](#uc-05-khám-phá-và-bày-tỏ-quan-tâm-tới-cơ-hội-nội-bộ)
- Nhóm B, HR Management AI: [UC-06](#uc-06-phân-tích-chênh-lệch-cungcầu-nhân-lực-của-đơn-vị), [UC-07](#uc-07-sàng-lọc-và-xếp-hạng-hồ-sơ-ứng-viên-cho-một-vị-trí), [UC-08](#uc-08-tổng-hợp-hồ-sơ-bằng-chứng-cho-kỳ-đánh-giá), [UC-09](#uc-09-phát-hiện-và-xử-lý-bất-thường-côngot-trước-kỳ-chốt-lương), [UC-10](#uc-10-phân-tích-sức-khỏe-tổ-chức-ở-cấp-đơn-vị)
- Nhóm C, HR Ecosystem AI: [UC-11](#uc-11-điều-phối-một-yêu-cầu-xuyên-phòng-ban), [UC-12](#uc-12-xây-dựng-và-xác-thực-hồ-sơ-kỹ-năng), [UC-13](#uc-13-đề-xuất-phương-án-bố-trí-nhân-sự-cho-một-nhu-cầu-dự-án), [UC-14](#uc-14-chuẩn-bị-buổi-11-với-thành-viên-nhóm), [UC-15](#uc-15-điều-phối-offboarding-và-bàn-giao-tri-thức), [UC-16](#uc-16-xử-lý-nhân-sự-bị-ảnh-hưởng-khi-thu-hẹp-đơn-vị)

------------------------------------------------------------------------

# Nhóm A: Employee AI

## UC-01. Tra cứu trạng thái ứng tuyển và thủ tục nhận việc

| Mục | Nội dung |
|---|---|
| Feature nguồn | 1. AI Candidate & New Hire Concierge |
| Mục tiêu | Ứng viên hoặc nhân viên mới biết hồ sơ của mình đang ở bước nào và còn phải làm gì, không cần hỏi Recruiter |
| Actor chính | Candidate, New Hire |
| Actor phụ | Recruiter, HR Ops |
| Hệ thống liên quan | ATS, HRIS, IAM, ITSM (tài khoản, thiết bị), kho tài liệu onboarding |
| Trigger | Actor gửi câu hỏi qua kênh chat của cổng ứng viên hoặc cổng onboarding |
| Tiền điều kiện | Có hồ sơ ứng tuyển trong ATS; danh tính actor đã được xác thực |
| Hậu điều kiện | Actor nhận câu trả lời khớp với dữ liệu hệ thống, kèm bước tiếp theo; hội thoại được ghi log |
| Bảo đảm tối thiểu | Không lộ thông tin của người khác; câu hỏi chưa giải quyết được chuyển cho người phụ trách kèm ngữ cảnh |

**Luồng chính**

1. Actor đặt câu hỏi bằng ngôn ngữ tự nhiên.
2. Hệ thống xác định danh tính và giai đoạn của actor: đang ứng tuyển, đã nhận offer, hoặc đang chờ ngày nhận việc.
3. AI phân loại ý định: trạng thái hồ sơ, offer, giấy tờ, lịch, hoặc hướng dẫn onboarding.
4. Hệ thống lấy trạng thái từ ATS và HRIS, cùng tài liệu hướng dẫn áp dụng cho pháp nhân và địa điểm của actor.
5. AI soạn câu trả lời từ dữ liệu đã lấy, kèm nguồn và danh sách việc còn thiếu (giấy tờ chưa nộp, lịch sắp tới).
6. Actor xác nhận đã rõ hoặc hỏi tiếp.

**Luồng thay thế và ngoại lệ**

- **2a.** Không xác thực được danh tính: hệ thống chỉ trả lời thông tin công khai và hướng dẫn cách xác thực.
- **3a.** Ý định là một thủ tục cần xử lý (đổi lịch phỏng vấn, bổ sung hồ sơ): chuyển sang UC-11 để tạo yêu cầu.
- **4a.** Không có dữ liệu hoặc dữ liệu giữa các hệ thống mâu thuẫn: AI nói rõ là chưa có thông tin và chuyển cho Recruiter hoặc HR Ops kèm nội dung hội thoại.
- **5a.** Câu hỏi về đàm phán offer hoặc lý do bị loại: hệ thống không trả lời tự động, chuyển cho Recruiter.

**Quy tắc nghiệp vụ**

- Chỉ truy xuất dữ liệu của chính actor.
- Không tiết lộ nhận xét phỏng vấn, điểm đánh giá hoặc thông tin về ứng viên khác.
- Nội dung offer chỉ hiển thị từ bản đã phát hành chính thức.

**Phân vai AI và rules**

- AI: hiểu câu hỏi, soạn câu trả lời.
- Rules/workflow: xác thực, phạm vi dữ liệu, trạng thái hồ sơ, điều kiện chuyển cho người.

**Điểm con người quyết định:** Recruiter xử lý mọi câu hỏi về điều khoản offer và kết quả tuyển dụng.

**Chỉ số đo:** tỷ lệ câu hỏi được giải quyết không cần chuyển người; thời gian phản hồi; tỷ lệ hồ sơ preboarding đầy đủ trước ngày nhận việc.

------------------------------------------------------------------------

## UC-02. Tạo và theo dõi yêu cầu nghỉ phép qua hội thoại

| Mục | Nội dung |
|---|---|
| Feature nguồn | 2. AI Employee Self-service Agent |
| Mục tiêu | Nhân viên tạo được yêu cầu nghỉ phép hợp lệ bằng một câu nói và luôn biết yêu cầu đang ở đâu |
| Actor chính | Employee |
| Actor phụ | Line Manager (duyệt), HR Ops (xử lý ngoại lệ) |
| Hệ thống liên quan | HRIS, Attendance, kho chính sách, workflow engine |
| Trigger | Nhân viên nhắn, ví dụ: "tôi muốn nghỉ phép thứ Năm và thứ Sáu tuần sau" |
| Tiền điều kiện | Nhân viên đã đăng nhập SSO và có hồ sơ đang hiệu lực |
| Hậu điều kiện | Yêu cầu được tạo đúng loại phép, ngày và người duyệt; nhân viên biết kết quả; số dư chỉ thay đổi sau khi được duyệt |
| Bảo đảm tối thiểu | Không tạo yêu cầu khi nhân viên chưa xác nhận; không hiển thị số dư ước lượng |

**Luồng chính**

1. Nhân viên mô tả nhu cầu nghỉ.
2. AI trích xuất loại phép, ngày và thời lượng; hỏi lại phần còn thiếu.
3. Hệ thống lấy số dư phép và lịch nghỉ lễ từ HRIS và Attendance, cùng chính sách áp dụng cho pháp nhân và cấp bậc của nhân viên.
4. Rules kiểm tra hợp lệ: đủ số dư, đúng thời hạn báo trước, không trùng yêu cầu đã có.
5. Hệ thống hiển thị bản tóm tắt yêu cầu để nhân viên xác nhận.
6. Nhân viên xác nhận; hệ thống tạo yêu cầu và chuyển cho bộ điều phối (UC-11).
7. Line Manager duyệt hoặc từ chối.
8. Hệ thống báo kết quả cho nhân viên; nhân viên có thể hỏi trạng thái bất kỳ lúc nào.

**Luồng thay thế và ngoại lệ**

- **1a.** Nhân viên chỉ tra cứu (số phép còn lại, quy định): hệ thống trả lời kèm nguồn và kết thúc.
- **3a.** HRIS không phản hồi: hệ thống báo lỗi và đề nghị thử lại, không ước lượng số dư.
- **4a.** Không đủ số dư hoặc vi phạm quy định: hệ thống giải thích quy tắc và nêu các phương án hợp lệ, không tự chọn thay nhân viên.
- **7a.** Quá hạn duyệt: nhắc và escalation theo UC-11.

**Quy tắc nghiệp vụ**

- Số dư phép và dữ liệu công luôn lấy từ hệ thống gốc; AI không tự tính.
- Câu trả lời về chính sách phải kèm tên văn bản và ngày hiệu lực.
- Mọi thao tác ghi dữ liệu cần nhân viên xác nhận trước.

**Phân vai AI và rules**

- AI: hiểu yêu cầu, hỏi lại, diễn giải chính sách.
- Rules/workflow: kiểm tra hợp lệ, luồng duyệt, cập nhật số dư.

**Điểm con người quyết định:** Line Manager duyệt; HR Ops quyết định các ngoại lệ chính sách.

**Chỉ số đo:** tỷ lệ tự phục vụ; thời gian từ lúc tạo đến lúc duyệt; tỷ lệ yêu cầu bị trả lại do sai thông tin.

------------------------------------------------------------------------

## UC-03. Tìm và tóm tắt tri thức nội bộ

| Mục | Nội dung |
|---|---|
| Feature nguồn | 3. AI Work Copilot |
| Mục tiêu | Nhân viên tìm được câu trả lời cho câu hỏi công việc từ tài liệu nội bộ mà không phải mở từng nguồn |
| Actor chính | Employee |
| Actor phụ | Không có |
| Hệ thống liên quan | Wiki, kho tài liệu, tài liệu dự án, IAM |
| Trigger | Nhân viên đặt câu hỏi công việc hoặc yêu cầu tóm tắt một chủ đề |
| Tiền điều kiện | Nhân viên đã đăng nhập SSO; nguồn tài liệu đã được lập chỉ mục cùng thông tin quyền truy cập |
| Hậu điều kiện | Nhân viên nhận câu trả lời hoặc bản tóm tắt có trích dẫn tới tài liệu mình được phép mở |
| Bảo đảm tối thiểu | Không hiển thị nội dung nằm ngoài quyền của người hỏi |

**Luồng chính**

1. Nhân viên đặt câu hỏi.
2. Hệ thống tìm các tài liệu liên quan và lọc theo quyền truy cập của người hỏi.
3. AI tổng hợp câu trả lời từ các đoạn tìm được, gắn trích dẫn cho từng ý.
4. Nhân viên mở nguồn, hỏi tiếp, hoặc yêu cầu chuyển thành bản nháp (báo cáo, email).
5. Nhân viên đánh giá câu trả lời có hữu ích hay không.

**Luồng thay thế và ngoại lệ**

- **2a.** Không tìm thấy tài liệu phù hợp: AI nói rõ là không có và gợi ý nhóm sở hữu chủ đề; không trả lời bằng kiến thức chung như thể đó là quy định nội bộ.
- **2b.** Các tài liệu mâu thuẫn hoặc đã cũ: AI nêu cả hai nguồn kèm ngày cập nhật.
- **3a.** Tài liệu chứa câu lệnh nhằm điều khiển AI: hệ thống coi đó là nội dung, không thực thi.
- **4a.** Yêu cầu chạm tới dữ liệu nhân sự của người khác: hệ thống từ chối.

**Quy tắc nghiệp vụ**

- Quyền truy cập được kiểm tra ở bước truy xuất, không dựa vào chỉ dẫn cho AI.
- Nội dung hội thoại không được dùng làm đầu vào cho đánh giá hiệu suất.

**Phân vai AI và rules**

- AI: tìm kiếm theo ngữ nghĩa, tóm tắt, soạn nháp.
- Rules/workflow: lọc theo quyền, ghi log.

**Điểm con người quyết định:** nhân viên chịu trách nhiệm về nội dung mình sử dụng.

**Chỉ số đo:** thời gian tìm thông tin; tỷ lệ câu trả lời có trích dẫn đúng; tỷ lệ được đánh giá hữu ích.

------------------------------------------------------------------------

## UC-04. Lập & thực thi lộ trình phát triển cá nhân (IDP / PIP) kèm bài kiểm tra thích ứng qua LMS

| Mục | Nội dung |
|---|---|
| Feature nguồn | 4. AI Learning & Skill Growth Coach (kết hợp Career Navigator) |
| Mục tiêu | Vận hành và hiện thực hóa kế hoạch phát triển cá nhân IDP (cán bộ nguồn/kế nhiệm) cho nhân sự xuất sắc, kế hoạch cải thiện hiệu suất PIP 90 ngày cho nhân sự cần hỗ trợ, hoặc lộ trình đóng skill gap theo nguyện vọng; tích hợp động cơ sinh đề thi test checkpoint qua LMS để xác thực năng lực thực chất |
| Actor chính | Employee |
| Actor phụ | Line Manager, Mentor, L&D Specialist, HRBP |
| Hệ thống liên quan | Hồ sơ kỹ năng (UC-12), LMS, Hệ thống thi & kiểm tra trực tuyến, HRIS, Kết quả đánh giá hiệu suất (UC-08) |
| Trigger | Tự động kích hoạt từ phiên Year-end Calibration (UC-08); hoặc nhân viên/quản lý chủ động khởi tạo lộ trình phát triển |
| Tiền điều kiện | Nhân viên có hồ sơ kỹ năng trên hệ thống; hoặc có kết quả xếp loại hiệu suất và danh mục kỹ năng chuẩn của vị trí mục tiêu |
| Hậu điều kiện | Lộ trình được lưu, gắn với các khóa học LMS, có mốc thời gian rõ ràng (30-60-90 ngày); các bài test checkpoint được sinh tự động; kết quả kiểm tra được cập nhật thành bằng chứng xác thực trong UC-12 |
| Bảo đảm tối thiểu | Không ghi danh khóa học có phí khi chưa có phê duyệt; các bài kiểm tra được chuẩn hóa và lưu vết bài làm minh bạch |

**Luồng chính**

1. **Tiếp nhận mục tiêu hoặc chỉ định từ kỳ đánh giá (UC-08):**
   - **Nhân sự loại A (Xuất sắc):** Hệ thống nạp kế hoạch **IDP (Individual Development Plan)** cán bộ nguồn / kế nhiệm, định hướng các mốc thăng tiến (Fast-track), ghép cặp mentor cấp lãnh đạo (BU Head / Technical Director) và giao dự án trọng điểm.
   - **Nhân sự loại C (Cần cải thiện):** Hệ thống nạp kế hoạch **PIP (Performance Improvement Plan) 90 ngày**, trích xuất đúng 3 điểm yếu lớn nhất và gán các khóa đào tạo bắt buộc cùng các mốc rà soát (Check-in 30-60-90 ngày).
   - **Nhân sự tự nguyện:** Nhân viên tự chọn vai trò mục tiêu để thăng cấp hoặc chuẩn bị luân chuyển nội bộ.
2. **AI phân tích skill gap & thiết lập lộ trình:**
   - AI so sánh hồ sơ năng lực hiện tại với yêu cầu vai trò đích, chia lộ trình thành các chặng (milestones), đề xuất thứ tự học tập, tài liệu thực hành và mentor phù hợp.
3. **Nhân viên xác nhận & ghi danh:**
   - Nhân viên xem xét, điều chỉnh và xác nhận lộ trình; hệ thống tự động ghi danh các khóa học nội bộ trên LMS.
4. **AI sinh bài kiểm tra mốc lộ trình (Milestone Checkpoint Test):**
   - Sau khi hoàn thành một module hoặc khóa học, AI tự động sinh đề kiểm tra thích ứng (Adaptive Assessment) gồm câu hỏi tình huống thực tế, bài tập thiết kế hệ thống hoặc bài test coding đo lường đúng kỹ năng vừa học.
   - Đề thi được đồng bộ trực tiếp sang LMS để nhân viên làm bài.
5. **Đánh giá & xác thực năng lực vào Bản đồ kỹ năng (UC-12):**
   - Hệ thống tự động chấm điểm bài làm trên LMS.
   - Nếu đạt chuẩn ($\ge 80\%$), hệ thống đánh dấu hoàn thành mốc lộ trình và tự động nâng cấp độ tin cậy của kỹ năng trong UC-12 thành bằng chứng "Đã kiểm tra qua bài test LMS".
6. **Theo dõi tiến độ & Báo cáo mốc định kỳ:**
   - **Với PIP:** Hệ thống tự động nhắc lịch check-in 30-60-90 ngày cho Line Manager và HRBP; nếu sau 90 ngày không vượt qua bài kiểm tra chuẩn, chuyển sang quy trình xử lý nhân sự.
   - **Với IDP:** Báo cáo mức độ sẵn sàng kế nhiệm (Readiness Score) cho Hội đồng HR và BU Head.
7. **Kỳ thi chuẩn hóa năng lực định kỳ toàn công ty (Periodic Competency Benchmark):**
   - Định kỳ 6 tháng hoặc 1 năm, AI tự động tạo các bộ đề thi benchmark chuẩn hóa theo từng role/level (Junior, Mid, Senior, Lead) chuyển qua LMS cho toàn thể nhân sự làm bài, tạo cơ sở dữ liệu khách quan cho các kỳ đánh giá tiếp theo.

**Luồng thay thế và ngoại lệ**

- **2a.** Nhân viên chưa đồng bộ đủ lịch sử dự án: AI yêu cầu cập nhật hồ sơ kỹ năng UC-12 trước khi phân tích gap.
- **4a.** Nhân viên không đạt bài kiểm tra checkpoint ($< 80\%$): AI phân tích các câu trả lời sai, chỉ rõ điểm hổng lý thuyết/thực hành và yêu cầu ôn tập lại module trước khi cho phép thi lại lần 2.
- **5a.** Khóa học có chi phí ngoài ngân sách: Hệ thống chuyển yêu cầu phê duyệt ngân sách cho Line Manager và Finance qua UC-11.
- **6a.** Nhân viên trong diện PIP có tiến bộ vượt bậc sau 60 ngày: Line Manager có thể đề xuất kết thúc sớm PIP có sự đồng thuận của HRBP.

**Quy tắc nghiệp vụ**

- Hoàn thành khóa học đơn thuần chỉ được tính là bằng chứng "Đã học"; chỉ khi vượt qua bài kiểm tra checkpoint trên LMS mới được xác thực năng lực đóng skill gap.
- Đề thi test sinh bởi AI phải bám sát ngân hàng năng lực chuẩn của tập đoàn, không dùng câu hỏi mẹo hoặc vượt quá phạm vi vai trò.
- Kết quả bài test định kỳ và tiến độ PIP/IDP được bảo mật nghiêm ngặt, chỉ nhân viên, Line Manager trực tiếp và HRBP phụ trách khối có quyền xem.

**Phân vai AI và rules**

- **AI:** Phân tích gap, thiết kế lộ trình IDP/PIP, sinh đề thi test checkpoint và đề thi benchmark định kỳ qua LMS, tự động chấm điểm và phân tích lỗ hổng kiến thức.
- **Rules/workflow:** Ngân sách đào tạo, luồng duyệt chi phí, lịch check-in 30-60-90 ngày, ghi nhận chứng chỉ trên LMS.

**Điểm con người quyết định:** Nhân viên chọn lộ trình; Line Manager duyệt chi phí và chủ trì các buổi check-in PIP/IDP; Mentor nghiệm thu kết quả thực hành.

**Chỉ số đo:** Tỷ lệ hoàn thành lộ trình IDP/PIP đúng hạn; điểm trung bình bài test checkpoint qua LMS; tỷ lệ nhân sự loại C cải thiện thành công sau PIP; tỷ lệ nhân sự loại A sẵn sàng kế nhiệm trong 12 tháng.

------------------------------------------------------------------------

## UC-05. Khám phá và bày tỏ quan tâm tới cơ hội nội bộ

| Mục | Nội dung |
|---|---|
| Feature nguồn | 5. AI Career & Opportunity Navigator |
| Mục tiêu | Nhân viên tìm được vị trí hoặc dự án nội bộ phù hợp và cho bên có nhu cầu biết mình quan tâm |
| Actor chính | Employee |
| Actor phụ | Hiring Manager, Project Manager, HRBP |
| Hệ thống liên quan | Hồ sơ kỹ năng (UC-12), danh sách vị trí và dự án đang mở (ATS, PM), HRIS |
| Trigger | Nhân viên mở mục cơ hội hoặc hỏi "có vị trí nào hợp với tôi" |
| Tiền điều kiện | Nhân viên có hồ sơ kỹ năng; có cơ hội đang mở được phép công bố nội bộ |
| Hậu điều kiện | Nhân viên thấy danh sách cơ hội kèm lý do phù hợp và gap; nếu bày tỏ quan tâm thì bên có nhu cầu nhận được |
| Bảo đảm tối thiểu | Việc xem và tìm kiếm cơ hội không bị tiết lộ cho manager hiện tại |

**Luồng chính**

1. Nhân viên nêu nguyện vọng: lĩnh vực, địa điểm, thời điểm.
2. Rules lọc cơ hội theo điều kiện bắt buộc: đủ điều kiện luân chuyển, địa điểm, cấp bậc.
3. AI xếp hạng theo mức khớp kỹ năng và nguyện vọng, giải thích điểm khớp và gap của từng cơ hội.
4. Nhân viên xem chi tiết.
5. Nhân viên bày tỏ quan tâm tới một cơ hội.
6. Hệ thống gửi phần hồ sơ kỹ năng được phép chia sẻ tới bên có nhu cầu và HRBP.
7. Bên có nhu cầu phản hồi; nhân viên theo dõi trạng thái.

**Luồng thay thế và ngoại lệ**

- **2a.** Nhân viên chưa đủ điều kiện luân chuyển: hệ thống hiển thị quy định và ngày đủ điều kiện.
- **3a.** Không có cơ hội khớp: AI nói rõ, hiển thị các cơ hội gần nhất kèm gap và mời lập lộ trình học (UC-04).
- **5a.** Nhân viên rút quan tâm: hệ thống thông báo cho bên đã nhận.
- **7a.** Bên có nhu cầu muốn tiến hành: quy trình luân chuyển chính thức bắt đầu và manager hiện tại được thông báo theo chính sách.

**Quy tắc nghiệp vụ**

- Hành vi tìm kiếm là riêng tư; manager hiện tại chỉ được thông báo ở mốc mà chính sách luân chuyển quy định.
- Không dùng lương, tuổi, giới tính làm tín hiệu xếp hạng.
- Chỉ hiển thị cơ hội đã được duyệt công bố nội bộ.

**Phân vai AI và rules**

- AI: xếp hạng, giải thích.
- Rules/workflow: điều kiện luân chuyển, quyền riêng tư, thông báo.

**Điểm con người quyết định:** nhân viên quyết định có ứng tuyển; Hiring Manager hoặc Project Manager quyết định tiếp nhận.

**Chỉ số đo:** internal fill rate; tỷ lệ quan tâm dẫn tới trao đổi chính thức; tỷ lệ nhân viên có ít nhất một cơ hội khớp.

------------------------------------------------------------------------

# Nhóm B: HR Management AI

## UC-06. Phân tích chênh lệch cung–cầu nhân lực của đơn vị

| Mục | Nội dung |
|---|---|
| Feature nguồn | 6. AI Workforce Planning & Forecasting |
| Mục tiêu | HRBP biết đơn vị sẽ thừa hoặc thiếu vai trò, kỹ năng nào trong kỳ kế hoạch và có phương án đóng gap |
| Actor chính | HRBP |
| Actor phụ | BU Head, Finance |
| Hệ thống liên quan | HRIS, PM (kế hoạch và phân bổ dự án), hồ sơ kỹ năng (UC-12), ngân sách headcount của Finance |
| Trigger | Chu kỳ kế hoạch quý hoặc năm; hoặc một dự án thay đổi quy mô |
| Tiền điều kiện | Có dữ liệu headcount, phân bổ và kế hoạch nhu cầu của đơn vị; HRBP có quyền trên phạm vi đơn vị |
| Hậu điều kiện | Bản phân tích gap theo vai trò, kỹ năng và thời gian, kèm kịch bản và phương án, được BU Head xem xét |
| Bảo đảm tối thiểu | Mọi con số truy được tới nguồn và ngày dữ liệu |

**Luồng chính**

1. HRBP chọn đơn vị và kỳ kế hoạch.
2. Hệ thống tổng hợp phía cung: headcount, kỹ năng, phân bổ hiện tại, biến động đã biết (dự án sắp kết thúc, đơn nghỉ việc đã nộp).
3. Hệ thống tổng hợp phía cầu: nhu cầu đã duyệt và kế hoạch dự án.
4. Mô hình dự báo phần chưa chắc chắn (tỷ lệ nghỉ việc của đơn vị, nhu cầu từ dự án chưa ký) kèm khoảng tin cậy.
5. Hệ thống tính chênh lệch theo vai trò, kỹ năng và tháng.
6. AI tóm tắt các gap lớn nhất và đề xuất phương án cho từng gap: điều chuyển nội bộ, reskill hoặc tuyển ngoài, kèm giả định.
7. HRBP điều chỉnh giả định và chạy lại theo kịch bản.
8. HRBP trình BU Head; phương án được chọn chuyển thành nhu cầu nhân lực (UC-13) hoặc yêu cầu tuyển (UC-07).

**Luồng thay thế và ngoại lệ**

- **2a.** Dữ liệu nguồn thiếu hoặc quá hạn: hệ thống đánh dấu, loại khỏi dự báo và hiển thị độ phủ dữ liệu.
- **4a.** Lịch sử không đủ để dự báo: hệ thống dùng kịch bản do HRBP nhập tay và ghi rõ điều đó.
- **8a.** Phương án vượt ngân sách headcount: chuyển Finance xác nhận trước khi trình.

**Quy tắc nghiệp vụ**

- Chỉ hiển thị số tổng hợp cấp đơn vị; không dự đoán khả năng nghỉ việc của từng cá nhân.
- Kết quả dự báo phải được so với một phương pháp cơ sở đơn giản để biết mô hình có tốt hơn hay không.
- Số headcount được duyệt lấy từ Finance, không do mô hình suy ra.

**Phân vai AI và rules**

- AI và mô hình thống kê: dự báo, tóm tắt, đề xuất phương án.
- Rules/workflow: phạm vi dữ liệu, ngân sách, phê duyệt.

**Điểm con người quyết định:** BU Head quyết định kế hoạch; Finance xác nhận ngân sách.

**Chỉ số đo:** sai số dự báo so với thực tế; thời gian lập kế hoạch; tỷ lệ gap được đóng bằng nguồn nội bộ.

------------------------------------------------------------------------

## UC-07. Sàng lọc hồ sơ & sinh đề test ứng viên theo role (Candidate Adaptive Assessment)

| Mục | Nội dung |
|---|---|
| Feature nguồn | 7. AI Talent Acquisition Copilot |
| Mục tiêu | Recruiter sàng lọc hồ sơ nhanh chóng với căn cứ rõ ràng, đồng thời tự động sinh đề thi test kỹ thuật thích ứng theo role để kiểm chứng năng lực thực chất của ứng viên trước vòng phỏng vấn |
| Actor chính | Recruiter |
| Actor phụ | Hiring Manager, Ứng viên (Candidate) |
| Hệ thống liên quan | ATS, LMS / Nền tảng kiểm tra trực tuyến, Ngân hàng năng lực kỹ thuật |
| Trigger | Một vị trí có hồ sơ mới cần sàng lọc hoặc ứng viên nộp hồ sơ |
| Tiền điều kiện | Yêu cầu tuyển đã được duyệt; JD có tiêu chí bắt buộc và ưu tiên; ứng viên đã đồng ý cho xử lý dữ liệu |
| Hậu điều kiện | Mỗi hồ sơ có bản đánh giá theo tiêu chí kèm bằng chứng từ CV; ứng viên có kết quả bài test kỹ thuật sơ loại do AI chấm; quyết định shortlist của Recruiter được ghi lại |
| Bảo đảm tối thiểu | Không hồ sơ nào bị loại tự động; bài test bám sát đúng yêu cầu công việc của role |

**Luồng chính**

1. Recruiter mở vị trí và xác nhận bộ tiêu chí sàng lọc.
2. AI trích xuất thông tin có cấu trúc từ CV: kỹ năng, kinh nghiệm, dự án, chứng chỉ.
3. Rules kiểm tra các tiêu chí bắt buộc (năm kinh nghiệm, địa điểm làm việc).
4. AI đánh giá mức khớp theo từng tiêu chí, dẫn đoạn CV làm bằng chứng và nêu các điểm chưa rõ cần làm rõ.
5. **AI sinh đề thi test ứng viên theo role (Candidate Adaptive Assessment):**
   - Dựa trên JD, yêu cầu dự án thực tế và kinh nghiệm trong CV ứng viên, AI tự động tạo bộ đề kiểm tra thích ứng (bài test trắc nghiệm kiến trúc hệ thống, bài tập coding giải thuật, hoặc bài test case study tình huống thực chiến).
   - Hệ thống gửi link làm bài trực tuyến qua Test Portal cho ứng viên.
6. **Ứng viên làm bài & Hệ thống chấm điểm tự động:**
   - Ứng viên hoàn thành bài test trong thời gian quy định; AI tự động chấm điểm, phân tích độ sạch của code, tư duy giải quyết vấn đề và phát hiện gian lận.
7. Hệ thống hiển thị danh sách xếp hạng tổng hợp (kết hợp điểm CV và kết quả bài test kỹ thuật).
8. Recruiter rà soát toàn diện và quyết định danh sách phỏng vấn (Shortlist).
9. Hiring Manager nhận shortlist kèm báo cáo chi tiết về kết quả bài test của từng ứng viên.

**Luồng thay thế và ngoại lệ**

- **2a.** CV không đọc được hoặc thiếu thông tin: hệ thống gắn cờ để rà soát thủ công.
- **2b.** CV chứa văn bản ẩn hoặc câu lệnh prompt injection nhằm thao túng kết quả: hệ thống bỏ qua câu lệnh và gắn cờ cảnh báo cho Recruiter.
- **5a.** Ứng viên cấp Senior/Lead: AI tự động chuyển đổi từ dạng test trắc nghiệm sang bài tập thiết kế hệ thống (System Design Case Study) để phản ánh đúng tầm chuyên gia.
- **6a.** Ứng viên không nộp bài đúng hạn: Hệ thống gửi thông báo nhắc nhở 1 lần trước khi chuyển hồ sơ sang trạng thái chờ xem xét.
- **8a.** Recruiter không đồng ý với xếp hạng: hệ thống ghi lý do để đánh giá và cải tiến mô hình.

**Quy tắc nghiệp vụ**

- Không dùng tuổi, giới tính, ảnh, tình trạng hôn nhân, quê quán làm tín hiệu đánh giá.
- AI không tự động loại ứng viên; kết quả test chỉ là căn cứ tham khảo hỗ trợ Recruiter và Hiring Manager ra quyết định.
- Đề thi test phải được sinh ngẫu nhiên theo ma trận kỹ năng của role để chống gian lận và rò rỉ đề thi.

**Phân vai AI và rules**

- **AI:** Trích xuất CV, so khớp tiêu chí, sinh đề thi test theo role, tự động chấm điểm và lập báo cáo năng lực.
- **Rules/workflow:** Tiêu chí bắt buộc, thời gian làm bài thi, lưu vết kết quả và trạng thái hồ sơ trong ATS.

**Điểm con người quyết định:** Recruiter quyết định shortlist; Hiring Manager quyết định phỏng vấn và tuyển dụng.

**Chỉ số đo:** Thời gian sàng lọc hồ sơ; tỷ lệ ứng viên vượt qua bài test được đánh giá tốt trong phỏng vấn; time-to-hire; độ chính xác của bài test so với đánh giá chuyên môn của Hiring Manager.

------------------------------------------------------------------------

## UC-08. Điều phối đánh giá hiệu suất, cân bằng phân phối chuẩn & phân bổ quỹ thưởng (Performance Calibration & Merit Planning Engine)

| Mục | Nội dung |
|---|---|
| Feature nguồn | 8. AI Performance Calibration & Merit Planning Engine |
| Mục tiêu | Tự động hóa và chuẩn hóa toàn bộ chu trình đánh giá hiệu suất cuối năm cho tập đoàn 5.000–20.000 người: tổng hợp bằng chứng cả năm xóa bỏ Recency Bias, phát hiện lạm phát điểm số (Rating Inflation) giữa các phòng ban, tối ưu hóa phân phối chuẩn Bell Curve, mô phỏng ma trận tăng lương & thưởng theo trần ngân sách tài chính, hỗ trợ Hội đồng HR duyệt ngoại lệ HITL realtime, và tự động sinh thư kết quả kèm kế hoạch phát triển cá nhân IDP/PIP tích hợp lộ trình nhân sự |
| Actor chính | Line Manager (đánh giá sơ bộ), Hội đồng HR / HRBP & BU Head (chủ trì calibration & duyệt ngoại lệ) |
| Actor phụ | Employee (xem kết quả & kế hoạch IDP/PIP), Finance (xác nhận trần quỹ thưởng), CHRO (phê duyệt tập đoàn) |
| Hệ thống liên quan | HRIS (mục tiêu OKR/KPI, đánh giá), Hệ thống quản lý công việc (Jira/GitHub commits/PRs, Project Management), Kho feedback/Đánh giá 360, Hệ thống khen thưởng & kỷ luật, Payroll/Finance |
| Trigger | Mở kỳ Year-end Review & Merit Planning tập đoàn; hoặc Line Manager / HRBP mở phiên rà soát |
| Tiền điều kiện | Mục tiêu năm đã đăng ký; dữ liệu công việc (Jira/GitHub), đánh giá 360 và khen thưởng đã đồng bộ; trần ngân sách quỹ thưởng và khung tỷ lệ Bell Curve (ví dụ: 10% A, 70% B, 20% C) đã được CHRO & Finance phê duyệt |
| Hậu điều kiện | Kết quả đánh giá được chuẩn hóa theo Bell Curve; tổng chi phí thưởng & tăng lương nằm nghiêm ngặt trong trần ngân sách; mọi điều chỉnh của Hội đồng HR có lưu vết kiểm toán (Audit Trail); thư kết quả và kế hoạch phát triển IDP/PIP được tự động gửi cho từng nhân viên, kết nối trực tiếp vào lộ trình học tập UC-04 |
| Bảo đảm tối thiểu | AI đóng vai trò người phản biện độc lập và đề xuất tối ưu; AI không tự ý chốt xếp loại hay sửa lương/thưởng của bất kỳ ai mà không có phê duyệt của con người (HITL). Ngân sách quỹ thưởng không bao giờ vượt trần tài chính đã khóa |

**Luồng chính (AI Automation Workflow 7 bước)**

1. **Thu thập dữ liệu hiệu suất 1 năm (Dữ liệu đa nguồn):** Hệ thống đồng bộ toàn diện dữ liệu 12 tháng: KPI/OKR, task Jira, GitHub commits/PRs, kết quả đánh giá 360 (peer review, feedback chéo), lịch sử khen thưởng và kỷ luật.
2. **AI Evidence Synthesizer (Tổng hợp hiệu suất cả năm):** AI phân tích, đối chiếu tiến độ hoàn thành so với cam kết ban đầu, tóm tắt hiệu suất cả năm của từng nhân sự kèm dẫn chứng truy xuất nguồn (loại bỏ triệt để Recency Bias). AI hỗ trợ Line Manager soạn nháp đánh giá; Line Manager rà soát và gửi xếp loại sơ bộ.
3. **AI Bias & Outlier Detector (Phát hiện lệch chuẩn & lạm phát điểm):** AI quét toàn bộ kết quả sơ bộ giữa các phòng ban để phát hiện độ lệch chuẩn:
   - Nhận diện lạm phát điểm số (Rating Inflation): phòng ban quản lý dễ dãi chấm 90% loại A dù sản lượng/output thực tế trung bình so với khối.
   - Nhận diện phòng ban khắt khe: quản lý chỉ chấm 20% loại A dù đội ngũ có nhiều đóng góp nổi bật.
   - Gắn cờ cảnh báo các trường hợp ngoại lệ (Edge Cases): ví dụ nhân viên X được quản lý chấm loại A nhưng bằng chứng đóng góp thực tế trên hệ thống thấp hơn 30% so với mặt bằng chung loại A của khối, hoặc nhân sự đóng góp vượt trội nhưng bị đánh giá thấp do thiên kiến cá nhân.
4. **AI Calibration Optimizer (Thuật toán tối ưu hóa phân phối chuẩn Bell Curve):** Thuật toán giải bài toán tối ưu ràng buộc (Constrained Optimization) để đề xuất phương án dịch chuyển kết quả toàn công ty/khối về đường cong chuẩn (Bell Curve: ví dụ 10% A, 70% B, 20% C) dựa trên trọng số bằng chứng khách quan, giảm thiểu xung đột so bì giữa các phòng ban.
5. **AI Merit Simulator (Mô phỏng tăng lương & thưởng theo ngân sách tài chính):** AI đề xuất ma trận thưởng (Merit Matrix) dựa trên xếp loại sau calibration kết hợp với vị trí lương hiện tại (compa-ratio). Tự động mô phỏng các kịch bản phân bổ quỹ thưởng sao cho tổng ngân sách luôn $\le$ Trần ngân sách tài chính (Hard budget ceiling).
6. **HITL Dashboard cho Hội đồng HR duyệt trực quan & xem tác động ngân sách realtime:**
   - Hội đồng HR (HRBP, BU Head, Line Manager) mở Dashboard điều phối trực quan.
   - Thay vì phải rà soát thủ công hàng nghìn hồ sơ, Hội đồng HR chỉ cần tập trung xem xét các trường hợp ngoại lệ (Edge Cases) do AI gắn cờ cảnh báo kèm luận điểm phản biện độc lập.
   - Hội đồng HR kéo-thả điều chỉnh xếp loại nhân sự; Dashboard lập tức cập nhật lại phân bố Bell Curve và tác động dòng tiền ngân sách realtime.
   - Khi đạt đồng thuận, BU Head và HRBP ký duyệt kết quả.
7. **AI Auto-generator sinh thư thông báo kết quả & kế hoạch phát triển cá nhân IDP/PIP:**
   - AI tự động sinh thư thông báo kết quả đánh giá và quyết định lương thưởng cho từng nhân viên với văn phong chuẩn mực, minh bạch dẫn chứng.
   - **Tích hợp trực tiếp vào lộ trình nhân sự (kết nối với UC-04 Learning & Skill Growth Coach):**
     - **Nhân sự loại A (Xuất sắc):** Gợi ý kế hoạch phát triển cá nhân (IDP - Individual Development Plan), quy hoạch cán bộ nguồn / kế nhiệm (Succession Planning), định hướng phụ trách dự án trọng điểm hoặc lộ trình đào tạo lãnh đạo.
     - **Nhân sự loại C (Cần cải thiện):** AI tự động trích xuất đúng 3 điểm yếu lớn nhất trong năm và lập bản cam kết kế hoạch cải thiện hiệu suất (PIP - Performance Improvement Plan) trong 90 ngày kèm các mốc rà soát (Check-in 30-60-90 ngày).

**Luồng thay thế và ngoại lệ**

- **3a. Phòng ban có hiệu suất đột biến thực tế:** Trưởng phòng bảo vệ kết quả chấm cao; Hội đồng HR xem xét hồ sơ bằng chứng do AI tổng hợp và quyết định nới biên độ Bell Curve cho phòng ban đó.
- **5a. Tổng ngân sách mô phỏng chạm trần tài chính:** AI đề xuất kịch bản cân đối (giảm biên độ % tăng lương ở nhóm compa-ratio cao, dồn ngân sách thưởng vào top 5% xuất sắc) để đảm bảo không vỡ quỹ.
- **6a. Quản lý không đồng ý với điều chỉnh của Hội đồng:** Line Manager đệ trình phiên giải trình (Rebuttal) kèm bằng chứng bổ sung trong vòng 48 giờ trước khi Hội đồng ra quyết định chốt.
- **7a. Nhân viên khiếu nại kết quả:** Mở luồng phúc khảo minh bạch; hệ thống cung cấp đầy đủ nhật ký đánh giá, hồ sơ bằng chứng 1 năm và biên bản phiên calibration để đối soát.

**Quy tắc nghiệp vụ**

- **Vai trò HITL (Human-in-the-loop):** AI không tự ý quyết định xếp loại hay mức thưởng của ai. AI đóng vai trò người phản biện độc lập: "Quản lý chấm nhân viên X loại A, nhưng bằng chứng đóng góp thực tế trên hệ thống thấp hơn 30% so với mặt bằng chung loại A của khối". Hội đồng HR chỉ việc can thiệp vào các trường hợp ngoại lệ (Edge Cases) do AI gắn cờ cảnh báo, thay vì phải ngồi rà soát tay hàng nghìn hồ sơ.
- **Trần ngân sách tài chính là ràng buộc cứng:** Tổng ngân sách tăng lương và thưởng mô phỏng tuyệt đối không được vượt trần tài chính đã được Finance phê duyệt.
- **Phân quyền và bảo mật dữ liệu:** Chỉ Hội đồng HR và Finance thấy dữ liệu ngân sách và compa-ratio; Line Manager chỉ thấy dữ liệu trong phòng ban phụ trách; nhân viên chỉ xem được kết quả cá nhân và bản IDP/PIP của mình.
- **Không dùng dữ liệu nhạy cảm làm điểm trừ:** Thời gian nghỉ thai sản, điều trị bệnh hiểm nghèo không bị tính là bằng chứng bất lợi; không sử dụng dữ liệu chat riêng tư hay camera giám sát làm căn cứ hiệu suất.

**Phân vai AI và rules**

- **AI:** Evidence Synthesizer (tổng hợp dữ liệu 1 năm), Bias & Outlier Detector (phát hiện lệch chuẩn/lạm phát điểm), Calibration Optimizer (tối ưu Bell Curve), Merit Simulator (mô phỏng quỹ thưởng), Auto-generator (thư kết quả & kế hoạch IDP/PIP).
- **Rules/workflow:** Trần ngân sách tài chính, khung tỷ lệ Bell Curve, quy tắc compa-ratio, ma trận phân quyền, luồng khiếu nại và lưu vết kiểm toán (Audit Trail).

**Điểm con người quyết định:** Line Manager chấm sơ bộ; Hội đồng HR (HRBP, BU Head) thẩm định các ca ngoại lệ và phê duyệt Bell Curve; CHRO phê duyệt toàn tập đoàn; Finance xác nhận ngân sách.

**Chỉ số đo lường hiệu quả (KPIs)**

- Giảm thời gian chu kỳ Year-end Review & Calibration từ 2–3 tháng xuống dưới 2 tuần.
- Giảm 85% thời lượng các buổi họp tranh cãi giữa HR và Giám đốc khối.
- 100% quyết định xếp loại có dẫn chứng định lượng cả năm, xóa bỏ Recency Bias.
- 0% vượt trần ngân sách tài chính.
- 100% nhân sự loại C có kế hoạch PIP 90 ngày cụ thể và 100% nhân sự loại A có kế hoạch phát triển kế nhiệm IDP.

------------------------------------------------------------------------

## UC-09. Phát hiện và xử lý bất thường công/OT trước kỳ chốt lương

| Mục | Nội dung |
|---|---|
| Feature nguồn | 9. AI Payroll & Attendance Intelligence |
| Mục tiêu | Payroll xử lý xong các sai lệch công và OT trước ngày chốt, thay vì dồn việc và sửa sau khi đã chi lương |
| Actor chính | Payroll Specialist (HR Ops) |
| Actor phụ | Employee, Line Manager |
| Hệ thống liên quan | Attendance, Payroll, HRIS (hợp đồng, ca làm việc), workflow engine |
| Trigger | Lịch chạy tự động trước ngày chốt công; hoặc Payroll chạy thủ công |
| Tiền điều kiện | Dữ liệu công của kỳ đã đồng bộ; quy tắc công và OT đã được cấu hình |
| Hậu điều kiện | Mọi bất thường được xử lý hoặc được chấp nhận có lý do trước khi chốt; lịch sử điều chỉnh đầy đủ |
| Bảo đảm tối thiểu | Không dữ liệu công hoặc lương nào bị sửa tự động |

**Luồng chính**

1. Hệ thống quét dữ liệu công của kỳ.
2. Rules phát hiện các vi phạm xác định: thiếu chấm công, OT vượt giới hạn, OT chưa được duyệt, trùng ca với ngày phép.
3. Mô hình phát hiện các bất thường thống kê: lệch nhiều so với lịch sử của cá nhân hoặc nhóm.
4. AI phân loại nguyên nhân khả dĩ (quên chấm công, lỗi thiết bị, sai ca, chưa duyệt) và đề xuất cách xử lý.
5. Payroll xem danh sách theo mức ưu tiên.
6. Với mục cần xác nhận, hệ thống gửi yêu cầu tới nhân viên hoặc manager qua UC-11.
7. Payroll duyệt điều chỉnh; hệ thống ghi vào Attendance.
8. Hệ thống xác nhận dữ liệu kỳ đã sạch để chốt.

**Luồng thay thế và ngoại lệ**

- **3a.** Cùng một lỗi xuất hiện ở nhiều người tại một địa điểm: hệ thống gom thành một sự cố (ví dụ lỗi thiết bị) thay vì xử lý từng người.
- **4a.** Cảnh báo sai: Payroll đánh dấu; dữ liệu này dùng để điều chỉnh ngưỡng.
- **6a.** Không có phản hồi trước hạn: escalation, sau đó áp dụng cách xử lý mặc định của chính sách.
- **7a.** Điều chỉnh ảnh hưởng tới kỳ lương đã chốt: chuyển sang quy trình truy thu, truy lĩnh.

**Quy tắc nghiệp vụ**

- Giới hạn OT và cách tính công theo luật và chính sách là rules, không do AI suy luận.
- Mọi điều chỉnh phải có người duyệt và lý do.
- Chỉ Payroll thấy số liệu lương.

**Phân vai AI và rules**

- AI: phân loại nguyên nhân, đề xuất, xếp ưu tiên.
- Rules/workflow: phát hiện vi phạm, tính toán, duyệt, ghi dữ liệu.

**Điểm con người quyết định:** Payroll duyệt điều chỉnh; Line Manager xác nhận OT.

**Chỉ số đo:** số điều chỉnh sau khi chốt; thời gian chốt công; tỷ lệ cảnh báo đúng.

------------------------------------------------------------------------

## UC-10. Phân tích sức khỏe tổ chức ở cấp đơn vị

| Mục | Nội dung |
|---|---|
| Feature nguồn | 10. AI Organizational Health & Retention Intelligence |
| Mục tiêu | HRBP phát hiện sớm đơn vị có dấu hiệu quá tải hoặc mất người và có hành động trước khi vấn đề xảy ra |
| Actor chính | HRBP |
| Actor phụ | BU Head, CHRO |
| Hệ thống liên quan | HRIS, Attendance (OT), khảo sát engagement, PM (workload) |
| Trigger | Định kỳ tháng hoặc quý; hoặc một chỉ số vượt ngưỡng |
| Tiền điều kiện | Đơn vị đủ kích thước tối thiểu để ẩn danh; dữ liệu đã được tổng hợp |
| Hậu điều kiện | Có báo cáo xu hướng và yếu tố rủi ro ở cấp nhóm kèm đề xuất hành động; hành động được chọn được ghi lại để theo dõi |
| Bảo đảm tối thiểu | Không lộ dữ liệu ở mức cá nhân |

**Luồng chính**

1. HRBP chọn đơn vị và kỳ.
2. Hệ thống tính các chỉ số cấp nhóm: turnover, OT, tải phân bổ, engagement, thời gian ở vị trí.
3. Mô hình so sánh với lịch sử và với các đơn vị tương đương, đánh dấu biến động đáng kể.
4. AI diễn giải: yếu tố nào đi kèm biến động, mức chắc chắn, điều gì chưa biết.
5. AI đề xuất các hành động để HRBP cân nhắc.
6. HRBP bổ sung bối cảnh và chọn hành động.
7. HRBP chia sẻ với BU Head; CHRO xem bản tổng hợp toàn tập đoàn.
8. Hệ thống theo dõi chỉ số ở kỳ sau để đối chiếu.

**Luồng thay thế và ngoại lệ**

- **2a.** Nhóm nhỏ hơn ngưỡng ẩn danh: hệ thống gộp lên cấp tổ chức cao hơn.
- **3a.** Tỷ lệ trả lời khảo sát thấp: hệ thống nêu rõ và không rút kết luận từ dữ liệu đó.
- **4a.** Mối liên hệ yếu: AI ghi "chưa đủ căn cứ" thay vì đưa ra nguyên nhân.
- **6a.** HRBP bác đề xuất: hệ thống ghi lý do.

**Quy tắc nghiệp vụ**

- Không tính và không hiển thị điểm rủi ro nghỉ việc của từng cá nhân.
- Áp dụng ngưỡng ẩn danh N người cho mọi chỉ số.
- AI chỉ phát biểu mối tương quan, không khẳng định quan hệ nhân quả.

**Phân vai AI và rules**

- AI và mô hình thống kê: phát hiện biến động, diễn giải, đề xuất.
- Rules/workflow: ngưỡng ẩn danh, phạm vi dữ liệu theo vai trò.

**Điểm con người quyết định:** HRBP và BU Head quyết định hành động.

**Chỉ số đo:** thời gian từ lúc có tín hiệu đến lúc có hành động; thay đổi của chỉ số sau hành động; tỷ lệ đề xuất được HRBP chấp nhận.

------------------------------------------------------------------------

# Nhóm C: HR Ecosystem AI

## UC-11. Điều phối một yêu cầu xuyên phòng ban

| Mục | Nội dung |
|---|---|
| Feature nguồn | 11. AI HR Workflow Orchestrator |
| Mục tiêu | Một yêu cầu cần nhiều bộ phận xử lý được hoàn tất đúng hạn mà người yêu cầu không phải tự đi hỏi từng nơi |
| Actor chính | Người yêu cầu (Employee hoặc Line Manager) |
| Actor phụ | HR Ops, IT, Finance, người duyệt |
| Hệ thống liên quan | Workflow engine, HRIS, ITSM, hệ thống Finance |
| Trigger | Người yêu cầu mô tả nhu cầu; hoặc một use case khác chuyển yêu cầu sang (UC-01, 02, 09, 13, 15) |
| Tiền điều kiện | Người yêu cầu đã xác thực |
| Hậu điều kiện | Yêu cầu được hoàn tất hoặc đóng có lý do; mỗi bước có người chịu trách nhiệm, thời điểm và kết quả |
| Bảo đảm tối thiểu | Yêu cầu không bị mất; tại mọi thời điểm luôn có một người chịu trách nhiệm hiện tại |

**Luồng chính**

1. Hệ thống tiếp nhận yêu cầu.
2. AI phân loại yêu cầu và trích xuất dữ liệu cần thiết; hỏi lại phần còn thiếu.
3. Hệ thống chọn quy trình mẫu tương ứng; người yêu cầu xác nhận.
4. Workflow engine tạo các bước, gán người xử lý theo ma trận phân công và đặt hạn theo SLA.
5. Người xử lý và người duyệt thực hiện từng bước; hệ thống cập nhật trạng thái.
6. Hệ thống nhắc trước hạn; khi quá hạn thì escalation theo cấu hình.
7. Các bước tự động được thực hiện qua API của hệ thống đích.
8. Yêu cầu hoàn tất; hệ thống thông báo và thu phản hồi của người yêu cầu.

**Luồng thay thế và ngoại lệ**

- **1a.** Người yêu cầu hủy: hệ thống dừng các bước chưa thực hiện và thông báo cho những người liên quan.
- **2a.** AI không phân loại được hoặc độ tin cậy thấp: chuyển HR Ops phân loại.
- **3a.** Chưa có quy trình mẫu: hệ thống tạo yêu cầu chung, gán HR Ops và ghi nhận để bổ sung mẫu.
- **5a.** Người xử lý vắng mặt: chuyển cho người được ủy quyền.
- **5b.** Một bước bị từ chối: hệ thống thông báo lý do, cho phép sửa và gửi lại.
- **7a.** API lỗi: hệ thống thử lại mà không tạo bản ghi trùng, sau đó chuyển xử lý tay.

**Quy tắc nghiệp vụ**

- Trạng thái, phân công và SLA do workflow engine quản lý; AI không được bỏ qua bước duyệt.
- AI chỉ chọn trong các quy trình mẫu đã được duyệt, không tự tạo quy trình mới khi đang chạy.
- Mỗi thao tác ghi sang hệ thống khác có khóa chống trùng.

**Phân vai AI và rules**

- AI: phân loại, trích xuất dữ liệu, tóm tắt yêu cầu cho người duyệt, soạn thông báo.
- Rules/workflow: toàn bộ luồng, phân công, hạn, escalation.

**Điểm con người quyết định:** người duyệt theo ma trận phân quyền; HR Ops xử lý ngoại lệ.

**Chỉ số đo:** thời gian hoàn tất; tỷ lệ đúng SLA; tỷ lệ phân loại đúng; số yêu cầu bị kẹt quá hạn.

------------------------------------------------------------------------

## UC-12. Xây dựng và xác thực hồ sơ kỹ năng

| Mục | Nội dung |
|---|---|
| Feature nguồn | 12. AI Skills Graph & Internal Talent Marketplace |
| Mục tiêu | Mỗi nhân viên có hồ sơ kỹ năng đủ tin cậy để dùng cho học tập, cơ hội nội bộ và bố trí nhân sự |
| Actor chính | Employee |
| Actor phụ | Line Manager (xác nhận), HRBP (chủ sở hữu danh mục kỹ năng) |
| Hệ thống liên quan | HRIS, PM (lịch sử dự án), LMS, CV, danh mục kỹ năng chuẩn |
| Trigger | Nhân viên mới vào; rà soát định kỳ; kết thúc một dự án; hoàn thành một khóa học |
| Tiền điều kiện | Có danh mục kỹ năng chuẩn kèm thang mức thành thạo; nhân viên đã được thông báo hồ sơ dùng vào việc gì |
| Hậu điều kiện | Hồ sơ gồm kỹ năng, mức thành thạo, loại bằng chứng, nguồn và ngày cập nhật; nhân viên đã xác nhận |
| Bảo đảm tối thiểu | Kỹ năng do AI suy luận mà chưa được xác nhận thì không được dùng cho quyết định |

**Luồng chính**

1. Hệ thống thu thập nguồn: CV, lịch sử dự án và vai trò, khóa học, chứng chỉ.
2. AI trích xuất kỹ năng, ánh xạ về danh mục chuẩn và đề xuất mức thành thạo kèm bằng chứng.
3. Nhân viên xem đề xuất: chấp nhận, sửa, từ chối hoặc bổ sung.
4. Nhân viên nêu nguyện vọng: kỹ năng muốn phát triển, điều kiện làm việc.
5. Line Manager xác nhận các kỹ năng đã được thể hiện trong công việc.
6. Hệ thống lưu hồ sơ, mỗi kỹ năng kèm loại bằng chứng và ngày.
7. Hồ sơ sẵn sàng cho UC-04, UC-05, UC-06 và UC-13.

**Luồng thay thế và ngoại lệ**

- **2a.** Kỹ năng chưa có trong danh mục: đưa vào hàng chờ cho chủ sở hữu danh mục xem xét.
- **3a.** Nhân viên không phản hồi: kỹ năng giữ trạng thái "chưa xác nhận".
- **3b.** Nhân viên yêu cầu sửa hoặc xóa dữ liệu sai: hệ thống thực hiện và ghi lại.
- **5a.** Manager không đồng ý với mức thành thạo: hệ thống ghi cả hai ý kiến và nhân viên được biết.
- **6a.** Kỹ năng không được dùng quá N tháng: đánh dấu cần xác nhận lại.

**Quy tắc nghiệp vụ**

- Bằng chứng chia bốn loại và không gộp lẫn: tự khai, đã học, đã làm, đã được xác nhận.
- Nhân viên luôn xem được hồ sơ của mình và biết ai đã xem.
- Hồ sơ kỹ năng tách khỏi dữ liệu lương và xếp loại hiệu suất.

**Phân vai AI và rules**

- AI: trích xuất, ánh xạ, đề xuất mức thành thạo.
- Rules/workflow: vòng đời xác nhận, quyền xem, hạn xác nhận lại.

**Điểm con người quyết định:** nhân viên và Line Manager xác nhận; HRBP quyết định bổ sung danh mục.

**Chỉ số đo:** độ phủ hồ sơ; tỷ lệ kỹ năng đã được xác nhận; độ mới của hồ sơ; tỷ lệ đề xuất của AI được chấp nhận.

------------------------------------------------------------------------

## UC-13. Đề xuất phương án bố trí nhân sự cho một nhu cầu dự án

| Mục | Nội dung |
|---|---|
| Feature nguồn | 13. AI Project Staffing & Redeployment Agent |
| Mục tiêu | Một nhu cầu nhân lực được đáp ứng bằng người nội bộ phù hợp, đúng thời điểm, với căn cứ giải thích được |
| Actor chính | HRBP (vai trò điều phối nguồn lực) |
| Actor phụ | Project Manager (bên cần người), Line Manager hiện tại, BU Head, Employee |
| Hệ thống liên quan | Hồ sơ kỹ năng (UC-12), PM (phân bổ hiện tại), HRIS, workflow engine |
| Trigger | Một nhu cầu nhân lực được duyệt; hoặc một dự án, đơn vị thu hẹp làm phát sinh danh sách nhân sự cần bố trí lại |
| Tiền điều kiện | Nhu cầu có vai trò, kỹ năng bắt buộc, ngày bắt đầu, thời lượng và tỷ lệ phân bổ; có dữ liệu phân bổ hiện tại của nhân viên |
| Hậu điều kiện | Phương án được duyệt, nhân viên đồng ý và phân bổ được cập nhật; hoặc có kết luận "chưa có phương án nội bộ phù hợp" kèm lý do |
| Bảo đảm tối thiểu | Không thay đổi phân bổ khi chưa đủ phê duyệt; kết quả "không khớp" không được ghi thành nhận định về nhân viên |

**Luồng chính**

1. HRBP mở một nhu cầu, hoặc mở danh sách nhân sự cần bố trí lại.
2. Rules lọc theo ràng buộc cứng: khả năng tham gia theo ngày và tỷ lệ phân bổ, địa điểm, pháp nhân, cấp bậc.
3. AI xếp hạng theo mức khớp kỹ năng (ưu tiên bằng chứng đã được xác nhận) và nguyện vọng của nhân viên; nêu bằng chứng, gap và điều kiện chưa thỏa cho từng phương án.
4. HRBP và Project Manager xem xét và chọn phương án.
5. Hệ thống gửi đề xuất tới nhân viên và Line Manager hiện tại.
6. Nhân viên phản hồi; Line Manager xác nhận ngày có thể nhả người.
7. BU Head hoặc cấp có thẩm quyền duyệt.
8. Hệ thống thực hiện điều chuyển qua UC-11: cập nhật phân bổ, quyền truy cập và thông báo.
9. Sau N tuần, hệ thống thu đánh giá kết quả bố trí từ Project Manager và nhân viên.

**Luồng thay thế và ngoại lệ**

- **2a.** Không ai thỏa ràng buộc cứng: hệ thống cho biết ràng buộc nào loại nhiều người nhất và cho phép HRBP nới có kiểm soát (ngày bắt đầu, tỷ lệ phân bổ).
- **3a.** Chỉ khớp một phần: AI đề xuất kèm lộ trình reskill (UC-04) và thời gian ước tính.
- **4a.** Hai nhu cầu cùng cần một người: hệ thống hiển thị xung đột và chuyển cấp có thẩm quyền quyết định thứ tự ưu tiên.
- **4b.** Không có phương án nội bộ: nhu cầu chuyển sang tuyển ngoài (UC-07), kèm ghi nhận đã tìm nội bộ.
- **6a.** Nhân viên từ chối: hệ thống ghi lý do và quay lại bước 4.
- **6b.** Line Manager không nhả người: chuyển cấp phân xử theo quy định.
- **7a.** Điều chuyển sang pháp nhân khác hoặc làm thay đổi nội dung hợp đồng: chuyển HR Ops và pháp chế xử lý theo quy trình riêng.

**Quy tắc nghiệp vụ**

- AI chỉ đề xuất phương án bố trí; AI không xếp hạng ai nên bị cắt giảm.
- "Không khớp" là kết luận về dữ liệu và điều kiện tại thời điểm tìm, không phải căn cứ cho layoff.
- Không dùng lương, tuổi, giới tính làm tín hiệu xếp hạng. Việc có dùng xếp loại hiệu suất hay không cần HR chốt; đề xuất ban đầu là không dùng.
- Điều chuyển cần sự đồng ý của nhân viên theo quy định lao động áp dụng.

**Phân vai AI và rules**

- AI: xếp hạng phương án, giải thích bằng bằng chứng.
- Rules/workflow: ràng buộc cứng, phê duyệt, cập nhật hệ thống.

**Điểm con người quyết định:** Project Manager chọn phương án; nhân viên đồng ý; Line Manager xác nhận ngày nhả người; BU Head duyệt.

**Chỉ số đo:** thời gian từ lúc nhu cầu được duyệt đến lúc xác nhận người; internal fill rate; redeployment rate; tỷ lệ phải thay người sau bố trí.

------------------------------------------------------------------------

## UC-14. Chuẩn bị buổi 1:1 với thành viên nhóm

| Mục | Nội dung |
|---|---|
| Feature nguồn | 14. AI Manager Team Operations Copilot |
| Mục tiêu | Manager vào buổi 1:1 với đủ thông tin về tình hình của nhân viên và các việc còn dở từ lần trước |
| Actor chính | Line Manager |
| Actor phụ | Employee |
| Hệ thống liên quan | PM (công việc, phân bổ), Attendance (OT, phép), HRIS (mục tiêu, checklist onboarding), ghi chú 1:1, lịch |
| Trigger | Trước buổi 1:1 theo lịch; hoặc manager yêu cầu |
| Tiền điều kiện | Manager quản lý trực tiếp nhân viên |
| Hậu điều kiện | Có bản chuẩn bị gồm tình hình, action items còn mở và gợi ý chủ đề; sau buổi, action items mới được lưu và nhắc hạn |
| Bảo đảm tối thiểu | Ghi chú 1:1 chỉ hai bên xem được |

**Luồng chính**

1. Manager mở bản chuẩn bị cho một nhân viên.
2. Hệ thống tổng hợp: workload và phân bổ, OT và phép gần đây, tiến độ mục tiêu, action items còn mở, tiến độ onboarding nếu là nhân viên mới.
3. AI tóm tắt thay đổi so với lần trước và nêu điểm đáng chú ý, ví dụ OT tăng liên tục hoặc action item quá hạn.
4. AI gợi ý chủ đề và câu hỏi mở.
5. Manager chỉnh agenda và có thể chia sẻ để nhân viên bổ sung.
6. Sau buổi, manager nhập ghi chú; AI trích action items để manager xác nhận.
7. Hệ thống lưu action items và nhắc hạn.

**Luồng thay thế và ngoại lệ**

- **2a.** Thiếu dữ liệu từ một nguồn: hệ thống nêu rõ phần thiếu.
- **3a.** Dữ liệu chạm tới thông tin nhạy cảm (sức khỏe, việc riêng): hệ thống không suy diễn và không hiển thị.
- **5a.** Nhân viên thêm chủ đề vào agenda.
- **6a.** Manager không xác nhận action items: hệ thống không lưu.

**Quy tắc nghiệp vụ**

- Chỉ dùng dữ liệu mà manager vốn đã có quyền xem.
- Không suy đoán ý định nghỉ việc hoặc tình trạng cá nhân của nhân viên.
- Ghi chú 1:1 không tự động trở thành bằng chứng đánh giá; manager phải chủ động đưa vào UC-08.

**Phân vai AI và rules**

- AI: tóm tắt, gợi ý chủ đề, trích action items.
- Rules/workflow: quyền xem, nhắc hạn.

**Điểm con người quyết định:** Line Manager quyết định nội dung buổi 1:1 và action items.

**Chỉ số đo:** thời gian chuẩn bị; tỷ lệ action items hoàn thành đúng hạn; tần suất 1:1 thực tế so với kế hoạch.

------------------------------------------------------------------------

## UC-15. Điều phối offboarding và bàn giao tri thức

| Mục | Nội dung |
|---|---|
| Feature nguồn | 15. AI Offboarding & Knowledge Continuity Agent |
| Mục tiêu | Khi một người nghỉ việc, công việc không bị gián đoạn và không còn quyền truy cập hay tài sản nào bị bỏ sót |
| Actor chính | HR Ops |
| Actor phụ | Employee nghỉ việc, Line Manager, người nhận bàn giao, IT, Finance |
| Hệ thống liên quan | HRIS, IAM, ITSM (tài sản), Payroll, kho tài liệu, workflow engine |
| Trigger | Quyết định nghỉ việc được ghi nhận trong HRIS kèm ngày làm việc cuối |
| Tiền điều kiện | Có ngày làm việc cuối; có quy trình offboarding mẫu theo loại nghỉ việc và pháp nhân |
| Hậu điều kiện | Checklist hoàn tất; tri thức bàn giao được người nhận xác nhận; tài sản và quyền truy cập được thu hồi; quyết toán xong |
| Bảo đảm tối thiểu | Quyền truy cập bị thu hồi vào ngày làm việc cuối, kể cả khi các bước khác chưa xong |

**Luồng chính**

1. HRIS phát sự kiện nghỉ việc.
2. Hệ thống tạo checklist theo vai trò, pháp nhân, tài sản và quyền mà nhân viên đang giữ, rồi khởi chạy qua UC-11.
3. Line Manager chỉ định người nhận bàn giao.
4. AI lập danh sách hạng mục cần bàn giao từ các dự án, tài liệu và hệ thống mà nhân viên phụ trách, và soạn khung tài liệu bàn giao.
5. Nhân viên hoàn thiện tài liệu; người nhận xác nhận từng hạng mục.
6. IT thu hồi tài sản; IAM thu hồi quyền truy cập theo lịch.
7. Finance và Payroll quyết toán.
8. HR Ops kiểm tra checklist và đóng hồ sơ; nhân viên được mời tham gia mạng lưới alumni nếu đồng ý.

**Luồng thay thế và ngoại lệ**

- **1a.** Nghỉ việc có hiệu lực ngay: quyền truy cập bị thu hồi ngay; manager thực hiện phần bàn giao.
- **2a.** Nhân viên rút đơn: hệ thống hủy quy trình và khôi phục các bước đã làm.
- **5a.** Bàn giao chưa xong trước ngày cuối: escalation và ghi lại các hạng mục dở dang cho manager.
- **6a.** Tài sản không thu hồi được: chuyển Finance xử lý theo chính sách.
- **6b.** Phát hiện quyền nằm ngoài danh mục (tài khoản dùng chung, khóa API): gắn cờ cho bộ phận bảo mật IT.

**Quy tắc nghiệp vụ**

- Thu hồi quyền là bước tự động theo lịch, không phụ thuộc vào AI.
- Thứ tự và thời điểm thu hồi theo chính sách bảo mật.
- Exit interview là tùy chọn và nội dung được bảo mật.

**Phân vai AI và rules**

- AI: lập danh sách bàn giao, soạn khung tài liệu, tóm tắt.
- Rules/workflow: checklist, thu hồi quyền và tài sản, quyết toán.

**Điểm con người quyết định:** Line Manager xác nhận bàn giao đạt; HR Ops đóng hồ sơ.

**Chỉ số đo:** tỷ lệ thu hồi quyền đúng ngày; tỷ lệ hạng mục bàn giao được người nhận xác nhận; thời gian hoàn tất offboarding.

------------------------------------------------------------------------

## UC-16. Xử lý nhân sự bị ảnh hưởng khi thu hẹp đơn vị

| Mục | Nội dung |
|---|---|
| Feature nguồn | 16. AI Restructuring & Transition Agent (bổ sung, nối feature 13 và 15) |
| Mục tiêu | Khi một đơn vị hoặc dự án thu hẹp, mỗi người bị ảnh hưởng được tìm phương án nội bộ trước; chỉ cắt giảm khi không còn phương án và quyết định đã qua rà soát |
| Actor chính | HRBP |
| Actor phụ | BU Head, CHRO, pháp chế, Line Manager, Employee bị ảnh hưởng, HR Ops |
| Hệ thống liên quan | HRIS, Project Management, hồ sơ kỹ năng, LMS, workflow engine |
| Trigger | Quyết định thu hẹp một đơn vị hoặc dự án được cấp có thẩm quyền phê duyệt, kèm số vị trí và ngày hiệu lực |
| Tiền điều kiện | Có quyết định thu hẹp bằng văn bản; tiêu chí xác định vị trí bị ảnh hưởng đã được pháp chế duyệt; hồ sơ kỹ năng (UC-12) của những người liên quan còn hiệu lực |
| Hậu điều kiện | Mỗi người bị ảnh hưởng có một kết quả: điều chuyển, học bù để điều chuyển, hoặc quyết định cắt giảm đã được phê duyệt và chuyển sang UC-15 |
| Bảo đảm tối thiểu | Không ai nhận thông báo cắt giảm khi chưa có rà soát của pháp chế và phê duyệt của CHRO; mọi bước đều được lưu vết |

**Luồng chính**

1. HRBP mở hồ sơ thu hẹp từ quyết định đã duyệt: đơn vị, số vị trí, ngày hiệu lực.
2. Rules lập danh sách vị trí bị ảnh hưởng theo tiêu chí đã duyệt (theo vị trí và dự án, không theo cá nhân).
3. Với từng người, hệ thống gọi UC-13 để tìm vị trí nội bộ: rules lọc ràng buộc cứng, AI xếp hạng phương án kèm bằng chứng.
4. Khi chỉ khớp một phần, AI đề xuất lộ trình học bù (UC-04) và thời gian ước tính.
5. HRBP và Line Manager trao đổi trực tiếp với từng nhân viên; nhân viên chọn và đồng ý phương án; điều chuyển chạy qua UC-13.
6. Với người không còn phương án, AI soạn hồ sơ rà soát: phương án đã thử, lý do không khả thi, quyền lợi theo chính sách, các điểm cần pháp chế xem.
7. HRBP và pháp chế rà soát từng hồ sơ, đồng thời kiểm tra danh sách có lệch bất thường theo nhóm tuổi, giới tính hay không.
8. BU Head đề xuất; CHRO phê duyệt.
9. Line Manager và HRBP thông báo trực tiếp cho nhân viên, kèm gói hỗ trợ theo chính sách.
10. Hệ thống khởi chạy offboarding (UC-15).

**Luồng thay thế và ngoại lệ**

- **3a.** Có vị trí phù hợp ở đơn vị khác nhưng đang chờ duyệt ngân sách: hệ thống giữ hồ sơ ở trạng thái chờ đến hạn N ngày rồi báo HRBP.
- **5a.** Nhân viên từ chối mọi phương án nội bộ: ghi lý do, chuyển sang bước 6.
- **5b.** Nhân viên muốn tự tìm cơ hội: hệ thống mở UC-05 với ưu tiên hiển thị cho người thuộc diện bị ảnh hưởng.
- **7a.** Hồ sơ có cờ bảo vệ (thai sản, nghỉ ốm dài ngày, đang khiếu nại, đại diện người lao động): dừng luồng, pháp chế xử lý theo quy định lao động áp dụng.
- **7b.** Phát hiện lệch bất thường theo nhóm: trả về bước 2 để xem lại tiêu chí.
- **8a.** CHRO yêu cầu tìm thêm phương án: trả hồ sơ về bước 3 kèm ghi chú.
- **10a.** Trong thời gian báo trước xuất hiện vị trí nội bộ phù hợp: HRBP có thể mở lại bước 3 nếu nhân viên đồng ý.

**Quy tắc nghiệp vụ**

- AI không chọn, không chấm điểm và không xếp hạng ai nên bị cắt giảm. AI chỉ tìm phương án bố trí và soạn hồ sơ.
- Bố trí lại và học bù luôn được xét trước cắt giảm.
- Không dùng tuổi, giới tính, lương, tình trạng sức khỏe, thai sản, nghỉ ốm làm tiêu chí ở bất kỳ bước nào.
- Kết quả "không có phương án" ở UC-13 chỉ là dữ liệu đầu vào cho người rà soát, không tự động dẫn tới cắt giảm.
- Việc có dùng xếp loại hiệu suất làm tiêu chí hay không do HR và pháp chế chốt; đề xuất ban đầu là không dùng.
- Thông báo cắt giảm do con người thực hiện trực tiếp; hệ thống không gửi thông báo tự động.
- Thời hạn báo trước, trợ cấp và thủ tục tuân theo quy định lao động áp dụng cho từng pháp nhân.

**Phân vai AI và rules**

- AI: xếp hạng phương án nội bộ, đề xuất học bù, soạn hồ sơ rà soát, tóm tắt tiến độ cho HRBP.
- Rules/workflow: danh sách vị trí bị ảnh hưởng, cờ bảo vệ, thứ tự bước, phê duyệt, lưu vết.

**Điểm con người quyết định:** nhân viên đồng ý phương án điều chuyển; pháp chế rà soát; BU Head đề xuất; CHRO phê duyệt cắt giảm.

**Chỉ số đo:** tỷ lệ người bị ảnh hưởng được bố trí lại (redeployment rate); thời gian từ quyết định thu hẹp đến khi mỗi người có kết quả; tỷ lệ khiếu nại sau quyết định; tỷ lệ người điều chuyển còn làm việc sau N tháng.
