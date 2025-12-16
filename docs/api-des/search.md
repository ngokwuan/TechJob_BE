# Search (Jobs & Companies)

## Endpoint

`GET /search`

## Query Parameters

| Parameter | Data Type | Required | Value Description                                    |
| --------- | --------- | -------- | ---------------------------------------------------- |
| keyword   | string    |          | Từ khóa tìm kiếm (title, company name, technologies) |

## Response Data

| JSON Key                | Data Type | Required | Value Description   |
| ----------------------- | --------- | -------- | ------------------- |
| jobs                    | array     | \*       | Danh sách công việc |
| jobs[].id               | string    | \*       | ID công việc        |
| jobs[].title            | string    | \*       | Tiêu đề công việc   |
| jobs[].salaryMin        | string    | \*       | Lương tối thiểu     |
| jobs[].salaryMax        | string    | \*       | Lương tối đa        |
| jobs[].position         | string    | \*       | Vị trí              |
| jobs[].workingForm      | boolean   | \*       | Hình thức làm việc  |
| jobs[].technologies     | string    | \*       | Công nghệ yêu cầu   |
| jobs[].images           | string    |          | Hình ảnh            |
| jobs[].createdAt        | string    | \*       | Ngày đăng           |
| jobs[]companyName       | string    | \*       | Tên công ty         |
| jobs[]logo              | string    |          | Logo công ty        |
| jobs[]address           | string    |          | Địa chỉ công ty     |
| companies               | array     | \*       | Danh sách công ty   |
| companies[].companyId   | string    | \*       | Company ID          |
| companies[].companyName | string    | \*       | Tên công ty         |
| companies[].cityName    | string    |          | ID thành phố        |
| companies[].logo        | string    |          | Logo công ty        |
| companies[].totalJobs   | string    |          | Số lượng việc làm   |

## Status

| Status | Message               | Error Reason         |
| ------ | --------------------- | -------------------- |
| 200    | Successful            | -                    |
| 400    | Bad Request           | Dữ liệu không hợp lệ |
| 500    | Internal Server Error | -                    |
