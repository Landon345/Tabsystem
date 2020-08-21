import React, { useState } from "react";
import { Box } from "@chakra-ui/core";
import { DeleteButton } from "../../GlobalStyles/Styles";
import { MyTd, MyTable, MyTh, MyTr } from "./Styles";
import { DeleteItemWithRefund, DeleteItemWithoutRefund } from "../../Api/Items";
import moment from "moment";

export default function Items({ id, name, price, date, category }) {
  const formatedDate = () => {
    return moment(date).format("MM/DD");
  };
  return (
    <MyTr>
      <MyTd>{formatedDate()}</MyTd>
      <MyTd>{name}</MyTd>
      <MyTd>{category ? category.name : "none"}</MyTd>
      <MyTd>{price}</MyTd>
    </MyTr>
  );
}
