import Link from 'next/link';

type LogoProps = {
  className?: string;
};

export const Logo = ({ className }: LogoProps) => {
  return (
    <Link href='/' className={className}>
      <h2 className='text-foreground'>
        Ticket<strong className='text-primary text-xl'>fy</strong>
      </h2>
    </Link>
  );
};
