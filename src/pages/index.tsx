import { Flex, Spinner } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import axios from "axios";
import { SECONDARY_COLOR } from "@/constant/colors";
import DashBoard from "@/components/dashboard";

interface HomeProps {
  isLoading: boolean;
  isAuthenticated: boolean;
  apiResponse: any | null;
}
const Home = ({ isLoading, apiResponse }: HomeProps) => {
  if (isLoading) {
    return (
      <Flex align="center" justify="center" h="100vh">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color={SECONDARY_COLOR}
          size="xl"
        />
      </Flex>
    );
  }

  return (
    <>
      <DashBoard />
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context
) => {
  const { session: token } = context.query;
  let isLoading = true;
  let isAuthenticated = false;
  let apiResponse = null;

  if (token) {
    try {
      const response = await axios.get(
        "https://andy-backend.onrender.com'/verifyOnboarding",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (response && response?.status === 200) {
        isLoading = false;
        isAuthenticated = true;
        apiResponse = response.data;

        return {
          props: {
            isLoading,
            isAuthenticated,
            apiResponse,
          },
        };
      }
    } catch (error: any) {
      console.error("User verification error:", error);
      isLoading = false;

      const status = error?.response?.status || 500;
      const message = error?.response?.data?.message || "Internal Server Error";

      return {
        redirect: {
          destination: `/unauthenticated?status=${status}&message=${message}`,
          permanent: false,
        },
      };
    }
  }
  return {
    props: {
      isLoading,
      isAuthenticated,
      apiResponse,
    },
  };
};
