import {useRouter} from "next/router";
import {useMemo} from "react";

const useCurrenciesTable = () =>{
    const router = useRouter()
    const tableCell = useMemo(()=>{
        return {
            py: "14px",
            px: 4,
            textAlign: "center",
            flex: "1 1 30%"

        }
    },[])
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

    return {
        getNextPage,
        tableCustom,
        tableCell
    }
}

export default useCurrenciesTable