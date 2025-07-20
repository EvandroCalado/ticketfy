import Link from 'next/link';

import { Card } from '../ui/card';
import { Separator } from '../ui/separator';

type FormContainerProps = {
  title: string;
  description: string;
  link: string;
  LinkText: string;
  children: React.ReactNode;
};

export const FormContainer = ({
  title,
  description,
  link,
  LinkText,
  children,
}: FormContainerProps) => {
  return (
    <Card className='animate-fade-from-top flex w-full max-w-sm flex-col justify-center gap-6 p-5'>
      <div>
        <h1 className='text-3xl font-bold tracking-tighter'>{title}</h1>
        <p className='text-muted-foreground/40'>{description}</p>
      </div>

      <Separator />

      {children}

      <Link
        href={link}
        className='text-primary text-center text-sm hover:underline hover:underline-offset-4'
      >
        {LinkText}
      </Link>
    </Card>
  );
};
