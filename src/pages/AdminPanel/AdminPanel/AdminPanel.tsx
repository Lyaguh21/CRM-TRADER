import { Box, Flex, Tabs, Text } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import HeadlineText from "../../../shared/HeadlineText/HeadlineText";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../../app/helpers";

import TemplateVerification from "./components/TemplateVerification";
import TemplateEditUserRole from "./components/TemplateEditUserRole";
import TemplateTillOperators from "./components/TemplateTillOperators";
import { useUserStore } from "../../../entities/stores/userStore";

type typeData = {
  id: number;
  tgid: string;
  role: string;
  firstName: string;
};

export default function AdminPanel() {
  const { userID } = useUserStore();
  const [variant, setVariant] = useState<string | null>("EditRole");
  const [edit, setEdit] = useState(false);
  const [refreshCounter, setRefreshCounter] = useState(0); // Добавляем счетчик обновлений

  const [dataVerified, setDataVerified] = useState<typeData[] | null>();
  const [dataRole, setDataRole] = useState<typeData[] | null>();

  const fetchData = () => {
    axios
      .get(`${API}/auth/verifiedUser?tgId=${userID}`)
      .then((res) => setDataVerified(res.data))
      .catch((err) => console.error(err));

    axios
      .get(`${API}/auth/allUsers?tgId=${userID}`)
      .then((res) => setDataRole(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, [variant, edit, userID, refreshCounter]); // Добавляем refreshCounter в зависимости

  // Функция для принудительного обновления данных
  const handleUpdate = () => {
    setRefreshCounter((prev) => prev + 1); // Увеличиваем счетчик для принудительного перерендера
  };

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
        <Tabs.Tab value="Till" style={{ flexGrow: 1 }}>
          Касса
        </Tabs.Tab>
      </Tabs.List>
      <Box p={15}>
        <Tabs.Panel value="EditRole">
          <HeadlineText>Изменение ролей пользователям</HeadlineText>
          <Flex mt={15} direction="column" gap={15}>
            {dataRole?.map((el) => (
              <TemplateEditUserRole
                key={`role-${el.id}-${refreshCounter}`} // Добавляем счетчик в ключ
                el={el}
                onUpdate={handleUpdate}
              />
            ))}
          </Flex>
        </Tabs.Panel>

        <Tabs.Panel value="AccessUser">
          <HeadlineText>Верификация пользователей</HeadlineText>
          <Flex mt={15} direction="column" gap={15}>
            {dataVerified?.map((el) => (
              <TemplateVerification
                key={`verified-${el.id}-${refreshCounter}`} // Добавляем счетчик в ключ
                edit={edit}
                setEdit={setEdit}
                data={el}
                onUpdate={handleUpdate}
              />
            ))}
          </Flex>
        </Tabs.Panel>

        <Tabs.Panel value="Till">
          <HeadlineText>Управление кассой операторов</HeadlineText>
          <Flex mt={15} direction="column" gap={15}>
            {dataRole
              ?.filter((el) => el.role === "Operator")
              ?.map((el) => (
                <TemplateTillOperators
                  key={`role-${el.id}-${refreshCounter}`} // Добавляем счетчик в ключ
                  el={el}
                  onUpdate={handleUpdate}
                />
              ))}
          </Flex>
        </Tabs.Panel>
      </Box>
    </Tabs>
  );
}
