import React, { useState, useEffect } from "react";
import Item from "./Item";
import CreateItem from "./CreateItem";
import { Box } from "@chakra-ui/core";
import { MyTable, MyTh } from "./Styles";
import { DeleteButton } from "../../GlobalStyles/Styles";
import { DeleteItemWithRefund, DeleteItemWithoutRefund } from "../../Api/Items";

export default function TabCard({
  id,
  name,
  balance,
  user_name,
  items,
  site_number,
  categories,
  common_items,
  newItem,
  queryCache,
}) {
  const [allSelected, setAllSelected] = useState([]);
  const [rerender, setRerender] = useState(false);

  // used to set all the selected items back to false in Item.jsx when the items are deleted.
  useEffect(() => {
    setRerender(false);
  }, [rerender]);

  /** The magical function that keeps tract of all the selected items as an array */
  const handleClick = (newId, selected) => {
    console.log(allSelected);
    console.log(selected);
    if (!selected) {
      setAllSelected([...allSelected, newId]);
    } else {
      const ids = allSelected.filter((id) => id != newId);
      setAllSelected(ids);
    }
  };
  /** Deletes all of the selected items one at a time. Then, retetches the data. */
  const removeItem = async () => {
    setRerender(true);
    for (let i = 0; i < allSelected.length; i++) {
      const data = await DeleteItemWithoutRefund(allSelected[i]);
      console.log(data);
    }
    //const data = await DeleteItemWithoutRefund(id);
    queryCache.invalidateQueries("GetTabById");
    queryCache.invalidateQueries("GetUserOfTab");
    setAllSelected([]);
  };
  /** Deletes all of the selected items one at a time with a refund. Then, retetches the data. */
  const removeItemWithRefund = async () => {
    setRerender(true);
    for (let i = 0; i < allSelected.length; i++) {
      const data = await DeleteItemWithRefund(allSelected[i]);
      console.log(data);
    }
    //const data = await DeleteItemWithoutRefund(id);
    queryCache.invalidateQueries("GetTabById");
    queryCache.invalidateQueries("GetUserOfTab");
    setAllSelected([]);
  };

  //returns this chunk of jsx
  return (
    <Box textAlign="center" color="white">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-around"
        minH="200px"
        bg="first100"
        border="none"
        rounded="10px"
        mx="5%"
        my="30px"
        fontSize="30px"
      >
        <p>{name}</p>
        <p># {site_number}</p>
        <p>{user_name}</p>
        <p>${balance}</p>
      </Box>
      <Box fontSize="30px" mb="30px">
        Tab Items:
      </Box>
      <Box d="flex" pb="10px" justifyContent="space-around">
        <DeleteButton onClick={removeItemWithRefund}>del w/refund</DeleteButton>
        <DeleteButton onClick={removeItem}>del</DeleteButton>
      </Box>
      <Box>
        <MyTable>
          <thead>
            <tr>
              <MyTh>Date</MyTh>
              <MyTh>Name</MyTh>
              <MyTh>Category</MyTh>
              <MyTh>Price</MyTh>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <Item
                key={index}
                id={item.id}
                name={item.name}
                price={item.price}
                date={item.created_at}
                category={item.category}
                queryCache={queryCache}
                handleClick={handleClick}
                rerender={rerender}
              />
            ))}
          </tbody>
        </MyTable>
      </Box>
      <Box pb="30px">
        <CreateItem
          tab_id={id}
          categories={categories}
          common_items={common_items}
          newItem={newItem}
        />
      </Box>
    </Box>
  );
}
