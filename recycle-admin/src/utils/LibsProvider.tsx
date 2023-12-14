import { FC } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { AppVersion } from "./AppVersion";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ModalsProvider } from "@mantine/modals";

const client = new QueryClient();
const isDev = import.meta.env.DEV;

export const LibsProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <MantineProvider
      theme={{
        primaryShade: 6,
        colors: {
          brand: [
            "#024731",
            "#024731",
            "#024731",
            "#024731",
            "#024731",
            "#024731",
            "#009B20",
            "#457604",
            "#457604",
            "#457604",
          ],
        },
        primaryColor: "brand",
      }}
    >
      <QueryClientProvider client={client}>
        <ModalsProvider>
          {isDev && <ReactQueryDevtools initialIsOpen={false} />}
          <BrowserRouter>
            {children}
            <AppVersion />
            <ToastContainer />
          </BrowserRouter>
        </ModalsProvider>
      </QueryClientProvider>
    </MantineProvider>
  );
};
