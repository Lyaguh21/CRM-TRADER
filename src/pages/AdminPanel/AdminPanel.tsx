import { Box, Flex, Tabs, Text } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import HeadlineText from "../../shared/HeadlineText/HeadlineText";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../app/helpers";
import { useUserStore } from "../../entities/stores/userStore";
import TemplateVerification from "./components/TemplateVerification";
import TemplateEditUserRole from "./components/TemplateEditUserRole";

type typeData = {
  id: number;
  tgid: string;
  role: string;
  firstName: string;
};
export default function AdminPanel() {
  const { userID } = useUserStore();
  const [variant, setVariant] = useState<string | null>("EditRole");

  const [data, setData] = useState<typeData[] | null>();

  useEffect(() => {
    axios
      .get(`${API}/auth/verifiedUser?tgId=${userID}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, [variant]);

  return (
    <Tabs value={variant} onChange={setVariant}>
      <Flex w="100%" p={15} align="center" gap={15}>
        <Link to="/">
          <IconArrowLeft size={36} />
        </Link>

        <Box>
          <HeadlineText>Панель админа</HeadlineText>
          <Text>Управление пользователями</Text>
        </Box>
      </Flex>
      <Tabs.List>
        <Tabs.Tab value="EditRole" style={{ flexGrow: 1 }}>
          Роли
        </Tabs.Tab>
        <Tabs.Tab value="AccessUser" style={{ flexGrow: 1 }}>
          Верификация
        </Tabs.Tab>
      </Tabs.List>
      <Box p={15}>
        <Tabs.Panel value="EditRole">
          <HeadlineText>Изменение ролей пользователям</HeadlineText>
          <Flex mt={15} direction="column" gap={15}>
            {data?.map((el) => (
              <TemplateEditUserRole el={el} />
            ))}
          </Flex>
        </Tabs.Panel>
        <Tabs.Panel value="AccessUser">
          <HeadlineText>Верификация пользователей</HeadlineText>
          <Flex mt={15} direction="column" gap={15}>
            {data?.map((el) => (
              <TemplateVerification data={el} />
            ))}
          </Flex>
        </Tabs.Panel>
      </Box>
    </Tabs>
  );
}
