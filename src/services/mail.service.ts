import nodemailer from 'nodemailer';

export const sendSuggestedJobsEmail = async (
  to: string,
  appliedJobTitle: string,
  jobs: any[]
) => {
  if (!jobs.length) return;

  const jobListHtml = jobs
    .map(
      (job) => `
      <tr>
        <td style="
          padding:16px;
          border:1px solid #e5e7eb;
          border-radius:8px;
          margin-bottom:12px;
          display:block;
        ">
          <h3 style="margin:0 0 6px 0; color:#0f766e;">
            ${job.title}
          </h3>
          <p style="margin:4px 0; color:#374151;">
            <strong>Vị trí:</strong> ${job.position}
          </p>
          <p style="margin:4px 0; color:#374151;">
            <strong>Lương:</strong> ${job.salaryMin} - ${job.salaryMax}
          </p>
        </td>
      </tr>
    `
    )
    .join('');

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"TechJob" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Gợi ý công việc phù hợp với bạn - TechJob',
    html: `
    <div style="
      margin:0;
      padding:0;
      background-color:#eaf7f4;
      font-family:Arial, Helvetica, sans-serif;
    ">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center" style="padding:40px 12px;">
            
            <!-- CARD -->
            <table width="600" cellpadding="0" cellspacing="0" style="
              background:#ffffff;
              border-radius:12px;
              overflow:hidden;
              box-shadow:0 4px 12px rgba(0,0,0,0.08);
            ">
              
              <!-- HEADER -->
              <tr>
                <td style="
                  background:#0f766e;
                  padding:20px;
                  text-align:center;
                  color:#ffffff;
                ">
                  <h1 style="margin:0; font-size:24px;">TechJob</h1>
                  <p style="margin:6px 0 0; font-size:14px;">
                    Nền tảng tuyển dụng IT hàng đầu
                  </p>
                </td>
              </tr>

              <!-- CONTENT -->
              <tr>
                <td style="padding:24px;">
                  <p style="font-size:16px; color:#111827;">
                    👋 Chào bạn,
                  </p>

                  <p style="font-size:15px; color:#374151;">
                    Bạn vừa ứng tuyển vào vị trí
                    <strong style="color:#0f766e;">
                      ${appliedJobTitle}
                    </strong>.
                  </p>

                  <p style="font-size:15px; color:#374151;">
                    Dựa trên hồ sơ và công việc bạn quan tâm, TechJob đề xuất thêm
                    một số vị trí phù hợp:
                  </p>

                  <table width="100%" cellpadding="0" cellspacing="0">
                    ${jobListHtml}
                  </table>

                  <p style="
                    margin-top:24px;
                    font-size:15px;
                    color:#374151;
                  ">
                    👉 Đừng bỏ lỡ cơ hội, truy cập TechJob để ứng tuyển ngay!
                  </p>

                  <p style="margin-top:24px; color:#6b7280;">
                    Chúc bạn sớm tìm được công việc phù hợp 🚀
                  </p>
                </td>
              </tr>

              <!-- FOOTER -->
              <tr>
                <td style="
                  background:#f9fafb;
                  padding:16px;
                  text-align:center;
                  font-size:13px;
                  color:#6b7280;
                ">
                  © ${new Date().getFullYear()} TechJob. All rights reserved.<br/>
                  Website tìm việc IT uy tín & chuyên nghiệp
                </td>
              </tr>

            </table>
            <!-- END CARD -->

          </td>
        </tr>
      </table>
    </div>
    `,
  });
};
