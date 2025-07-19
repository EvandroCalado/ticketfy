import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/utils/format-currency';

type PriceCardProps = {
  title: string;
  price: number;
  content: React.ReactNode;
  mostPopular?: boolean;
};

export const PriceCard = ({
  title,
  price,
  content,
  mostPopular = false,
}: PriceCardProps) => {
  return (
    <Card
      className={cn(
        'animate-fade-from-top relative w-full max-w-xs space-y-10',
        {
          'bg-primary space-y-14 py-10': mostPopular,
        },
      )}
    >
      {mostPopular && (
        <Badge className='bg-card text-foreground absolute -top-3 right-1/2 z-10 translate-x-1/2'>
          Mais popular
        </Badge>
      )}

      <CardHeader>
        <CardTitle
          className={cn(
            'text-primary text-center text-3xl font-bold tracking-tighter',
            {
              'text-background text-5xl': mostPopular,
            },
          )}
        >
          {title}
        </CardTitle>
        <Separator className='my-5' />
        <CardDescription
          className={cn('text-center text-5xl font-bold tracking-tighter', {
            'text-background': mostPopular,
          })}
        >
          {formatCurrency(price)}
        </CardDescription>
      </CardHeader>

      <CardContent className='space-y-5'>{content}</CardContent>

      <CardFooter className='flex items-center justify-center'>
        <Button
          size='lg'
          className={cn('w-36', {
            'bg-muted hover:bg-muted/90 text-foreground': mostPopular,
          })}
        >
          Assinar
        </Button>
      </CardFooter>
    </Card>
  );
};
