import { Group, Text } from "@mantine/core";
import styled from "@emotion/styled";
import { FC } from "react";
import projectInfo from "../../package.json";

const version = projectInfo.version;

export const AppVersion: FC = () => {
  return (
    <Root>
      <Text component="p" size="sm" fw={500} c="white">
        <span>RecycleMap CMS</span> v. {version}
      </Text>
    </Root>
  );
};

const Root = styled(Group)({
  position: "fixed",
  left: 0,
  bottom: 0,
  backgroundColor: "#7db431",
  borderTopRightRadius: 8,
  zIndex: 9999,
  padding: "5px 11px",
});
