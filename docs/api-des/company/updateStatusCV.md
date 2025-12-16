# Update Status CV

## Endpoint

`PATCH /cvs/status/:cvId`

## Cookies

| Cookie | Value   |
| ------ | ------- |
| token  | {token} |

## Path Parameters

| Parameter | Data Type | Required | Value Description |
| --------- | --------- | -------- | ----------------- |
| cvId      | string    | \*       | Cv ID             |

## Request Data

| JSON Key | Data Type | Required | Value Description |
| -------- | --------- | -------- | ----------------- |
| status   | string    | \*       | Trạng thái CV     |

## Response Data

| JSON Key  | Data Type | Required | Value Description     |
| --------- | --------- | -------- | --------------------- |
| jobId     | string    | \*       | ID công việc          |
| userId    | string    | \*       | ID người dùng         |
| fullName  | string    | \*       | Tên người dùng        |
| email     | string    | \*       | Email                 |
| phone     | string    | \*       | Số điện thoại         |
| viewed    | string    | \*       | Trạng thái đã xem     |
| createdAt | string    | \*       | Thời gian tạo         |
| fileCV    | string    | \*       | file cv               |
| status    | string    | \*       | Trạng thái duyệt CV   |
| createdAt | string    | \*       | Thời gian tạo CV      |
| updatedAt | string    | \*       | Thời gian cập nhật CV |

## Status

| Status | Message               | Error Reason                    |
| ------ | --------------------- | ------------------------------- |
| 200    | Successful            | -                               |
| 400    | Bad Request           | Dữ liệu không hợp lệ            |
| 401    | Unauthorized          | Token không hợp lệ              |
| 403    | Forbidden             | Không có quyền chỉnh sửa cv này |
| 404    | Not Found             | Cv không tồn tại                |
| 500    | Internal Server Error | -                               |
