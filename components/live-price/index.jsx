import TitleBar from "./features/TitleBar";
import {Box, Grid} from "@mui/material";
import {useEffect, useState} from "react";
import FiltersBar from "./features/FiltersBar";
import CurrenciesTable from "./features/CurrenciesTable";

const LivePrice = ({data}) => {
    return (
        <Grid container maxWidth={"1200px"} marginX={"auto"} marginY={10}  >
            <Box width={"100%"} padding={8} bgcolor={"white.main"} borderRadius={4}>
                <TitleBar count={data?.meta.paginateHelper.total} />
                <FiltersBar />
                <CurrenciesTable data={data} />
            </Box>
        </Grid>)
        ;
}

export default LivePrice;