import { Outlet } from "react-router-dom";
import NavLayout from "./components/NavLayout";
import { Flex, Box } from "@mantine/core";

export default function MainLayout() {
  return (
    <Flex justify="center" bg="dark">
      <Box w={425} h="100vh" bg="white">
        <NavLayout />
        <Outlet />
      </Box>
    </Flex>
  );
}
