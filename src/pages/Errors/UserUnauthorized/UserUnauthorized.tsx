import { Button, Flex, Text, Alert } from "@mantine/core";
import axios from "axios";
import { useUserStore } from "../../../entities/stores/userStore";
import { API } from "../../../app/helpers";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { IconAlertCircle, IconCheck, IconX } from "@tabler/icons-react";

export default function UserUnauthorized({ name }: { name: string }) {
  const { userID } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const ResponseAccess = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      console.log("Отправка запроса на:", `${API}/auth`);
      console.log("Данные:", { tgId: userID, name: name });

      const response = await axios.post(`${API}/auth`, {
        tgId: userID,
        name: name,
      });

      console.log("Ответ сервера:", response.data);

      // Показываем уведомление
      notifications.show({
        title: "Успешно!",
        message: "Запрос был отправлен",
        position: "bottom-center",
        color: "green",
        autoClose: 3000,
        icon: <IconCheck size={18} />,
      });

      setSuccess(true);
    } catch (err: any) {
      console.error("Ошибка запроса:", err);

      let errorMessage = "Что-то пошло не так";

      if (err.response) {
        // Сервер ответил с ошибкой
        console.error("Данные ошибки:", err.response.data);
        console.error("Статус ошибки:", err.response.status);

        errorMessage =
          err.response.data?.message ||
          `Ошибка сервера: ${err.response.status}`;
      } else if (err.request) {
        // Запрос был сделан, но ответ не получен
        console.error("Не получен ответ от сервера");
        errorMessage = "Нет ответа от сервера";
      } else {
        // Что-то пошло не так при настройке запроса
        console.error("Ошибка настройки запроса:", err.message);
        errorMessage = err.message;
      }

      // Показываем уведомление
      notifications.show({
        title: "Ошибка",
        message: "Запрос уже отправлен",
        // message: errorMessage,
        position: "bottom-center",
        color: "red",
        autoClose: 5000,
        icon: <IconX size={18} />,
      });

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex
      gap={20}
      justify="center"
      direction="column"
      align="center"
      w="100%"
      h="100vh"
      p="md"
    >
      <Text size="xl" fw={500}>
        Доступ к приложению заблокирован
      </Text>

      <Text size="sm" c="dimmed" ta="center">
        Пользователь {name} не имеет доступа к системе
      </Text>

      {/* Отладочная информация */}
      {/* <Alert
        color="blue"
        title="Отладочная информация"
        icon={<IconAlertCircle size={16} />}
        w="100%"
        maw={400}
      >
        <Text size="xs">UserID: {userID || "не установлен"}</Text>
        <Text size="xs">Имя: {name}</Text>
        <Text size="xs">API: {API}</Text>
      </Alert> */}

      {/* Сообщение об успехе */}
      {success && (
        <Alert color="green" title="Успех!" w="100%" maw={400}>
          <Text size="sm">Запрос на доступ успешно отправлен!</Text>
        </Alert>
      )}

      {/* Сообщение об ошибке */}
      {error && (
        <Alert color="red" title="Ошибка" w="100%" maw={400}>
          <Text size="sm">{error}</Text>
        </Alert>
      )}

      <Button
        onClick={ResponseAccess}
        loading={loading}
        disabled={!userID}
        size="lg"
      >
        {loading ? "Отправка..." : "Запросить доступ"}
      </Button>

      {!userID && (
        <Text size="xs" c="red">
          Ошибка: UserID не установлен
        </Text>
      )}

      <Text size="xs" c="dimmed" ta="center">
        После запроса ожидайте подтверждения от администратора
      </Text>
    </Flex>
  );
}
