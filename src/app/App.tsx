import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Router } from "./providers/Router";
import { theme } from "./theme";
import Auth from "./providers/Auth";

export default function App() {
  return (
    // Закреплена только светлая тема
    <MantineProvider theme={theme} forceColorScheme="light">
      <Auth>
        <Notifications />
        <Router />
      </Auth>
    </MantineProvider>
  );
}
