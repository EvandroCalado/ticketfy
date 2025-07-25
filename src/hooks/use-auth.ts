import { useEffect, useState } from 'react';

import { getAuth } from '@/actions/get-auth';
import { User } from '@/generated/prisma';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isFetchUser, setIsFetchUser] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { user } = await getAuth();
      setUser(user);
      setIsFetchUser(true);
    };

    fetchUser();
  }, []);

  return [user, isFetchUser] as const;
};
