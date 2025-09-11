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
export default function TemplateVerification({
  data,
  edit,
  setEdit,
}: {
  data: typeData;
  edit: boolean;
  // @ts-ignore
  setEdit: any;
}) {
  const { userID } = useUserStore();
  const HandleVerifiedUser = () => {
    axios
      .patch(`${API}/auth?tgId=${userID}`, {
        tgId: data.tgid,
        role: "Operator",
      })
      .then(() => setEdit(!edit));
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
              textDecoration: "underline",
              color: "black",
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            Ссылка на аккаунт
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
