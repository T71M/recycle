import { AppShellHeader, Button, Group, Text } from "@mantine/core";
import { FC } from "react";
import { useAuthStore } from "../../store/authStore";
import logo from "/logo.png";

export const Header: FC = () => {
  const { logout } = useAuthStore();
  return (
    <AppShellHeader
      px={"2%"}
      style={{ display: "flex", alignItems: "center" }}
      bg="brand.1"
      h={75}
    >
      <Group justify="space-between" w={"100%"}>
        <Group gap={0}>
          <img src={logo} alt="" width={161} height={26} />
          <Text c={"white"} fz={"0.75rem"} ml={"0.4rem"} mt={"1rem"} fw={500}>
            Чистая карта - чистая планета!
          </Text>
        </Group>
        <Button onClick={logout} variant="white">
          <Group>
            <Text fw={500} c={"brand"}>
              Выход
            </Text>
          </Group>
        </Button>
      </Group>
    </AppShellHeader>
  );
};
