import TitleBar from "./features/TitleBar";
import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import FiltersBar from "./features/FiltersBar";
import CurrenciesTable from "./features/CurrenciesTable";
import { useRouter } from "next/router";

const LivePrice = ({ data }) => {
  const [currencies, setCurrencies] = useState({ items: [], meta: {} });
  const [toman, setToman] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (data) {
      if (router.query.page == 1 || !router.query.page) {
        setCurrencies(prvs => {
          let cloneData = { ...data }
          return cloneData
        })
      }
      else {
        setCurrencies((prvs) => {
          let cloneArray = prvs?.items?.concat(data.items);
          return { items: [...cloneArray], meta: { ...data.meta } }
        });
      }
    }
  }, [data])
  return (
    <Grid container maxWidth={"1200px"} marginX={"auto"} my={10} px={6} >
      <Box width={"100%"} padding={8} bgcolor={"white.main"} borderRadius={4}>
        <TitleBar count={data?.meta.paginateHelper.total} />
        <FiltersBar toman={toman} setToman={setToman} setCurrencies={setCurrencies} />
        <CurrenciesTable toman={toman} data={currencies} />
      </Box>
    </Grid>)
    ;
}

export default LivePrice;