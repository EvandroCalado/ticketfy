import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getAuth } from '@/actions/get-auth';
import { User } from '@/generated/prisma';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isFetchUser, setIsFetchUser] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      const { user } = await getAuth();
      setUser(user);
      setIsFetchUser(true);
    };

    fetchUser();
  }, []);

  return [user, isFetchUser, pathname] as const;
};
