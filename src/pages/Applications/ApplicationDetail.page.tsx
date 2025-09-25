import {
  Badge,
  Box,
  Button,
  Flex,
  Paper,
  Text,
  Title,
  Divider,
} from "@mantine/core";
import { IconArrowDown, IconCancel, IconCheck } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Status } from "../../entities/Status";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { API } from "../../app/helpers";
import { operationType } from "../../entities/OperationFormInfo";

type dataType = {
  id: number;
  typeToTrade: "CurrencyToCrypto" | "CryptoToCurrency" | "CurrencyToCurrency";
  from: string;
  to: string;
  count: number;
  rate: number;
  total: number;
  place: string;
  comments?: string;
  status: "InProcess" | "Complete" | "Canselled";
  operatorId: number;
  createdAt: string;
  updatedAt: string;
  wallet: string;
};

// Форматирование даты
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return [
    String(date.getDate()).padStart(2, "0"),
    String(date.getMonth() + 1).padStart(2, "0"),
    date.getFullYear(),
  ].join("/");
};

// Формат времени
const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return [
    String(date.getHours()).padStart(2, "0"),
    String(date.getMinutes()).padStart(2, "0"),
  ].join(":");
};

export default function ApplicationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<dataType>();

  useEffect(() => {
    axios
      .get(`${API}/trades/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  const handlePassApplication = () => {
    axios
      .patch(`${API}/trades/${data?.id}`, { status: "Complete" })
      .then((el) => setData(el.data));
  };

  const handleDiscardApplication = () => {
    axios
      .patch(`${API}/trades/${data?.id}`, { status: "Canselled" })
      .then((el) => setData(el.data));
  };

  return (
    <Box p="md" bg="#F8FAFC" style={{ overflowY: "auto" }}>
      {/* Заголовок */}
      <Title order={4} mb="md" ta="center">
        Заявка #{data?.id}
      </Title>

      {/* Статус и дата */}
      <Paper bg="white" p="md" mb="md" radius="lg" shadow="sm">
        <Flex justify="space-between" align="center" mb="xs">
          <Text size="sm" c="dimmed">
            Создана
          </Text>
          <Text size="sm">
            {formatDate(data?.createdAt ?? "")}{" "}
            {formatTime(data?.createdAt ?? "")}
          </Text>
        </Flex>

        <Flex justify="space-between" align="center">
          <Badge
            size="lg"
            radius="sm"
            c={Status.find((s) => s.name === data?.status)?.text}
            bg={Status.find((s) => s.name === data?.status)?.bg}
          >
            {Status.find((s) => s.name === data?.status)?.title}
          </Badge>
          {data?.updatedAt !== data?.createdAt && (
            <Text size="xs" c="dimmed">
              Обновлена: {formatTime(data?.updatedAt ?? "")}
            </Text>
          )}
        </Flex>
      </Paper>

      {/* Основная информация */}
      <Paper bg="white" p="md" mb="md" radius="lg" shadow="sm">
        <Flex direction="column" gap="md">
          {/* Тип обмена */}
          <Flex justify="space-between" align="center">
            <Text size="sm" c="dimmed">
              Тип обмена
            </Text>
            <Text fw={600}>
              {
                operationType.find((el) => el.value === data?.typeToTrade)
                  ?.label
              }
            </Text>
          </Flex>

          <Divider />

          {/* Суммы */}
          <Flex direction="column" align="center" my="md">
            <Text size="xl" fw={700}>
              {data?.total} {data?.from}
            </Text>
            <IconArrowDown color="#9CA3AF" size={24} />
            <Text size="xl" fw={700}>
              {data?.count} {data?.to}
            </Text>
          </Flex>

          <Divider />

          {/* Детали */}
          <Flex justify="space-between" align="center">
            <Text size="sm" c="dimmed">
              Курс
            </Text>
            <Text fw={600}>{data?.rate}</Text>
          </Flex>

          <Flex justify="space-between" align="center">
            <Text size="sm" c="dimmed">
              Место встречи
            </Text>
            <Text fw={600}>
              {data?.place === "location_1" ? "Соборный" : data?.place}
            </Text>
          </Flex>
          <Flex justify="space-between" align="center">
            <Text size="sm" c="dimmed">
              Кошелек
            </Text>
            <Text fw={600}>#{data?.wallet}</Text>
          </Flex>
          <Flex justify="space-between" align="center">
            <Text size="sm" c="dimmed">
              Оператор
            </Text>
            <Text fw={600}>ID {data?.operatorId}</Text>
          </Flex>
        </Flex>
      </Paper>

      {/* Комментарий */}
      {data?.comments && (
        <Paper bg="#EFF6FF" p="md" mb="md" radius="lg">
          <Text fw={600} mb="xs" c="#6392EB">
            Комментарий
          </Text>
          <Text>{data?.comments}</Text>
        </Paper>
      )}

      {/* Footer с действиями (если нужно) */}
      <Paper bg="white" p="md" radius="lg" shadow="sm">
        {data?.status === "InProcess" && (
          <Flex gap={10} mb="md">
            <Button bg="green" size="lg" bdrs={9} style={{ flexGrow: "1" }}>
              <Flex align="center" gap={5} onClick={handlePassApplication}>
                <IconCheck /> Завершить
              </Flex>
            </Button>
            <Button
              size="lg"
              bg="red"
              bdrs={9}
              style={{ flexGrow: "1" }}
              onClick={handleDiscardApplication}
            >
              <Flex align="center" gap={5}>
                <IconCancel /> Отменить
              </Flex>
            </Button>
          </Flex>
        )}

        <NavLink to="/applications">
          <Button bdrs={9} size="lg" fullWidth>
            Назад
          </Button>
        </NavLink>
      </Paper>
    </Box>
  );
}
