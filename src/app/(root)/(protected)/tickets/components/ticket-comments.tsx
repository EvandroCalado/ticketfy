'use client';

import { Prisma, User } from '@/generated/prisma';

import { CommentCard } from './comment-card';
import { CommentCreateForm } from './comment-create-form';
import { CommentDeleteButton } from './comment-delete-button';
import { CommentsPagination } from './comments-pagination';

type TicketCommentsProps = {
  ticketId: string;
  paginatedComments: {
    comments: Prisma.CommentGetPayload<{
      include: { user: { select: { name: true } } };
    }>[];
    metadata: {
      count: number;
      hasNextPage: boolean;
    };
  };
  user: User | null;
};

export const TicketComments = ({
  ticketId,
  paginatedComments,
  user,
}: TicketCommentsProps) => {
  if (!user) return;

  const { comments } = paginatedComments;

  return (
    <div className='space-y-4'>
      <h3 className='border-border border-b pb-2 text-xl font-semibold'>
        Comentários
      </h3>

      <CommentCreateForm ticketId={ticketId} />

      {comments.map(comment => (
        <div key={comment.id} className='flex w-full gap-2'>
          <CommentCard comment={comment} />
          {comment.userId === user.id && (
            <CommentDeleteButton ticketId={ticketId} commentId={comment.id} />
          )}
        </div>
      ))}

      <div className='flex justify-end'>
        <CommentsPagination metadata={paginatedComments.metadata} />
      </div>
    </div>
  );
};
