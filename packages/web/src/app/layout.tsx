import { ReactNode } from "react";
import { Jost } from "next/font/google";
import { ModalsProvider } from "@mantine/modals";

import { Notifications } from "@mantine/notifications";
import { ColorSchemeScript, createTheme, MantineProvider } from "@mantine/core";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

type Props = {
  children: ReactNode;
};

const jost = Jost({
  weight: ["300", "400", "500", "600", "700"],
  style: "normal",
  subsets: ["latin-ext"],
  display: "swap",
});

const theme = createTheme({
  primaryColor: "lime",
  primaryShade: 7,
  defaultRadius: "xs",
  fontFamily: "Jost, sans-serif",
  headings: {
    fontFamily: "Jost, sans-serif",
  },
});

export default function Layout({ children }: Props) {
  return (
    <html className={jost.className} lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="light">
          <Notifications />
          <ModalsProvider>{children}</ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
