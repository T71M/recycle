import { FC } from 'react';
import { useAuthorizeWatcher } from '../Auth/hooks/useAuthorizeWatcher';
import { LoadingOverlay } from '@mantine/core';
import { AppLayout } from './AppLayout';
import { AuthLayout } from './AuthLayout';

export const AppRouter: FC = () => {
   const { canRender, isAuthorized } = useAuthorizeWatcher();

   if (!canRender) {
      return <LoadingOverlay visible />;
   }

   if (isAuthorized) {
      return <AppLayout />;
   }

   return <AuthLayout />;
};
