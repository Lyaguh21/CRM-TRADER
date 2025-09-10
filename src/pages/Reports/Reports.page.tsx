import { Box, Button, Flex, Paper } from "@mantine/core";
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
          <Flex direction="column" gap={20}>
            <DateInput
              size="lg"
              value={dateFrom}
              onChange={setDateFrom}
              label="С"
              placeholder="Выберите начальную дату"
            />
            <DateInput
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
