export const TICKET_STATUS = {
  OPEN: (
    <div
      className='flex items-center gap-2 text-xs font-semibold'
      aria-label='Em aberto'
      title='Em aberto'
    >
      <span className='size-2 rounded-full bg-blue-500' />
      <span className='text-muted-foreground'>Em aberto</span>
    </div>
  ),
  IN_PROGRESS: (
    <div
      className='flex items-center gap-2 text-xs font-semibold'
      aria-label='Em andamento'
      title='Em andamento'
    >
      <span className='size-2 rounded-full bg-yellow-500' />
      <span className='text-muted-foreground'>Em andamento</span>
    </div>
  ),
  DONE: (
    <div
      className='flex items-center gap-2 text-xs font-semibold'
      aria-label='Concluído'
      title='Concluído'
    >
      <span className='size-2 rounded-full bg-green-500' />
      <span className='text-muted-foreground'>Concluído</span>
    </div>
  ),
};
