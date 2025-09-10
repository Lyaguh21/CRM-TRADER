import { Box, Flex, Text } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import HeadlineText from "../../../shared/HeadlineText/HeadlineText";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Flex
      w="100%"
      p={15}
      align="center"
      style={{ borderBottom: "2px solid #9CA3AF20" }}
      gap={15}
    >
      <Link to="/">
        <IconArrowLeft size={36} />
      </Link>

      <Box>
        <HeadlineText>Учёт кассы</HeadlineText>
        <Text>Управление финансами</Text>
      </Box>
    </Flex>
  );
}
