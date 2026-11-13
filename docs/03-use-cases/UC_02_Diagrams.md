# Use case diagram

Tài liệu này vẽ quan hệ giữa actor và 16 use case trong [UC_01_Catalog.md](UC_01_Catalog.md). Đặc tả từng use case nằm ở [UC_03_Specifications.md](UC_03_Specifications.md).

Mermaid không có ký hiệu use case chuẩn UML, nên sơ đồ dùng flowchart với quy ước sau:

| Ký hiệu | Ý nghĩa |
|---|---|
| Hộp chữ nhật có nhãn «actor» | Actor |
| Hình bo tròn | Use case |
| Khung bao quanh | Ranh giới hệ thống hoặc nhóm sản phẩm |
| Đường đậm | Actor chính của use case |
| Đường thường | Actor phụ của use case |
| Mũi tên nét đứt «include» | Use case gốc luôn gọi use case được trỏ tới |
| Mũi tên nét đứt «extend» | Use case ở gốc mũi tên chỉ chạy thêm vào use case được trỏ tới khi có điều kiện |

Line Manager cũng là một Employee, nên thực hiện được mọi use case của Employee; sơ đồ không vẽ lại các đường này.

## 1. Tổng quan: actor chính và 16 use case

Actor phía nhân viên nằm bên trái, actor phía HR nằm bên phải. Thứ tự khai báo trong mã được sắp ngược để Mermaid vẽ ít đường cắt nhau nhất.

```mermaid
flowchart LR
    LM["«actor»<br/>Line Manager"]
    EMP["«actor»<br/>Employee"]
    CAND["«actor»<br/>Candidate / New Hire"]

    subgraph SYS["AI Workforce Ecosystem"]
        subgraph GC["C. HR Ecosystem AI"]
            UC15(["UC-15 Điều phối offboarding<br/>và bàn giao tri thức"])
            UC16(["UC-16 Xử lý nhân sự bị ảnh hưởng<br/>khi thu hẹp đơn vị"])
            UC13(["UC-13 Đề xuất phương án<br/>bố trí nhân sự"])
            UC14(["UC-14 Chuẩn bị buổi 1-1"])
            UC12(["UC-12 Xây dựng và xác thực<br/>hồ sơ kỹ năng"])
            UC11(["UC-11 Điều phối yêu cầu<br/>xuyên phòng ban"])
        end
        subgraph GB["B. HR Management AI"]
            UC09(["UC-09 Xử lý bất thường công và OT<br/>trước chốt lương"])
            UC10(["UC-10 Phân tích sức khỏe tổ chức<br/>cấp đơn vị"])
            UC06(["UC-06 Phân tích chênh lệch<br/>cung–cầu nhân lực"])
            UC07(["UC-07 Sàng lọc hồ sơ &<br/>sinh đề test ứng viên"])
            UC08(["UC-08 Đánh giá hiệu suất,<br/>Calibration & Merit Planning"])
        end
        subgraph GA["A. Employee AI"]
            UC05(["UC-05 Khám phá<br/>cơ hội nội bộ"])
            UC04(["UC-04 Lộ trình IDP/PIP &<br/>bài test thích ứng LMS"])
            UC03(["UC-03 Tìm và tóm tắt<br/>tri thức nội bộ"])
            UC02(["UC-02 Tạo và theo dõi<br/>yêu cầu nghỉ phép"])
            UC01(["UC-01 Tra cứu trạng thái ứng tuyển<br/>và thủ tục nhận việc"])
        end
    end

    OPS["«actor»<br/>HR Ops / Payroll"]
    HRBP["«actor»<br/>HRBP"]
    REC["«actor»<br/>Recruiter"]

    LM === UC14
    LM === UC11
    LM === UC08
    EMP === UC12
    EMP === UC11
    EMP === UC05
    EMP === UC04
    EMP === UC03
    EMP === UC02
    CAND === UC01

    UC15 === OPS
    UC09 === OPS
    UC16 === HRBP
    UC13 === HRBP
    UC10 === HRBP
    UC06 === HRBP
    UC07 === REC
```

## 2. Nhóm A: Employee AI

```mermaid
flowchart LR
    CAND["«actor»<br/>Candidate / New Hire"]
    EMP["«actor»<br/>Employee"]

    subgraph GA["A. Employee AI"]
        UC01(["UC-01 Tra cứu trạng thái ứng tuyển<br/>và thủ tục nhận việc"])
        UC02(["UC-02 Tạo và theo dõi<br/>yêu cầu nghỉ phép"])
        UC03(["UC-03 Tìm và tóm tắt<br/>tri thức nội bộ"])
        UC04(["UC-04 Lập & thực thi lộ trình IDP/PIP<br/>kèm bài test thích ứng LMS"])
        UC05(["UC-05 Khám phá<br/>cơ hội nội bộ"])
    end

    REC["«actor»<br/>Recruiter"]
    OPS["«actor»<br/>HR Ops"]
    LM["«actor»<br/>Line Manager"]
    MEN["«actor»<br/>Mentor"]
    HM["«actor»<br/>Hiring / Project Manager"]
    HRBP["«actor»<br/>HRBP"]

    CAND === UC01
    EMP === UC02
    EMP === UC03
    EMP === UC04
    EMP === UC05

    UC01 --- REC
    UC01 --- OPS
    UC02 --- OPS
    UC02 --- LM
    UC04 --- LM
    UC04 --- MEN
    UC05 --- HM
    UC05 --- HRBP
```

## 3. Nhóm B: HR Management AI

```mermaid
flowchart LR
    HRBP["«actor»<br/>HRBP"]
    REC["«actor»<br/>Recruiter"]
    LM["«actor»<br/>Line Manager"]
    PAY["«actor»<br/>Payroll Specialist"]

    subgraph GB["B. HR Management AI"]
        UC06(["UC-06 Phân tích chênh lệch<br/>cung–cầu nhân lực"])
        UC07(["UC-07 Sàng lọc và xếp hạng<br/>hồ sơ ứng viên"])
        UC08(["UC-08 Đánh giá hiệu suất,<br/>Calibration & Merit Planning"])
        UC09(["UC-09 Xử lý bất thường công và OT<br/>trước chốt lương"])
        UC10(["UC-10 Phân tích sức khỏe tổ chức<br/>cấp đơn vị"])
    end

    BUH["«actor»<br/>BU Head"]
    FIN["«actor»<br/>Finance"]
    HM["«actor»<br/>Hiring Manager"]
    EMP["«actor»<br/>Employee"]
    CHRO["«actor»<br/>CHRO"]

    HRBP === UC06
    HRBP === UC10
    HRBP === UC08
    REC === UC07
    LM === UC08
    PAY === UC09

    LM --- UC09

    UC06 --- BUH
    UC06 --- FIN
    UC07 --- HM
    UC08 --- BUH
    UC08 --- FIN
    UC08 --- EMP
    UC09 --- EMP
    UC10 --- BUH
    UC10 --- CHRO
```

## 4. Nhóm C: HR Ecosystem AI

```mermaid
flowchart LR
    EMP["«actor»<br/>Employee"]
    LM["«actor»<br/>Line Manager"]
    HRBP["«actor»<br/>HRBP"]
    OPS["«actor»<br/>HR Ops"]

    subgraph GC["C. HR Ecosystem AI"]
        UC11(["UC-11 Điều phối yêu cầu<br/>xuyên phòng ban"])
        UC12(["UC-12 Xây dựng và xác thực<br/>hồ sơ kỹ năng"])
        UC13(["UC-13 Đề xuất phương án<br/>bố trí nhân sự"])
        UC14(["UC-14 Chuẩn bị buổi 1-1"])
        UC15(["UC-15 Điều phối offboarding<br/>và bàn giao tri thức"])
        UC16(["UC-16 Xử lý nhân sự bị ảnh hưởng<br/>khi thu hẹp đơn vị"])
    end

    IT["«actor»<br/>IT"]
    FIN["«actor»<br/>Finance"]
    PM["«actor»<br/>Project Manager"]
    BUH["«actor»<br/>BU Head"]
    CHRO["«actor»<br/>CHRO"]
    LEGAL["«actor»<br/>Pháp chế"]

    EMP === UC11
    EMP === UC12
    LM === UC11
    LM === UC14
    HRBP === UC13
    HRBP === UC16
    OPS === UC15

    OPS --- UC11
    LM --- UC12
    HRBP --- UC12
    EMP --- UC13
    LM --- UC13
    EMP --- UC14
    EMP --- UC15
    LM --- UC15
    EMP --- UC16
    LM --- UC16
    OPS --- UC16

    UC11 --- IT
    UC11 --- FIN
    UC13 --- PM
    UC13 --- BUH
    UC15 --- IT
    UC15 --- FIN
    UC16 --- BUH
    UC16 --- CHRO
    UC16 --- LEGAL
```

## 5. Quan hệ giữa các use case

Sơ đồ này có thêm hai loại mũi tên không thuộc UML, dùng để thể hiện luồng giá trị giữa các use case:

- Mũi tên đậm "dữ liệu kỹ năng": use case đích đọc hồ sơ do UC-12 tạo ra.
- Mũi tên liền "nối tiếp": kết quả của use case trước là đầu vào của use case sau.

```mermaid
flowchart LR
    UC01(["UC-01 Tra cứu trạng thái<br/>ứng tuyển"])
    UC02(["UC-02 Yêu cầu nghỉ phép"])
    UC04(["UC-04 Lộ trình học"])
    UC05(["UC-05 Cơ hội nội bộ"])
    UC06(["UC-06 Chênh lệch cung–cầu"])
    UC07(["UC-07 Sàng lọc hồ sơ"])
    UC08(["UC-08 Bằng chứng đánh giá"])
    UC09(["UC-09 Bất thường công và OT"])
    UC11(["UC-11 Điều phối yêu cầu"])
    UC12(["UC-12 Hồ sơ kỹ năng"])
    UC13(["UC-13 Phương án bố trí"])
    UC14(["UC-14 Chuẩn bị 1-1"])
    UC15(["UC-15 Offboarding"])
    UC16(["UC-16 Thu hẹp đơn vị"])

    UC02 -. "«include»" .-> UC11
    UC13 -. "«include»" .-> UC11
    UC15 -. "«include»" .-> UC11
    UC16 -. "«include»" .-> UC13

    UC11 -. "«extend»" .-> UC01
    UC11 -. "«extend»" .-> UC09
    UC04 -. "«extend»" .-> UC05
    UC04 -. "«extend»" .-> UC13
    UC15 -. "«extend»" .-> UC16

    UC12 == "dữ liệu kỹ năng" ==> UC04
    UC12 == "dữ liệu kỹ năng" ==> UC05
    UC12 == "dữ liệu kỹ năng" ==> UC06
    UC12 == "dữ liệu kỹ năng" ==> UC13
    UC04 == "kết quả test xác thực kỹ năng" ==> UC12

    UC06 -- "nối tiếp" --> UC13
    UC06 -- "nối tiếp" --> UC16
    UC13 -- "nối tiếp" --> UC07
    UC14 -- "nối tiếp" --> UC08
    UC08 -- "nối tiếp (IDP/PIP)" --> UC04
    UC08 -- "chốt quỹ thưởng" --> UC09
```

UC-03 và UC-10 không có quan hệ với use case khác nên không xuất hiện trong sơ đồ này.

| Quan hệ | Loại | Diễn giải |
|---|---|---|
| UC-02 gọi UC-11 | «include» | Yêu cầu nghỉ phép sau khi được nhân viên xác nhận luôn được chuyển cho bộ điều phối để duyệt và theo dõi |
| UC-13 gọi UC-11 | «include» | Phương án bố trí được duyệt luôn được thực hiện qua bộ điều phối: cập nhật phân bổ, quyền truy cập, thông báo |
| UC-15 gọi UC-11 | «include» | Checklist offboarding luôn chạy trên bộ điều phối |
| UC-16 gọi UC-13 | «include» | Mỗi người bị ảnh hưởng luôn được tìm phương án bố trí nội bộ trước khi xét cắt giảm |
| UC-15 mở rộng UC-16 | «extend» | Chỉ khi quyết định cắt giảm được phê duyệt thì offboarding mới khởi chạy |
| UC-11 mở rộng UC-01 | «extend» | Chỉ khi câu hỏi của ứng viên là một thủ tục cần xử lý, ví dụ đổi lịch phỏng vấn hoặc bổ sung hồ sơ |
| UC-11 mở rộng UC-09 | «extend» | Chỉ khi một bất thường cần nhân viên hoặc manager xác nhận |
| UC-04 mở rộng UC-05 | «extend» | Chỉ khi cơ hội nhân viên quan tâm còn skill gap |
| UC-04 mở rộng UC-13 | «extend» | Chỉ khi phương án bố trí khớp một phần và cần reskill |
| UC-12 cấp dữ liệu cho UC-04, 05, 06, 13 | Dữ liệu | Bốn use case này đọc hồ sơ kỹ năng; chất lượng của chúng phụ thuộc độ phủ và độ mới của hồ sơ |
| UC-04 cập nhật UC-12 | Dữ liệu | Điểm số các bài test checkpoint mốc lộ trình và test benchmark định kỳ từ LMS được cập nhật ngược vào hồ sơ kỹ năng |
| UC-06 nối tiếp UC-13 | Nối tiếp | Gap được chọn đóng bằng nội bộ trở thành nhu cầu nhân lực để tìm phương án bố trí |
| UC-06 nối tiếp UC-16 | Nối tiếp | Khi phân tích cung–cầu dẫn tới quyết định thu hẹp, danh sách vị trí dư trở thành đầu vào của UC-16 |
| UC-13 nối tiếp UC-07 | Nối tiếp | Khi không có phương án nội bộ, nhu cầu chuyển sang tuyển ngoài (kèm sinh đề test ứng viên theo role) |
| UC-14 nối tiếp UC-08 | Nối tiếp | Ghi chú 1:1 và tiến độ action items được gom làm bằng chứng đánh giá |
| UC-08 nối tiếp UC-04 | Nối tiếp (Lộ trình) | Kết quả xếp loại tự động kích hoạt lập lộ trình IDP cho loại A (cán bộ nguồn/kế nhiệm) hoặc bản cam kết PIP 90 ngày cho loại C |
| UC-08 nối tiếp UC-09 | Nối tiếp | Kết quả phân bổ quỹ thưởng sau khi Hội đồng HR duyệt được chuyển sang Payroll để chi trả kỳ cuối năm |
