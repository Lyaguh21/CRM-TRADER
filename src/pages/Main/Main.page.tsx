import Header from "./components/Header";
import FirstLine from "./components/FirstLine";
import QuickActions from "./components/QuickActions";

export default function Main() {
  const data = {
    countActiveApplications: 12,

    boxOffice: { rub: 1200, usd: 0, usdt: 0.1 },
  };

  return (
    <>
      <Header />
      <FirstLine data={data} />
      <QuickActions />
    </>
  );
}
