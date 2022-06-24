import React from 'react';
import {
    Box,
    Grid,
    Typography
} from "@mui/material";

const CurrenciesTable = ({data}) => {
    console.log(data.items[0].icon)
    const tabelCell = {
        py: "14px",
        px: 4,
        textAlign: "center",
        flex: "1 1 30%"

    }
    const tableCustom = (minWidth) => {
        return {
            py: "14px",
            px: 4,
            textAlign: "center",
            flex: "0 0",
            minWidth: `${minWidth}px`
        }
    }

    const tableRow = {
        textAlign: "center",
        flex: "1 1 30%"
    }

    return (
      <Grid container dir={"ltr"}>
          <Grid item display={"flex"} borderRadius={2} bgcolor={"#fafafa"} px={6} mb={"14px"}
                fontSize={"0.857142857142857rem"} xs={12}>
              <Box sx={{...tabelCell, textAlign: "start"}}>ارز دیجیتال</Box>
              <Box sx={tabelCell}>قیمت خرید</Box>
              <Box sx={tabelCell}>قیمت فروش</Box>
              <Box sx={tableCustom(148)}>نمودار</Box>
              <Box sx={tableCustom(148)}>تغییرات</Box>
              <Box sx={tableCustom(94)}>نشان کردن</Box>
          </Grid>
          <Grid item xs={12}>
              {data && data.items.map((item , index) => (
                <Box display={"flex"} px={6} py={"10px"} fontSize={"0.857142857142857rem"}>
                    <Box sx={{...tableRow, textAlign: "end", display: "flex"}}>
                        <Box ml={3} mr={4} component={"img"} src={item.icon} maxWidth={"36px"} height={"36px"}/>
                        <Box>
                            <Typography component={"p"}>{item.enName}</Typography>
                            <Box>
                                <Typography component={"span"} color={"black"} fontWeight={600} fontSize={"0.714286rem"}
                                            display={"inline-flex"} alignItems={"center"} justifyContent={"center"}
                                            bgcolor={"#e0e0e0"} mr={1} borderRadius={"2px"} height={"19px"}
                                            minWidth={"19px"}>{++index} </Typography>
                                <Typography component={"span"} color={"black.light"}
                                            fontSize={"0.714286rem"}>{item.coin}  </Typography>

                            </Box>
                        </Box>
                    </Box>
                    <Box sx={tableRow}>قیمت خرید</Box>
                    <Box sx={tableRow}>قیمت فروش</Box>
                    <Box sx={tableCustom(148)}>نمودار</Box>
                    <Box sx={tableCustom(148)}>تغییرات</Box>
                    <Box sx={tableCustom(94)}>نشان کردن</Box>
                </Box>
              ))}
          </Grid>
      </Grid>

    );
};

export default CurrenciesTable;