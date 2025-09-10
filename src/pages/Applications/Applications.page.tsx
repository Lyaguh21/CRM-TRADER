//@ts-nocheck
import { useEffect, useState } from "react";
import Header from "./components/Header";
import { useUserStore } from "../../entities/stores/userStore";
import axios from "axios";
import { API } from "../../app/helpers";
import {
  Flex,
  Text,
  Select,
  Grid,
  Button,
  Group,
  Box,
  Loader,
} from "@mantine/core";
import ApplicationsTemplate from "./components/ApplicationTemplate";
import { IconX } from "@tabler/icons-react";
import { Status } from "../../entities/Status";

export default function Applications() {
  const { userID } = useUserStore();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("Все");
  const [dateSort, setDateSort] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API}/trades?tgId=${userID}`)
      .then((res) => {
        setData(res.data);
        setFilteredData(res.data);
        setError(null);
      })
      .catch((err) => {
        console.log(err);
        setError("Не удалось загрузить заявки");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userID]);

  // Подсчет статусов
  const statusCounts = {
    InProcess: data.filter((item) => item.status === "InProcess").length,
    Complete: data.filter((item) => item.status === "Complete").length,
    Canselled: data.filter((item) => item.status === "Canselled").length,
    Всего: data.length,
  };

  // Применение фильтров и сортировки
  useEffect(() => {
    let result = [...data];

    // Фильтр по статусу
    if (statusFilter !== "Все") {
      result = result.filter((item) => item.status === statusFilter);
    }

    // Сортировка по дате
    result.sort((a, b) => {
      const dateA = new Date(a.date || a.createdAt);
      const dateB = new Date(b.date || b.createdAt);

      return dateSort === "newest" ? dateB - dateA : dateA - dateB;
    });

    setFilteredData(result);
  }, [data, statusFilter, dateSort]);

  // Сброс фильтров
  const resetFilters = () => {
    setStatusFilter("Все");
    setDateSort("newest");
  };

  if (loading) {
    return (
      <>
        <Header />
        <Flex h="70vh" w="100%" justify="center" align="center">
          <Loader />
        </Flex>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <Flex justify="center" align="center" h={200}>
          <Text color="red">{error}</Text>
        </Flex>
      </>
    );
  }

  return (
    <>
      <Header />

      {/* Компонент фильтров */}
      <Box p={15} bg="white" style={{ borderBottom: "2px solid #9CA3AF20" }}>
        <Text fw={600} mb={15}>
          Фильтры
        </Text>

        <Grid>
          <Grid.Col span={6}>
            <Select
              label="Статус"
              value={statusFilter}
              onChange={setStatusFilter}
              data={[
                { value: "Все", label: "Все" },
                ...Status.map((s) => ({ value: s.name, label: s.title })),
              ]}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              label="Сортировка по дате"
              value={dateSort}
              onChange={setDateSort}
              data={[
                { value: "newest", label: "Сначала новые" },
                { value: "oldest", label: "Сначала старые" },
              ]}
            />
          </Grid.Col>
        </Grid>

        <Group position="right" mt={15}>
          <Button
            variant="outline"
            rightSection={<IconX size={16} />}
            onClick={resetFilters}
          >
            Сбросить
          </Button>
        </Group>

        {/* Статистика по статусам */}
        <Flex justify="space-between" mt={20}>
          <Flex direction="column" align="center">
            <Text size="sm" color="dimmed">
              Ожидает
            </Text>
            <Text
              fw={700}
              color={Status.find((s) => s.name === "InProcess")?.text}
            >
              {statusCounts.InProcess}
            </Text>
          </Flex>
          <Flex direction="column" align="center">
            <Text size="sm" color="dimmed">
              Выполнено
            </Text>
            <Text
              fw={700}
              color={Status.find((s) => s.name === "Complete")?.text}
            >
              {statusCounts.Complete}
            </Text>
          </Flex>
          <Flex direction="column" align="center">
            <Text size="sm" color="dimmed">
              Отменено
            </Text>
            <Text
              fw={700}
              color={Status.find((s) => s.name === "Canselled")?.text}
            >
              {statusCounts.Canselled}
            </Text>
          </Flex>
          <Flex direction="column" align="center">
            <Text size="sm" color="dimmed">
              Всего
            </Text>
            <Text fw={700}>{statusCounts.Всего}</Text>
          </Flex>
        </Flex>
      </Box>

      {/* Список заявок */}
      <Flex direction="column" gap={15} mt={15} px={15}>
        {filteredData.length !== 0 ? (
          filteredData.map((el) => <ApplicationsTemplate key={el.id} el={el} />)
        ) : (
          <Text py={50} w="100%" ta="center">
            Заявок пока что нет
          </Text>
        )}
      </Flex>
    </>
  );
}
