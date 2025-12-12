# Create New Job

## Endpoint

`POST /jobs`

## Cookies

| Cookie | Value   |
| ------ | ------- |
| token  | {token} |

## Request Data

| JSON Key     | Data Type | Required | Value Description  |
| ------------ | --------- | -------- | ------------------ |
| companyID    | string    | \*       | ID Công ty         |
| title        | string    | \*       | Tiêu đề công việc  |
| salaryMin    | string    | \*       | Lương tối thiểu    |
| salaryMax    | number    | \*       | Lương tối đa       |
| position     | string    | \*       | Vị trí             |
| workingForm  | string    | \*       | Hình thức làm việc |
| technologies | array     | \*       | Công nghệ yêu cầu  |
| description  | string    | \*       | Mô tả công việc    |
| images       | string    | \*       | URL hình ảnh       |

## Response Data

| JSON Key     | Data Type | Required | Value Description            |
| ------------ | --------- | -------- | ---------------------------- |
| jobId        | string    | \*       | Job ID                       |
| companyId    | string    | \*       | ID Công ty                   |
| title        | string    | \*       | Tiêu đề công việc            |
| salaryMin    | string    | \*       | Lương tối thiểu              |
| salaryMax    | number    | \*       | Lương tối đa                 |
| position     | string    | \*       | Vị trí                       |
| workingForm  | boolean   | \*       | Hình thức làm việc           |
| technologies | array     | \*       | Công nghệ yêu cầu            |
| images       | string    |          | URL hình ảnh                 |
| description  | string    | \*       | Mô tả công việc              |
| images       | string    |          | Hình ảnh                     |
| createdAt    | string    | \*       | Thời gian tạo công việc      |
| updatedAt    | string    | \*       | Thời gian cập nhập công việc |

## Status

| Status | Message               | Error Reason               |
| ------ | --------------------- | -------------------------- |
| 201    | Successful            | -                          |
| 400    | Bad Request           | Dữ liệu không hợp lệ       |
| 401    | Unauthorized          | Token không hợp lệ         |
| 403    | Forbidden             | Không có quyền tạo job này |
| 500    | Internal Server Error | -                          |
