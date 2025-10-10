import { z } from 'zod';

export const uploadContentSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  images: z.array(z.string()).min(1, 'No mínimo 1 imagem é obrigatória'),
  video: z.string(),
  categories: z.array(z.string()).min(1, 'No mínimo 1 categoria é obrigatória'),
});

export type UploadContentSchema = z.infer<typeof uploadContentSchema>;