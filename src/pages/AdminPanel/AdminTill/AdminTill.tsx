import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../../app/helpers";
import { Currency } from "../../../entities/Currency";
import { useDisclosure } from "@mantine/hooks";
import { Paper, Text, Box, Flex, Button, LoadingOverlay } from "@mantine/core";
import {
  IconArrowLeft,
  IconCurrencyDollar,
  IconCurrencyEuro,
  IconCurrencyRubel,
  IconMinus,
  IconPlus,
} from "@tabler/icons-react";

import { Link, useParams } from "react-router-dom";
import HeadlineText from "../../../shared/HeadlineText/HeadlineText";
import ModalPushCurrency from "./components/ModalPushCurrency";
import ModalPullCurrency from "./components/ModalPullCurrency";
import { useUserStore } from "../../../entities/stores/userStore";
import { notifications } from "@mantine/notifications";

export default function AdminTill() {
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState<Currency>();
  const [change, setChange] = useState(false);
  const [openedPush, { open: openPush, close: closePush }] =
    useDisclosure(false);
  const [openedPull, { open: openPull, close: closePull }] =
    useDisclosure(false);

  const { userID } = useUserStore();
  const { id, name } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API}/till?tgId=${userID}&operId=${id}`)
      .then((res) => {
        setCurrency(res.data);
      })
      .finally(() => setLoading(false));
  }, [change]);

  const info = [
    {
      name: "RUB",
      count: currency?.RUB ?? 0,
      title: "Российский рубль",
      icon1: <IconCurrencyRubel color="#9333EA" size={32} />,
      icon2: <IconCurrencyRubel />,
      bg: "#F3E8FF",
    },
    {
      name: "USD",
      count: currency?.USD ?? 0,
      title: "Доллар США",
      icon1: <IconCurrencyDollar color="#50A34A" size={32} />,
      icon2: <IconCurrencyDollar />,
      bg: "#DCFCE7",
    },
    {
      name: "EUR",
      count: currency?.EUR ?? 0,
      title: "Евро",
      icon1: <IconCurrencyEuro color="#9333EA" size={32} />,
      icon2: <IconCurrencyEuro />,
      bg: "#F3E8FF",
    },
    {
      name: "USDT",
      count: currency?.USDT ?? 0,
      title: "Tether",
      icon1: <img src="/icons/Usdt.svg" />,
      icon2: (
        <Text fz={22} w={19} ml={5}>
          ₮
        </Text>
      ),
      bg: "#DBEAFE",
    },
  ];

  const endWorkTime = () => {
    setLoading(true);
    axios
      .get(`${API}/till/EndSession?operId=${id}`)
      .then(() => {
        notifications.show({
          title: "Успешно",
          message: "Сессия была завершена",
          position: "bottom-center",
          color: "green",
          autoClose: 3000,
        }),
          setChange(!change);
      })
      .catch(() =>
        notifications.show({
          title: "Ошибка",
          message: "Что-то пошло не так",
          position: "bottom-center",
          color: "red",
          autoClose: 3000,
        })
      )
      .finally(() => setLoading(false));
  };

  return (
    <>
      <ModalPushCurrency
        change={change}
        setChange={setChange}
        opened={openedPush}
        close={closePush}
        id={id}
        name={name}
      />
      <ModalPullCurrency
        change={change}
        setChange={setChange}
        opened={openedPull}
        close={closePull}
        id={id}
        name={name}
      />

      <Flex
        w="100%"
        p={15}
        align="center"
        style={{ borderBottom: "2px solid #9CA3AF20" }}
        gap={15}
      >
        <Link to="/admin">
          <IconArrowLeft size={36} />
        </Link>

        <Box>
          <HeadlineText>Учёт кассы {name}</HeadlineText>
        </Box>
      </Flex>

      <Box p={15}>
        <Paper bg="white" withBorder shadow="xs" p={15} pos="relative">
          <LoadingOverlay visible={loading} />
          <Text my={5} fw={500}>
            Текущие остатки
          </Text>
          {info.map((el, index) => (
            <Flex
              py={10}
              bg="white"
              justify="space-between"
              align="center"
              style={{
                borderBottom: "1px solid #9CA3AF20",
                borderTop: "1px solid #9CA3AF20",
              }}
              key={index}
            >
              <Flex gap={10} align="center">
                <Flex
                  align="center"
                  justify="center"
                  bdrs={10}
                  p={5}
                  bg={el.bg}
                >
                  {el.icon1}
                </Flex>
                <Box>
                  <Text fz={20} fw={600}>
                    {el.name}
                  </Text>
                  <Text fz={14} opacity={0.5}>
                    {el.title}
                  </Text>
                </Box>
              </Flex>

              <Flex align="center" gap={3}>
                <Text fz={24} fw={600}>
                  {el.count}
                </Text>
                {el.icon2}
              </Flex>
            </Flex>
          ))}
        </Paper>

        <Flex w="100%" gap={15} mt={15}>
          <Button
            h="auto"
            radius="lg"
            bg="#10B981"
            w={`calc(50% - 5px)`}
            onClick={openPush}
          >
            <Flex align="center" direction="column" gap={10} p={20}>
              <Flex
                justify="center"
                align="center"
                bdrs={10}
                p={10}
                bg="white"
                style={{ aspectRatio: "1/1" }}
                w={66}
              >
                <IconPlus color="#10B981" />
              </Flex>
              <Text c="white">Пополнить</Text>
            </Flex>
          </Button>

          <Button
            h="auto"
            radius="lg"
            bg="#EF4444"
            w={`calc(50% - 5px)`}
            onClick={openPull}
          >
            <Flex align="center" direction="column" gap={10} p={20}>
              <Flex
                justify="center"
                align="center"
                bdrs={10}
                p={10}
                bg="white"
                style={{ aspectRatio: "1/1" }}
                w={66}
              >
                <IconMinus color="#EF4444" />
              </Flex>
              <Text c="white">Вывести</Text>
            </Flex>
          </Button>
        </Flex>

        <Button
          mt={40}
          fullWidth
          size="lg"
          color="yellow"
          onClick={endWorkTime}
        >
          Закрыть смену
        </Button>
      </Box>
    </>
  );
}
