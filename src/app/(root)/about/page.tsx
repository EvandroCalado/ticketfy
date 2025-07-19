import Image from 'next/image';

export const metadata = {
  title: 'Sobre',
};

const AboutPage = () => {
  return (
    <main className='container mx-auto flex flex-1 flex-col items-center gap-24 p-5'>
      <h1 className='text-xl font-bold tracking-tighter sm:text-4xl'>
        Então <span className='text-primary'>quem</span> é o Ticketfy?
      </h1>

      <svg
        width={275}
        height={382}
        viewBox='0 0 275 382'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='stroke-foreground animate-fade-from-top'
      >
        <path
          d='M151.417 1C91.4168 73.5 303.95 46.0107 270.417 135.5C242.5 210 132 182 35.9168 222.5C-19.5234 245.869 -17.8832 330.1 116.917 380.5'
          strokeWidth='3'
          strokeDasharray='20 20'
        />
        <defs>
          <linearGradient
            id='paint0_linear_127_3'
            x1='138'
            y1='1'
            x2='138'
            y2='432'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='white' />
            <stop offset='1' stopColor='white' stopOpacity='0' />
          </linearGradient>
        </defs>
      </svg>

      <div className='animate-fade-from-top flex flex-col-reverse items-center justify-between gap-10 md:flex-row'>
        <p className='text-muted-foreground/40 max-w-xl'>
          A Ticketfy é uma plataforma online para{' '}
          <span className='text-foreground'>gestão de tickets</span> com a
          finalidade que sem negócio precisar. Nossos serviços facilitam a
          abertura de serviços e os disponibilizam em um só lugar, em uma{' '}
          <span className='text-foreground'>única transação</span>, que pode ser
          administrada por uma equipe ou um profissional autônomo.
        </p>

        <Image
          src='/ticket.webp'
          alt='Imagem de tickets'
          width={150}
          height={150}
          priority
          placeholder='blur'
          blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
          className='w-auto'
        />
      </div>

      <div className='animate-fade-from-top flex flex-col items-center justify-between gap-10 md:flex-row'>
        <Image
          src='/world.webp'
          alt='Imagem de mundo'
          width={150}
          height={150}
          loading='lazy'
          placeholder='blur'
          blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
          className='w-auto'
        />

        <p className='text-muted-foreground/40 max-w-xl'>
          A Ticketfy opera em todos os países da{' '}
          <span className='text-foreground'>
            América, Portugal, Espanha e França
          </span>
          . A equipe fundadora da Ticketfy é composta por Brasileiros com vasta
          experiência no mercado. A empresa agora{' '}
          <span className='text-foreground'>emprega 30 pessoas</span>. A
          plataforma técnica do serviço conta com um servidor de back-end com
          suporte a servidores de rede compartilhados Citrix/Dell e banco de
          dados.
        </p>
      </div>

      <div className='animate-fade-from-top flex flex-col-reverse items-center justify-between gap-10 md:flex-row'>
        <p className='text-muted-foreground/40 max-w-xl'>
          Em setembro de 2020, a Ticketfy firmou{' '}
          <span className='text-foreground'>parceria com a Stripe</span>, uma
          das principais provedoras de serviços de pagamento dos Estados Unidos,
          para os para nossos serviços de assinaturas. permitindo à empresa
          <span className='text-foreground'>expandir sua presença</span> para
          mais de 2.500 clientes corporativos e autônomos, além de um fluxo de
          mais de 100.000 tickets por mês.
        </p>

        <Image
          src='/graph.webp'
          alt='Imagem de gráfico'
          width={150}
          height={150}
          loading='lazy'
          placeholder='blur'
          blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
          className='w-auto'
        />
      </div>
    </main>
  );
};

export default AboutPage;
