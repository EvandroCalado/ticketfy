import { CircleXIcon, LucideIcon, PanelTopIcon } from 'lucide-react';

type TicketListEmptyProps = {
  label: string;
  description?: string;
  icon?: LucideIcon;
  button?: React.ReactNode;
};

export const EmptyError = ({
  label,
  description = ' A página que você está tentando acessar não existe ou foi movida.',
  icon: Icon = PanelTopIcon,
  button = null,
}: TicketListEmptyProps) => {
  return (
    <div className='container mx-auto flex max-w-2xl flex-1 flex-col justify-center gap-5 p-5'>
      <div className='relative w-fit'>
        {<Icon className='text-foreground size-20' />}
        <CircleXIcon className='stroke-background fill-primary absolute -right-2 -bottom-2 size-10 stroke-3' />
      </div>
      <h2 className='text-muted-foreground text-lg font-bold tracking-tighter md:text-3xl'>
        {label}
      </h2>

      <p className='text-muted-foreground/40'>{description}</p>
      <div className='mt-5'>{button}</div>
    </div>
  );
};
