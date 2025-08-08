import { Card, CardContent } from '@/components/ui/card';
import { Prisma } from '@/generated/prisma';

type CommentCardProps = {
  comment: Prisma.CommentGetPayload<{
    include: { user: { select: { name: true } } };
  }>;
};

export const CommentCard = ({ comment }: CommentCardProps) => {
  return (
    <Card className='w-full'>
      <CardContent className='space-y-2 text-sm'>
        <div className='text-muted-foreground/60 flex items-center justify-between'>
          <span className='font-semibold capitalize'>{comment.user?.name}</span>
          <span>{comment.createdAt.toLocaleString('pt-BR')}</span>
        </div>

        <p>{comment.content}</p>
      </CardContent>
    </Card>
  );
};
