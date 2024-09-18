import {
  Flex,
  InputGroup,
  InputLeftElement,
  Input,
  Text,
  Avatar,
  HStack,
  IconButton
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { RxHamburgerMenu } from "react-icons/rx";
import Logo from '../logo';

type TopBarProps = {
  isCollapsed: boolean;
  onToggle: () => void;
};

const TopBar = (props: TopBarProps) => {
  const { isCollapsed, onToggle } = props;

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="0.5rem"
      bg="white"
      color="gray.800"
      position="fixed"
      top={0}
      left={0}
      right={0}
      height="66px"
      zIndex="sticky"
      borderBottom="1px"
      borderBottomColor="gray.200"
    >
      <Flex align="center" mr={5}>
        <IconButton
          isRound={true}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          fontSize="24px"
          icon={<RxHamburgerMenu />}
          onClick={onToggle}
          variant="ghost"
          mr={1}
        />
        <Logo height="40px" width="80px" />
      </Flex>
      <InputGroup maxW="400px">
        <InputLeftElement pointerEvents="none">
          <FiSearch color="gray.300" />
        </InputLeftElement>
        <Input type="text" placeholder="搜尋影片..." />
      </InputGroup>
      <HStack spacing={4}>
        <Text>John Doe</Text>
        <Avatar name="John Doe" src="https://bit.ly/broken-link" />
      </HStack>
    </Flex>
  );
};

export default TopBar;