import { Button, Flex, Text } from "@mantine/core";

export default function UserUnauthorized() {
  return (
    <Flex justify="center" direction="column" align="center" w="100%" h="100vh">
      <Text>Доступ к приложению заблокирован</Text>
      <Button>Запросить доступ</Button>
    </Flex>
  );
}
