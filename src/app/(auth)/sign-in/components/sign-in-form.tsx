'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ticketsPath } from '@/utils/paths';

import { signIn } from '../actions/sign-in';
import { SignInSchema, signInSchema } from '../schemas/sign-in';

export const SignInForm = () => {
  const router = useRouter();

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: SignInSchema) => {
    const result = await signIn(data);

    if (result.success) {
      toast.success(result.message);
    }

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    router.push(ticketsPath());
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel htmlFor='email'>Email</FormLabel>
              <FormControl>
                <Input id='email' type='email' {...field} />
              </FormControl>
              <FormMessage className='absolute -bottom-5 text-xs' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel htmlFor='password'>Senha</FormLabel>
              <FormControl>
                <Input id='password' type='password' {...field} />
              </FormControl>
              <FormMessage className='absolute -bottom-5 text-xs' />
            </FormItem>
          )}
        />

        <Link
          href='/forgot-password'
          className='text-primary block text-right text-sm hover:underline hover:underline-offset-4'
        >
          Esqueceu a senha?
        </Link>

        <Button
          type='submit'
          className='mt-4 w-full'
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? 'Entrando...' : 'Entrar'}
        </Button>
      </form>
    </Form>
  );
};
