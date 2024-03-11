import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Heading, Input, Stack, VStack, Text } from "@chakra-ui/react";

function AddUser() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  
  // error state
  const [userNameError, setUserNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async () => {
    try {
      // Perform client-side validation
      setUserNameError(userName ? "" : "Full Name is required");
      setEmailError(email ? "" : "Email is required");
      setPasswordError(password ? "" : "Password is required");

      if (!userName || !email || !password ) {
        return;
      }

      const addUsers = await axios.post("/api/v1/users/adduser", {
        userName,
        email,
        password,
        phoneNumber
      });

      toast.success('User Add Successfully!', {
        position: 'top-center',
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true
      });

      console.log("adduser:", addUsers);

      if (addUsers.status === 200) {
        setUserName("");
        setEmail("");
        setPassword("");
        setPhoneNumber("");
        console.log("User Added Successfully!");
      } else {
        console.log("User not added!");
      }
    } catch (error) {
      console.error("Error while calling Addusers Api", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <Stack 
      w={"full"} 
      justifyContent={"center"} 
      alignItems={"center"} 
      paddingTop={"16"}
      >
        <VStack 
        w={["full","40%"]} 
        border={"2px solid white"} 
        borderRadius={"2"} 
        alignSelf={"center"}
        direction={"row"}
        bg={"white"} 
        boxShadow='lg' 
        p='6' 
        rounded='md'
        >
          <Heading fontFamily={"cursive"} fontSize={"x-large"} fontWeight={"500"}>Add User</Heading>
          <Input
            w={"80%"}
            type='text'
            placeholder='Full Name'
            bg={"white"}
            boxShadow='dark-lg'
            p='6'
            rounded='md'
            border={"none"}
            aria-required={true}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          {userNameError && <Text color="red.500">{userNameError}</Text>}
          <Input
            w={"80%"}
            type='text'
            placeholder='Email'
            bg={"white"}
            boxShadow='dark-lg'
            p='6'
            rounded='md'
            border={"none"}
            aria-required={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <Text color="red.500">{emailError}</Text>}
          <Input
            w={"80%"}
            type='text'
            placeholder='Password'
            bg={"white"}
            boxShadow='dark-lg'
            p='6'
            rounded='md'
            border={"none"}
            aria-required={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <Text color="red.500">{passwordError}</Text>}
          <Input
            w={"80%"}
            type='number'
            placeholder='Phone Number'
            bg={"white"}
            boxShadow='dark-lg'
            p='6'
            rounded='md'
            border={"none"}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <Button
            border={"none"}
            mt={"4"}
            w={"40%"}
            colorScheme='purple'
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </VStack>
      </Stack>
    </>
  );
}

export default AddUser;
