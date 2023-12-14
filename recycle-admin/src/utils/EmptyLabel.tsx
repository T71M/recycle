import { Icon } from '@iconify/react';
import { Stack, StackProps, Title } from '@mantine/core';
import { FC } from 'react';

interface Props extends StackProps {
   label?: string;
}

export const EmptyLabel: FC<Props> = (_props) => {
   return (
      <Stack align="center" gap={0} {..._props}>
         <Icon icon={'radix-icons:archive'} color="#7db431" fontSize={60} />
         <Title ta="center" order={2} c="brand">
            {_props.label ?? 'Пусто.'}
         </Title>
      </Stack>
   );
};
