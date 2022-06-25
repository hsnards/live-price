import {useEffect, useState} from "react";
import useDebounce from "../../utils/useDebounce";
import {useRouter} from "next/router";

const useFilterBar = () =>{
    const [sortBy, setSortBy] = useState('');
    const [searchTerm, setSearchTerm] = useState("");
    const [exchange, setExchange] = useState('center');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const router = useRouter();
    const handleChange = (event) => {
        setSortBy(event.target.value);
        let cloneQuery = { ...router.query, sort: event.target.value }
        router.push(
          {
              pathname: router.pathname,
              query: {
                  ...cloneQuery,
                  page: 1
              },
          },
          "/", {
              scroll: false
          }
        );
    };
    useEffect(() => {
        if (debouncedSearchTerm) {
            let cloneQuery = { ...router.query, q: debouncedSearchTerm }
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
            let cloneQuery = { ...router.query }
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

    const handleDeleteSort = () => {
        setSortBy("")
        let cloneQuery = { ...router.query }
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

    return {
        sortBy,
        setSortBy,
        searchTerm,
        setSearchTerm,
        exchange,
        setExchange,
        handleDeleteSort,
        handleChange
    }
}

export default useFilterBar