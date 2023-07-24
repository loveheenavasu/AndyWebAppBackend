import React from 'react'
import { useRouter } from 'next/router';
import { Box, Text,Center, Flex,Image } from '@chakra-ui/react';

const unauthenticated = () => {
  const router = useRouter();
  const { status, message } = router.query;
  return (
    <>
    <Center>
      <Flex height="100vh" align="center" justify="center" flexDirection="column" >
        <Box height={300} width={300}>
      <Image src="error.png" height="100%" width="100%"/>
      </Box>
      <Text fontSize={220} fontWeight={900} color="#ec705a">{status}</Text>
      <Text fontSize={35} fontWeight={900} fontFamily='PT Serif, Georgia, serif'>Oops,{message}</Text>
      </Flex>
    </Center>
    </>
  )
}

export default unauthenticated