//state handler imports
import React, { useState } from "react";
import { useQuery, useMutation, queryCache } from "react-query";
import { GetTabById } from "../../Api/Tabs";
import { GetItems, PostItem } from "../../Api/Items";
import { GetCategories } from "../../Api/Categories";
import { GetCommonItems } from "../../Api/CommonItems";
import { GetUserOfTab } from "../../Api/Users";

//styled component imports
import { Box, Icon, Grid, Skeleton, Spinner } from "@chakra-ui/core";

//component imports
import TabCard from "./TabCard";
import Navbar from "../../Components/Navbar";

/** the top most functional component in the TabDetail folder. Responsible for gathering and distributing data. */
export default function TabDetail({ history, match }) {
  //set my id state which is either 1 or the id specified in the url
  const [id, setId] = useState(
    !match.params.id ? 1 : parseInt(match.params.id)
  );

  //fetch the data using id as a paramerter to find what data to return.
  const { status: status1, data: tabData } = useQuery(
    ["GetTabById", id],
    GetTabById,
    {}
  );
  const { status: status2, data: categoriesData } = useQuery(
    ["GetCategories", id],
    GetCategories,
    {}
  );
  const { status: status3, data: commonitemsData } = useQuery(
    ["GetCommonItems", id],
    GetCommonItems,
    {}
  );
  const { status: status4, data: UserData } = useQuery(
    ["GetUserOfTab", id],
    GetUserOfTab,
    {}
  );

  const [mutate] = useMutation(PostItem, {
    // If the mutation fails, use the value returned from onMutate to roll back
    onError: (err, myNewItem, rollback) => console.log(err),
    // Always refetch after error or success:
    onSettled: () => {
      queryCache.invalidateQueries("GetItems");
      queryCache.invalidateQueries("GetTabById");
    },
  });

  const newItem = async (item) => {
    const data = await mutate(item);
    // console.log(data);
    return data;
  };

  //return this when loading
  if (
    status1 === "loading" ||
    status2 === "loading" ||
    status3 === "loading" ||
    status4 === "loading"
  ) {
    return (
      <Box minH="100vh" bg="first300">
        <Box textAlign="center" fontSize="50px" mt="60px">
          Loading... <Spinner />
        </Box>
        <Skeleton height="50px" my="10px" mx="10%" />
        <Skeleton height="50px" my="10px" mx="10%" />
        <Skeleton height="50px" my="10px" mx="10%" />
      </Box>
    );
  }
  //return when error
  if (
    status1 === "error" ||
    status2 === "error" ||
    status3 === "error" ||
    status4 === "error"
  ) {
    return <div className="">error </div>;
  }

  return (
    <Box bg="first300" minH="100vh">
      <Navbar />
      <TabCard
        id={tabData.tab.id}
        name={tabData.tab.name}
        user_name={UserData.name}
        balance={tabData.tab.balance}
        site_number={UserData.site_number}
        items={tabData.tab.items}
        categories={categoriesData}
        common_items={commonitemsData}
        newItem={newItem}
        queryCache={queryCache}
      />
    </Box>
  );
}
