import { Card, CardContent } from '@/components/ui/card';
import { Prisma } from '@/generated/prisma';

import { CommentDeleteButton } from './comment-delete-button';

type CommentCardProps = {
  comment: Prisma.CommentGetPayload<{
    include: { user: { select: { name: true } } };
  }>;
};

export const CommentCard = ({ comment }: CommentCardProps) => {
  return (
    <Card className='group relative'>
      <CardContent className='space-y-2 text-sm'>
        <div className='text-muted-foreground/60 flex items-center justify-between'>
          <h4 className='font-semibold capitalize'>
            {comment.user?.name ?? 'Anônimo'}
          </h4>
          <span>{comment.createdAt.toLocaleString('pt-BR')}</span>
        </div>

        <p>{comment.content}</p>
      </CardContent>

      <div className='absolute right-4 bottom-4 opacity-0 transition-opacity duration-150 ease-in-out group-hover:opacity-100'>
        <CommentDeleteButton commentId={comment.id} />
      </div>
    </Card>
  );
};
