import React, {memo, useState} from 'react';
import {
  Box,
  Grid,
  Typography
} from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import {useRouter} from "next/router";

import {AreaChart, CartesianGrid, XAxis, YAxis} from "recharts";
import {Area, ResponsiveContainer} from "recharts";
import Card from "./Card";
import TableHead from "./TableHead";


const CurrenciesTable = ({data, toman}) => {
  const router = useRouter()
  console.log(router.query, "query")
  const tableCell = {
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


  const getNextPage = () => {
    let queryClone = {...router.query};
    if (!queryClone.page || queryClone.page == 1) {
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
      },
      "/", {
        scroll: false
      }
    );

  }
  const sellValue = (price, quote) => {
    if (toman) {
      return (price * data.meta.prices.sell).toLocaleString("fa-IR")
    } else {
      return quote.toLocaleString("en-US")
    }
  }
  const buyValue = (price) => {
    if (toman) {
      return (price * data.meta.prices.buy).toLocaleString("fa-IR")
    } else {
      return price.toLocaleString("en-US")
    }
  }
  const customChartData = (chart, name) => {
    let customData = chart?.map((itm) => {
      return {uv: itm, name: name}
    })
    return [...customData]
  }
  return (
    <Grid container dir={"ltr"}>
      <TableHead tableCell={tableCell} toman={toman} tableCustom={tableCustom} />
      <Grid item xs={12}>
        <InfiniteScroll next={getNextPage} hasMore={data?.items.length < data?.meta?.paginateHelper?.total}
                        loader={<p>loading...</p>}
                        dataLength={data?.items?.length}>
          {data && data?.items?.map((item, index) => (
            <Card key={index} index={index} quote={item.quote} price={item.price} toman={toman} icon={item.icon} buyValue={buyValue}
                  sellValue={sellValue} coin={item.coin} percent={item.percent} enName={item.enName}
                  customChartData={customChartData} chart={item.chart} tableCustom={tableCustom}/>
          ))}
        </InfiniteScroll>
      </Grid>
    </Grid>

  );
};

export default memo(CurrenciesTable);