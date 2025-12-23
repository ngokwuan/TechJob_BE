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
      <li>
        <strong>${job.title}</strong><br/>
        Vị trí: ${job.position}<br/>
        Lương: ${job.salaryMin} - ${job.salaryMax}
      </li>
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
    from: `"Job Portal" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Gợi ý công việc phù hợp với bạn',
    html: `
      <p>Bạn vừa ứng tuyển vào vị trí <b>${appliedJobTitle}</b>.</p>
      <p>Dựa trên công việc này, chúng tôi đề xuất thêm một số vị trí phù hợp:</p>
      <ul>${jobListHtml}</ul>
      <p>Chúc bạn sớm tìm được công việc phù hợp!</p>
    `,
  });
};
