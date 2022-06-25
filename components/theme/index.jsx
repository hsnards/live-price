import {createTheme} from "@mui/material";

const Theme = createTheme({
    direction:"rtl",
    typography: {
        fontFamily: "IRANSans",
    },
    shape: {
        borderRadius: 4,
    },
    spacing:4,
    //breakpoint
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 1000,
            lg: 1200,
            xl: 1536,
        },
    },
    palette: {
        blue: {
            main: "#4285F2",
            light: "#4285F21A"
        },
        white: {
            main: "#fff"
        }
        ,
        black: {
            main: "#212121",
            light: "#00000099"
        },
        warning: {
            main: "#fbbd06"
        }
    },

});

export default Theme;
