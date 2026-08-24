# tkw_2551050208_thang
Chủ đề : Hỗ trợ tìm việc 
sản phẩm : công viên phù hợp
Màu thương hiệu : màu tím đậm #4e2a84
màu nhấn: xanh dương nhạt #836eaa
màu chữ : đen
màu chữ phụ: 
màu nền : trắng
viền:
phông tiêu đề:
phông nội dung:
H1/H2/H3:
padding dọc:
bo góc thẻ: 



--color-brand-(100-600-700-900)
--color-accent-(300-400-500)
--color-ink-(invert-   -muted--muted-invert)
--color-line(-invert-  - )
--color-surface(-alt-  -dark--dark-alt --)

Font:
--font-display: "Be VietNam Pro" , system-ui, sans-serif;
--font-body: "Inter", system-ui, sans-serif;

Bo góc:
--radus-card: 0.875rem (tùy vào bản thân)
--radus-pill: 9999px

Bảng quy đổi:
Figma   Tailwindcss
2px     rounded-sm
4px     rounded
6       rounded-md
8       rounded-lg // qtrong 
12      rounded-xl
16      rounded-2xl
24      rounded-3xl
9999px  rounded-full Bo ttròn hoàn toàn

1rem = 16px

# TKW - Thực Hành Thiết Kế Web | Buổi 5: Dữ liệu, Kiểm tra dữ liệu, Hoàn thiện và Phát hành

- **Mã sinh viên / Tên dự án:** `tkw_2551050208_thang`[cite: 2]
- **Chủ đề:** Hỗ trợ tìm việc - Sản phẩm công viên phù hợp[cite: 2]
- **Giảng viên hướng dẫn:** ThS Võ Việt Khoa

---

## 📸 Ảnh chụp màn hình (Screenshots)

*(Chèn ảnh chụp giao diện trang chủ, trang quản lý dữ liệu động, form liên hệ/kiểm tra dữ liệu, và trạng thái responsive tại đây)*
- Giao diện tổng quan trang quản lý dữ liệu động (Trang 4):
- Giao diện form với Constraint Validation API:

---

## 🔗 Liên kết dự án (Links)

- **Link Demo công khai:**  https://thangngao246-aqua.github.io/tkw_2551050208_thang/
- **Link File thiết kế Figma:** [https://www.figma.com/design/cLuQm2RXEdm7yeAfA0m64u/Untitled?node-id=1-18&t=5TWlv0xfPg7q1INO-1]

---

## ✨ Danh sách tính năng đã hoàn thiện

1. **Mô hình State $\rightarrow$ Render động:**
   - Quản lý toàn bộ trạng thái giao diện qua một đối tượng `state` chung (dữ liệu bản ghi, từ khóa tìm kiếm, bộ lọc danh mục/trạng thái, thứ tự sắp xếp, trạng thái loading/lỗi).
   - Mọi thao tác người dùng chỉ cập nhật `state` và gọi hàm `render()` duy nhất một lần để tránh xung đột DOM.
2. **Quản lý dữ liệu bất đồng bộ & 4 Trạng thái giao diện:**
   - Sử dụng `fetch` kết hợp `async/await` để nạp dữ liệu từ tệp `data/records.json`[cite: 1].
   - Đảm bảo hiển thị đầy đủ 4 trạng thái giao diện thực tế: **Loading (khung xương/skeleton)**, **Có dữ liệu**, **Rỗng (không tìm thấy kết quả)**, và **Lỗi (khi máy chủ hoặc file JSON gặp sự cố, bao gồm nút khôi phục dữ liệu mẫu)**[cite: 1].
3. **Tìm kiếm, Lọc, Sắp xếp kết hợp & Tối ưu hiệu năng:**
   - Kết hợp mượt mà giữa tính năng tìm kiếm theo từ khóa, lọc theo danh mục, lọc theo trạng thái và sắp xếp theo ngày/số lượng mà không làm mất trạng thái của nhau[cite: 1].
   - Áp dụng kỹ thuật **Debounce (300ms)** cho ô tìm kiếm giúp tối ưu hiệu năng, tránh giật lag giao diện khi gõ phím liên tục[cite: 1].
4. **Bảo mật và Lưu trữ dữ liệu an toàn:**
   - Xây dựng dòng render an toàn sử dụng thẻ `<template>` kết hợp `textContent` để phòng chống tuyệt đối lỗ hổng bảo mật **XSS** (Cross-Site Scripting) do dữ liệu người dùng nhập vào[cite: 1].
   - Tích hợp **localStorage** để lưu trữ và giữ nguyên dữ liệu sau khi người dùng thực hiện thêm/xóa bản ghi và refresh lại trang[cite: 1].
5. **Kiểm tra dữ liệu Form (Form Validation):**
   - Sử dụng **Constraint Validation API** (`checkValidity()`, `validity`) kết hợp thuộc tính `novalidate` để tùy chỉnh thông báo lỗi hoàn toàn bằng tiếng Việt, hướng dẫn chi tiết cách sửa lỗi cho người dùng[cite: 1].
   - Tự động gắn cờ `aria-invalid="true"` cho các ô nhập liệu không hợp lệ và tự động đưa tiêu điểm (`focus()`) về ô lỗi đầu tiên kèm dòng tóm tắt khi form submit thất bại[cite: 1].
6. **Chất lượng code & Tiêu chuẩn kỹ thuật:**
   - Bản build production đạt chỉ số **Lighthouse Accessibility $\ge 95$**[cite: 1].
   - Giao diện hỗ trợ điều hướng toàn diện bằng bàn phím (`Tab`, định nghĩa rõ vùng `focus-visible`), đảm bảo độ tương phản màu sắc đạt chuẩn WCAG[cite: 1].
   - Console sạch sẽ, không có lỗi, cảnh báo hay request `404`[cite: 1].

---

## 🚀 Hướng dẫn chạy dự án

### 1. Cài đặt môi trường
Đảm bảo máy tính của bạn đã cài đặt [Node.js](https://nodejs.org/).

### 2. Các bước chạy ở môi trường phát triển (Development)
```bash
# Clone repository về máy
git clone <repository-url>

# Di chuyển vào thư mục dự án
cd tkw_2551050208_thang

# Cài đặt các gói phụ thuộc (nếu có)
npm install

# Khởi động máy chủ phát triển (hoặc dùng Live Server trong VS Code)
npx serve
