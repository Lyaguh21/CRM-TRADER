import { Button, Flex, Text } from "@mantine/core";
import axios from "axios";
import { useUserStore } from "../../../entities/stores/userStore";
import { API } from "../../../app/helpers";
import { notifications } from "@mantine/notifications";

export default function UserUnauthorized(name: string) {
  const { userID } = useUserStore();

  const ResponseAccess = () => {
    axios
      .post(`${API}/auth`, {
        tgId: userID,
        name: name,
      })
      .then(() =>
        notifications.show({
          title: "Успешно!",
          message: "Запрос был отправлен",
          position: "bottom-center",
          color: "green",
          autoClose: 3000,
        })
      )
      .catch(() =>
        notifications.show({
          title: "Ошибка",
          message: "Что-то пошло не так",
          position: "bottom-center",
          color: "red",
          autoClose: 3000,
        })
      );
  };

  return (
    <Flex
      gap={10}
      justify="center"
      direction="column"
      align="center"
      w="100%"
      h="100vh"
    >
      <Text>Доступ к приложению заблокирован</Text>
      <Button onClick={ResponseAccess}>Запросить доступ</Button>
    </Flex>
  );
}
