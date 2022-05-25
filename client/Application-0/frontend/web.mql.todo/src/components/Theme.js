import {
  ThemeProvider as MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core";
import { colors } from "../colors";

const themeConfig = {
  palette: {
    primary: {
      main: '#BD6F84',
    },
    secondary: {
      main: '#ffffff',
    },
  },
}

const theme = createMuiTheme(themeConfig);

export function ThemeProvider({ children }) {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}
