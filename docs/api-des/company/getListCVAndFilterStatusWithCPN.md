# Get all CV of user (company)

## Endpoint

`GET /cvs/all`

## Cookies

| Cookie | Value   |
| ------ | ------- |
| token  | {token} |

## Request Data

| JSON Key    | Data Type | Required | Value Description   |
| ----------- | --------- | -------- | ------------------- |
| cv[].status | string    |          | Trạng thái duyệt CV |

## Response Data

| JSON Key       | Data Type | Required | Value Description     |
| -------------- | --------- | -------- | --------------------- |
| totalCV        | string    | \*       | Số lượng CV           |
| cv[]           | array     | \*       | Mảng CV               |
| cv[].jobId     | string    | \*       | ID công việc          |
| cv[].userId    | string    | \*       | ID người dùng         |
| cv[].fullName  | string    | \*       | Tên người dùng        |
| cv[].email     | string    | \*       | Email                 |
| cv[].phone     | string    | \*       | Số điện thoại         |
| cv[].viewed    | string    | \*       | Trạng thái đã xem     |
| cv[].createdAt | string    | \*       | Thời gian tạo         |
| cv[].fileCV    | string    | \*       | file cv               |
| cv[].status    | string    | \*       | Trạng thái duyệt CV   |
| cv[].createdAt | string    | \*       | Thời gian tạo CV      |
| cv[].updatedAt | string    | \*       | Thời gian cập nhật CV |

## Status

| Status | Message               | Error Reason           |
| ------ | --------------------- | ---------------------- |
| 200    | Successful            | -                      |
| 401    | Unauthorized          | Không xác thực công ty |
| 403    | Forbidden             | Không có quyền xem cv  |
| 404    | Not Found             | Không tồn tại CV nào   |
| 500    | Internal Server Error | -                      |
