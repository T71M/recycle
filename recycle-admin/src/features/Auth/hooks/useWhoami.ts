import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../main';

export const useWhoami = () => {
   const queryKey = ['CURRENT_USER'];
   const queryClient = useQueryClient();
   const { data, refetch, isLoading, isError } = useQuery({
      queryKey: queryKey,
      queryFn: () => api.auth.whoami(),
      retry: 1,
   });

   const remove = () => queryClient.removeQueries({ queryKey });

   return {
      data,
      refetch,
      isLoading,
      isError,
      remove,
   };
};
