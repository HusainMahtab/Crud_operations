import React from 'react'
import { Heading, Spinner,Stack } from '@chakra-ui/react'
function Loader() {
  return (
    <>
       <Stack h={"100vh"} direction='column' spacing={4} alignItems={"center"} my={"16"}>
        <Spinner size='xl'  
        boxShadow={"lg"}
        rounded={"md"}
        borderRadius={"50%"}    
        />
        <Heading 
        fontFamily={"cursive"} 
        fontWeight={"500"} 
        fontSize={"large"} 
        ml={"3"}
       
        >
        Loading...
        </Heading>
       </Stack>
    </>
    
     
  )
}

export default Loader