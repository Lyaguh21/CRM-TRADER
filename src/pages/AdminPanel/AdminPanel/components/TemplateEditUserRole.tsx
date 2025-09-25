import { Paper, Text, Flex, Box, Select, ActionIcon } from "@mantine/core";
import axios from "axios";
import { API } from "../../../../app/helpers";
import { useUserStore } from "../../../../entities/stores/userStore";
import { useState, useEffect } from "react";
import { Roles } from "../../../../entities/Roles";
import { IconMoneybag } from "@tabler/icons-react";

type typeData = {
  id: number;
  tgid: string;
  role: string;
  firstName: string;
};

type TemplateEditUserRoleProps = {
  el: typeData;
  onUpdate?: () => void;
};

export default function TemplateEditUserRole({
  el,
  onUpdate,
}: TemplateEditUserRoleProps) {
  const { userID } = useUserStore();
  const [data, setData] = useState(el);
  const [role, setRole] = useState<string | null>(el.role);

  // Обновляем состояние при изменении пропса el
  useEffect(() => {
    setData(el);
    setRole(el.role);
  }, [el]);

  const handleEditRole = (value: string | null) => {
    setRole(value);
    axios
      .patch(`${API}/auth?tgId=${userID}`, {
        tgId: data.tgid,
        role: value,
      })
      .then((res) => {
        setData(res.data);
        if (onUpdate) {
          onUpdate();
        }
      })
      .catch((err) => {
        console.error("Error updating role:", err);
        // В случае ошибки возвращаем предыдущее значение
        setRole(data.role);
      });
  };

  return (
    <>
      <Paper w="100%" p={15} shadow="xs" bg="white" bdrs={9}>
        <Flex justify="space-between">
          <Box>
            <Text fz={16}>
              Имя: <b>{data.firstName}</b>
            </Text>
            <Text fz={16}>
              Роль:{" "}
              <b>
                {Roles.find((roleItem) => roleItem.name === data.role)?.title}
              </b>
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
            onChange={handleEditRole}
            data={Roles.map((roleItem) => ({
              value: roleItem.name,
              label: roleItem.title,
            }))}
          />
        </Flex>
      </Paper>
    </>
  );
}
