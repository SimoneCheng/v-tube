import { useState } from 'react';
import { Outlet } from '@tanstack/react-router';
import { Box, Flex } from '@chakra-ui/react';
import TopBar from './top-bar';
import Sidebar from './sidebar';

const Layout = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <>
      <TopBar isCollapsed={isCollapsed} onToggle={toggleSidebar} />
      <Flex>
        <Sidebar isCollapsed={isCollapsed} />
        <Box
          as="main"
          flex={1}
          ml={isCollapsed ? "60px" : "200px"}
          mt="60px"
          p={8}
          transition="margin-left 0.2s"
        >
          <Outlet />
        </Box>
      </Flex>
    </>
  );
};

export default Layout;
