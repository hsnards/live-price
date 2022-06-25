import React, {memo, useMemo} from 'react';
import {Box, IconButton, Typography} from "@mui/material";
import {Area, AreaChart, ResponsiveContainer} from "recharts";
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';


const Card = ({icon , enName , index , coin , toman ,customChartData , buyValue ,sellValue , price , quote , percent ,chart , tableCustom}) => {
  const tableRow = useMemo(() => {
    return {
      textAlign: "center",
      flex: "1 1 30%",
    }
  }, []);
  return (
    <Box display={"flex"} px={6} py={"10px"} fontSize={"0.857142857142857rem"} borderBottom={"1px solid"}
         borderColor={"#e9e9e9"}>
      <Box sx={{...tableRow, textAlign: "end", display: "flex"}}>
        <Box ml={3} mr={4} component={"img"} src={icon} maxWidth={"36px"} height={"36px"}/>
        <Box>
          <Typography component={"p"} textAlign={"start"}>{enName}</Typography>
          <Box display={"flex"}>
            <Typography component={"span"} color={"black"} fontWeight={600} fontSize={"0.714286rem"}
                        display={"inline-flex"} alignItems={"center"} justifyContent={"center"}
                        bgcolor={"#e0e0e0"} mr={1} borderRadius={"2px"} height={"19px"}
                        minWidth={"19px"}>{++index} </Typography>
            <Typography component={"span"} color={"black.light"}
                        fontSize={"0.714286rem"}>{coin}</Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={tableRow} display={"flex"} justifyContent={"center"} alignItems={"center"} fontWeight={toman ? null : "700"}>{buyValue(price)}   <Typography component={"span"}
                                                                                                                                                           color={"black.light"}
                                                                                                                                                           fontSize={"0.785714285714286rem"} ml={1}>{toman ? "تومان" : "USDT"}</Typography>
      </Box>
      <Box sx={tableRow} display={"flex"} justifyContent={"center"} alignItems={"center"} >
        {sellValue(price , quote)}
        <Typography component={"span"} color={"black.light"} fontSize={"0.785714285714286rem"} ml={1}>{toman ? "تومان" : " USDT"}</Typography>
      </Box>
      <Box sx={tableCustom(148)}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={148}
            height={40}
            data={customChartData(chart , coin)}
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
      <Box sx={{...tableCustom(148) ,  color:Math.sign(percent) < 0 ? "#eb4137" : Math.sign(percent) == 0 ? "black.main" : "#30BE81" ,fontWeight:700}}>{percent.toLocaleString("fa-IR")}%</Box>
      <Box sx={tableCustom(94)}>
        <IconButton aria-label="delete" >
        <StarBorderRoundedIcon />
      </IconButton>
      </Box>
    </Box>
  );
};

export default memo(Card);
