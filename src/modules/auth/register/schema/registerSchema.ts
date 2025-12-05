import {z} from 'zod';

export const registerSchema = z
  .object({
    name: z.string().min(2, 'Nome obrigatório'),
    email: z.string().email('E-mail inválido'),
    password: z
      .string()
      .min(8, 'A senha deve ter pelo menos 8 caracteres')
      .refine(val => /[A-Z]/.test(val), {
        message: 'A senha deve ter pelo menos 1 letra maiúscula',
      })
      .refine(val => /[a-z]/.test(val), {
        message: 'A senha deve ter pelo menos 1 letra minúscula',
      })
      .refine(val => /[0-9]/.test(val), {
        message: 'A senha deve ter pelo menos 1 número',
      })
      .refine(val => /[@$!%*?&]/.test(val), {
        message: 'A senha deve ter pelo menos 1 caractere especial (@$!%*?&)',
      }),
    confirmPassword: z.string().min(8, 'Confirme sua senha'),
    acceptTerms: z.boolean(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })
  .refine(data => data.acceptTerms === true, {
    message: 'Você deve aceitar os termos de uso',
    path: ['acceptTerms'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
