import { Box, Button, Flex, Paper, Select, Text } from "@mantine/core";
import Header from "./components/Header";
import axios from "axios";
import { API } from "../../app/helpers";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { DatePickerInput } from "@mantine/dates";
import { CurrencyArray } from "../../entities/Currency";

export default function Reports() {
  const [dateFrom, setDateFrom] = useState<string | null>();
  const [dateTo, setDateTo] = useState<string | null>();
  const [type, setType] = useState<string | null>("Applications");

  const [valueTypeTill, setValueTypeTill] = useState<string | null>("RUB");
  const [operationType, setOperationType] = useState<string | null>("Push");

  const [tradeType, setTradeType] = useState<string | null>("CryptoToCurrency");
  const handleClick = () => {
    if (type === "Applications") {
      axios
        .get(
          `${API}/table/trade?TradeType=${tradeType}&FromStartDate=${dateFrom}&ToStartDate=${dateTo}`
        )
        .then(() =>
          notifications.show({
            title: "Успешно",
            message: "Отчет заявок обновлен",
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
    } else {
      axios
        .get(
          `${API}/table/tillValueType=${valueTypeTill}&FromStartDate=${dateFrom}&ToStartDate=${dateTo}&OperationType=${operationType}`
        )
        .then(() =>
          notifications.show({
            title: "Успешно",
            message: "Отчет кассы обновлен",
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
    }
  };

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
            {type === "BoxOffice" && (
              <>
                <Select
                  size="lg"
                  value={valueTypeTill}
                  onChange={setValueTypeTill}
                  label="Тип валюты"
                  allowDeselect={false}
                  data={CurrencyArray}
                />
                <Select
                  size="lg"
                  value={operationType}
                  onChange={setOperationType}
                  allowDeselect={false}
                  label="Тип операции"
                  data={[
                    { value: "Pull", label: "Пополнение" },
                    { value: "Push", label: "Вывод" },
                  ]}
                />
              </>
            )}

            {type === "Applications" && (
              <>
                <Select
                  size="lg"
                  value={tradeType}
                  onChange={setTradeType}
                  allowDeselect={false}
                  label="Тип операции"
                  data={[
                    { value: "CryptoToCurrency", label: "Крипта/Нал" },
                    { value: "CurrencyToCrypto", label: "Нал/Крипта" },
                  ]}
                />
              </>
            )}
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
            <Button size="lg" onClick={handleClick}>
              Сформировать отчет
            </Button>
            <Text ta="center" style={{ textDecoration: "underline" }}>
              <a
                href={
                  type === "Applications"
                    ? "https://docs.google.com/spreadsheets/d/1FYMjDXtYuH3I7nF6WldKTA8pXvzEwQl-JcHn6gLgPew/edit?gid=0#gid=0"
                    : "https://docs.google.com/spreadsheets/d/1Deb-5X588PtkyWbw4jPf4qo6ij-P1B--C6u8fMkrmdM/edit?gid=0#gid=0"
                }
              >
                Таблица доступна по ссылке
              </a>
            </Text>
          </Flex>
        </Paper>
      </Box>
    </>
  );
}
