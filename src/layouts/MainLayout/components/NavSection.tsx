import { Flex, Text } from "@mantine/core";
import {
  IconHome2,
  IconCoins,
  IconReportAnalytics,
  IconNotes,
} from "@tabler/icons-react";
import { NavLink } from "react-router-dom";

export default function NavSection() {
  const links = [
    { name: "Главная", icon: <IconHome2 />, link: "/" },
    { name: "Заявки", icon: <IconNotes />, link: "/applications" },
    { name: "Касса", icon: <IconCoins />, link: "/box-office" },
    { name: "Отчеты", icon: <IconReportAnalytics />, link: "/reports" },
  ];

  return (
    <Flex
      gap={30}
      p={15}
      bottom={0}
      pos="absolute"
      style={{ borderTop: "2px solid #9CA3AF20" }}
    >
      {links.map((el, index) => (
        <NavLink to={el.link} key={index}>
          {({ isActive }) => (
            <Text c={isActive ? "#3B82F6" : "#9CA3AF"} ta="center">
              {el.icon}
              {el.name}
            </Text>
          )}
        </NavLink>
      ))}
    </Flex>
  );
}
