import React from 'react';
import { Stack, VStack, Heading, Image, HStack, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { SiMongodb, SiExpress } from 'react-icons/si';
import { FaReact, FaNodeJs } from 'react-icons/fa';
import myImage from '../assets/myPic.png';

function AboutMe() {
  return (
    <Stack >
      <HStack width={'full'} height={"80vh"}>
        <Image src={myImage} w={'400'} h={'500'} />
        <Heading>
          <motion.p
             initial={{ opacity: 0, y: 20, scale: 1}}
            animate={{
              opacity: .8,
              y: 0,
              scale: 1.5,
              transition: { duration: 1.5,},
            }}
            exit={{ opacity: 0, y: 20 }}
            // style={{ color: 'blue' }}
          >
             I am <p style={{color:"blue"}}>MERN</p>
            <HStack>
            <SiMongodb />
            <SiExpress />
            <FaReact />
            <FaNodeJs />
            </HStack> 
           
            Stack Developer!
          </motion.p>
        </Heading>
        
      </HStack>
    </Stack>
  );
}

export default AboutMe;
