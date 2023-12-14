import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Login } from '../Auth/Login';

export const AuthLayout: FC = () => {
   return (
      <Routes>
         <Route path="auth">
            <Route path="login" element={<Login />} />
            <Route path="*" element={<Navigate to={'/auth/login'} />} />
            <Route index element={<Navigate to={'/auth/login'} />} />
         </Route>
         <Route path="*" element={<Navigate to={'/auth'} />} />
      </Routes>
   );
};
