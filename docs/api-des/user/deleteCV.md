# Delete CV

## Endpoint

`DELETE /cvs/:cvId`

## Cookies

| Cookie | Value   |
| ------ | ------- |
| token  | {token} |

## Path Parameters

| Parameter | Data Type | Required | Value Description |
| --------- | --------- | -------- | ----------------- |
| cvId      | string    | \*       | CV ID             |

## Response Data

| JSON Key | Data Type | Required | Value Description |
| -------- | --------- | -------- | ----------------- |
| cvId     | string    | \*       | CV ID đã xóa      |

## Status

| Status | Message               | Error Reason              |
| ------ | --------------------- | ------------------------- |
| 200    | Successful            | -                         |
| 401    | Unauthorized          | Token không hợp lệ        |
| 403    | Forbidden             | Không có quyền xóa cv này |
| 404    | Not Found             | CV không tồn tại          |
| 500    | Internal Server Error | -                         |
