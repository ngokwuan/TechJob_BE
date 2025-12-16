# Get Cv Detail with user

## Endpoint

`GET cvs/me/:cvId`

## Cookies

| Cookie | Value   |
| ------ | ------- |
| token  | {token} |

## Path Parameters

| Parameter | Data Type | Required | Value Description |
| --------- | --------- | -------- | ----------------- |
| cvId      | string    | \*       | Cv ID             |

## Response Data

| JSON Key  | Data Type | Required | Value Description     |
| --------- | --------- | -------- | --------------------- |
| id        | string    | \*       | Cv ID                 |
| jobId     | string    | \*       | ID công việc          |
| userId    | string    | \*       | ID người dùng         |
| fullName  | string    | \*       | Tên người nộp         |
| email     | string    | \*       | Email                 |
| phone     | string    | \*       | Số điện thoại         |
| viewed    | string    | \*       | Số lượt xem           |
| status    | string    | \*       | Trạng thái CV         |
| fileCV    | string    | \*       | URL file              |
| createdAt | string    | \*       | Thời gian tạo CV      |
| updatedAt | string    | \*       | Thời gian cập nhật CV |

## Status

| Status | Message               | Error Reason              |
| ------ | --------------------- | ------------------------- |
| 200    | Successful            | -                         |
| 403    | Forbidden             | Không có quyền xem cv này |
| 404    | Not Found             | Cv không tồn tại          |
| 500    | Internal Server Error | -                         |
