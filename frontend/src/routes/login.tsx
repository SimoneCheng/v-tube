import { createFileRoute } from '@tanstack/react-router';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  Link,
  useColorModeValue
} from '@chakra-ui/react';
import Logo from '../components/logo';

export const Route = createFileRoute('/login')({
  component: LoginComponent
});

function LoginComponent () {
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const cardBgColor = useColorModeValue('white', 'gray.700');

  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center" bg={bgColor}>
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgGradient="linear(to-r, purple.400, pink.200)"
        filter="blur(100px)"
        opacity={0.4}
        zIndex={0}
      />
      <Box
        bg={cardBgColor}
        p={8}
        rounded="lg"
        shadow="lg"
        maxWidth="400px"
        width="full"
        position="relative"
        zIndex={1}
      >
        <VStack spacing={4} align="flex-start" w="full">
          <Flex justifyContent="center" w="full">
            <Logo width="150px" height="75px" />
          </Flex>
          <Heading as="h2" size="xl" textAlign="center" w="full">
            登入您的帳號
          </Heading>
          <FormControl>
            <FormLabel>電子郵件</FormLabel>
            <Input type="email" placeholder="your-email@example.com" />
          </FormControl>
          <FormControl>
            <FormLabel>密碼</FormLabel>
            <Input type="password" placeholder="********" />
          </FormControl>
          <Button colorScheme="purple" width="full">
            登入
          </Button>
          <Flex justifyContent="space-between" width="full">
            <Link color="purple.500">忘記密碼？</Link>
            <Link color="purple.500">註冊新帳號</Link>
          </Flex>
        </VStack>
      </Box>
    </Flex>
  );
};
