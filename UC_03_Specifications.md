# Đặc tả use case

Tài liệu này đặc tả 15 use case trong [UC_01_Catalog.md](UC_01_Catalog.md), mỗi feature của [AI_Workforce_Ecosystem.md](AI_Workforce_Ecosystem.md) một use case. Sơ đồ nằm ở [UC_02_Diagrams.md](UC_02_Diagrams.md).

Cách đọc:

- Tài liệu gốc chỉ mô tả mỗi feature bằng một dòng. Các luồng, quy tắc nghiệp vụ và ngưỡng trong tài liệu này là **đề xuất để kiểm chứng** với HR, pháp chế và đơn vị vận hành, chưa phải yêu cầu đã chốt. Các giá trị cấu hình được viết là N.
- Mã bước như **3a** nghĩa là nhánh rẽ từ bước 3 của luồng chính.
- **Bảo đảm tối thiểu** là điều hệ thống phải giữ đúng ngay cả khi use case thất bại.

Mục lục:

- Nhóm A, Employee AI: [UC-01](#uc-01-tra-cứu-trạng-thái-ứng-tuyển-và-thủ-tục-nhận-việc), [UC-02](#uc-02-tạo-và-theo-dõi-yêu-cầu-nghỉ-phép-qua-hội-thoại), [UC-03](#uc-03-tìm-và-tóm-tắt-tri-thức-nội-bộ), [UC-04](#uc-04-lập-lộ-trình-học-theo-skill-gap), [UC-05](#uc-05-khám-phá-và-bày-tỏ-quan-tâm-tới-cơ-hội-nội-bộ)
- Nhóm B, HR Management AI: [UC-06](#uc-06-phân-tích-chênh-lệch-cungcầu-nhân-lực-của-đơn-vị), [UC-07](#uc-07-sàng-lọc-và-xếp-hạng-hồ-sơ-ứng-viên-cho-một-vị-trí), [UC-08](#uc-08-tổng-hợp-hồ-sơ-bằng-chứng-cho-kỳ-đánh-giá), [UC-09](#uc-09-phát-hiện-và-xử-lý-bất-thường-côngot-trước-kỳ-chốt-lương), [UC-10](#uc-10-phân-tích-sức-khỏe-tổ-chức-ở-cấp-đơn-vị)
- Nhóm C, HR Ecosystem AI: [UC-11](#uc-11-điều-phối-một-yêu-cầu-xuyên-phòng-ban), [UC-12](#uc-12-xây-dựng-và-xác-thực-hồ-sơ-kỹ-năng), [UC-13](#uc-13-đề-xuất-phương-án-bố-trí-nhân-sự-cho-một-nhu-cầu-dự-án), [UC-14](#uc-14-chuẩn-bị-buổi-11-với-thành-viên-nhóm), [UC-15](#uc-15-điều-phối-offboarding-và-bàn-giao-tri-thức)

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

## UC-04. Lập lộ trình học theo skill gap

| Mục | Nội dung |
|---|---|
| Feature nguồn | 4. AI Learning & Skill Growth Coach |
| Mục tiêu | Nhân viên biết mình thiếu kỹ năng gì cho vai trò mục tiêu và có kế hoạch học cụ thể |
| Actor chính | Employee |
| Actor phụ | Line Manager, Mentor |
| Hệ thống liên quan | Hồ sơ kỹ năng (UC-12), LMS, danh mục vai trò và yêu cầu kỹ năng |
| Trigger | Nhân viên chọn một vai trò mục tiêu, hoặc được mời từ UC-05 hay UC-13 khi có skill gap |
| Tiền điều kiện | Nhân viên có hồ sơ kỹ năng; vai trò mục tiêu có yêu cầu kỹ năng được định nghĩa |
| Hậu điều kiện | Lộ trình học được lưu, có mốc thời gian và gắn với khóa học trong LMS |
| Bảo đảm tối thiểu | Không ghi danh khóa học có phí khi chưa được duyệt |

**Luồng chính**

1. Nhân viên chọn vai trò hoặc cơ hội mục tiêu.
2. Hệ thống so sánh kỹ năng hiện có với yêu cầu và liệt kê gap theo mức độ.
3. AI đề xuất khóa học, hoạt động thực hành, mentor và thứ tự học, kèm lý do cho từng đề xuất.
4. Nhân viên điều chỉnh và chọn.
5. Hệ thống lưu lộ trình và ghi danh các khóa đã được cấp sẵn.
6. Khi nhân viên hoàn thành một mục, hồ sơ kỹ năng nhận thêm bằng chứng loại "đã học" (UC-12).

**Luồng thay thế và ngoại lệ**

- **2a.** Hồ sơ kỹ năng thiếu hoặc đã cũ: hệ thống đề nghị cập nhật trước (UC-12).
- **3a.** Không có khóa nội bộ phù hợp: AI nói rõ và gợi ý nguồn bên ngoài cần duyệt ngân sách.
- **3b.** Mentor từ chối hoặc hết chỗ: hệ thống đề xuất người khác.
- **5a.** Khóa học có phí hoặc chiếm giờ làm việc: hệ thống gửi Line Manager duyệt.

**Quy tắc nghiệp vụ**

- Hoàn thành khóa học chỉ được ghi là bằng chứng "đã học", không tự nâng mức thành thạo.
- Chỉ đề xuất mentor trong số những người đã đăng ký làm mentor.
- Skill gap chỉ hiển thị cho nhân viên và manager trực tiếp.

**Phân vai AI và rules**

- AI: phân tích gap, gợi ý, giải thích.
- Rules/workflow: ngân sách, duyệt, ghi danh.

**Điểm con người quyết định:** nhân viên chọn lộ trình; Line Manager duyệt chi phí và thời gian.

**Chỉ số đo:** tỷ lệ lộ trình được bắt đầu và hoàn thành; số gap được đóng có bằng chứng thực hành.

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

## UC-07. Sàng lọc và xếp hạng hồ sơ ứng viên cho một vị trí

| Mục | Nội dung |
|---|---|
| Feature nguồn | 7. AI Talent Acquisition Copilot |
| Mục tiêu | Recruiter chốt shortlist nhanh hơn với căn cứ rõ ràng cho từng hồ sơ |
| Actor chính | Recruiter |
| Actor phụ | Hiring Manager |
| Hệ thống liên quan | ATS |
| Trigger | Một vị trí có hồ sơ mới cần sàng lọc |
| Tiền điều kiện | Yêu cầu tuyển đã được duyệt; JD có tiêu chí bắt buộc và tiêu chí ưu tiên; ứng viên đã đồng ý cho xử lý dữ liệu |
| Hậu điều kiện | Mỗi hồ sơ có bản đánh giá theo tiêu chí kèm bằng chứng từ CV; quyết định shortlist của Recruiter được ghi lại |
| Bảo đảm tối thiểu | Không hồ sơ nào bị loại tự động |

**Luồng chính**

1. Recruiter mở vị trí và xác nhận bộ tiêu chí sàng lọc.
2. AI trích xuất thông tin có cấu trúc từ CV: kỹ năng, kinh nghiệm, chứng chỉ.
3. Rules kiểm tra các tiêu chí bắt buộc.
4. AI đánh giá mức khớp theo từng tiêu chí, dẫn đoạn CV làm bằng chứng và nêu các điểm chưa rõ cần hỏi thêm.
5. Hệ thống hiển thị danh sách xếp hạng kèm giải thích.
6. Recruiter rà soát, điều chỉnh và quyết định shortlist.
7. Hệ thống cập nhật trạng thái trong ATS và ghi lại các trường hợp Recruiter quyết định khác đề xuất.
8. Hiring Manager nhận shortlist.

**Luồng thay thế và ngoại lệ**

- **2a.** CV không đọc được hoặc thiếu thông tin: hệ thống gắn cờ để rà soát thủ công.
- **2b.** CV chứa văn bản ẩn hoặc câu lệnh nhằm thao túng kết quả: hệ thống bỏ qua câu lệnh và gắn cờ cho Recruiter.
- **4a.** Tiêu chí trong JD mơ hồ: hệ thống yêu cầu Recruiter làm rõ trước khi chấm.
- **6a.** Recruiter không đồng ý với xếp hạng: hệ thống ghi lý do để dùng cho việc đánh giá chất lượng đề xuất.

**Quy tắc nghiệp vụ**

- Không dùng tuổi, giới tính, ảnh, tình trạng hôn nhân, quê quán làm tín hiệu.
- AI không tự loại hồ sơ; mỗi nhận định phải dẫn được bằng chứng trong CV.
- Định kỳ kiểm tra chênh lệch tỷ lệ shortlist giữa các nhóm ứng viên.

**Phân vai AI và rules**

- AI: trích xuất, so khớp, giải thích.
- Rules/workflow: tiêu chí bắt buộc, trạng thái hồ sơ, lưu vết quyết định.

**Điểm con người quyết định:** Recruiter quyết định shortlist; Hiring Manager quyết định phỏng vấn và tuyển.

**Chỉ số đo:** thời gian sàng lọc mỗi vị trí; tỷ lệ Recruiter đồng ý với đề xuất; time-to-hire; chênh lệch tỷ lệ shortlist giữa các nhóm.

------------------------------------------------------------------------

## UC-08. Tổng hợp hồ sơ bằng chứng cho kỳ đánh giá

| Mục | Nội dung |
|---|---|
| Feature nguồn | 8. AI Performance & Talent Review Copilot |
| Mục tiêu | Manager viết đánh giá dựa trên bằng chứng của cả kỳ, không chỉ dựa vào trí nhớ về vài tuần gần nhất |
| Actor chính | Line Manager |
| Actor phụ | Employee, HRBP |
| Hệ thống liên quan | HRIS (mục tiêu, đánh giá), PM, LMS, kho feedback |
| Trigger | Kỳ đánh giá mở và manager bắt đầu đánh giá một nhân viên |
| Tiền điều kiện | Manager là người đánh giá được chỉ định; nhân viên có mục tiêu đã đăng ký |
| Hậu điều kiện | Có hồ sơ bằng chứng theo từng mục tiêu, truy được nguồn; manager đã viết nhận xét và xếp loại; nhân viên xem được bằng chứng đã dùng |
| Bảo đảm tối thiểu | AI không tạo ra xếp loại hay điểm số |

**Luồng chính**

1. Manager chọn nhân viên và kỳ đánh giá.
2. Hệ thống thu thập mục tiêu, kết quả đã ghi nhận, feedback đã gửi, đóng góp trong dự án và kết quả học tập.
3. AI sắp xếp bằng chứng theo từng mục tiêu, tóm tắt và chỉ ra mục tiêu còn thiếu bằng chứng.
4. Manager rà soát, loại bỏ hoặc bổ sung bằng chứng.
5. Theo yêu cầu của manager, AI soạn nháp nhận xét, mỗi ý gắn với bằng chứng.
6. Manager chỉnh sửa, tự xếp loại và gửi.
7. Nhân viên xem đánh giá cùng bằng chứng và phản hồi.
8. HRBP dùng hồ sơ cho phiên calibration.

**Luồng thay thế và ngoại lệ**

- **2a.** Nguồn chứa dữ liệu nhạy cảm (sức khỏe, lý do nghỉ ốm): hệ thống loại khỏi hồ sơ.
- **3a.** Bằng chứng mỏng hoặc dồn về cuối kỳ: hệ thống cảnh báo và gợi ý thu thêm feedback.
- **4a.** Nhân viên bổ sung tự đánh giá và bằng chứng của mình.
- **7a.** Nhân viên không đồng ý: mở luồng phản hồi theo quy trình đánh giá.

**Quy tắc nghiệp vụ**

- AI không đề xuất xếp loại, điểm số hoặc mức thưởng.
- Mọi ý trong bản nháp phải có nguồn.
- Không dùng nội dung hội thoại với copilot hoặc dữ liệu giám sát hoạt động làm bằng chứng.
- Thời gian nghỉ ốm, thai sản không được tính là bằng chứng bất lợi.

**Phân vai AI và rules**

- AI: tổng hợp, sắp xếp, soạn nháp.
- Rules/workflow: chu kỳ đánh giá, quyền xem, lưu vết.

**Điểm con người quyết định:** Line Manager chịu trách nhiệm về nhận xét và xếp loại; HRBP chủ trì calibration.

**Chỉ số đo:** thời gian chuẩn bị mỗi bản đánh giá; tỷ lệ nhận xét có bằng chứng; tỷ lệ khiếu nại sau đánh giá.

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
