import React, { useState } from "react";
import {
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { WHITE_COLOR } from "@/constant/colors";
import Image from "next/image";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpenModal = () => {
    onOpen();
  };

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <>
      <Box
        className="navbar"
        display={"Flex"}
        height="96px"
        justifyContent={"space-between"}
        alignItems={"center"}
        paddingLeft={120}
        paddingRight={120}
        bgColor={WHITE_COLOR}
      >
        <Box className="logo_container">
          <Image
            src={"/svg/logo.svg"}
            alt="SVG image"
            width={300}
            height={31}
          />
        </Box>
        <Box
          className="icons_wrapper"
          display={"Flex"}
          alignItems={"center"}
          gap={100}
        >
          <Box
            className="message_wrapper"
            height={"32px"}
            width={"32px"}
            onClick={handleOpenModal}
          >
            <Image
              src={"/svg/message.svg"}
              alt=" SVG image"
              width={32}
              height={32}
            />
          </Box>
          <Box
            className="avatar_wrapper"
            height={"48px"}
            width={"48px"}
            bgColor={"#000000"}
            borderRadius={"100%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Image
              src={"/svg/user.svg"}
              alt="SVG image"
              width={24}
              height={24}
            />
          </Box>
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={handleCloseModal} size="sm">
        <ModalOverlay />
        <ModalContent>
          {/* <ModalCloseButton /> */}
          <ModalBody>
            <Box
              display={"flex"}
              alignItems={"center"}
              borderBottom={"1px solid #E2E8F0"}
              pt={5}
              pb={5}
            >
              <Box className="message_wrapper" height={"32px"} width={"32px"}>
                <Image
                  src={"/svg/message.svg"}
                  alt=" SVG image"
                  width={32}
                  height={32}
                />
              </Box>
              <Text fontSize={"21px"} color={"#2D3748"} fontWeight={400} ml={6}>
                Alerts
              </Text>
            </Box>
            <Box>
              <Box
                className="notification_wrapper"
                // border={"1px solid black"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                mt={5}
              >
                <Box
                  className="avatar_wrapper"
                  height={"48px"}
                  width={"48px"}
                  bgColor={"#4A5568"}
                  borderRadius={"100%"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Image
                    src={"/svg/notificationUser.svg"}
                    alt="SVG image"
                    width={24}
                    height={24}
                  />
                </Box>
                <Text ml={8} fontWeight={400} color={"#718096"}>
                  Everyone attend the complete the test and then leave.
                </Text>
              </Box>
              <Text mt={5} fontWeight={400} fontSize={"16px"} color={"#718096"}>
                Today, 12:30 pm
              </Text>
            </Box>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Navbar;
