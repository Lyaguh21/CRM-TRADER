import { Box, Button, Flex, Paper, Select } from "@mantine/core";
import Header from "./components/Header";
import { useState } from "react";
import { DatePickerInput } from "@mantine/dates";

export default function Reports() {
  const [dateFrom, setDateFrom] = useState<string | null>();
  const [dateTo, setDateTo] = useState<string | null>();
  const [type, setType] = useState<string | null>("Applications");
  return (
    <>
      <Header />
      <Box p={15}>
        <Paper withBorder bg="white" p={15} shadow="xs">
          <Flex direction="column" gap={20}>
            <Select
              size="lg"
              value={type}
              onChange={setType}
              allowDeselect={false}
              data={[
                { value: "Applications", label: "Заявки" },
                { value: "BoxOffice", label: "Касса" },
              ]}
              label="Вид отчета"
            />
            <DatePickerInput
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
            />
            <Button size="lg">Скачать отчет</Button>
          </Flex>
        </Paper>
      </Box>
    </>
  );
}
