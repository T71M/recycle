import { FC } from "react";
import { AppShell, ScrollArea } from "@mantine/core";
import { Navbar } from "../Layout/Navbar";
import { Header } from "../Layout/Header";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Partners } from "../Partners/Partners";
import { PartnerForm } from "../Partners/PartnerForm";
import { Requests } from "../Requests/Requests";
import { RequestForm } from "../Requests/RequestForm";
import { CreatePartnerForm } from "../Requests/CreatePartnerForm";

export const AppLayout: FC = () => {
  return (
    <AppShell
      header={{ height: 75 }}
      navbar={{
        width: 200,
        breakpoint: "xs",
      }}
      style={{ overflowX: "hidden" }}
    >
      <Header />
      <Navbar />
      <AppShell.Main
        style={{
          display: "flex",
          flexDirection: "column",
          overflowX: "hidden",
        }}
      >
        <ScrollArea
          h={"100%"}
          style={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            overflowX: "hidden",
            width: "100%",
          }}
          styles={{
            viewport: { flex: "1", display: "flex", flexDirection: "column" },
          }}
        >
          <Routes>
            <Route path="partners" element={<Outlet />}>
              <Route index element={<Partners />} />
              <Route path=":partnerId" element={<PartnerForm />} />
              <Route path="create" element={<PartnerForm />} />
            </Route>
            <Route path="requests" element={<Outlet />}>
              <Route index element={<Requests />} />
              <Route path=":requestId" element={<Outlet />}>
                <Route index element={<RequestForm />} />
                <Route path="create" element={<CreatePartnerForm />} />
              </Route>
            </Route>
            <Route path="*" element={<Navigate to={"/partners"} />} />
          </Routes>
        </ScrollArea>
      </AppShell.Main>
    </AppShell>
  );
};
