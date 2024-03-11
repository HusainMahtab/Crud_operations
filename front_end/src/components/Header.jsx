import React from 'react';
import { Stack, HStack, Link as ChakraLink,Avatar} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { Search2Icon } from '@chakra-ui/icons';



function Header() {
  
  return (
    <Stack
      w={'full'}
      bgColor={'white'}
      boxShadow='lg'
      p='6'
      rounded='md'
      bg='white'
      padding={'4'}
      position={""}
    >
      <HStack
        w={'full'}
        color={'black'}
        fontFamily={'cursive'}
        fontSize={'large'}
        fontWeight={'700'}
        display={'flex'}
        justifyContent={'space-between'}
        spacing={'8'}
      >
        <ChakraLink as={RouterLink} to={'/'} _hover={{color:"purple"}} mx={"8"} >
          XCrudApp
        </ChakraLink>
        <HStack spacing={'8'} mx={"10"}>
          <ChakraLink as={RouterLink} to={'/adduser'} _hover={{ color: 'purple' }}>
            AddUser
          </ChakraLink>
          <ChakraLink as={RouterLink} to={'/update_user'} _hover={{ color: 'purple' }}>
            UpdateUser
          </ChakraLink>
          <ChakraLink as={RouterLink} to={'/about_me'} _hover={{ color: 'purple' }}>
            AboutMe
          </ChakraLink>
          <ChakraLink>
            <Avatar as={RouterLink} to={"/login"} _hover={{ color: 'purple' }}/>
          </ChakraLink>
        </HStack>
      </HStack>
    </Stack>
  );
}

export default Header;
