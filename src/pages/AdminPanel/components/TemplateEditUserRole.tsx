import { Paper, Text, Flex, Box, Select } from "@mantine/core";
import axios from "axios";
import { API } from "../../../app/helpers";
import { useUserStore } from "../../../entities/stores/userStore";
import { useState } from "react";
import { Roles } from "../../../entities/Roles";

type typeData = {
  id: number;
  tgid: string;
  role: string;
  firstName: string;
};
export default function TemplateEditUserRole({ el }: { el: typeData }) {
  const { userID } = useUserStore();
  const [data, setData] = useState(el);
  const [role, setRole] = useState<string | null>(el.role);

  const handleEditRole = (value: string | null) => {
    setRole(value);
    axios
      .patch(`${API}/auth?tgId=${userID}`, {
        tgId: data.tgid,
        role: value,
      })
      .then((res) => setData(res.data));
  };

  return (
    <Paper w="100%" p={15} shadow="xs" bg="white" bdrs={9}>
      <Flex justify="space-between">
        <Box>
          <Text fz={16}>
            Имя: <b>{data.firstName}</b>
          </Text>
          <Text fz={16}>
            Роль: <b>{Roles.find((el) => el.name === data.role)?.title}</b>
          </Text>
          <a
            href={`tg://user?id=${data.tgid}`}
            style={{
              textDecoration: "underline",
              color: "black",
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            Ссылка на аккаунт
          </a>
        </Box>

        <Select
          allowDeselect={false}
          value={role}
          onChange={(value) => handleEditRole(value)}
          data={Roles.map((role) => ({
            value: role.name, // ← сохраняется в стейт
            label: role.title, // ← отображается пользователю
          }))}
        />
      </Flex>
    </Paper>
  );
}
