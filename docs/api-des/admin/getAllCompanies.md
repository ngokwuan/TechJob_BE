# Get All Companies (Admin)

## Endpoint

`GET /admin/companies`

## Cookies

| Cookie | Value   |
| ------ | ------- |
| token  | {token} |

## Response Data

| JSON Key                | Data Type | Required | Value Description     |
| ----------------------- | --------- | -------- | --------------------- |
| companies               | array     | \*       | Danh sách công ty     |
| companies[].companyId   | string    | \*       | Company ID            |
| companies[].companyName | string    | \*       | Tên công ty           |
| companies[].email       | string    | \*       | Email                 |
| companies[].cityName    | string    |          | Tên thành phố         |
| companies[].jobCount    | int       | \*       | Số lượng công việc    |
| companies[].cvCount     | int       | \*       | Số lượng CV nhận được |
| companies[].status      | string    | \*       | Trạng thái            |
| companies[].createdAt   | string    | \*       | Ngày tạo              |
| totalCompanies          | int       | \*       | Tổng số công ty       |
| currentPage             | int       | \*       | Trang hiện tại        |
| totalPages              | int       | \*       | Tổng số trang         |

## Status

| Status | Message                  | Error Reason         |
| ------ | ------------------------ | -------------------- |
| 200    | Get Companies Successful | -                    |
| 401    | Unauthorized             | Token không hợp lệ   |
| 403    | Forbidden                | Không có quyền admin |
| 500    | Internal Server Error    | -                    |
