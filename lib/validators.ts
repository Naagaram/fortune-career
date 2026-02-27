import { z } from "zod";

export const companyQuerySchema = z.object({
  search: z.string().trim().max(100).optional(),
  category: z.enum(["IT", "Manufacturing"]).optional(),
  country: z.string().trim().max(80).optional(),
  size: z.string().trim().max(80).optional()
});

export const redirectQuerySchema = z.object({
  to: z.string().url().max(2048)
});
