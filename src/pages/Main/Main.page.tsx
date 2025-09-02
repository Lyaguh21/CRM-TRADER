import Header from "./components/Header";
import {
  IconCurrencyBitcoin,
  IconCurrencyDollar,
  IconCurrencyRubel,
} from "@tabler/icons-react";

import FirstLine from "./components/FirstLine";

export default function Main() {
  const data = {
    role: "Admin",
    countActiveApplications: 12,

    boxOffice: [
      { name: "RUB", count: 120000, icon: <IconCurrencyRubel size={14} /> },
      { name: "USD", count: 1000, icon: <IconCurrencyDollar size={14} /> },
      {
        name: "BTC",
        count: 0.52511,
        icon: <IconCurrencyBitcoin size={14} />,
      },
    ],
  };

  return (
    <>
      <Header data={data} />
      <FirstLine data={data} />
    </>
  );
}
