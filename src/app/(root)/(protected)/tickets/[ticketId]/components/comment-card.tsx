import { Card, CardContent } from '@/components/ui/card';
import { Prisma } from '@/generated/prisma';
import { formatDate } from '@/utils/format-date';

type CommentCardProps = {
  comment: Prisma.CommentGetPayload<{
    include: { user: { select: { name: true } } };
  }>;
};

export const CommentCard = ({ comment }: CommentCardProps) => {
  return (
    <Card>
      <CardContent className='space-y-2 text-sm'>
        <div className='text-muted-foreground/60 flex items-center justify-between'>
          <h4 className='font-semibold capitalize'>
            {comment.user?.name ?? 'Anônimo'}
          </h4>
          <span>{formatDate(comment.createdAt.toString())}</span>
        </div>

        <p>{comment.content}</p>
      </CardContent>
    </Card>
  );
};
