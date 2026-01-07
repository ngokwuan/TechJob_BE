import cron from 'node-cron';
import { findCVsNeedWeeklySuggestedMail } from '../services/cv.service';
import { findSimilarJobs } from '../services/job.service';
import { sendSuggestedJobsEmail } from '../services/mail.service';
import { CV } from '../models/cv.model';

export const startSuggestedJobCron = () => {
  // phut(0) -gio (9) - moi thang (*) - moi ngay (*) -thu 2 (1)
  cron.schedule('0 9 * * 1', async () => {
    const cvs = await findCVsNeedWeeklySuggestedMail();

    for (const cv of cvs) {
      const job = cv.jobId as any;
      if (!job) continue;

      const similarJobs = await findSimilarJobs(job);
      if (!similarJobs.length) continue;

      await sendSuggestedJobsEmail(cv.email, job.title, similarJobs);

      await CV.findByIdAndUpdate(cv._id, {
        suggestedMailSentAt: new Date(),
      });
    }
  });
};
