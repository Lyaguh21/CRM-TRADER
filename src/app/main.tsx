import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { init, miniApp, viewport } from "@telegram-apps/sdk-react";

const initializeTelegramSDK = async () => {
  try {
    await init();

    if (miniApp.ready.isAvailable()) {
      await miniApp.ready();
    }

    if (viewport.requestFullscreen.isAvailable()) {
      await viewport.requestFullscreen();
      console.log("Запрошен полноэкранный режим");
    } else {
      const data = JSON.stringify({
        eventType: "web_app_request_fullscreen",
      });
      window.parent.postMessage(data, "https://web.telegram.org");
    }
  } catch (error) {
    console.error("Ошибка инициализации:", error);
  }
};

initializeTelegramSDK();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
