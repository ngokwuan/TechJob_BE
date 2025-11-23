# Create CV

## Endpoint

`POST /users/cvs/`

## Headers

| Header        | Value          |
| ------------- | -------------- |
| Authorization | Bearer {token} |

## Request Data

| JSON Key | Data Type | Required | Value Description |
| -------- | --------- | -------- | ----------------- |
| fullName | string    | \*       | Tên người nộp     |
| email    | string    | \*       | Email             |
| phone    | string    | \*       | Số điện thoại     |
| fileCV   | string    | \*       | URL file          |
| jobID    | string    | \*       | ID việc làm       |

## Response Data

| JSON Key | Data Type | Required | Value Description |
| -------- | --------- | -------- | ----------------- |
| userID   | string    | \*       | ID người nộp      |
| jobID    | string    | \*       | ID việc làm       |
| fullName | string    | \*       | Tên người nộp     |
| email    | string    | \*       | Email             |
| phone    | string    | \*       | Số điện thoại     |
| fileCV   | string    | \*       | URL file          |
| status   | string    | \*       | Trạng thái CV     |

## Status

| Status | Message               | Error Reason              |
| ------ | --------------------- | ------------------------- |
| 201    | Create CV Successful  | -                         |
| 400    | Bad Request           | Dữ liệu không hợp lệ      |
| 401    | Unauthorized          | Token không hợp lệ        |
| 403    | Forbidden             | Không có quyền tạo cv này |
| 500    | Internal Server Error | -                         |
