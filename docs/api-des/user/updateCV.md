# Update CV

## Endpoint

`PATCH /cvs/:cvId`

## Cookies

| Cookie | Value   |
| ------ | ------- |
| token  | {token} |

## Path Parameters

| Parameter | Data Type | Required | Value Description |
| --------- | --------- | -------- | ----------------- |
| cvId      | string    | \*       | CV ID             |

## Request Data

| JSON Key | Data Type | Required | Value Description |
| -------- | --------- | -------- | ----------------- |
| fullName | string    | -        | Tên người nộp     |
| email    | string    | -        | Email             |
| phone    | string    | -        | Số điện thoại     |
| fileCV   | string    | -        | URL file          |

## Response Data

| JSON Key  | Data Type | Required | Value Description     |
| --------- | --------- | -------- | --------------------- |
| id        | string    | \*       | ID CV                 |
| jobID     | string    | \*       | ID việc làm           |
| userID    | string    | \*       | ID người nộp          |
| fullName  | string    | \*       | Tên người nộp         |
| email     | string    | \*       | Email                 |
| phone     | string    | \*       | Số điện thoại         |
| fileCV    | string    | \*       | URL file              |
| viewed    | string    | \*       | Trạng thái đã xem CV  |
| status    | string    | \*       | Trạng thái CV         |
| createdAt | string    | \*       | Thời gian tạo CV      |
| updatedAt | string    | \*       | Thời gian cập nhật CV |

## Status

| Status | Message               | Error Reason              |
| ------ | --------------------- | ------------------------- |
| 200    | Successful            | -                         |
| 400    | Bad Request           | Dữ liệu không hợp lệ      |
| 401    | Unauthorized          | Token không hợp lệ        |
| 403    | Forbidden             | Không có quyền xóa cv này |
| 404    | Not Found             | CV không tồn tại          |
| 500    | Internal Server Error | -                         |
