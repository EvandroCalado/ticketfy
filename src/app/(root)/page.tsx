import { Metadata } from 'next';

import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Home',
};

const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>

      <Button>Button</Button>
    </div>
  );
};

export default Home;
