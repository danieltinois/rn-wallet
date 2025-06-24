const coffeeTheme = {
  primary: "#8B593E",
  background: "#FFF8F3",
  text: "#4A3428",
  textLight: "#9A8478",
  textError: "#E74C3C",
  border: "#E5D3B7",
  white: "#FFFFFF",
  expense: "#E74C3C",
  income: "#2ECC71",
  card: "#FFFFFF",
  shadow: "#000000",
};

const forestTheme = {
  primary: "#2E7D32",
  background: "#E8F5E9",
  text: "#1B5E20",
  textLight: "#66BB6A",
  textError: "#C62828",
  border: "#C8E6C9",
  white: "#FFFFFF",
  expense: "#C62828",
  income: "#388E3C",
  card: "#FFFFFF",
  shadow: "#000000",
};

const purpleTheme = {
  primary: "#6A1B9A",
  background: "#F3E5F5",
  text: "#4A148C",
  textLight: "#BA68C8",
  textError: "#D32F2F",
  border: "#D1C4E9",
  white: "#FFFFFF",
  expense: "#D32F2F",
  income: "#388E3C",
  card: "#FFFFFF",
  shadow: "#000000",
};

const oceanTheme = {
  primary: "#0277BD",
  background: "#E1F5FE",
  text: "#01579B",
  textLight: "#4FC3F7",
  textError: "#EF5350",
  border: "#B3E5FC",
  white: "#FFFFFF",
  expense: "#EF5350",
  income: "#26A69A",
  card: "#FFFFFF",
  shadow: "#000000",
};

const darkTheme = {
  primary: "#BB86FC",
  background: "#121212",
  text: "#E0E0E0",
  textLight: "#A0A0A0",
  textError: "#EF5350",
  white: "#1E1E1E",
  card: "#1E1E1E",
  border: "#2C2C2C",
  expense: "#CF6679",
  income: "#03DAC6",
  shadow: "#000000",
};

export const THEMES = {
  coffee: coffeeTheme,
  forest: forestTheme,
  purple: purpleTheme,
  ocean: oceanTheme,
  dark: darkTheme,
};

// 👇 change this to switch theme
export const COLORS = THEMES.dark;
