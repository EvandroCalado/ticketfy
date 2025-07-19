import { CircleCheckIcon } from 'lucide-react';

import { toCent } from '@/utils/format-currency';

export const priceData = [
  {
    title: 'Individual',
    price: toCent(49),
    content: (
      <>
        <div className='flex items-center gap-5'>
          <CircleCheckIcon className='stroke-card fill-foreground' />
          <span>Suporte completo</span>
        </div>

        <div className='flex items-center gap-5'>
          <CircleCheckIcon className='stroke-card fill-foreground' />
          <span>Acesso a uma conta e gestão</span>
        </div>

        <div className='flex items-center gap-5'>
          <CircleCheckIcon className='stroke-card fill-foreground' />
          <span>Acesso a métricas e estatísticas</span>
        </div>
      </>
    ),
  },
  {
    title: 'Startup',
    price: toCent(99),
    content: (
      <>
        <div className='flex items-center gap-5'>
          <CircleCheckIcon className='stroke-primary fill-foreground' />
          <span>Suporte completo</span>
        </div>

        <div className='flex items-center gap-5'>
          <CircleCheckIcon className='stroke-primary fill-foreground' />
          <span>Acesso a 10 contas e gestão</span>
        </div>

        <div className='flex items-center gap-5'>
          <CircleCheckIcon className='stroke-primary fill-foreground' />
          <span>Acesso a métricas e estatísticas</span>
        </div>
      </>
    ),
    mostPopular: true,
  },
  {
    title: 'Empresa',
    price: toCent(199),
    content: (
      <>
        <div className='flex items-center gap-5'>
          <CircleCheckIcon className='stroke-card fill-foreground' />
          <span>Suporte completo</span>
        </div>

        <div className='flex items-center gap-5'>
          <CircleCheckIcon className='stroke-card fill-foreground' />
          <span>Acesso a contas ilimitadas</span>
        </div>

        <div className='flex items-center gap-5'>
          <CircleCheckIcon className='stroke-card fill-foreground' />
          <span>Acesso a métricas e estatísticas</span>
        </div>
      </>
    ),
  },
];
