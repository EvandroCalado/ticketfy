import { LucideIcon } from 'lucide-react';

type TicketListEmptyProps = {
  label: string;
  icon?: LucideIcon;
  button?: React.ReactNode;
};

export const EmptyError = ({
  label,
  icon: Icon,
  button = null,
}: TicketListEmptyProps) => {
  return (
    <div className='flex flex-1 flex-col items-center justify-center gap-5'>
      {Icon && <Icon className='size-16' />}
      <h2 className='text-muted-foreground text-lg md:text-2xl'>{label}</h2>
      {button}
    </div>
  );
};
