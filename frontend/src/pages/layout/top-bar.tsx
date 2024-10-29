import {
  Flex,
  InputGroup,
  InputLeftElement,
  Input,
  Text,
  Avatar,
  HStack,
  IconButton,
  Link,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Skeleton,
  SkeletonCircle
} from '@chakra-ui/react';
import { Link as TanstackLink, useNavigate } from '@tanstack/react-router';
import { FiSearch, FiLogOut } from 'react-icons/fi';
import { RxHamburgerMenu } from "react-icons/rx";
import Logo from '../../components/logo';
import { postLogout } from './layout.api';
import { useGetMeQuery } from '../me/me.query';

type TopBarProps = {
  isCollapsed: boolean;
  onToggle: () => void;
  isLogin: boolean;
};

const MeMenu = () => {
  const navigate = useNavigate();
  const { isLoading, data } = useGetMeQuery();

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await postLogout({ token });
        localStorage.removeItem('token');
        navigate({ to: '/' });
        setTimeout(() => {
          window.location.reload();
        }, 10);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Menu>
      <MenuButton>
        <HStack>
          {isLoading ? (
            <>
              <Skeleton height="20px" width="80px" />
              <SkeletonCircle size="32px" />
            </>
          ) : (
            <>
              <Text>{data?.username}</Text>
              <Avatar
                name={data?.username}
                src="/placeholder-avatar.jpg"
                size="sm"
              />
            </>
          )}
        </HStack>
      </MenuButton>
      <MenuList>
        <MenuItem icon={<FiLogOut />} onClick={handleLogout}>
          登出
        </MenuItem>
      </MenuList>
    </Menu>
  )
};

const TopBar = (props: TopBarProps) => {
  const {
    isCollapsed,
    onToggle,
    isLogin
  } = props;
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Flex
      as="header"
      bg={bgColor}
      color={useColorModeValue('gray.800', 'white')}
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="0.5rem"
      position="fixed"
      top={0}
      left={0}
      right={0}
      height="66px"
      zIndex="sticky"
      borderBottom="1px"
      borderBottomColor={borderColor}
      boxShadow="sm"
    >
      <Flex align="center" mr={5}>
        <IconButton
          isRound={true}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          fontSize="24px"
          fontWeight={700}
          icon={<RxHamburgerMenu />}
          onClick={onToggle}
          variant="ghost"
          mr={1}
        />
        <Link
          as={TanstackLink}
          to="/"
          display="flex"
          _hover={{ textDecoration: 'none' }}
        >
          <Logo height="40px" width="80px" />
          <Text
            fontWeight={700}
            fontSize="24px"
            ml={2}
          >
            V-Tube
          </Text>
        </Link>
      </Flex>
      <InputGroup maxW="400px">
        <InputLeftElement pointerEvents="none">
          <FiSearch color="gray.300" />
        </InputLeftElement>
        <Input type="text" placeholder="搜尋影片..." borderRadius="full" />
      </InputGroup>
      <HStack spacing={4}>
        {isLogin ? (
          <MeMenu />
        ) : (
          <Link
            bgColor="purple.500"
            color="white"
            px={4}
            py={2}
            borderRadius="base"
            _hover={{ textDecoration: 'none' }}
            as={TanstackLink}
            to="/login"
          >
            登入
          </Link>
        )}
      </HStack>
    </Flex>
  );
};

export default TopBar;
