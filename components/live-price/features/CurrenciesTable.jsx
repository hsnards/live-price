import React, {memo, useMemo, useState} from 'react';
import {
  Box,
  Grid,
} from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import {useRouter} from "next/router";
import Card from "./Card";
import TableHead from "./TableHead";
import useCurrenciesTable from "./useCurrenciesTable";


const CurrenciesTable = ({data, toman}) => {
 const {tableCustom,tableCell,getNextPage} =useCurrenciesTable()

  return (
    <Grid container dir={"ltr"}>
      <TableHead tableCell={tableCell} toman={toman} tableCustom={tableCustom} />
      <Grid item xs={12}>
        <InfiniteScroll
          next={getNextPage}
          hasMore={data?.items.length < data?.meta?.paginateHelper?.total}
          loader={<p>loading...</p>}
          dataLength={data?.items?.length}>
          {data && data?.items?.map((item, index) => (
            <Card
              key={index}
              index={index}
              quote={item.quote}
              price={item.price}
              toman={toman}
              icon={item.icon}
              coin={item.coin}
              percent={item.percent}
              enName={item.enName}
              chart={item.chart}
              sell={data.meta.prices.sell}
              buy={data.meta.prices.buy}
              tableCustom={tableCustom}/>
          ))}
        </InfiniteScroll>
      </Grid>
    </Grid>

  );
};

export default memo(CurrenciesTable);