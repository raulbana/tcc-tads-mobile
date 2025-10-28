import {z} from 'zod';

export const uploadContentSchema = z.object({
  title: z
    .string()
    .min(1, 'Título é obrigatório')
    .max(100, 'Título deve ter no máximo 100 caracteres'),
  description: z.string().optional(),
  subtitle: z.string().optional(),
  subcontent: z.string().optional(),
  images: z.array(z.any()).optional(),
  video: z.string().optional(),
  categories: z.array(z.string()).optional(),
});

export type UploadContentSchema = z.infer<typeof uploadContentSchema>;
