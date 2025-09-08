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
import { IconArrowRight, IconEye } from "@tabler/icons-react";

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

export default function ApplicationsTemplate({ data }: { data: data }) {
  return (
    <Box
      bg="white"
      bdrs={24}
      p={15}
      style={{ borderBottom: "2px solid #9CA3AF20" }}
    >
      <Flex justify="space-between" align="center">
        <Box>
          <Text>{data.id}</Text>
          <Text>{data.createdAt}</Text>
        </Box>
        <Badge
          size="md"
          c={Status.find((el) => el.name === data.status)?.text}
          bg={Status.find((el) => el.name === data.status)?.bg}
        >
          {data.status}
        </Badge>
      </Flex>

      <Flex justify="space-between" align="center">
        <Flex gap={10} fz={32} align="center" fw="bold">
          {data.typeToTrade === "CryptoToCurrency" && (
            <>
              <Text>
                {data.count}
                {data.crypto}
              </Text>
              <IconArrowRight color="#9CA3AF" />
              <Text>{data.currency}</Text>
            </>
          )}

          {data.typeToTrade === "CurrencyToCrypto" && (
            <>
              <Text>
                {data.total} {data.currency}
              </Text>
              <IconArrowRight color="#9CA3AF" />
              <Text>{data.crypto}</Text>
            </>
          )}
        </Flex>

        <Box>
          <Text fz={14}>{data.typeToTrade}</Text>
          <Text fz={14}>Курс: {data.rate}</Text>
          <Text fz={14}>Место {data.place}</Text>
        </Box>
      </Flex>

      {data?.comments && (
        <Paper radius={9}>
          <Text>Комментарий:</Text>
          <Text>{data?.comments}</Text>
        </Paper>
      )}
      <Flex align={"center"} justify="space-between">
        <Button>Завершить</Button>
        <Button>Отменить</Button>
        <ActionIcon>
          <IconEye />
        </ActionIcon>
      </Flex>
    </Box>
  );
}
