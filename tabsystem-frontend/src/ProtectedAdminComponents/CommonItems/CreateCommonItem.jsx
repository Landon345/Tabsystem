import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery, queryCache, useMutation } from "react-query";
import {
  GetCommonItems,
  PostCommonItem,
  DeleteCommonItem,
} from "../../Api/CommonItems";
import { GetCategories } from "../../Api/Categories";
import Navbar from "../../Components/Navbar";

//styled component imports
import {
  Box,
  Icon,
  Grid,
  Skeleton,
  Spinner,
  Input,
  Select,
} from "@chakra-ui/core";
import {
  MyButton,
  DeleteButton,
  CategoryAndCommonItemCard,
} from "../../GlobalStyles/Styles";

export default function CreateCommonItem() {
  const [name, setName] = useState([]);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState([]);
  const [message, setMessage] = useState("");
  const { status: status1, data: commonitemsData } = useQuery(
    "GetCommonItems",
    GetCommonItems,
    {}
  );
  const { status: status2, data: categoriesData } = useQuery(
    "GetCategories",
    GetCategories,
    {}
  );

  const [mutate] = useMutation(PostCommonItem, {
    onMutate: (newCommonItem) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      queryCache.cancelQueries("GetCommonItems");

      // Snapshot the previous value
      const previousCommonItems = queryCache.getQueryData("GetCommonItems");

      // Optimistically update to the new value
      queryCache.setQueryData("GetCommmonItems", (old) => [
        // ...old,
        newCommonItem,
      ]);

      // Return the snapshotted value
      return () =>
        queryCache.setQueryData("GetCommmonItems", previousCommonItems);
    },
    // If the mutation fails, use the value returned from onMutate to roll back
    onError: (err, newCommonItem, rollback) => rollback(),
    // Always refetch after error or success:
    onSettled: () => {
      queryCache.invalidateQueries("GetCommonItems");
    },
  });

  // const handleChange = (event) => {
  //   if ([event.target.name] == "name") {
  //     setName(event.target.value);
  //   } else if ([event.target.name] == "price") {
  //     setPrice(event.target.value);
  //   } else if ([event.target.name] == "category") {
  //     console.log(event.target.value);
  //     setCategory(event.target.value);
  //   }
  // };
  const newCommonItem = async (e) => {
    e.preventDefault();
    const commonitem = {
      name: name,
      category_id: category,
      price: price,
    };
    const data = await mutate(commonitem);
    setName("");
    setPrice("");
    if (data.success) {
      setMessage("Successfully created item");
    } else {
      setMessage("Something went wrong");
    }
  };
  const destroyCommonItem = async (id) => {
    const data = await DeleteCommonItem(id);
    queryCache.invalidateQueries("GetCommonItems");
    if (data.success) {
      setMessage("Successfully deleted item");
    } else {
      setMessage("Something went wrong");
    }
  };
  //return this when loading
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
  //return when error
  if (status1 === "error" || status2 === "error")
    return <div className="">error</div>;

  return (
    <Box bg="first300" minH="100vh">
      <Navbar />
      <Box my="40px">
        <form onSubmit={newCommonItem}>
          <Box d="grid" gridTemplateColumns="1fr" mx="5%">
            <Box d="grid" gridTemplateColumns="1fr 2fr">
              <Box color="White" fontSize="30px">
                Name
              </Box>
              <Input
                type="text"
                onChange={({ target }) => setName(target.value)}
                value={name}
                name="name"
                width="200px"
                height="30px"
              />
            </Box>
            <Box d="grid" gridTemplateColumns="1fr 2fr">
              <Box color="White" fontSize="30px">
                Price
              </Box>
              <Input
                type="text"
                onChange={({ target }) => setPrice(target.value)}
                value={price}
                name="price"
                width="200px"
                height="30px"
              />
            </Box>

            <Box d="grid" gridTemplateColumns="1fr 2fr">
              <Box htmlFor="category" color="White" fontSize="30px">
                Category
              </Box>
              <Select
                name="category"
                id="category"
                onChange={({ target }) => setCategory(target.value)}
                width="200px"
                height="30px"
              >
                <option value={""}>none</option>
                {categoriesData.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </Box>
            <Box d="flex" justifyContent="center">
              <MyButton
                bg="White"
                bgh="second100"
                bcf="fifth200"
                color="first200"
                type="submit"
              >
                Submit
              </MyButton>
            </Box>
          </Box>
        </form>
      </Box>
      <Grid
        templateColumns="repeat(auto-fit, minmax(200px, 1fr))"
        gap={3}
        mx="5%"
      >
        {commonitemsData.map((commonitem, index) => (
          <CategoryAndCommonItemCard key={index}>
            <Box color="white" textAlign="center">
              {commonitem.name}
            </Box>
            <Box color="white">{commonitem.price}</Box>
            <DeleteButton onClick={() => destroyCommonItem(commonitem.id)}>
              Delete
            </DeleteButton>
          </CategoryAndCommonItemCard>
        ))}
      </Grid>
    </Box>
  );
}
