# Create CV

## Endpoint

`POST /cvs/`

## Cookies

| Cookie | Value   |
| ------ | ------- |
| token  | {token} |

## Request Data

| JSON Key | Data Type | Required | Value Description |
| -------- | --------- | -------- | ----------------- |
| fullName | string    | \*       | Tên người nộp     |
| email    | string    | \*       | Email             |
| phone    | string    | \*       | Số điện thoại     |
| fileCV   | string    | \*       | URL file          |
| jobID    | string    | \*       | ID việc làm       |

## Response Data

| JSON Key  | Data Type | Required | Value Description     |
| --------- | --------- | -------- | --------------------- |
| jobID     | string    | \*       | ID việc làm           |
| userID    | string    | \*       | ID người nộp          |
| fullName  | string    | \*       | Tên người nộp         |
| email     | string    | \*       | Email                 |
| phone     | string    | \*       | Số điện thoại         |
| fileCV    | string    | \*       | URL file              |
| status    | string    | \*       | Trạng thái CV         |
| viewed    | string    | \*       | Trạng thái đã xem CV  |
| id        | string    | \*       | ID CV                 |
| createdAt | string    | \*       | Thời gian tạo CV      |
| updatedAt | string    | \*       | Thời gian cập nhật CV |

## Status

| Status | Message               | Error Reason              |
| ------ | --------------------- | ------------------------- |
| 201    | Successful            | -                         |
| 400    | Bad Request           | Dữ liệu không hợp lệ      |
| 401    | Unauthorized          | Token không hợp lệ        |
| 403    | Forbidden             | Không có quyền tạo cv này |
| 500    | Internal Server Error | -                         |
