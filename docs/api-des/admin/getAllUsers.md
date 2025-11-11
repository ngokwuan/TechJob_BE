# Get All Users (Admin)

## Endpoint

`GET /admin/users`

## Headers

| Header        | Value               |
| ------------- | ------------------- |
| Authorization | Bearer {adminToken} |

## Response Data

| JSON Key          | Data Type | Required | Value Description    |
| ----------------- | --------- | -------- | -------------------- |
| users             | array     | \*       | Danh sách người dùng |
| users[].userId    | string    | \*       | User ID              |
| users[].fullName  | string    | \*       | Họ và tên            |
| users[].email     | string    | \*       | Email                |
| users[].cvCount   | int       | \*       | Số lượng CV đã gửi   |
| users[].createdAt | string    | \*       | Ngày tạo             |
| totalUsers        | int       | \*       | Tổng số người dùng   |
| currentPage       | int       | \*       | Trang hiện tại       |
| totalPages        | int       | \*       | Tổng số trang        |

## Status

| Status | Message               | Error Reason         |
| ------ | --------------------- | -------------------- |
| 200    | Get Users Successful  | -                    |
| 401    | Unauthorized          | Token không hợp lệ   |
| 403    | Forbidden             | Không có quyền admin |
| 500    | Internal Server Error | -                    |
