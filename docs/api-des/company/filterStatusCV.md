# Search and filter job for guest

## Endpoint

`GET /cvs/filter`

## Query Parameters

| Parameter | Data Type | Required | Value Description |
| --------- | --------- | -------- | ----------------- |
| status    | string    | \*       | Trạng thái CV     |

## Response Data

| JSON Key       | Data Type | Required | Value Description |
| -------------- | --------- | -------- | ----------------- |
| totalCV        | string    | \*       | Số lượng CV       |
| cv[]           | array     | \*       | Mảng CV           |
| cv[].jobTitle  | string    | \*       | Tên công việc     |
| cv[].fullName  | string    | \*       | Tên người dùng    |
| cv[].email     | string    | \*       | Email             |
| cv[].createdAt | string    | \*       | Thời gian tạo     |
| cv[].status    | string    | \*       | Trạng thái CV     |
| cv[].viewed    | boolean   | \*       | Trạng thái đã xem |

## Status

| Status | Message               | Error Reason         |
| ------ | --------------------- | -------------------- |
| 200    | Successful            | -                    |
| 400    | Bad Request           | Tham số không hợp lệ |
| 500    | Internal Server Error | -                    |
