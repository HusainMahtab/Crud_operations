import React, { useState } from 'react';
import { Button, Heading, Input, Stack, VStack,Text } from '@chakra-ui/react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function UpdateUser() {

  const location = useLocation();
  const { userToUpdate } = location.state ?? {};
  const [_id, setUserId] = useState(userToUpdate?._id);
  const [userName, setUserName] = useState(userToUpdate?.userName);
  const [email, setEmail] = useState(userToUpdate?.email);
  const [phoneNumber, setPhoneNumber] = useState(userToUpdate?.phoneNumber);
  const navigate=useNavigate();

  const handleUpdate = async () => {
    try {

      const updateUser = await axios.put(`/api/v1/users/update_user/${_id}`, {
        userName,
        email,
        phoneNumber,
      });
      

      console.log('updatedUser:', updateUser);

      toast.success('User Updated Successfully !', {
        position: 'top-center',
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
       
      if (updateUser.status === 200) {
        console.log('User Updated Successfully!');
        setTimeout(() => {
          navigate("/")
       },[1000] );
      } else {
        console.log('User not Updated!');
      }
    } catch (error) {
      console.error('Error while calling Update User API', error);
    }


    


  };

  return (
    <>
     <ToastContainer />
      <Stack 
      w={'full'} 
      display={'flex'} 
      justifyContent={'center'} 
      alignItems={'center'} 
      paddingTop={'16'} 
      >
        <VStack
          w={["full","40%"]} 
          border={'2px solid white'}
          borderRadius={'2'}
          bg={'white'}
          boxShadow='lg'
          p='6'
          rounded='md'
          direction={"row"}
          alignSelf={"center"}
        >
          <Heading fontFamily={'cursive'} fontSize={'x-large'} fontWeight={'500'}>
            Update User
          </Heading>

          <Input
            w={'80%'}
            type='text'
            placeholder='Full Name'
            bg={'white'}
            boxShadow='dark-lg'
            p='6'
            rounded='md'
            required={true}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <Input
            w={'80%'}
            type='text'
            placeholder='Email'
            bg={'white'}
            boxShadow='dark-lg'
            p='6'
            rounded='md'
            required={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            w={'80%'}
            type='number'
            placeholder='Phone Number'
            bg={'white'}
            boxShadow='dark-lg'
            p='6'
            rounded='md'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          <Button mt={'4'} w={'40%'} colorScheme='purple' onClick={handleUpdate}>
            Update
            
          </Button>
        </VStack>
      </Stack>
    </>
  );
}

export default UpdateUser;
