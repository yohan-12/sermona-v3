import React from "react";
import DateList from "./component/DateList";
import { getDate } from "@/lib/data";
const page = async () => {
  const dates = await getDate();
  return (
    <>
      <DateList dates={dates} />
    </>
  );
};

export default page;
