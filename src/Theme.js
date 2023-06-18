import {
    extendTheme
} from '@chakra-ui/react';

const config = {
    initialColorMode: 'light',
    useSystemColorMode: false,
}

const styles = {
    global: {
        bg: "quartery.50",
        color: "quartery.50",
        body: {
            bg: "quartery.50",
            color: "quartery.50"
        },
    }
}

const colors = {
    primary: {
        50: "#F2F3F1",
        100: "#DADED9",
        200: "#C2C8C1",
        300: "#AAB3A8",
        400: "#929D90",
        500: "#798877",
        600: "#616C60",
        700: "#495148",
        800: "#313630",
        900: "#181B18"
    },
    secondary: {
        50: "#F1F4F1",
        100: "#D9DFD7",
        200: "#C0CBBE",
        300: "#A7B6A4",
        400: "#8FA28B",
        500: "#768E71",
        600: "#5E715B",
        700: "#475544",
        800: "#2F392D",
        900: "#181C17"
    },
    tertiary: {
        50: "#F1F5EF",
        100: "#D7E4D3",
        200: "#BDD2B6",
        300: "#A4C19A",
        400: "#8AAF7E",
        500: "#709E61",
        600: "#5A7E4E",
        700: "#435F3A",
        800: "#2D3F27",
        900: "#162013"
    },
    quartery: {
        50: "#FAF2EB",
        100: "#F1DAC6",
        200: "#E8C3A1",
        300: "#DEAB7C",
        400: "#D59358",
        500: "#CC7C33",
        600: "#A36329",
        700: "#7A4A1F",
        800: "#523214",
        900: "#29190A"
    },
}

const theme = extendTheme({
    config,
    styles,
    colors,
});

export default theme