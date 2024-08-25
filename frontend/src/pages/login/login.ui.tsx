import { useState } from 'react';
import type { FormEvent } from 'react';
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
  useColorModeValue,
  useToast
} from '@chakra-ui/react';
import Logo from '../../components/logo';
import { postLogin } from './login.api';

const LoginPage = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const cardBgColor = useColorModeValue('white', 'gray.700');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await postLogin({ email, password });
      localStorage.setItem('token', response.accessToken);
      toast({
        title: "登入成功",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch {
      toast({
        title: "登入失敗",
        description: "請檢查您的 email 和密碼",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

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
        <form onSubmit={handleLogin}>
          <VStack spacing={4} align="flex-start" w="full">
            <Flex justifyContent="center" w="full">
              <Logo width="150px" height="75px" />
            </Flex>
            <Heading as="h2" size="xl" textAlign="center" w="full">
              登入您的帳號
            </Heading>
            <FormControl>
              <FormLabel>電子郵件</FormLabel>
              <Input
                type="email"
                placeholder="your-email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>密碼</FormLabel>
              <Input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button
              colorScheme="purple"
              width="full"
              type="submit"
              isLoading={isLoading}
            >
              登入
            </Button>
            <Flex justifyContent="space-between" width="full">
              <Link color="purple.500">忘記密碼？</Link>
              <Link color="purple.500">註冊新帳號</Link>
            </Flex>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default LoginPage;
