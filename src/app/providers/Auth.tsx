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
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    try {
      const launchParams = retrieveLaunchParams();
      const tgUserId =
        launchParams?.initDataUnsafe?.user?.id ||
        launchParams?.tgWebAppData?.user?.id;

      if (tgUserId) {
        setUserID(tgUserId.toString());
      } else {
        throw new Error("User ID not found in launch params");
      }
    } catch (err) {
      console.error("Failed to retrieve launch params:", err);
      setError({ error: "Unauthorized" });
    } finally {
      setLoading(false);
    }
  }, [setUserID]);

  useEffect(() => {
    // if (!userID) return;

    setLoading(true);
    axios
      .get(`${API}/auth?tgId=796343476`)
      // .get(`${API}/auth?tgId=${userID}`)
      .then((res) => {
        const userData = res.data;
        setData(userData);
        setUserID(userData?.tgid);
        setUserRole(userData?.role);
        setError(null);
      })
      .catch((err) => {
        console.error("Auth error:", err);
        setError(err.response?.data || { error: "Network error" });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userID, setUserID, setUserRole]);

  if (loading || !userID) {
    return (
      <Center w="100vw" h="100vh">
        <Loader />
      </Center>
    );
  }

  if (error?.error === "Unauthorized" || data?.error === "Unauthorized") {
    const launchParams = retrieveLaunchParams();
    const firstName = launchParams?.initDataUnsafe?.user?.first_name || "";
    const lastName = launchParams?.initDataUnsafe?.user?.last_name || "";
    return <UserUnauthorized name={`${firstName} ${lastName}`} />;
  }

  if (!data && !error) {
    return (
      <Center w="100vw" h="100vh">
        <Loader />
      </Center>
    );
  }

  return <>{children}</>;
}
