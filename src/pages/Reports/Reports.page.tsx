import { Box, Button, Paper, Text } from "@mantine/core";
import Header from "./components/Header";
import { useState } from "react";
import { DateInput } from "@mantine/dates";

export default function Reports() {
  const [dateFrom, setDateFrom] = useState<string | null>();
  const [dateTo, setDateTo] = useState<string | null>();

  return (
    <>
      <Header />
      <Box p={15}>
        <Paper withBorder bg="white" p={15} shadow="xs">
          <DateInput
            value={dateFrom}
            onChange={setDateFrom}
            label="С"
            placeholder="Выберите начальную дату"
          />
          <DateInput
            value={dateTo}
            onChange={setDateTo}
            label="По"
            placeholder="Выберите конечную дату"
          />
          <Button>Скачать отчет</Button>
        </Paper>
      </Box>
    </>
  );
}
