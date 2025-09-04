import { Outlet } from "react-router-dom";
import NavSection from "./components/NavSection";
import { Flex, Box } from "@mantine/core";

export default function MainLayout() {
  return (
    <Flex justify="center" bg="dark">
      <Box w={425} mih="100vh" h="100%" bg="#F9FAFB" pos="relative" pb={85}>
        <Outlet />
        <NavSection />
      </Box>
    </Flex>
  );
}
