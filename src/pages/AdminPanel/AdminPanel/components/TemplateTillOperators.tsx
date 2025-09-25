import { Paper, Text, Flex, Box, ActionIcon } from "@mantine/core";
import { useState, useEffect } from "react"; // Добавляем useEffect
import { Roles } from "../../../../entities/Roles";
import { IconEye } from "@tabler/icons-react";
import { Link } from "react-router-dom";

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

export default function TemplateTillOperators({
  el,
}: TemplateEditUserRoleProps) {
  const [data, setData] = useState(el);

  // Обновляем состояние при изменении пропса el
  useEffect(() => {
    setData(el);
  }, [el]);

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
          <Link to={`/admin/till/${data.id}/${data.firstName}`}>
            <ActionIcon bdrs={9} size={74} mt={5}>
              <IconEye size={50} />
            </ActionIcon>
          </Link>
        </Flex>
      </Paper>
    </>
  );
}
