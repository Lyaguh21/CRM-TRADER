import { Box, Flex, Text } from "@mantine/core";
import { IconChevronRight, IconClock, IconWallet } from "@tabler/icons-react";
import { NavLink } from "react-router-dom";
import { IconCurrencyDollar, IconCurrencyRubel } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../../app/helpers";
import { useUserStore } from "../../../entities/stores/userStore";
import { Currency } from "../../../entities/Currency";

export default function FirstLine() {
  const [count, setCount] = useState<number>();
  const [currency, setCurrency] = useState<Currency>();
  const { userID } = useUserStore();

  useEffect(() => {
    axios.get(`${API}/trades/count?tgId=${userID}`).then((res) => {
      setCount(res.data);
    });
    axios.get(`${API}/till`).then((res) => {
      setCurrency(res.data);
    });
  }, []);

  return (
    <Flex p={15} gap={15} justify={"space-between"} w="100%">
      <NavLink
        to="/applications"
        style={{ width: "50%", alignItems: "stretch", borderRadius: 24 }}
      >
        <Box
          p={15}
          w="100%"
          h="100%"
          bg="white"
          style={{
            // aspectRatio: "1/1",
            border: "2px solid #9CA3AF30",
            borderRadius: 24,
          }}
        >
          <Flex align="center" justify="space-between">
            <Flex
              bg="#EBF2FE"
              p={5}
              justify={"center"}
              align="center"
              bdrs={9}
              style={{
                aspectRatio: "1/1",
              }}
            >
              <IconClock color="#3B82F6" />
            </Flex>
            <Text fw={600} fz={24}>
              {count}
            </Text>
          </Flex>
          <Text my={10}>Мои заявки</Text>
          <Text c="#737D81" fz={12}>
            Ожидают обработки
          </Text>
        </Box>
      </NavLink>

      <NavLink
        to="/box-office"
        style={{ width: "50%", alignItems: "stretch", borderRadius: 24 }}
      >
        <Box
          p={15}
          bg="white"
          style={{
            // aspectRatio: "1/1",
            border: "2px solid #9CA3AF30",
            borderRadius: 24,
          }}
        >
          <Flex align="center" justify="space-between">
            <Flex
              bg="#E7F8F2"
              p={5}
              justify={"center"}
              align="center"
              bdrs={9}
              style={{
                aspectRatio: "1/1",
              }}
            >
              <IconWallet color="#10B981" />
            </Flex>
            <IconChevronRight color="#737D81" />
          </Flex>
          <Text my={10}>Баланс кассы</Text>

          <Flex justify={"space-between"}>
            <Text c="#737D81" fz={12}>
              RUB
            </Text>
            <Flex gap={2} align="center">
              <Text fw={600} fz={12}>
                {currency?.RUB ?? "0"}
              </Text>
              <IconCurrencyRubel size={14} />
            </Flex>
          </Flex>

          <Flex justify={"space-between"}>
            <Text c="#737D81" fz={12}>
              USD
            </Text>
            <Flex gap={2} align="center">
              <Text fw={600} fz={12}>
                {currency?.USD ?? "0"}
              </Text>
              <IconCurrencyDollar size={14} />
            </Flex>
          </Flex>

          <Flex justify={"space-between"}>
            <Text c="#737D81" fz={12}>
              USDT
            </Text>
            <Flex gap={3} align="center">
              <Text fw={600} fz={12}>
                {currency?.USDT ?? "0"}
              </Text>
              <img
                src="/icons/Usdt.svg"
                style={{ height: "14px", width: "14px" }}
              />
            </Flex>
          </Flex>
        </Box>
      </NavLink>
    </Flex>
  );
}
