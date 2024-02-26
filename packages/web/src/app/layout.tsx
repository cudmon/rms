import { ReactNode } from "react";
import {
  ColorSchemeScript,
  Container,
  createTheme,
  MantineProvider,
} from "@mantine/core";

import "@mantine/core/styles.css";

type Props = {
  children: ReactNode;
};

const theme = createTheme({
  primaryColor: "blue",
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
        <MantineProvider theme={theme}>
          <Container>{children}</Container>
        </MantineProvider>
      </body>
    </html>
  );
}
