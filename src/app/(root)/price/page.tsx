import { PriceCard } from './components/price-card';
import { priceData } from './utils/price-data';

const PricePage = () => {
  return (
    <main className='container mx-auto flex flex-1 flex-col items-center gap-5 p-5 md:gap-18'>
      <h1 className='text-xl font-bold tracking-tighter sm:text-4xl'>
        Preços <span className='text-primary'>atrativos</span> para você e sua
        equipe
      </h1>

      <p className='text-muted-foreground/40 max-w-xl'>
        Nossos preços são competitivos e acessíveis para você e sua equipe.
      </p>

      <div className='flex w-full flex-wrap items-center justify-center gap-10'>
        {priceData.map(price => (
          <PriceCard key={price.title} {...price} />
        ))}
      </div>
    </main>
  );
};

export default PricePage;
