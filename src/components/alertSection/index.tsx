import React from 'react'
import { Box,Text} from '@chakra-ui/react';
import { WHITE_COLOR } from '@/constant/colors';

const AlertSection = () => {
  return (
    <>
    <Box borderRadius={"8px"} width={"516px"} className='alert_wrapper' bgColor={WHITE_COLOR}>
                <Box className='alert-nav' display="flex" alignItems={'center'} borderBottom={"1px solid black"}  pl={"32px"} pt={"20px"} pb={"20px"}>
                  <Box className='image_wrapper' w={"32px"} h={"32px"}>
                  <img width={"100%"} height={"100%"} src='/message.png'/>
                  </Box>
                  <Text ml={"10px"} fontSize={"21px"} fontWeight={400}>Alert</Text>
                </Box>
                </Box>
    </>
  )
}

export default AlertSection
