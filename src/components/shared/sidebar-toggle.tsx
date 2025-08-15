import { ChevronRightIcon } from '@/icons';
import { cn } from '@/lib/utils';
import { useSidebarStore } from '@/stores/sidebar';

import { Button } from '../ui/button';
import {
  LazyTooltip as Tooltip,
  LazyTooltipContent as TooltipContent,
  LazyTooltipTrigger as TooltipTrigger,
} from './lazy-tooltip';

export const SidebarToggle = () => {
  const { isOpen, toggle } = useSidebarStore();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          aria-label='Abre/fecha menu'
          title='Abre/fecha menu'
          className='absolute top-4 -right-[18px] z-40 size-6 rounded-full lg:hidden'
          onClick={() => toggle()}
        >
          <ChevronRightIcon
            className={cn({
              'rotate-180 transition-transform duration-200': isOpen,
            })}
          />
        </Button>
      </TooltipTrigger>
      <TooltipContent side='right'>
        <span>Abre/Fecha Menu</span>
      </TooltipContent>
    </Tooltip>
  );
};
