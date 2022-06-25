import React, {useEffect, useMemo, useState} from 'react';
import { Button, Grid, MenuItem, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useRouter } from "next/router";
import { ArrowDropDown, ArrowDropDownSharp, Close, Search, StarOutline } from "@mui/icons-material";
import useDebounce from "../../utils/useDebounce";
import useFilterBar from "./useFilterBar";

const FiltersBar = ({ toman, setToman }) => {
const {setExchange,exchange,handleChange,handleDeleteSort,searchTerm,setSearchTerm,setSortBy,sortBy} = useFilterBar();
    const handleExchange = (event, newExchange) => {
        setExchange(newExchange);
        setToman(!toman)
    };
  const input = useMemo(()=>{
      return {
          "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              height: "48.5px"
          },
      }
  },[])
    const sort = useMemo(()=>{
        return [
          {
              value: '1',
              label: 'کمترین قیمت',
          },
            {
                value: '2',
                label: 'بیشترین قیمت',
            },
          ]
    },[]);
  return (
    <Grid container columnSpacing={5} mb={6}>
      <Grid item xs={4} paddingTop={6}>
        <TextField InputProps={{
          startAdornment: <Search style={{ transform: "scaleX(-1)", marginLeft: "10px", color: "#8B9098" }} />,
        }} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} sx={input} fullWidth
          placeholder={"جستجو"} />
      </Grid>
      <Grid item xs={4} display={"flex"} gap={3} paddingTop={6} pl={3}>
        <Button color={"black"} variant={"outlined"} sx={{ width: "50%", height: "48.5px", borderRadius: 2, border: "1px solid #e9e9e9", "& .MuiButtonBase-root": { border: "1px solid #e9e9e9" } }}>
          <StarOutline sx={{ mr: 2 }} />
          نشان شده ها
        </Button>
        <TextField
          label={"ترتیب بر اساس"}
          id="outlined-select-currency"
          select
          sx={{ ...input, width: "50%" }}
          value={sortBy}
          onChange={handleChange}
          dir={"rtl"}
          SelectProps={{
            IconComponent: () => sortBy ? <Close onClick={handleDeleteSort} sx={{ cursor: "pointer", ml: 1, color: "black.light" }} /> :
              <ArrowDropDown sx={{ mr: 1, color: "black.light" }} />,
          }}
        >
          {sort.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}

            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={4} paddingTop={6} paddingRight={6}>
        <ToggleButtonGroup
          value={exchange}
          sx={{
            border: "1px solid", borderColor: "#e0e0e0", borderRadius: 2, height: "48.5px", padding: 1,
            "& .MuiToggleButtonGroup-grouped": {
              borderRadius: "8px !important",
              border: "none"
            }
          }}
          exclusive
          onChange={handleExchange}
          aria-label="text alignment"
          color={"primary"}
          fullWidth
        >
          <ToggleButton value="center">
            تومان
          </ToggleButton>
          <ToggleButton value="left">
            تتر
          </ToggleButton>

        </ToggleButtonGroup>
      </Grid>
    </Grid>
  );
};

export default FiltersBar;