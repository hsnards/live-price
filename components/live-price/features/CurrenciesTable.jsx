import React, {useState} from 'react';
import {
  Box,
  Grid,
  Typography
} from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import {useRouter} from "next/router";

import {AreaChart, CartesianGrid, XAxis, YAxis} from "recharts";
import {Area, ResponsiveContainer} from "recharts";


const CurrenciesTable = ({data, toman}) => {
  const router = useRouter()
  console.log(router.query, "query")
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
    flex: "1 1 30%",

  }

  const getNextPage = () => {
    let queryClone = {...router.query};
    if (!queryClone.page || queryClone.page==1) {
      queryClone.page = 2
    } else {
      ++queryClone.page;
    }
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...queryClone
        }
      }
    );

  }
  const sellValue = (item) => {
    if (toman) {
      return (item.price * data.meta.prices.sell).toLocaleString("fa-IR")
    } else {
      return item.quote.toLocaleString()
    }
  }
  const buyValue = (item) => {
    if (toman) {
      return (item.price * data.meta.prices.buy).toLocaleString("fa-IR")
    } else {
      return (item.price).toLocaleString()
    }
  }
  const customChartData = (chart , name) => {
    let customData = chart?.map((itm) => {
      return {uv: itm, name: name}
    })
    return [...customData]
  }
  return (
    <Grid container dir={"ltr"}>
      <Grid item display={"flex"} borderRadius={2} bgcolor={"#fafafa"} px={6} mb={"14px"}
            fontSize={"0.857142857142857rem"} xs={12}>
        <Box sx={{...tabelCell, textAlign: "start"}}>ارز دیجیتال</Box>
        <Box sx={tabelCell}>{toman ? "قیمت خرید" : "قیمت جهانی"}</Box>
        <Box sx={tabelCell}>{toman ? "قیمت فروش" : "ارزش بازار"}</Box>
        <Box sx={tableCustom(148)}>نمودار</Box>
        <Box sx={tableCustom(148)}>تغییرات</Box>
        <Box sx={tableCustom(94)}>نشان کردن</Box>
      </Grid>

      <Grid item xs={12}>
        <InfiniteScroll next={getNextPage} endMessage={"rund "} hasMore={true} loader={<p>loading...</p>}
                        dataLength={data?.items?.length}>
          {data && data?.items?.map((item, index) => (
            <Box display={"flex"} px={6} py={"10px"} fontSize={"0.857142857142857rem"} borderBottom={"1px solid"}
                 borderColor={"#e9e9e9"}>
              <Box sx={{...tableRow, textAlign: "end", display: "flex"}}>
                <Box ml={3} mr={4} component={"img"} src={item.icon} maxWidth={"36px"} height={"36px"}/>
                <Box>
                  <Typography component={"p"} textAlign={"start"}>{item.enName}</Typography>
                  <Box display={"flex"}>
                    <Typography component={"span"} color={"black"} fontWeight={600} fontSize={"0.714286rem"}
                                display={"inline-flex"} alignItems={"center"} justifyContent={"center"}
                                bgcolor={"#e0e0e0"} mr={1} borderRadius={"2px"} height={"19px"}
                                minWidth={"19px"}>{++index} </Typography>
                    <Typography component={"span"} color={"black.light"}
                                fontSize={"0.714286rem"}>{item.coin}</Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={tableRow} fontWeight={toman ? null : "700"}>{buyValue(item)} <Typography component={"span"}
                                                                                                color={"black.light"}
                                                                                                fontSize={"0.785714285714286rem"}>{toman ? "تومان" : "USDT"}</Typography>
              </Box>
              <Box sx={tableRow}> {sellValue(item)} <Typography component={"span"} color={"black.light"}
                                                                fontSize={"0.785714285714286rem"}>{toman ? "تومان" : "USDT"}</Typography>
              </Box>
              <Box sx={tableCustom(148)}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    width={148}
                    height={40}
                    data={customChartData(item.chart , item.coin)}
                    margin={{
                      top: 5,
                      right: 0,
                      left: 0,
                      bottom: 5,
                    }}
                  >
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#30BE81" stopOpacity={"0.125"}/>
                        <stop offset="0.55" stopColor="#30BE81" stopOpacity={"0.125"}/>
                        <stop offset="1" stopColor="#30BE81" stopOpacity={"0.125"}/>
                      </linearGradient>
                    </defs>
                    <Area  strokeWidth={1} isAnimationActive={false}  baseValue={"dataMax"} type="monotone" dataKey={"uv"}  stroke="#30BE81" fillOpacity={1} fill="url(#colorUv)" />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
              <Box sx={tableCustom(148)}>{item.percent.toLocaleString("fa-IR")}%</Box>
              <Box sx={tableCustom(94)}>نشان کردن</Box>
            </Box>
          ))}
        </InfiniteScroll>
      </Grid>
    </Grid>

  );
};

export default CurrenciesTable;