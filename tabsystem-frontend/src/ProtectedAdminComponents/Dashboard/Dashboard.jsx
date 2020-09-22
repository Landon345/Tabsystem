import Navbar from "../../Components/Navbar";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, queryCache } from "react-query";
import { GetTabs, GetTabsTotalBalance } from "../../Api/Tabs";
import { GetUsers } from "../../Api/Users";
import { GetItems, GetItemsTotalPrice } from "../../Api/Items";
import { GetCategories } from "../../Api/Categories";
import TabCard from "../TabDetail/TabCard";
import {
  Input,
  Grid,
  Box,
  Icon,
  Skeleton,
  Spinner,
  Select,
} from "@chakra-ui/core";

export default function Dashboard() {
  const [category, setCategory] = useState("");
  //Use the useQuery supported by react-query to fetch and cache the data.
  const { status: status1, data: tabsData, refetch: refetchTabs } = useQuery(
    "GetTabs",
    GetTabs,
    {}
  );
  const { status: status2, data: usersData } = useQuery(
    "GetUsers",
    GetUsers,
    {}
  );
  const { status: status3, data: itemsData } = useQuery(
    ["GetItems", category],
    GetItems,
    {}
  );
  const { status: status4, data: itemsDataTotal } = useQuery(
    ["GetItems", ""],
    GetItems,
    {}
  );
  const { status: status5, data: categoryData } = useQuery(
    "GetCategories",
    GetCategories,
    {}
  );
  const { status: status6, data: totalBalanceData } = useQuery(
    "GetTabsTotalBalance",
    GetTabsTotalBalance,
    {}
  );
  const { status: status7, data: totalItemPricesData } = useQuery(
    "GetItemsTotalPrice",
    GetItemsTotalPrice,
    {}
  );

  //if loading return Loading with a spinner and skeleton
  if (
    status1 === "loading" ||
    status2 === "loading" ||
    status3 === "loading" ||
    status4 === "loading" ||
    status5 === "loading" ||
    status6 === "loading" ||
    status7 === "loading"
  ) {
    return (
      <Box minH="100vh" bg="first300">
        <Navbar />
        <Box textAlign="center" fontSize="50px" mt="60px">
          Loading... <Spinner />
        </Box>
        {/* <Skeleton height="50px" my="10px" mx="10%" />
        <Skeleton height="50px" my="10px" mx="10%" />
        <Skeleton height="50px" my="10px" mx="10%" /> */}
      </Box>
    );
  }
  //if error return the error
  if (
    status1 === "error" ||
    status2 === "error" ||
    status3 === "error" ||
    status4 === "error" ||
    status5 === "error" ||
    status6 === "error" ||
    status7 === "error"
  ) {
    return <div className="">error</div>;
  }
  return (
    <Box minH="100vh" bg="first300" color="white">
      <Navbar />
      <Box d="flex" flexWrap="wrap">
        <Box p="30px" fontSize="25px">
          Amount of tabs = {tabsData.length}
        </Box>
        <Box p="30px" fontSize="25px">
          Amount of users = {usersData.length}
        </Box>
        <Box p="30px" fontSize="25px">
          Amount of items on tabs= {itemsDataTotal.length}
        </Box>
        <Box p="30px" fontSize="25px">
          Amount of money on all tabs= ${totalBalanceData.total}
        </Box>

        <Box p="30px" fontSize="25px">
          Total price of all items= ${totalItemPricesData.total}
        </Box>
        <Box p="30px" fontSize="25px">
          Amount of{" "}
          {category
            ? categoryData.filter((cat) => cat.id == category)[0].name
            : "all items"}
          = {itemsData.length}
        </Box>
      </Box>
      <Box d="grid" gridTemplateColumns="1fr 2fr" mx="10%">
        <Box htmlFor="category" color="White" fontSize="25px">
          Category
        </Box>
        <Select
          name="category"
          id="category"
          onChange={({ target }) => setCategory(target.value)}
          width="200px"
          height="30px"
          color="black"
          value={category}
        >
          <option value={""}>none</option>
          {categoryData.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </Box>
    </Box>
  );
}
