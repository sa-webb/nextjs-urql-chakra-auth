import React from "react";
import { Box, Flex, Link, Button } from "@chakra-ui/core";
import NextLink from "next/link";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery();

  let display;

  if (fetching) {
    display = null;
  } else if (!data?.me) {
    display = (
      <>
        <NextLink href="/register">
          <Link mr={4}>Register</Link>
        </NextLink>
        <NextLink href="/login">
          <Link>Login</Link>
        </NextLink>
      </>
    );
  } else {
    display = (
      <Flex>
        <Box mr={4}>{data?.me?.username}</Box>
        <Button
          onClick={() => {
            logout();
          }}
          isLoading={logoutFetching}
          variant="link"
        >
          Logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex bg="rebeccapurple" p={4}>
      <Box ml={"auto"}></Box>
      {display}
    </Flex>
  );
};
