"use client"

import { useEffect, useState } from "react";
import CustomTable from "./components/CustomTable";
import JitterText from "./components/animata/text/jitter-text-";
import { GetData } from "./services/GetData";
import Link from "next/link";

export default function Home() {
  const [ data, setData ] = useState<string>('')
  
  const get = async () =>{
    const data = await GetData()
    setData(data)        
  }

  useEffect(()=>{
    get()
  }, [])

  return (
    <>            
      {data}
      <CustomTable/>
    </>
  );
}
