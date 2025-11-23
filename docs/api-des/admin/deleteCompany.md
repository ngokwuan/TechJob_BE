# Delete Company (Admin)

## Endpoint

`DELETE /admin/companies/:companyId`

## Cookies

| Cookie | Value   |
| ------ | ------- |
| token  | {token} |

## Path Parameters

| Parameter | Data Type | Required | Value Description |
| --------- | --------- | -------- | ----------------- |
| companyId | string    | \*       | Company ID        |

## Response Data

| JSON Key  | Data Type | Required | Value Description        |
| --------- | --------- | -------- | ------------------------ |
| message   | string    | \*       | Thông báo xóa thành công |
| companyId | string    | \*       | Company ID đã xóa        |
| deletedAt | string    | \*       | Thời gian xóa            |

## Status

| Status | Message                   | Error Reason          |
| ------ | ------------------------- | --------------------- |
| 200    | Delete Company Successful | -                     |
| 401    | Unauthorized              | Token không hợp lệ    |
| 403    | Forbidden                 | Không có quyền admin  |
| 404    | Not Found                 | Company không tồn tại |
| 500    | Internal Server Error     | -                     |
