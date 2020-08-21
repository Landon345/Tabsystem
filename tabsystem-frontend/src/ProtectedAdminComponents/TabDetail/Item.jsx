import React, { useState, useEffect } from "react";
import { MyTd, MyTable, MyTh, MyTr } from "./Styles";
import moment from "moment";

function Item({
  id,
  name,
  price,
  date,
  category,
  queryCache,
  handleClick,
  rerender,
}) {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setSelected(false);
  }, [rerender]);
  const select = () => {
    handleClick(id, selected);
    selected ? setSelected(false) : setSelected(true);
  };

  const formatedDate = () => {
    return moment(date).format("MM/DD");
  };
  console.log("rendered");
  return (
    <MyTr selected={selected} onClick={select}>
      <MyTd>{formatedDate()}</MyTd>
      <MyTd>{name}</MyTd>
      <MyTd>{category ? category.name : "none"}</MyTd>
      <MyTd>{price}</MyTd>
    </MyTr>
  );
}

export default Item;
