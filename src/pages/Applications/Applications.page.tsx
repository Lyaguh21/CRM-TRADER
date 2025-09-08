import { useEffect, useState } from "react";
import Header from "./components/Header";
import { useUserStore } from "../../entities/stores/userStore";
import axios from "axios";
import { API } from "../../app/helpers";
import { Text } from "@mantine/core";
import ApplicationsTemplate from "./components/ApplicationTemplate";

export default function Applications() {
  const { userID } = useUserStore();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/trades?tgId=${userID}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  });

  return (
    <>
      <Header />
      {data.length !== 0 &&
        data.map((el) => <ApplicationsTemplate data={el} />)}

      {data.length === 0 && (
        <Text py={50} w="100%" ta="center">
          Заявок пока что нет
        </Text>
      )}
    </>
  );
}
