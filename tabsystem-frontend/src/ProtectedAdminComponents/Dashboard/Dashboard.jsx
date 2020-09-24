import Navbar from "../../Components/Navbar";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, queryCache } from "react-query";
import { GetTabs, GetTabsTotalBalance } from "../../Api/Tabs";
import { GetUsers } from "../../Api/Users";
import { GetItems, GetItemsTotalPrice } from "../../Api/Items";
import { GetCategories, GetTotalPriceOfCategory } from "../../Api/Categories";
import TabCard from "../TabDetail/TabCard";
import * as queries from "../../utils/queries";
import * as Placeholders from "../../utils/placeholders";
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
  const [category, setCategory] = useState(0);
  //Use the useQuery supported by react-query to fetch and cache the data.
  const getTabsQuery = useQuery("GetTabs", GetTabs, {});
  const getUsersQuery = useQuery("GetUsers", GetUsers, {});
  const getItemsQuery = useQuery(["GetItems", category], GetItems, {});
  const getTotalItemsQuery = useQuery(["GetItems", ""], GetItems, {});
  const getCategoriesQuery = useQuery("GetCategories", GetCategories, {});
  const getTotalBalanceQuery = useQuery(
    "GetTabsTotalBalance",
    GetTabsTotalBalance,
    {}
  );
  const getItemPricesQuery = useQuery(
    "GetItemsTotalPrice",
    GetItemsTotalPrice,
    {}
  );

  const getTotalPriceOfCategoryQuery = useQuery(
    ["GetTotalPriceOfCategory", category],
    GetTotalPriceOfCategory,
    {}
  );

  return (
    <>
      <Box minH="100vh" bg="first300" color="white">
        <Navbar />
        <Box mx="5%" mt="50px">
          <h1>Totals</h1>
          {queries.areAnyLoading(
            getTabsQuery,
            getUsersQuery,
            getTotalItemsQuery,
            getTotalBalanceQuery,
            getItemPricesQuery
          ) && <Placeholders.LoadingState />}

          {queries.areAnyFailed(
            getTabsQuery,
            getUsersQuery,
            getTotalItemsQuery,
            getTotalBalanceQuery,
            getItemPricesQuery
          ) && <Placeholders.FailedState />}

          {queries.areAllLoaded(
            getTabsQuery,
            getUsersQuery,
            getTotalItemsQuery,
            getTotalBalanceQuery,
            getItemPricesQuery
          ) && (
            <>
              <Box d="flex" flexWrap="wrap">
                <Box p="30px" fontSize="25px">
                  Amount of tabs = {getTabsQuery.data.length}
                </Box>
                <Box p="30px" fontSize="25px">
                  Amount of users = {getUsersQuery.data.length}
                </Box>
                <Box p="30px" fontSize="25px">
                  Amount of items on tabs= {getTotalItemsQuery.data.length}
                </Box>
                <Box p="30px" fontSize="25px">
                  Amount of money on all tabs= $
                  {getTotalBalanceQuery.data.total}
                </Box>

                <Box p="30px" fontSize="25px">
                  Total price of all items= ${getItemPricesQuery.data.total}
                </Box>
              </Box>
            </>
          )}

          <h1>Per Category</h1>
          {queries.areAnyLoading(getCategoriesQuery) && (
            <Placeholders.LoadingState />
          )}

          {queries.areAnyFailed(getCategoriesQuery) && (
            <Placeholders.FailedState />
          )}

          {queries.areAllLoaded(getCategoriesQuery) && (
            <>
              <Box d="grid" gridTemplateColumns="1fr 2fr" mx="10%" my="60px">
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
                  <option key={0} value={0}>
                    none
                  </option>
                  {getCategoriesQuery.data.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Select>
              </Box>
            </>
          )}
          {queries.areAnyLoading(
            getItemsQuery,
            getCategoriesQuery,
            getTotalPriceOfCategoryQuery
          ) && <Placeholders.LoadingState />}

          {queries.areAnyFailed(
            getItemsQuery,
            getCategoriesQuery,
            getTotalPriceOfCategoryQuery
          ) && <Placeholders.FailedState />}

          {queries.areAllLoaded(
            getItemsQuery,
            getCategoriesQuery,
            getTotalPriceOfCategoryQuery
          ) && (
            <>
              <Box d="flex" flexWrap="wrap">
                <Box p="30px" fontSize="25px">
                  Amount of{" "}
                  {category != 0
                    ? getCategoriesQuery.data.filter(
                        (cat) => cat.id == category
                      )[0].name
                    : "all items"}
                  = {getItemsQuery.data.length}
                </Box>
                <Box p="30px" fontSize="25px">
                  Total Price of{" "}
                  {category != 0
                    ? getCategoriesQuery.data.filter(
                        (cat) => cat.id == category
                      )[0].name
                    : "all items"}
                  = ${getTotalPriceOfCategoryQuery.data.total}
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}
