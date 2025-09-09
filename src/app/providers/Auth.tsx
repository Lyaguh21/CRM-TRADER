// @ts-nocheck
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import axios from "axios";
import { ReactNode, useEffect, useState } from "react";
import { API } from "../helpers";
import { useUserStore } from "../../entities/stores/userStore";
import { Center, Loader } from "@mantine/core";
import UserUnauthorized from "../../pages/Errors/UserUnauthorized/UserUnauthorized";

export default function Auth({ children }: { children: ReactNode }) {
  const { setUserID, setUserRole, userID } = useUserStore();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  let launchParams;
  useEffect(() => {
    try {
      launchParams = retrieveLaunchParams();

      const tgUserId = launchParams?.tgWebAppData?.user?.id;
      if (tgUserId) {
        setUserID(tgUserId.toString());
      }
    } catch (error) {
      console.error("Failed to retrieve launch params:", error);
    }
  }, [setUserID]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API}/auth?tgId=${userID}`)
      // .get(`${API}/auth?tgId=796343476`)
      .then((res) => {
        setData(res.data);
        setUserID(data?.tgid);
        setUserRole(data?.role);
        setError(null);
      })
      .catch((err) => {
        console.error("Auth error:", err);
        setError(err.response?.data || { error: "Network error" });
      })
      .finally(() => setLoading(false));
  }, [userID]);

  // Показываем загрузку пока проверяем авторизацию
  if (loading) {
    return (
      <Center w="100vw" h="100vh">
        <Loader />
      </Center>
    );
  }

  // Проверяем наличие ошибки авторизации
  if (error?.error === "Unauthorized" || data?.error === "Unauthorized") {
    return (
      <UserUnauthorized
        name={`${launchParams.tgWebAppData?.user?.first_name} ${launchParams.tgWebAppData?.user?.last_name}`}
      />
    );
  }

  // Если данных нет, но и ошибки нет, возможно еще загружается
  if (!data && !error) {
    return (
      <Center w="100vw" h="100vh">
        <Loader />
      </Center>
    );
  }

  return <>{children}</>;
}
