# Create New Job

## Endpoint

`POST /companies/jobs`

## Cookies

| Cookie | Value   |
| ------ | ------- |
| token  | {token} |

## Request Data

| JSON Key     | Data Type | Required | Value Description  |
| ------------ | --------- | -------- | ------------------ |
| title        | string    | \*       | Tiêu đề công việc  |
| companyID    | string    | \*       | ID Công ty         |
| salaryMin    | string    | \*       | Lương tối thiểu    |
| salaryMax    | string    | \*       | Lương tối đa       |
| position     | string    | \*       | Vị trí             |
| workingForm  | string    | \*       | Hình thức làm việc |
| technologies | string    | \*       | Công nghệ yêu cầu  |
| description  | string    | \*       | Mô tả công việc    |
| images       | string    |          | URL hình ảnh       |

## Response Data

| JSON Key     | Data Type | Required | Value Description  |
| ------------ | --------- | -------- | ------------------ |
| jobId        | string    | \*       | Job ID             |
| companyId    | string    | \*       | ID Công ty         |
| title        | string    | \*       | Tiêu đề công việc  |
| salaryMin    | string    | \*       | Lương tối thiểu    |
| salaryMax    | string    | \*       | Lương tối đa       |
| position     | string    | \*       | Vị trí             |
| workingForm  | boolean   | \*       | Hình thức làm việc |
| technologies | string    | \*       | Công nghệ yêu cầu  |
| description  | string    | \*       | Mô tả công việc    |
| images       | string    |          | Hình ảnh           |
| createdAt    | string    | \*       | Ngày tạo           |

## Status

| Status | Message               | Error Reason               |
| ------ | --------------------- | -------------------------- |
| 201    | Create Job Successful | -                          |
| 400    | Bad Request           | Dữ liệu không hợp lệ       |
| 401    | Unauthorized          | Token không hợp lệ         |
| 403    | Forbidden             | Không có quyền tạo job này |
| 500    | Internal Server Error | -                          |
