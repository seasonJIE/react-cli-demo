import * as React from "react";
import {useEffect, useState} from "react";

export const Demo = () => {

  useEffect(() => {
    setDemo("demo123")
  }, [])

  const [demo, setDemo] = useState("demo")
  return (
    <>
      {demo}
    </>
  )
}
