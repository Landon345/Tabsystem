import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery, queryCache, useMutation } from "react-query";
import {
  GetCategories,
  PostCategory,
  DeleteCategory,
} from "../../Api/Categories";
//styled component imports
import { Box, Icon, Grid, Skeleton, Spinner, Input } from "@chakra-ui/core";
import {
  MyButton,
  DeleteButton,
  CategoryAndCommonItemCard,
} from "../../GlobalStyles/Styles";
import {} from "./Styles";

import Navbar from "../../Components/Navbar";

export default function CreateCategory() {
  const [name, setName] = useState([]);
  const { status, data, error, refetch } = useQuery(
    "GetCategories",
    GetCategories,
    {}
  );
  const [mutatePostCategory] = useMutation(PostCategory, {
    onMutate: (newCategory) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      queryCache.cancelQueries("GetCategories");

      // Snapshot the previous value
      const previousCateogories = queryCache.getQueryData("GetCategories");

      // Optimistically update to the new value
      queryCache.setQueryData("GetCategories", (old) => [...old, newCategory]);

      // Return the snapshotted value
      return () =>
        queryCache.setQueryData("GetCategories", previousCateogories);
    },
    // If the mutation fails, use the value returned from onMutate to roll back
    onError: (err, newCategory, rollback) => rollback(),
    // Always refetch after error or success:
    onSettled: () => {
      queryCache.invalidateQueries("GetCategories");
    },
  });
  const [mutateDeleteCategory] = useMutation(DeleteCategory, {
    // When mutate is called:
    onMutate: (categoryIdPassed) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      queryCache.cancelQueries("GetCategories");
      // Snapshot the previous value
      const previousCateogories = queryCache.getQueryData("GetCategories");
      // Return the snapshotted value
      return () =>
        queryCache.setQueryData("GetCategories", previousCateogories);
    },
    // If the mutation fails, use the value returned from onMutate to roll back
    onError: (err, categoryIdPassed, rollback) => rollback(),
    // Always refetch after error or success:
    onSettled: () => {
      queryCache.invalidateQueries("GetCategories");
    },
  });

  const handleChange = (event) => {
    setName(event.target.value);
  };
  const newCategory = async (e) => {
    e.preventDefault();
    const category = {
      name: name,
    };
    const data = await mutatePostCategory(category);
    setName("");
  };

  const deleteCategory = async (id) => {
    const data = await mutateDeleteCategory(id);
  };
  //return this when loading
  if (status === "loading") {
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
  if (status === "error") return <div className="">error {error}</div>;

  return (
    <Box bg="first300" minH="100vh">
      <Navbar />
      <Box mb="40px">
        <form onSubmit={newCategory} autoComplete="off">
          <Box
            d="grid"
            gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
            mx="5%"
            my="40px"
          >
            <Box color="White" fontSize="30px" mb="10px">
              category name
            </Box>
            <Input
              width="200px"
              height="30px"
              type="text"
              onChange={handleChange}
              value={name}
              name="name"
            />
          </Box>
          <Box d="flex" justifyContent="center" alignItems="center">
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
        </form>
      </Box>
      <Grid
        templateColumns="repeat(auto-fit, minmax(200px, 1fr))"
        gap={3}
        mx="5%"
      >
        {data.map((category, index) => (
          <CategoryAndCommonItemCard key={index}>
            <Box bg="first300" p="3px 10px" borderRadius="5px">
              {category.name}
            </Box>
            <DeleteButton onClick={() => deleteCategory(category.id)}>
              Delete
            </DeleteButton>
          </CategoryAndCommonItemCard>
        ))}
      </Grid>
    </Box>
  );
}
