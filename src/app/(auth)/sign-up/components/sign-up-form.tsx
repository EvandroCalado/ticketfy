'use client';

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

import { signUp } from '../actions/sign-up';
import { SignUpSchema, signUpSchema } from '../schemas/sign-up';

export const SignUpForm = () => {
  const router = useRouter();

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: SignUpSchema) => {
    const result = await signUp(data);

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
          name='name'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel htmlFor='name'>Nome</FormLabel>
              <FormControl>
                <Input id='name' type='text' {...field} />
              </FormControl>
              <FormMessage className='absolute -bottom-5 text-xs' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel htmlFor='name'>Email</FormLabel>
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

        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel htmlFor='confirmPassword'>Confirme Senha</FormLabel>
              <FormControl>
                <Input id='confirmPassword' type='password' {...field} />
              </FormControl>
              <FormMessage className='absolute -bottom-5 text-xs' />
            </FormItem>
          )}
        />

        {/* <div className='relative'>
          <Label htmlFor='email' className='mb-1'>
            Email
          </Label>
          <Input
            id='email'
            name='email'
            type='email'
            defaultValue={(payload?.get('email') as string) || ''}
          />

          {fieldErrors?.email && (
            <p className='text-destructive absolute -bottom-5 text-xs'>
              {formatErrorMessage(fieldErrors.email)}
            </p>
          )}
        </div>

        <div className='relative'>
          <Label htmlFor='password' className='mb-1'>
            Senha
          </Label>
          <Input
            id='password'
            name='password'
            type='password'
            defaultValue={(payload?.get('password') as string) || ''}
          />

          {fieldErrors?.password && (
            <p className='text-destructive absolute -bottom-5 text-xs'>
              {formatErrorMessage(fieldErrors.password)}
            </p>
          )}
        </div>

        <div className='relative'>
          <Label htmlFor='confirmPassword' className='mb-1'>
            Confirmar Senha
          </Label>
          <Input
            id='confirmPassword'
            name='confirmPassword'
            type='password'
            defaultValue={(payload?.get('confirmPassword') as string) || ''}
          />

          {fieldErrors?.confirmPassword && (
            <p className='text-destructive absolute -bottom-5 text-xs'>
              {formatErrorMessage(fieldErrors.confirmPassword)}
            </p>
          )}
        </div> */}

        <Button
          type='submit'
          className='mt-4 w-full'
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
        </Button>
      </form>
    </Form>
  );
};
