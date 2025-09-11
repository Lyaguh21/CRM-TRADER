import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Flex,
  Paper,
  Text,
} from "@mantine/core";
import { Status } from "../../../entities/Status";
import {
  IconArrowDown,
  IconArrowRight,
  IconCancel,
  IconCheck,
  IconEye,
} from "@tabler/icons-react";
import axios from "axios";
import { API } from "../../../app/helpers";
import { useState } from "react";
import { NavLink } from "react-router-dom";

type data = {
  id: number;
  typeToTrade: string;
  currency: string;
  crypto: string;
  rate: number;
  count: number;
  total: number;
  place: string;
  comments?: string;
  status: "InProcess" | "Complete" | "Canselled";
  createdAt: any;
};

export default function ApplicationsTemplate({ el }: { el: data }) {
  const [data, setData] = useState(el);
  function formatDate(dateString: string) {
    const date = new Date(dateString);

    return [
      String(date.getDate()).padStart(2, "0"),
      String(date.getMonth() + 1).padStart(2, "0"),
      date.getFullYear(),
    ].join("/");
  }

  const handlePassApplication = () => {
    axios
      .patch(`${API}/trades/${data.id}`, { status: "Complete" })
      .then((el) => setData(el.data));
  };

  const handleDiscardApplication = () => {
    axios
      .patch(`${API}/trades/${data.id}`, { status: "Canselled" })
      .then((el) => setData(el.data));
  };

  return (
    <Paper
      shadow="sm"
      bg="white"
      bdrs={24}
      p={15}
      style={{ borderBottom: "1px solid #9CA3AF20" }}
    >
      <Flex justify="space-between" align="center" mb={10}>
        <Box>
          <Text>{formatDate(data.createdAt)}</Text>
        </Box>
        <Badge
          size="md"
          c={Status.find((el) => el.name === data.status)?.text}
          bg={Status.find((el) => el.name === data.status)?.bg}
        >
          {Status.find((el) => data.status === el.name)?.title}
        </Badge>
      </Flex>

      <Flex justify="space-between" align="center">
        <Flex direction="column" align="center">
          {data.typeToTrade === "CryptoToCurrency" && (
            <>
              <Text fz={22} fw={600}>
                {data.count}
                {data.crypto}
              </Text>
              <IconArrowDown color="#9CA3AF" />
              <Text fz={22} fw={600}>
                {data.total} {data.currency}
              </Text>
            </>
          )}

          {data.typeToTrade === "CurrencyToCrypto" && (
            <>
              <Text fz={22} fw={600}>
                {data.total} {data.currency}
              </Text>
              <IconArrowDown color="#9CA3AF" />
              <Text fz={22} fw={600}>
                {data.count} {data.crypto}
              </Text>
            </>
          )}
        </Flex>

        <Flex direction="column" h="100%" align="stretch">
          {data.typeToTrade === "CurrencyToCrypto" ? (
            <Flex align="center">
              <Text fz={18} fw={600}>
                Нал
              </Text>
              <IconArrowRight />
              <Text fz={18} fw={600}>
                Крипта
              </Text>
            </Flex>
          ) : (
            <Flex align="center">
              <Text fz={18} fw={600}>
                Крипта
              </Text>
              <IconArrowRight />
              <Text fz={18} fw={600}>
                Нал
              </Text>
            </Flex>
          )}

          <Text fz={18} fw={600}>
            Курс: {data.rate}
          </Text>
          <Text fz={18} fw={600}>
            Место: {data.place === "location_1" ? "Соборный" : data.place}
          </Text>
        </Flex>
      </Flex>

      {data?.comments && (
        <Paper radius={9} my={10} bg="#EFF6FF" p={15} c="#6392EB" shadow="none">
          <Text fw={600}>Комментарий:</Text>
          <Text>{data?.comments}</Text>
        </Paper>
      )}
      <Flex
        align={"center"}
        gap={5}
        mt={10}
        justify={data.status === "InProcess" ? "space-between" : "end"}
      >
        {data.status === "InProcess" && (
          <>
            <Button bg="green" bdrs={9} style={{ flexGrow: "1" }}>
              <Flex align="center" gap={5} onClick={handlePassApplication}>
                <IconCheck /> Завершить
              </Flex>
            </Button>
            <Button
              bg="red"
              bdrs={9}
              style={{ flexGrow: "1" }}
              onClick={handleDiscardApplication}
            >
              <Flex align="center" gap={5}>
                <IconCancel /> Отменить
              </Flex>
            </Button>
          </>
        )}

        <NavLink to={`/applications/${data.id}`}>
          <ActionIcon bdrs={9} size={36}>
            <IconEye />
          </ActionIcon>
        </NavLink>
      </Flex>
    </Paper>
  );
}
