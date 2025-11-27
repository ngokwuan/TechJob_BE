# Update Job

## Endpoint

`PUT /companies/jobs/:jobId`

## Cookies

| Cookie | Value   |
| ------ | ------- |
| token  | {token} |

## Path Parameters

| Parameter | Data Type | Required | Value Description |
| --------- | --------- | -------- | ----------------- |
| jobId     | string    | \*       | Job ID            |

## Request Data

| JSON Key     | Data Type | Required | Value Description  |
| ------------ | --------- | -------- | ------------------ |
| title        | string    |          | Tiêu đề công việc  |
| salaryMin    | string    |          | Lương tối thiểu    |
| salaryMax    | string    |          | Lương tối đa       |
| position     | string    |          | Vị trí             |
| workingForm  | string    |          | Hình thức làm việc |
| technologies | string    |          | Công nghệ yêu cầu  |
| description  | string    |          | Mô tả công việc    |
| images       | string    |          | URL hình ảnh       |

## Response Data

| JSON Key     | Data Type | Required | Value Description  |
| ------------ | --------- | -------- | ------------------ |
| title        | string    |          | Tiêu đề công việc  |
| salaryMin    | string    |          | Lương tối thiểu    |
| salaryMax    | string    |          | Lương tối đa       |
| position     | string    |          | Vị trí             |
| workingForm  | string    |          | Hình thức làm việc |
| technologies | string    |          | Công nghệ yêu cầu  |
| description  | string    |          | Mô tả công việc    |
| images       | string    |          | URL hình ảnh       |

## Status

| Status | Message               | Error Reason                     |
| ------ | --------------------- | -------------------------------- |
| 200    | Update Job Successful | -                                |
| 400    | Bad Request           | Dữ liệu không hợp lệ             |
| 401    | Unauthorized          | Token không hợp lệ               |
| 403    | Forbidden             | Không có quyền chỉnh sửa job này |
| 404    | Not Found             | Job không tồn tại                |
| 500    | Internal Server Error | -                                |
