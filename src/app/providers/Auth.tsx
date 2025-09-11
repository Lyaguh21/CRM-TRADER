// @ts-nocheck
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import axios from "axios";
import { ReactNode, useEffect, useState } from "react";
import { API } from "../helpers";
import { useUserStore } from "../../entities/stores/userStore";
import { Center, Loader } from "@mantine/core";
import UserUnauthorized from "../../pages/Errors/UserUnauthorized/UserUnauthorized";

export default function Auth({ children }: { children: ReactNode }) {
  const { setUserID, setUserRole } = useUserStore();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [tgUserId, setTgUserId] = useState<string | null>(null);
  let launchParams;

  useEffect(() => {
    try {
      const launchParams = retrieveLaunchParams();
      const userId =
        launchParams?.initDataUnsafe?.user?.id ||
        launchParams?.tgWebAppData?.user?.id;

      if (userId) {
        const userIdStr = userId.toString();
        setTgUserId(userIdStr);
        setUserID(userIdStr);
      } else {
        throw new Error("User ID not found in launch params");
      }
    } catch (err) {
      console.error("Failed to retrieve launch params:", err);
      setError({ error: "Unauthorized" });
      setLoading(false);
    }
  }, [setUserID]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API}/auth?tgId=${tgUserId}`)
      // .get(`${API}/auth?tgId=796343476`)
      .then((res) => {
        const responseData = res.data;

        // Проверяем, что пользователь найден и имеет нужную роль
        if (
          responseData &&
          responseData.id &&
          (responseData.role === "Admin" || responseData.role === "Operator")
        ) {
          setUserData(responseData);
          setUserID(responseData.tgid);
          setUserRole(responseData.role);
          setError(null);
        } else {
          // Если пользователь найден, но нет нужной роли
          setError({ error: "Unauthorized", message: "Недостаточно прав" });
        }
      })
      .catch((err) => {
        console.error("Auth error:", err);
        // Проверяем конкретно 404 ошибку "Пользователь не найден"
        if (
          err.response?.status === 404 ||
          err.response?.data?.error === "Not Found"
        ) {
          setError({ error: "Not Found", message: "Пользователь не найден" });
        } else {
          setError(err.response?.data || { error: "Network error" });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [tgUserId, setUserID, setUserRole]);

  // Показываем загрузку
  if (loading) {
    return (
      <Center w="100vw" h="100vh">
        <Loader />
      </Center>
    );
  }

  // Показываем ошибку если:
  // 1. Не удалось получить ID из Telegram
  // 2. Ошибка API
  // 3. Пользователь не найден
  // 4. Нет прав
  if (error || !userData) {
    try {
      launchParams = retrieveLaunchParams();
    } catch {}

    const firstName = launchParams?.tgWebAppData?.user?.first_name || "";
    const lastName = launchParams?.tgWebAppData?.user?.last_name || "";

    return (
      <UserUnauthorized
        name={`${firstName}${lastName ? ` ${lastName}` : lastName}`}
      />
    );
  }

  // Если пользователь авторизован и имеет нужную роль
  return <>{children}</>;
}
