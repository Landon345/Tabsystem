import React, { useState } from "react";
import { useQuery } from "react-query";
import Navbar from "../../Components/Navbar";
import { GetTabById, GetUserTabs } from "../../Api/Tabs";

import { Input, Grid, Box, Icon, Skeleton, Spinner } from "@chakra-ui/core";
import { DeleteButton } from "../../GlobalStyles/Styles";
import { TabStyleCard, MyLink } from "./Styles";

import { MyTable, MyTh } from "./Styles";
import Items from "../Items/Items";

export default function MyTabs() {
  //fetch the data using id as a paramerter to find what data to return.
  const { status: status1, data: tabsData } = useQuery(
    ["GetUserTabs"],
    GetUserTabs,
    {}
  );
  //if loading return Loading with a spinner and skeleton
  if (status1 === "loading") {
    return (
      <div className="">
        <div>
          <Box textAlign="center" fontSize="50px" mt="60px">
            Loading... <Spinner />
          </Box>
          <Skeleton height="50px" my="10px" mx="10%" />
          <Skeleton height="50px" my="10px" mx="10%" />
          <Skeleton height="50px" my="10px" mx="10%" />
        </div>
      </div>
    );
  }
  //if error return the error
  if (status1 === "error") {
    return <div className="">error</div>;
  }
  return (
    <Box bg="first300" minH="100vh">
      <Navbar />
      <Box color="white" fontSize="45px" textAlign="center">
        My Tabs
      </Box>
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
                {tab.items.map((item, index) => (
                  <>
                    {console.log("item", item)}
                    <Items
                      key={index}
                      id={item.id}
                      name={item.name}
                      price={item.price}
                      date={item.created_at}
                      category={item.category}
                    />
                  </>
                ))}
              </tbody>
            </MyTable>
          </TabStyleCard>
        ))}
      </Box>
    </Box>
  );
}
