import { getComments } from '../actions/get-comments';
import { CommentCard } from './comment-card';

type TicketCommentsProps = {
  ticketId: string;
};

export const TicketComments = async ({ ticketId }: TicketCommentsProps) => {
  const { comments } = await getComments(ticketId);

  return (
    <div className='mx-auto w-full max-w-3xl space-y-2'>
      {comments.map(comment => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  );
};
