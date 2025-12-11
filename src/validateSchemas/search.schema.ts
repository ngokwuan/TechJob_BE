import { z } from 'zod';

export const SearchQuerySchema = z.object({
  keyword: z.string().optional(),
  position: z.string().optional(),
  cityId: z.string().optional(),
});

export type SearchQueryInput = z.infer<typeof SearchQuerySchema>;
