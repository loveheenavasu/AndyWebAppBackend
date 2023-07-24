import React from "react";
import {
  Box,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

const CourseModule = () => {
  const accordionItems = [
    {
      title: "Introduction",
      content:
        "Welcome to our comprehensive online course! This course is designed to provide you with valuable insights and practical knowledge in various subjects. Through engaging lessons and hands-on activities, you will gain a deeper understanding of key concepts and enhance your skills. Get ready for an enriching learning journey!",
    },
    {
      title: "Course Module 1",
      content: "Content of Module 1 goes here.",
    },
    {
      title: "Course Module 2",
      content: "Content of Module 2 goes here.",
    },
  ];

  return (
    <>
      <Box
        className="accordion_wrapper"
        width={"834px"}
        display={"flex"}
        flexDirection={"column"}
        mt={"20px"}
      >
        <Accordion allowToggle>
          {accordionItems.map((item, index) => (
            <Box mb={"20px"}>
              <AccordionItem
                key={index}
                borderRadius="8px"
                background="#FFF"
                border={"none"}
              >
                <AccordionButton height={"84px"}>
                  <Box as="span" flex="1" textAlign="left">
                    {item.title}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4} bgColor={"#f9f9f9"}>
                  {item.content}
                </AccordionPanel>
              </AccordionItem>
            </Box>
          ))}
        </Accordion>
      </Box>
    </>
  );
};

export default CourseModule;
