import { Paper, Text, Flex, ActionIcon, Box } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import axios from "axios";
import { API } from "../../../app/helpers";
import { useUserStore } from "../../../entities/stores/userStore";

type typeData = {
  id: number;
  tgid: string;
  role: string;
  firstName: string;
};

type TemplateVerificationProps = {
  data: typeData;
  edit: boolean;
  setEdit: (edit: boolean) => void;
  onUpdate?: () => void; // Добавляем callback для обновления
};

export default function TemplateVerification({
  data,
  edit,
  setEdit,
  onUpdate,
}: TemplateVerificationProps) {
  const { userID } = useUserStore();

  const HandleVerifiedUser = () => {
    axios
      .patch(`${API}/auth?tgId=${userID}`, {
        tgId: data.tgid,
        role: "Operator",
      })
      .then(() => {
        setEdit(!edit);
        // Вызываем callback для обновления данных в родительском компоненте
        if (onUpdate) {
          onUpdate();
        }
      });
  };

  return (
    <Paper w="100%" p={15} shadow="xs" bg="white" bdrs={9}>
      <Flex justify="space-between" align="center">
        <Box>
          <Text fz={16}>
            Имя: <b>{data.firstName}</b>
          </Text>
          <a
            href={`tg://user?id=${data.tgid}`}
            style={{
              color: "black",
              fontSize: "16px",
            }}
          >
            ID: <b>#{data.tgid}</b>
          </a>
        </Box>

        {data.role === "NeedVerified" && (
          <ActionIcon
            bdrs={9}
            bg="green"
            size={36}
            onClick={HandleVerifiedUser}
          >
            <IconCheck />
          </ActionIcon>
        )}
      </Flex>
    </Paper>
  );
}
