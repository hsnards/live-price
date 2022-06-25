import React, {useEffect, useState} from 'react';
import {Button, Grid, MenuItem, TextField, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {useRouter} from "next/router";
import {ArrowDropDown, ArrowDropDownSharp, Close, Search, StarOutline} from "@mui/icons-material";
import useDebounce from "../../utils/useDebounce";

const FiltersBar = ({toman, setToman}) => {
  const [currency, setCurrency] = useState('');
  const [searchTerm, setSearchTerm] = useState("");
  const [alignment, setAlignment] = useState('center');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const router = useRouter();
  const handleChange = (event) => {
    setCurrency(event.target.value);
    let cloneQuery = {...router.query, sort: event.target.value}
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...cloneQuery,
          page: 1
        },
      },
    "/",{
      scroll:false
    }
    );
  };
  useEffect(() => {
    if (debouncedSearchTerm) {
      let cloneQuery = {...router.query, q: debouncedSearchTerm}
      router.push(
        {
          pathname: router.pathname,
          query: {
            ...cloneQuery,
            page: 1
          },
        },
        "/",
        {
          scroll: false,
        }
      );
    } else {
      let cloneQuery = {...router.query}
      delete cloneQuery.q
      router.push(
        {
          pathname: router.pathname,
          query: {
            ...cloneQuery,
            page: 1
          },
        },
        "/",
        {
          scroll: false,
        }
      );
    }
  }, [debouncedSearchTerm])
  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
    setToman(!toman)
  };
  const handleDeleteSort = () => {
    setCurrency("")
    let cloneQuery = {...router.query}
    delete cloneQuery.sort
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...cloneQuery,
          page: 1
        },
      },
      "/",
      {
        scroll: false,
      })
  }
  const input = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      height: "48.5px"
    },
  }
  const currencies = [
    {
      value: '1',
      label: 'کمترین قیمت',
    },
    {
      value: '2',
      label: 'بیشترین قیمت',
    },
  ];
  return (
    <Grid container columnSpacing={5} mb={6}>
      <Grid item xs={4} paddingTop={6}>
        <TextField InputProps={{
          startAdornment: <Search style={{transform: "scaleX(-1)", marginRight: "10px", color: "#8B9098"}} />,
        }} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} sx={input} fullWidth
                   placeholder={"جستجو"}/>
      </Grid>
      <Grid item xs={4} paddingTop={6} pr={3}>
        <Button color={"black"} variant={"outlined"}  sx={{width: "50%", height: "48.5px", borderRadius: 2 ,border:"1px solid #e9e9e9", "& .MuiButtonBase-root":{ border:"1px solid #e9e9e9" }}}>
          <StarOutline sx={{ml:2}}/>
          نشان شده ها
        </Button>
        <TextField
          label={"ترتیب بر اساس"}
          id="outlined-select-currency"
          select
          sx={{...input, width: "50%", pr: 3}}
          value={currency}
          onChange={handleChange}
          dir={"rtl"}
          SelectProps={{
            IconComponent: () => currency ? <Close onClick={handleDeleteSort} sx={{cursor: "pointer", ml: 1, color: "black.light"}}/> :
              <ArrowDropDown sx={{mr: 1, color: "black.light"}}/>,
          }}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}

            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={4} paddingTop={6} paddingRight={6}>
        <ToggleButtonGroup
          value={alignment}
          sx={{
            border: "1px solid", borderColor: "#e0e0e0", borderRadius: 2, height: "48.5px", padding: 1,
            "& .MuiToggleButtonGroup-grouped": {
              borderRadius: "8px !important",
              border: "none"
            }
          }}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
          color={"primary"}
          fullWidth
        >
          <ToggleButton value="center" aria-label="centered">
            تومان
          </ToggleButton>
          <ToggleButton value="left" aria-label="left aligned">
            تتر
          </ToggleButton>

        </ToggleButtonGroup>
      </Grid>
    </Grid>
  );
};

export default FiltersBar;