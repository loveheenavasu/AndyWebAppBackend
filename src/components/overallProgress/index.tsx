import React from 'react'
import { Box,Text,Progress} from '@chakra-ui/react';
import { WHITE_COLOR } from '@/constant/colors';


const OverallProgress = () => {
  return (
   <>
   <Box borderRadius={"8px"} width={"516px"} className='progress_bar_wrapper' bgColor={WHITE_COLOR} p={"50px"} display={"flex"} flexDirection={"column"} gap={"10px"}>
                  <Box className='content_wrapper' display="flex" alignItems={'center'} gap={"10px"}>
                  <Text fontSize={"21px"} fontWeight={900} color={"#000000"}>Overall Progress</Text>
                  <Text fontSize={"18px"} fontWeight={300}>(02 Hrs 37 Mins Left)</Text>
                  </Box>
                  <Box position="relative">
          <Box
            className="progress_bar"
            borderRadius="40px"
            height="18px"
          >
            <Progress value={20} borderRadius="40px" colorScheme="teal" height="100%"/>
          </Box>
          <Text
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            fontWeight={700}
            color="black"
          >
            20%
          </Text>
        </Box>
                </Box>
   </>
  )
}

export default OverallProgress
