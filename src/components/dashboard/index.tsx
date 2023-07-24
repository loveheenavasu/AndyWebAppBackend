import React from "react";
import { Box, Text } from "@chakra-ui/react";
import Navbar from "../navbar";
import CourseModule from "../courseModule";
import OverallProgress from "../overallProgress";
import AlertSection from "../alertSection";
import Image from "next/image";

const DashBoard = () => {
  return (
    <>
      <Box backgroundColor="#f9f9f9" height={"100vh"}>
        <Navbar />
        <Box
          className="main_wrapper"
          paddingLeft={"120px"}
          paddingTop={"58px"}
          display={"flex"}
        >
          <Box className="course_wrapper_left">
            <Box
              className="heading_item_wrapper"
              display={"flex"}
              w="472px"
              h="62px"
              justifyContent={"space-between"}
            >
              <Box className="star_icon_wrapper">
                <Image src="/svg/star.svg" height={64} width={64} alt="star" />
              </Box>
              <Box className="content-wrapper">
                <Text fontSize="30px" fontWeight={600} color="#1C1D20">
                  How to teach Better?
                </Text>
                <Text fontSize="18px" fontWeight={300} color="#4A5568">
                  Possible ways to improve your teaching skills.
                </Text>
              </Box>
            </Box>
            <CourseModule />
          </Box>
          <Box
            className="right_sidebar"
            pt={"80px"}
            display={"flex"}
            flexDirection={"column"}
            gap={"20px"}
            ml={"20px"}
          >
            <OverallProgress />
            {/* <AlertSection/> */}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DashBoard;
