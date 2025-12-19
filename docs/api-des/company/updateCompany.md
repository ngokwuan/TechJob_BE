# Update Company Profile

## Endpoint

`PATCH /companies/`

## Cookies

| Cookie | Value   |
| ------ | ------- |
| token  | {token} |

## Request Data

| JSON Key         | Data Type | Required | Value Description             |
| ---------------- | --------- | -------- | ----------------------------- |
| companyName      | string    |          | Tên công ty                   |
| address          | string    |          | Địa chỉ                       |
| cityId           | string    |          | ID thành phố                  |
| companyEmployees | string    |          | Số lượng nhân viên            |
| companyModel     | string    |          | Mô hình công ty               |
| description      | string    |          | Mô tả công ty                 |
| images           | string    |          | URL ảnh công ty               |
| phone            | string    |          | Số điện thoại                 |
| workOverTime     | string    |          | Chế độ làm thêm giờ           |
| workingTime      | string    |          | Giờ làm việc (vd: 8:00-17:00) |
| logo             | string    |          | URL logo công ty              |
| password         | string    |          | Mật khẩu mới (nếu muốn đổi)   |

## Response Data

| JSON Key         | Data Type | Required | Value Description             |
| ---------------- | --------- | -------- | ----------------------------- |
| id               | string    |          | Id công ty                    |
| companyName      | string    |          | Tên công ty                   |
| address          | string    |          | Địa chỉ                       |
| companyEmployees | string    |          | Số lượng nhân viên            |
| companyModel     | string    |          | Mô hình công ty               |
| phone            | string    |          | Số điện thoại                 |
| workOverTime     | string    |          | Chế độ làm thêm giờ           |
| workingTime      | string    |          | Giờ làm việc (vd: 8:00-17:00) |
| description      | string    |          | Mô tả công ty                 |
| images           | string    |          | URL ảnh công ty               |
| logo             | string    |          | URL logo công ty              |
| updatedAt        | string    |          | Ngày cập nhật                 |
| cityId           | string    |          | ID thành phố                  |

## Status

| Status | Message               | Error Reason                    |
| ------ | --------------------- | ------------------------------- |
| 200    | Successful            | -                               |
| 400    | Bad Request           | Dữ liệu không hợp lệ            |
| 401    | Unauthorized          | Token không hợp lệ              |
| 403    | Forbidden             | Không có quyền chỉnh sửa cv này |
| 500    | Internal Server Error | -                               |
