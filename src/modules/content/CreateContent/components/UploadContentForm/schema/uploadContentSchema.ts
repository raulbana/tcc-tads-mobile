import {z} from 'zod';

export const uploadContentSchema = z.object({
  title: z
    .string()
    .min(1, 'Título é obrigatório')
    .max(255, 'Título deve ter no máximo 255 caracteres'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  subtitle: z
    .string()
    .max(255, 'Subtítulo deve ter no máximo 255 caracteres')
    .optional(),
  subcontent: z.string().optional(),
  images: z.array(z.string()).min(1, 'No mínimo 1 imagem é obrigatória'),
  video: z.string().optional(),
  categories: z.array(z.number()).min(1, 'No mínimo 1 categoria é obrigatória'),
});

export type UploadContentSchema = z.infer<typeof uploadContentSchema>;
