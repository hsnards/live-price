import LivePrice from "../components/live-price";
import {useEffect} from "react";

const LivePricePage = ({data}) => {
  return ( 
    <LivePrice data={data.result} />
   );
}
 
export default LivePricePage;


export async function getServerSideProps(context) {
    let { query } = context;
    let queryClone = {  ...query  };
    let url1 = new URL("https://api.bitbarg.com");
        let searchParams = new URLSearchParams(queryClone);
       if(!queryClone.page){
           searchParams.set("page",1)
       }
        url1.pathname = "/api/v1/currencies";
        url1.search = searchParams.toString();

    let data;

    try {
        data = await fetch(url1.href);
        data = await data.json();
    } catch (err) {
        data = [];
    }

    return {
        props: { data },
    };
}