import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, queryCache } from "react-query";
import { GetTabs, PostTab, DeleteTab } from "../../Api/Tabs";
import { GetUsers } from "../../Api/Users";
import Navbar from "../../Components/Navbar";
import TabCard from "../TabDetail/TabCard";
import { Input, Grid, Box, Icon, Skeleton, Spinner } from "@chakra-ui/core";
import { MyButton, DeleteButton } from "../../GlobalStyles/Styles";
import { TabStyleCard, MyLink } from "./Styles";
import CreateTab from "./CreateTab";

export default function Tabs() {
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

  const [mutate] = useMutation(PostTab, {
    onMutate: (newTab) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      queryCache.cancelQueries("GetTabs");

      // Snapshot the previous value
      const previousTabs = queryCache.getQueryData("GetTabs");
      // Optimistically update to the new value
      // queryCache.setQueryData("GetTabs", (old) => [...old, newTab]);

      // Return the snapshotted value
      return () => queryCache.setQueryData("GetTabs", previousTabs);
    },
    // If the mutation fails, use the value returned from onMutate to roll back
    onError: (err, newTab, rollback) => rollback(),
    // Always refetch after error or success:
    onSettled: () => {
      queryCache.invalidateQueries("GetTabs");
    },
  });

  const newTab = async (tab) => {
    const data = await mutate(tab);
    console.log(data);
    return data;
  };
  const deleteTab = async (tabid) => {
    await DeleteTab(tabid);
    refetchTabs();
  };

  //if loading return Loading with a spinner and skeleton
  if (status1 === "loading" || status2 === "loading") {
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
  //if error return the error
  if (status1 === "error" || status2 === "error") {
    return <div className="">error</div>;
  }

  return (
    <Box bg="first300" minH="100vh">
      <Navbar />
      <CreateTab users={usersData} newTab={newTab} />
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
        gridGap={3}
        mx="20px"
        py="20px"
      >
        {tabsData.map((tab) => (
          <TabStyleCard key={tab.id}>
            <div>
              <p>Tab Name: {tab.name}</p>
              <p>Site # {tab.user.site_number}</p>
              <p>User's Name: {tab.user.name}</p>
              <p>Balance: {tab.balance}</p>
            </div>
            <Box>
              <MyLink href={`/tabs/detail/${tab.id}`}>More Detail</MyLink>
            </Box>
            <DeleteButton onClick={() => deleteTab(tab.id)}>
              Delete
            </DeleteButton>
          </TabStyleCard>
        ))}
      </Box>
    </Box>
  );
}
