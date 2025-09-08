// @ts-nocheck
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import axios from "axios";
import { ReactNode, useState } from "react";
import { API } from "../helpers";

export default function Auth({ children }: { children: ReactNode }) {
  const [data, setData] = useState();
  let launchParams = null;
  try {
    launchParams = retrieveLaunchParams();
  } catch {}

  axios
    .get(`${API}/auth?tgId=${launchParams?.tgWebAppData?.user?.id}`)
    .then((res) => setData(res.data))
    .catch((err) => console.error(err));

  return <>{children}</>;
}
