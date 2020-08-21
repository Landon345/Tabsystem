import React, { useState } from "react";
import { MyButton } from "../../GlobalStyles/Styles";
import { Input, Grid, Box } from "@chakra-ui/core";

export default function CreateTab({ users, newTab }) {
  const [selected, setSelected] = useState(null);
  const [nameOnTab, setNameOnTab] = useState("");
  const [balance, setBalance] = useState([]);
  const select = (userid) => {
    setSelected(userid);
  };
  const handleChange = (event) => {
    if ([event.target.name] == "name") {
      setNameOnTab(event.target.value);
    } else if ([event.target.name] == "balance") {
      setBalance(event.target.value);
    }
  };
  const stopSelect = () => {
    setSelected(null);
  };

  const createNewTab = async (e) => {
    e.preventDefault();
    const tab = {
      user_id: selected,
      name: nameOnTab,
      balance: parseInt(balance),
    };
    const data = await newTab(tab);
  };
  return (
    <div>
      <Box color="White" mx="5%" mt="20px" fontSize="30px">
        Create a new tab
      </Box>
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
      >
        {users.map((user) => {
          if (user.id === selected) {
            return (
              <Box
                bg="first100"
                color="White"
                margin="20px"
                padding="20px"
                rounded="10px"
                textAlign="center"
                onClick={() => select(user.id)}
                cursor="pointer"
                key={user.id}
              >
                <Box> Name: {user.name}</Box>
                <Box> Site Number: {user.site_number}</Box>
              </Box>
            );
          }
          return (
            <Box
              bg="second100"
              color="White"
              margin="20px"
              rounded="10px"
              padding="20px"
              textAlign="center"
              onClick={() => select(user.id)}
              cursor="pointer"
              key={user.id}
            >
              <Box> Name: {user.name}</Box>
              <Box> Site Number: {user.site_number}</Box>
            </Box>
          );
        })}
      </Box>

      {selected && (
        <Box mx="5%">
          <form onSubmit={createNewTab}>
            <Box color="White">Name of tab </Box>
            <Input
              height="30px"
              width="200px"
              type="text"
              onChange={handleChange}
              value={nameOnTab}
              name="name"
            />
            <Box color="White">Starting Balance</Box>
            <Input
              height="30px"
              width="200px"
              type="number"
              onChange={handleChange}
              value={balance}
              name="balance"
            />
            <MyButton type="submit">Submit</MyButton>
          </form>
          <MyButton onClick={stopSelect}>No Select</MyButton>
        </Box>
      )}
    </div>
  );
}
