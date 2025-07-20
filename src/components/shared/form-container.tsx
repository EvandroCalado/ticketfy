import { Card } from '../ui/card';
import { Separator } from '../ui/separator';

type FormContainerProps = {
  title: string;
  description: string;
  content: React.ReactNode;
  footer?: React.ReactNode;
};

export const FormContainer = ({
  title,
  description,
  content,
  footer,
}: FormContainerProps) => {
  return (
    <Card className='animate-fade-from-top flex w-full max-w-sm flex-col justify-center gap-6 p-5'>
      <div>
        <h1 className='text-3xl font-bold tracking-tighter'>{title}</h1>
        <p className='text-muted-foreground/40'>{description}</p>
      </div>

      <Separator />

      {content}

      {footer}
    </Card>
  );
};
