import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import Main from "../../pages/Main/Main.page";
import Error404 from "../../pages/Errors/Error404/Error404.page";
import Applications from "../../pages/Applications/Applications.page";
import BoxOffice from "../../pages/BoxOffice/BoxOffice.page";
import Reports from "../../pages/Reports/Reports.page";

import AdminPanel from "../../pages/AdminPanel/AdminPanel/AdminPanel";
import ApplicationDetailPage from "../../pages/Applications/ApplicationDetail.page";
import CreateApplication from "../../pages/Applications/CreateApplication";
import AdminTill from "../../pages/AdminPanel/AdminTill/AdminTill";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/applications",
        element: <Applications />,
      },
      {
        path: "/applications/:id",
        element: <ApplicationDetailPage />,
      },
      {
        path: "/create-application",
        element: <CreateApplication />,
      },
      {
        path: "/box-office",
        element: <BoxOffice />,
      },
      {
        path: "/reports",
        element: <Reports />,
      },
      {
        path: "/admin",
        element: <AdminPanel />,
      },
      {
        path: "/admin/till/:id/:name",
        element: <AdminTill />,
      },
    ],
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
