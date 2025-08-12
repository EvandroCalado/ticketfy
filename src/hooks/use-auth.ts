import { useCallback, useEffect, useState } from 'react';

import { getAuth } from '@/actions/get-auth';
import { User } from '@/generated/prisma';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isFetchUser, setIsFetchUser] = useState(false);

  const fetchUser = useCallback(async () => {
    try {
      const { user } = await getAuth();
      setUser(user);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      setUser(null);
    } finally {
      setIsFetchUser(true);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return [user, isFetchUser] as const;
};
