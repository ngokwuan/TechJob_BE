import { z } from 'zod';

export const SearchQuerySchema = z.object({
  keyword: z.string().optional(),
});

export type SearchQueryInput = z.infer<typeof SearchQuerySchema>;
