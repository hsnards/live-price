import { Box, Grid, Typography } from "@mui/material";

const TitleBar = ({ count }) => {
    return (
        <Grid container>
            <Typography color="black.main" fontWeight={"700"} fontSize={"22px"} lineHeight={"20px"} mr={"24px"}>قیمت لحظه ای</Typography>
            <Typography component="p" display={"flex"} alignItems={"center"} fontWeight={"300"} fontSize={"14px"} color="black.light" >
                <Box component={"div"} width={"8px"} height={"8px"} borderRadius={"50%"} bgcolor={"warning.main"} mr={"8px"} />  {count?.toLocaleString("fa-IR")}
                ارز دیجیتال
            </Typography>
        </Grid>
    );
}

export default TitleBar;