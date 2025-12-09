# Get all CV of user (user)

## Endpoint

`GET /cvs/me`

## Cookies

| Cookie | Value   |
| ------ | ------- |
| token  | {token} |

## Response Data

| JSON Key       | Data Type | Required | Value Description  |
| -------------- | --------- | -------- | ------------------ |
| totalCV        | string    | \*       | Số lượng CV        |
| cv[]           | array     | \*       | Mảng CV            |
| cv[].jobId     | string    | \*       | Trình trạng đã xóa |
| cv[].fullName  | string    | \*       | Tiêu đề CV         |
| cv[].email     | string    | \*       | Hình thức làm việc |
| cv[].createdAt | string    | \*       | Thời gian tạo      |
| cv[].fileCV    | string    | \*       | ID CV              |
| cv[].status    | string    | \*       | Tổng số CV         |

## Status

| Status | Message               | Error Reason              |
| ------ | --------------------- | ------------------------- |
| 200    | Successful            | -                         |
| 401    | Unauthorized          | Không xác thực người dùng |
| 403    | Forbidden             | Không có quyền xem cv     |
| 404    | Not Found             | Không tồn tại CV nào      |
| 500    | Internal Server Error | -                         |
