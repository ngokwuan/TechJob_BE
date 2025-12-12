# Get Cv Detail and chage viewed

## Endpoint

`GET cvs/:cvId`

## Cookies

| Cookie | Value   |
| ------ | ------- |
| token  | {token} |

## Path Parameters

| Parameter | Data Type | Required | Value Description |
| --------- | --------- | -------- | ----------------- |
| cvId      | string    | \*       | Cv ID             |

## Response Data

| JSON Key    | Data Type | Required | Value Description     |
| ----------- | --------- | -------- | --------------------- |
| id          | string    | \*       | ID CV                 |
| job         | object    | \*       | công việc             |
| jobId.id    | string    | \*       | ID công việc          |
| jobId.title | string    | \*       | Tên công việc         |
| userId      | string    | \*       | ID người dùng         |
| fullName    | string    | \*       | Tên người dùng        |
| email       | string    | \*       | Email                 |
| phone       | string    | \*       | Số điện thoại         |
| viewed      | string    | \*       | Trạng thái đã xem     |
| createdAt   | string    | \*       | Thời gian tạo         |
| fileCV      | string    | \*       | file cv               |
| status      | string    | \*       | Trạng thái duyệt CV   |
| createdAt   | string    | \*       | Thời gian tạo CV      |
| updatedAt   | string    | \*       | Thời gian cập nhật CV |

## Status

| Status | Message               | Error Reason              |
| ------ | --------------------- | ------------------------- |
| 200    | Successful            | -                         |
| 403    | Forbidden             | Không có quyền xem cv này |
| 404    | Not Found             | Cv không tồn tại          |
| 500    | Internal Server Error | -                         |
