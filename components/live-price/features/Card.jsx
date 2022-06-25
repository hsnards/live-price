import React, {memo, useCallback, useMemo} from 'react';
import { Box, IconButton, Typography } from "@mui/material";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import {cardContainer, tableRow} from "../../../styles/globals";

const Card = ({
    icon,
    enName,
    index,
    coin,
    toman,
    price,
    quote,
    percent,
    chart,
    tableCustom,sell,buy
}) => {
    const sellValue = useCallback((price, quote) => {
        if (toman) {
            return (price * sell).toLocaleString("fa-IR")
        } else {
            return quote.toLocaleString("en-US")
        }
    },[percent,quote])
    const buyValue = useCallback((price) => {
        if (toman) {
            return (price * buy).toLocaleString("fa-IR")
        } else {
            return price.toLocaleString("en-US")
        }
    },[price])
    const customChartData = useCallback((chart, name) => {
        let customData = chart?.map((itm) => {
            return {uv: itm, name: name}
        })
        return [...customData]
    },[chart,name])
    return (
        <Box className={cardContainer}>
            <Box className={tableRow} sx={{ textAlign: "end", display: "flex" }} alignItems={"center"}>
                <Box mr={3} ml={4} component={"img"} src={icon} maxWidth={"36px"} height={"36px"} />
                <Box>
                    <Typography component={"p"} textAlign={"start"}>{enName}</Typography>
                    <Box display={"flex"} >
                        <Typography component={"span"} color={"black"} fontWeight={600} fontSize={"0.714286rem"}
                            display={"inline-flex"} alignItems={"center"} justifyContent={"center"}
                            bgcolor={"#e0e0e0"} ml={1} borderRadius={"2px"} height={"19px"}
                            minWidth={"19px"}>{++index} </Typography>
                        <Typography component={"span"} color={"black.light"}
                            fontSize={"0.714286rem"}>{coin}</Typography>
                    </Box>
                </Box>
            </Box>
            <Box className={tableRow} display={"flex"} justifyContent={"center"} alignItems={"center"}
                fontWeight={toman ? null : "700"}>{buyValue(price)} <Typography component={"span"}
                    color={"black.light"}
                    fontSize={"0.785714285714286rem"}
                    mr={1}>{toman ? "تومان" : "USDT"}</Typography>
            </Box>
            <Box className={tableRow} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                {sellValue(price, quote)}
                <Typography component={"span"} color={"black.light"} fontSize={"0.785714285714286rem"}
                    mr={1}>{toman ? "تومان" : " USDT"}</Typography>
            </Box>
            <Box sx={tableCustom(148)}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        width={148}
                        height={40}
                        data={customChartData(chart, coin)}
                        margin={{
                            top: 5,
                            right: 0,
                            left: 0,
                            bottom: 5,
                        }}
                    >
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0" stopColor={Math.sign(percent) < 0 ? "#eb4137" : Math.sign(percent) == 0 ? "#212121" : "#30BE81"} stopOpacity={"0.125"} />
                                <stop offset="0.55" stopColor={Math.sign(percent) < 0 ? "#eb4137" : Math.sign(percent) == 0 ? "#212121" : "#30BE81"} stopOpacity={"0.125"} />
                                <stop offset="1" stopColor={Math.sign(percent) < 0 ? "#eb4137" : Math.sign(percent) == 0 ? "#212121" : "#30BE81"} stopOpacity={"0.125"} />
                            </linearGradient>
                        </defs>
                        <Area strokeWidth={1} isAnimationActive={false} baseValue={"dataMax"} type="linear"
                            dataKey={"uv"} stroke={ Math.sign(percent) < 0 ? "#eb4137" : Math.sign(percent) == 0 ? "black.main" : "#30BE81"} fillOpacity={1} fill="url(#colorUv)" />
                    </AreaChart>
                </ResponsiveContainer>
            </Box>
            <Box sx={{
                ...tableCustom(148),
                color: Math.sign(percent) < 0 ? "#eb4137" : Math.sign(percent) == 0 ? "black.main" : "#30BE81",
                fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center"
            }}>{percent.toLocaleString("fa-IR")}%</Box>
            <Box sx={tableCustom(94)}>
                <IconButton aria-label="delete">
                    <StarBorderRoundedIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default memo(Card);
