import React from 'react';
import { Box, Grid } from "@mui/material";

const MyComponent = ({ tableCell, toman, tableCustom }) => {
  return (
    <Grid item display={"flex"} borderRadius={2} bgcolor={"#fafafa"} px={6} mb={"14px"}
      fontSize={"0.857142857142857rem"} xs={12}>
      <Box sx={{ ...tableCell, textAlign: "start" }}>ارز دیجیتال</Box>
      <Box sx={tableCell}>{toman ? "قیمت خرید" : "قیمت جهانی"}</Box>
      <Box sx={tableCell}>{toman ? "قیمت فروش" : "ارزش بازار"}</Box>
      <Box sx={tableCustom(148)}>نمودار</Box>
      <Box sx={tableCustom(148)}>تغییرات</Box>
      <Box sx={tableCustom(94)}>نشان کردن</Box>
    </Grid>
  );
};

export default MyComponent;
