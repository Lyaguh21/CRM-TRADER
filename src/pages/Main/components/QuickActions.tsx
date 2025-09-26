import { Box, em, Flex, SimpleGrid, Text } from "@mantine/core";
import HeadlineText from "../../../shared/HeadlineText/HeadlineText";
import {
  IconCoins,
  IconNotes,
  IconPlus,
  IconReportAnalytics,
} from "@tabler/icons-react";
import { NavLink } from "react-router-dom";
import { useUserStore } from "../../../entities/stores/userStore";
import { useMediaQuery } from "@mantine/hooks";

export default function QuickActions() {
  const { userRole } = useUserStore();
  const mdMobile = useMediaQuery(`(max-width: ${em(409)})`);
  const data = [
    {
      link: "/create-application",
      name: "Новая заявка",
      subtitle: "Создать обменную заявку",
      icon: <IconPlus size={32} />,
      bgc: "-webkit-linear-gradient(353deg, #397ff5,#2765ec)",
    },
    {
      link: "/applications",
      name: "Все заявки",
      subtitle: "Просмотр и управление",
      icon: <IconNotes size={32} />,
      bgc: "-webkit-linear-gradient(353deg, #A753F6,#9536EB)",
    },
    {
      link: "/box-office",
      name: "Учет кассы",
      subtitle: "Управление балансом",
      icon: <IconCoins size={32} />,
      bgc: "-webkit-linear-gradient(353deg, #10B77C,#15A44D)",
    },
    {
      link: "/reports",
      name: "Отчеты",
      subtitle: "Аналитика и статистика",
      icon: <IconReportAnalytics size={32} />,
      bgc: "-webkit-linear-gradient(353deg, #F59C0B,#EB5D0C)",
    },
  ];

  return (
    <Box px={15}>
      <HeadlineText>Быстрые действия</HeadlineText>
      <SimpleGrid cols={2} spacing={15} verticalSpacing={15} mb={15}>
        {data.map((el, index) => (
          <NavLink key={index} to={el.link}>
            <Box
              p={15}
              w="100%"
              h="100%"
              style={{
                background: el.bgc,
                aspectRatio: "1/1",
                border: "1px solid #9CA3AF30",
                borderRadius: 24,
              }}
            >
              <Flex align="center" justify="space-between">
                <Flex
                  bg="#EBF2FE20"
                  p={5}
                  c="white"
                  justify={"center"}
                  align="center"
                  bdrs={9}
                  style={{
                    aspectRatio: "1/1",
                  }}
                >
                  {el.icon}
                </Flex>
              </Flex>
              <Text my={10} fw={550} fz={22} c="white">
                {el.name}
              </Text>
              {!mdMobile && (
                <Text c="#FFFFFF90" fz={16}>
                  {el.subtitle}
                </Text>
              )}
            </Box>
          </NavLink>
        ))}
      </SimpleGrid>

      {userRole === "Admin" && (
        <NavLink key={9} to="/admin">
          <Box
            p={15}
            w="100%"
            style={{
              background: "-webkit-linear-gradient(353deg, #d61e1e,#870f0f)",
              border: "1px solid #9CA3AF30",
              borderRadius: 24,
            }}
          >
            <Flex align="center" justify="space-between">
              <Flex
                bg="#EBF2FE20"
                p={5}
                c="white"
                justify={"center"}
                align="center"
                bdrs={9}
                style={{
                  aspectRatio: "1/1",
                }}
              >
                <IconReportAnalytics size={32} />
              </Flex>
            </Flex>
            <Text my={10} fw={550} fz={22} c="white">
              Админ панель
            </Text>
            {!mdMobile && (
              <Text c="#FFFFFF90" fz={16}>
                Панель управления для администратора
              </Text>
            )}
          </Box>
        </NavLink>
      )}
    </Box>
  );
}
