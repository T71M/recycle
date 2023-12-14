import { FC } from 'react';
import { AppShellNavbar, NavLink } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';

export const Navbar: FC = () => {
   const { pathname } = useLocation();
   return (
      <AppShellNavbar>
         <NavLink
            label="Партнеры"
            component={Link}
            to={'/partners'}
            active={pathname.includes('/partners')}
         />
         <NavLink
            component={Link}
            to={'/requests'}
            label="Заявки"
            active={pathname.includes('/requests')}
         />
      </AppShellNavbar>
   );
};
