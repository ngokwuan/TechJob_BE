# Get all companies with admin role

## Endpoint

`GET admin/companies/all`

## Cookies

| Cookie | Value   |
| ------ | ------- |
| token  | {token} |

## Response Data

| JSON Key                   | Data Type | Required | Value Description             |
| -------------------------- | --------- | -------- | ----------------------------- |
| totalCompany               | string    |          | Số lượng công ty              |
| company[]                  | array     |          | Mảng công ty                  |
| company[].companyName      | string    |          | Tên công ty                   |
| company[].email            | string    |          | Email công ty                 |
| company[].isDeleted        | string    |          | Trạng thái đã xóa của công ty |
| company[].logo             | string    |          | Logo công ty                  |
| company[].companyEmployees | string    |          | Nhân sự công ty               |
| company[].totalCVs         | string    |          | Tổng số CV nạp vào công ty    |

## Status

| Status | Message               | Error Reason                  |
| ------ | --------------------- | ----------------------------- |
| 200    | Successful            | -                             |
| 401    | Unauthorized          | Token không hợp lệ            |
| 403    | Forbidden             | Không có quyền xem công ty    |
| 404    | Not Found             | Không tồn tại tại công ty này |
| 500    | Internal Server Error | -                             |
