import { Box, Flex, Text } from "@mantine/core";
import { IconChevronRight, IconClock, IconWallet } from "@tabler/icons-react";
import { NavLink } from "react-router-dom";
import { boxOffice, dataInterface } from "../../../entities/MainPageRequest";

export default function FirstLine({ data }: { data: dataInterface }) {
  return (
    <Flex p={15} gap={15} justify={"space-between"} w="100%">
      <NavLink
        to="/my-applications"
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
              {data?.countActiveApplications}
            </Text>
          </Flex>
          <Text my={10}>Мои активные заявки</Text>
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

          {data.boxOffice.map((el: boxOffice) => (
            <Flex justify={"space-between"}>
              <Text c="#737D81" fz={12}>
                {el.name}
              </Text>
              <Flex gap={2} align="center">
                <Text fw={600} fz={12}>
                  {el.count}
                </Text>
                {el.icon}
              </Flex>
            </Flex>
          ))}
        </Box>
      </NavLink>
    </Flex>
  );
}
