# Get Job Detail

## Endpoint

`GET /jobs/:jobId`

## Path Parameters

| Parameter | Data Type | Required | Value Description |
| --------- | --------- | -------- | ----------------- |
| jobId     | string    | \*       | Job ID            |

## Response Data

| JSON Key     | Data Type | Required | Value Description  |
| ------------ | --------- | -------- | ------------------ |
| jobId        | string    | \*       | Job ID             |
| companyId    | string    | \*       | Company ID         |
| title        | string    | \*       | Tiêu đề công việc  |
| salaryMin    | number    | \*       | Lương tối thiểu    |
| salaryMax    | number    | \*       | Lương tối đa       |
| position     | string    | \*       | Vị trí             |
| workingForm  | string    | \*       | Hình thức làm việc |
| technologies | array     | \*       | Công nghệ yêu cầu  |
| description  | string    | \*       | Mô tả công việc    |
| images       | string    |          | Hình ảnh           |
| createdAt    | string    | \*       | Ngày đăng          |
| updatedAt    | string    | \*       | Ngày cập nhật      |

## Status

| Status | Message                   | Error Reason      |
| ------ | ------------------------- | ----------------- |
| 200    | Get Job Detail Successful | -                 |
| 404    | Not Found                 | Job không tồn tại |
| 500    | Internal Server Error     | -                 |
