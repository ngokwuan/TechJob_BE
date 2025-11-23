# Delete User (Admin)

## Endpoint

`DELETE /admin/users/:userId`

## Cookies

| Cookie | Value   |
| ------ | ------- |
| token  | {token} |

## Path Parameters

| Parameter | Data Type | Required | Value Description |
| --------- | --------- | -------- | ----------------- |
| userId    | string    | \*       | User ID           |

## Response Data

| JSON Key  | Data Type | Required | Value Description        |
| --------- | --------- | -------- | ------------------------ |
| message   | string    | \*       | Thông báo xóa thành công |
| userId    | string    | \*       | User ID đã xóa           |
| deletedAt | string    | \*       | Thời gian xóa            |

## Status

| Status | Message                | Error Reason         |
| ------ | ---------------------- | -------------------- |
| 200    | Delete User Successful | -                    |
| 401    | Unauthorized           | Token không hợp lệ   |
| 403    | Forbidden              | Không có quyền admin |
| 404    | Not Found              | User không tồn tại   |
| 500    | Internal Server Error  | -                    |
