import { Box, Button, Flex, Paper, Text } from "@mantine/core";
import Header from "./components/Header";
import axios from "axios";
import { API } from "../../app/helpers";
import { notifications } from "@mantine/notifications";

export default function Reports() {
  // const [dateFrom, setDateFrom] = useState<string | null>();
  // const [dateTo, setDateTo] = useState<string | null>();
  // const [type, setType] = useState<string | null>("Applications");

  const handleClick = () => {
    axios
      .get(`${API}/table/export?sortBy=%20%20`)
      .then(() =>
        notifications.show({
          title: "Успешно",
          message: "Отчет успешно обновлен",
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
    <>
      <Header />
      <Box p={15}>
        <Paper withBorder bg="white" p={15} shadow="xs">
          <Flex direction="column" gap={20}>
            {/* <Select
              size="lg"
              value={type}
              onChange={setType}
              allowDeselect={false}
              data={[
                { value: "Applications", label: "Заявки" },
                { value: "BoxOffice", label: "Касса" },
              ]}
              label="Вид отчета"
            /> */}
            {/* <DatePickerInput
              size="lg"
              value={dateFrom}
              onChange={setDateFrom}
              label="С"
              placeholder="Выберите начальную дату"
            />
            <DatePickerInput
              size="lg"
              value={dateTo}
              onChange={setDateTo}
              label="По"
              placeholder="Выберите конечную дату"
            /> */}
            <Button size="lg">Сформировать отчет</Button>
            <Text ta="center" style={{ textDecoration: "underline" }}>
              <a href="https://docs.google.com/spreadsheets/d/1FYMjDXtYuH3I7nF6WldKTA8pXvzEwQl-JcHn6gLgPew/edit?usp=sharing">
                Таблица доступна по ссылке
              </a>
            </Text>
          </Flex>
        </Paper>
      </Box>
    </>
  );
}
