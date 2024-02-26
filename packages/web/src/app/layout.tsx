import { ReactNode } from "react";
import { ColorSchemeScript, createTheme, MantineProvider } from "@mantine/core";

import "@mantine/core/styles.css";

type Props = {
  children: ReactNode;
};

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
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
