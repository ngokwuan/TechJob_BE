import { z } from 'zod';

export const updateCompanySchema = z.object({
  companyName: z.string().optional(),
  address: z.string().optional(),
  cityId: z.string().optional(),
  companyEmployees: z.string().optional(),
  companyModel: z.string().optional(),
  description: z.string().optional(),
  phone: z.string().optional(),
  workOverTime: z.string().optional(),
  workingTime: z.string().optional(),
  logo: z.any().optional(),
});

export type UpdateCompanyInput = z.infer<typeof updateCompanySchema>;
