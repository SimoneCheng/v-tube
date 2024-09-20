import {
  Box,
  Divider,
  Flex
} from '@chakra-ui/react';
import {
  FiHome,
  FiUser
} from 'react-icons/fi';
import MenuItem from './menu-item';

type SidebarProps = {
  isCollapsed: boolean;
  isLogin: boolean;
}

const Sidebar = (props: SidebarProps) => {
  const { isCollapsed, isLogin } = props;

  return (
    <Box
      as="nav"
      pos="fixed"
      top="66px"
      left="0"
      zIndex="sticky"
      h="calc(100vh - 66px)"
      overflowX="hidden"
      overflowY="auto"
      bg="white"
      borderRight="1px"
      borderRightColor="gray.200"
      w={isCollapsed ? "65px" : "200px"}
    >
      <Flex direction="column" h="full">
        <MenuItem icon={FiHome} to="/">
          {!isCollapsed && "首頁"}
        </MenuItem>
        <Divider />
        {isLogin && (
          <>
            <MenuItem icon={FiUser} to="/me">
              {!isCollapsed && "個人中心"}
            </MenuItem>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default Sidebar;
