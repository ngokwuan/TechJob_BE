# Update User Profile

## Endpoint

`PATCH /users`

## Cookies

| Cookie | Value   |
| ------ | ------- |
| token  | {token} |

## Request Data

| JSON Key | Data Type | Required | Value Description |
| -------- | --------- | -------- | ----------------- |
| userId   | string    |          | ID người dùng     |
| fullName | string    |          | Họ và tên         |
| email    | string    |          | Email             |
| phone    | string    |          | SDT               |
| avatar   | string    |          | Ảnh đại diện      |
| gender   | string    |          | Giới tính         |

## Response Data

| JSON Key | Data Type | Required | Value Description |
| -------- | --------- | -------- | ----------------- |
| fullName | string    |          | Họ và tên         |
| email    | string    |          | Email             |
| phone    | string    |          | SDT               |
| avatar   | string    |          | Ảnh đại diện      |
| gender   | string    |          | Giới tính         |

## Status

| Status | Message               | Error Reason                 |
| ------ | --------------------- | ---------------------------- |
| 200    | Successful            | -                            |
| 400    | Bad Request           | Dữ liệu đầu vào không hợp lệ |
| 404    | Not Found             | User không tồn tại           |
| 409    | Conflict              | Email đã tồn tại             |
| 500    | Internal Server Error | -                            |
