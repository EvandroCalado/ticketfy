import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { MoveRightIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Home',
};

const Home = () => {
  return (
    <main className='container mx-auto grid flex-1 items-center p-5 md:grid-cols-2'>
      <div className='space-y-10'>
        <h1 className='max-w-xl text-3xl font-semibold md:text-5xl'>
          Abra tickets onde estiver, em{' '}
          <span className='text-primary'>um só lugar</span>
        </h1>

        <Button
          size='lg'
          aria-label='Encontre seus tickets'
          title='Encontre seus tickets'
          asChild
        >
          <Link href='/tickets'>
            Encontre seus tickets <MoveRightIcon />
          </Link>
        </Button>
      </div>

      <div className='flex items-center justify-center'>
        <Image
          src='/hero.webp'
          alt='Imagem de tickets'
          width={500}
          height={500}
          priority
          placeholder='blur'
          blurDataURL='/empty_img.webp'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          className='max-h-[500px] w-auto'
        />
      </div>
    </main>
  );
};

export default Home;
