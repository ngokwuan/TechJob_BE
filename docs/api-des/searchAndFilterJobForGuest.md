# Search and filter job for guest

## Endpoint

`GET /jobs/search`

## Query Parameters

| Parameter | Data Type | Required | Value Description                                    |
| --------- | --------- | -------- | ---------------------------------------------------- |
| keyword   | string    |          | Từ khóa tìm kiếm (title, company name, technologies) |
| position  | string    |          | Vị trí cấp bậc                                       |
| cityId    | string    |          | ID của thành phố                                     |

## Response Data

| JSON Key            | Data Type | Required | Value Description   |
| ------------------- | --------- | -------- | ------------------- |
| jobs                | array     | \*       | Danh sách công việc |
| jobs[].jobId        | string    | \*       | Job ID              |
| jobs[].title        | string    | \*       | Tiêu đề công việc   |
| jobs[].salaryMin    | string    | \*       | Lương tối thiểu     |
| jobs[].salaryMax    | string    | \*       | Lương tối đa        |
| jobs[].position     | string    | \*       | Vị trí              |
| jobs[].workingForm  | boolean   | \*       | Hình thức làm việc  |
| jobs[].technologies | string    | \*       | Công nghệ yêu cầu   |
| jobs[].description  | string    |          | Mô tả công việc     |
| jobs[].images       | string    |          | Hình ảnh            |
| jobs[].createdAt    | string    | \*       | Ngày đăng           |
| jobs[].companyName  | string    | \*       | Tên công ty         |
| jobs[].logo         | string    |          | Logo công ty        |
| jobs[].address      | string    |          | Địa chỉ công ty     |

## Status

| Status | Message               | Error Reason         |
| ------ | --------------------- | -------------------- |
| 200    | Search Successful     | -                    |
| 400    | Bad Request           | Tham số không hợp lệ |
| 500    | Internal Server Error | -                    |
