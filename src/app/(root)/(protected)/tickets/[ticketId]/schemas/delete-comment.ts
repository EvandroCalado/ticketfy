import z from 'zod';

export const deleteCommentSchema = z.object({
  commentId: z.string(),
});

export type DeleteCommentSchema = z.infer<typeof deleteCommentSchema>;
