import {
  Box,
  Flex
} from '@chakra-ui/react';
import {
  FiHome,
  FiVideo,
  FiUpload,
  FiUser
} from 'react-icons/fi';
import MenuItem from './menu-item';

type SidebarProps = {
  isCollapsed: boolean;
}

const Sidebar = (props: SidebarProps) => {
  const { isCollapsed } = props;

  return (
    <Box
      as="nav"
      pos="fixed"
      top="66px"
      left="0"
      zIndex="sticky"
      h="calc(100vh - 66px)"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg="white"
      borderRight="1px"
      borderRightColor="gray.200"
      w={isCollapsed ? "60px" : "200px"}
      transition="width 0.3s"
    >
      <Flex direction="column" h="full" px={4} py={4}>
        <MenuItem icon={FiHome} to="/">
          {!isCollapsed && "首頁"}
        </MenuItem>
        <MenuItem icon={FiVideo} to="/videos">
          {!isCollapsed && "我的影片"}
        </MenuItem>
        <MenuItem icon={FiUpload} to="/upload">
          {!isCollapsed && "上傳影片"}
        </MenuItem>
        <MenuItem icon={FiUser} to="/profile">
          {!isCollapsed && "個人資料"}
        </MenuItem>
      </Flex>
    </Box>
  );
};

export default Sidebar;
