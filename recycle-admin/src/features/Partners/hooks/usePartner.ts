import { useQuery } from '@tanstack/react-query';
import { api } from '../../../main';

export const usePartner = (id?: number) => {
   const { data, ...rest } = useQuery({
      queryKey: ['PARTNER', id],
      queryFn: () => api.partners.fetchPartner(id),
   });

   return { partner: data, ...rest };
};
