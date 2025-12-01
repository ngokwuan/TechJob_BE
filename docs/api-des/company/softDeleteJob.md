# Delete Job

## Endpoint

`DELETE /companies/jobs/:jobId`

## Cookies

| Cookie | Value   |
| ------ | ------- |
| token  | {token} |

## Path Parameters

| Parameter | Data Type | Required | Value Description |
| --------- | --------- | -------- | ----------------- |
| jobId     | string    | \*       | Job ID            |

## Response Data

| JSON Key | Data Type | Required | Value Description |
| -------- | --------- | -------- | ----------------- |
| jobId    | string    | \*       | Job ID đã xóa     |

## Status

| Status | Message               | Error Reason               |
| ------ | --------------------- | -------------------------- |
| 200    | Successful            | -                          |
| 401    | Unauthorized          | Token không hợp lệ         |
| 403    | Forbidden             | Không có quyền xóa job này |
| 404    | Not Found             | Job không tồn tại          |
| 500    | Internal Server Error | -                          |
