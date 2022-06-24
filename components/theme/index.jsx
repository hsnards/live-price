import {createTheme} from "@mui/material";

const Theme = createTheme({
    //change typography config like change font
    typography: {
        fontFamily: "IRANSans",
        //typography tag variant prop
        h2: {fontSize: 16},
        h3: {fontSize: 18},
        h4: {fontSize: 20},
        h5: {fontSize: 22},
        h6: {fontSize: 24},
        subtitle1: {fontSize: 20},
        subtitle2: {fontSize: 16},
        body1: {fontSize: 14},
        body2: {fontSize: 12},
    },
    //shape radius for default number value range
    shape: {
        borderRadius: 4, //1 = 20 //2 = 40 // 6= 120,
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

    //customize color pallet or write custom color name
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
        },
        test:{
            main:"#500fe9"
        }

    },
direction:"rtl"
});

export default Theme;
