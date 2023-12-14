import { FC } from 'react';
import {
   Button,
   Center,
   Paper,
   PasswordInput,
   TextInput,
   Title,
} from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLogin } from './hooks/useLogin';

const schema = object({
   email: string().required('Обязательное поле').email('Невалидный email'),
   password: string().required('Обязательное поле'),
   // .min(6, 'Минимальная длина - 6 символов'),
});

export const Login: FC = () => {
   const { login, isPending } = useLogin();

   const form = useForm<LoginRequest>({
      resolver: yupResolver(schema),
   });

   const onSubmit = async (values: LoginRequest) => {
      console.debug(values);

      try {
         await login(values);
      } catch (error) {
         console.error(error);
      }
   };
   return (
      <Center w={'100%'} h={'100%'}>
         <Paper
            shadow="lg"
            p={'md'}
            radius={'md'}
            component="form"
            maw={'100%'}
            w={400}
            onSubmit={form.handleSubmit(onSubmit)}
         >
            <Title c={'brand.9'} order={2}>
               Вход
            </Title>
            <Controller
               control={form.control}
               name="email"
               render={({ field, fieldState }) => (
                  <TextInput
                     {...field}
                     error={fieldState.error?.message}
                     mt={'0.25rem'}
                     label="Почта"
                     placeholder="Почта"
                  />
               )}
            />
            <Controller
               control={form.control}
               name="password"
               render={({ field, fieldState }) => (
                  <PasswordInput
                     {...field}
                     error={fieldState.error?.message}
                     mt={'0.25rem'}
                     label="Пароль"
                     placeholder="Пароль"
                  />
               )}
            />
            <div
               style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '1rem',
               }}
            >
               <Button loading={isPending} type="submit">
                  Войти
               </Button>
            </div>
         </Paper>
      </Center>
   );
};
