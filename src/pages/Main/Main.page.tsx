import { Avatar, Flex, Text } from "@mantine/core";
import RoleBadge from "../../shared/RoleBadge/RoleBadge";
import { IconPoint } from "@tabler/icons-react";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";

export default function Main() {
  let launchParams = null;
  try {
    launchParams = retrieveLaunchParams();
  } catch {}

  const data = {
    name: "Карен Джан",
    role: "Admin",
  };

  return (
    <>
      <Flex
        w="100%"
        p={15}
        justify="space-between"
        align="center"
        style={{ borderBottom: "2px solid #9CA3AF20" }}
      >
        <Flex gap={10} align="center">
          <Text c="#737D81">
            {launchParams?.tgWebAppData?.user?.first_name}{" "}
            {launchParams?.tgWebAppData?.user?.last_name}
          </Text>
          <IconPoint color="#737D81" fill="#737D81" size={12} />
          <RoleBadge role={data.role} />
        </Flex>

        <Avatar src={launchParams?.tgWebAppData?.user?.photo_url} />
      </Flex>
    </>
  );
}
