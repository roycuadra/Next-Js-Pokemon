import { MantineTheme } from "@mantine/core";
import Typography from "./typography";

const primaryTheme: Partial<MantineTheme> = {
  ...Typography,
  globalStyles: (theme) => ({
    body: {
      backgroundColor: theme.colors.gray[9],
      color: theme.colors.cyan[6],
    },
  }),
};

export default primaryTheme;