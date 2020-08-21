import React, { useState } from "react";
import { PostItem } from "../../Api/Items";
import { Link } from "react-router-dom";
import { Box, Input, Select } from "@chakra-ui/core";
import { MyButton } from "../../GlobalStyles/Styles";
import moment from "moment";

export default function CreateItem({
  tab_id,
  categories,
  common_items,
  newItem,
}) {
  const [name, setName] = useState("");
  const [categoryid, setCategoryid] = useState("");
  const [price, setPrice] = useState([]);

  const handleChange = (event) => {
    if ([event.target.name] == "name") {
      setName(event.target.value);
    } else if ([event.target.name] == "price") {
      setPrice(event.target.value);
    } else if ([event.target.name] == "category") {
      console.log(event.target.value);
      if (event.target.value == 0) {
        setCategoryid(null);
      } else {
        setCategoryid(event.target.value);
      }
    } else if ([event.target.name] == "commonitem") {
      console.log(event.target.value);
      let commonitem = common_items.filter(
        (myitem) => myitem.id == event.target.value
      );
      if (commonitem.length != 1) {
        commonitem = [{ name: "", price: 0, category_id: null }];
      }
      console.log(commonitem[0]);
      setName(commonitem[0].name);
      setPrice(commonitem[0].price);
      setCategoryid(commonitem[0].category_id);
    }
  };

  const makeNewItem = async (e) => {
    e.preventDefault();
    const item = {
      tab_id: tab_id,
      category_id: categoryid,
      name: name,
      price: parseFloat(price),
      created_at: moment().format("MM/DD"),
    };
    if (name === "credit" || name === "Credit") {
      item.price = -item.price;
    }

    const data = await newItem(item);
    console.log(data);
  };
  return (
    <div>
      <Box bg="first100" mx="5%" mt="30px" py="15px" rounded="10px">
        <Box>Put a new item</Box>
        <form onSubmit={makeNewItem}>
          <Box
            d="flex"
            flexDirection="column"
            minH="300px"
            justifyContent="space-around"
          >
            <Box d="grid" gridTemplateColumns="1fr 2fr">
              <Box htmlFor="commonitem" color="White" fontSize="25px">
                Presets
              </Box>
              <Select
                name="commonitem"
                id="commonitem"
                onChange={handleChange}
                height="30px"
                width="200px"
                color="black"
              >
                <option value={""}>none</option>
                {common_items.map((commonitem) => (
                  <option key={commonitem.id} value={commonitem.id}>
                    {commonitem.name}
                  </option>
                ))}
              </Select>
            </Box>
            <Box d="grid" gridTemplateColumns="1fr 2fr">
              <Box color="White" fontSize="25px">
                Item Name
              </Box>
              <Input
                type="text"
                onChange={handleChange}
                value={name}
                name="name"
                height="30px"
                width="200px"
                color="black"
              />
            </Box>
            <Box d="grid" gridTemplateColumns="1fr 2fr">
              <Box htmlFor="price" color="White" fontSize="25px">
                Price
              </Box>
              <Input
                type="number"
                onChange={handleChange}
                value={price}
                name="price"
                height="30px"
                width="200px"
                color="black"
              />
            </Box>
            <Box d="grid" gridTemplateColumns="1fr 2fr">
              <Box htmlFor="category" color="White" fontSize="25px">
                Category
              </Box>
              <Select
                name="category"
                id="category"
                onChange={handleChange}
                width="200px"
                height="30px"
                color="black"
                value={categoryid}
              >
                <option value={""}>none</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </Box>
            <Box ml="45%">
              <MyButton type="submit">Submit</MyButton>
            </Box>
          </Box>
        </form>
      </Box>
    </div>
  );
}
