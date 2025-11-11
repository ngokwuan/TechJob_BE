# Get Job Detail

## Endpoint

`GET /jobs/:jobId`

## Path Parameters

| Parameter | Data Type | Required | Value Description |
| --------- | --------- | -------- | ----------------- |
| jobId     | string    | \*       | Job ID            |

## Response Data

| JSON Key            | Data Type | Required | Value Description  |
| ------------------- | --------- | -------- | ------------------ |
| jobId               | string    | \*       | Job ID             |
| companyId           | string    | \*       | Company ID         |
| company             | object    | \*       | Thông tin công ty  |
| company.companyName | string    | \*       | Tên công ty        |
| company.logo        | string    |          | Logo công ty       |
| company.address     | string    |          | Địa chỉ            |
| company.cityName    | string    |          | Tên thành phố      |
| company.phone       | string    |          | Số điện thoại      |
| company.workingTime | string    |          | Giờ làm việc       |
| company.description | string    |          | Mô tả công ty      |
| title               | string    | \*       | Tiêu đề công việc  |
| salaryMin           | string    | \*       | Lương tối thiểu    |
| salaryMax           | string    | \*       | Lương tối đa       |
| position            | string    | \*       | Vị trí             |
| workingForm         | boolean   | \*       | Hình thức làm việc |
| technologies        | string    | \*       | Công nghệ yêu cầu  |
| description         | string    | \*       | Mô tả công việc    |
| images              | string    |          | Hình ảnh           |
| createdAt           | string    | \*       | Ngày đăng          |
| updatedAt           | string    | \*       | Ngày cập nhật      |

## Status

| Status | Message                   | Error Reason      |
| ------ | ------------------------- | ----------------- |
| 200    | Get Job Detail Successful | -                 |
| 404    | Not Found                 | Job không tồn tại |
| 500    | Internal Server Error     | -                 |
