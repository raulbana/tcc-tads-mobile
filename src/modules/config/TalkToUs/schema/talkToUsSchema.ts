import {z} from 'zod';

export const talkToUsSchema = z.object({
  subject: z.string().nonempty('Assunto obrigatório'),
  email: z.string().email('E-mail inválido').nonempty('E-mail obrigatório'),
  message: z.string().nonempty('Mensagem obrigatória'),
});

export type TalkToUsFormData = z.infer<typeof talkToUsSchema>;
