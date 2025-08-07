'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Prisma, User } from '@/generated/prisma';

import { getComments } from '../actions/get-comments';
import { CommentCard } from './comment-card';
import { CommentCreateForm } from './comment-create-form';
import { CommentDeleteButton } from './comment-delete-button';

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
  const [comments, setComments] = useState(paginatedComments.comments);
  const [metadata, setMetadata] = useState(paginatedComments.metadata);
  const [isLoading, setIsLoading] = useState(false);

  const handleMoreComments = async () => {
    setIsLoading(true);

    const morePaginatedComments = await getComments(ticketId, comments.length);
    const moreComments = morePaginatedComments.comments;

    setComments([...comments, ...moreComments]);
    setMetadata(morePaginatedComments.metadata);

    setIsLoading(false);
  };

  const handleAddComment = (
    comment: Prisma.CommentGetPayload<{
      include: { user: { select: { name: true } } };
    }>,
  ) => {
    setComments(prevComments => [comment, ...prevComments]);
  };

  const handleDeleteComment = (commentId: string) => {
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  if (!user) return;

  return (
    <div className='space-y-4'>
      <h3 className='border-border border-b pb-2 text-xl font-semibold'>
        Comentários
      </h3>

      <CommentCreateForm ticketId={ticketId} onCreate={handleAddComment} />

      {comments.map(comment => (
        <div key={comment.id} className='flex w-full gap-2'>
          <CommentCard comment={comment} />
          {comment.userId === user.id && (
            <CommentDeleteButton
              commentId={comment.id}
              onDelete={handleDeleteComment}
            />
          )}
        </div>
      ))}

      <div className='mt-5 flex items-center justify-center'>
        <Button
          size='lg'
          variant='ghost'
          onClick={handleMoreComments}
          disabled={!metadata.hasNextPage || isLoading}
        >
          {isLoading
            ? 'Carregando...'
            : !metadata.hasNextPage
              ? 'Sem mais'
              : 'Carregar mais'}
        </Button>
      </div>
    </div>
  );
};
