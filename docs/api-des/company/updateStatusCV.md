# Update Status CV

## Endpoint

`PUT /cvs/:cvId`

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

| JSON Key | Data Type | Required | Value Description |
| -------- | --------- | -------- | ----------------- |
| cvId     | string    | \*       | Cv ID             |
| status   | string    | \*       | Trạng thái CV     |

## Status

| Status | Message               | Error Reason                    |
| ------ | --------------------- | ------------------------------- |
| 200    | Update Cv Successful  | -                               |
| 400    | Bad Request           | Dữ liệu không hợp lệ            |
| 401    | Unauthorized          | Token không hợp lệ              |
| 403    | Forbidden             | Không có quyền chỉnh sửa cv này |
| 404    | Not Found             | Cv không tồn tại                |
| 500    | Internal Server Error | -                               |
