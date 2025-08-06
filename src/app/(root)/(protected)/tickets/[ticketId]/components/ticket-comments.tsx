import { Prisma } from '@/generated/prisma';

import { CommentCard } from './comment-card';

type TicketCommentsProps = {
  comments: Prisma.CommentGetPayload<{
    include: { user: { select: { name: true } } };
  }>[];
};

export const TicketComments = async ({ comments }: TicketCommentsProps) => {
  return (
    <div className='space-y-2'>
      {comments.map(comment => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  );
};
