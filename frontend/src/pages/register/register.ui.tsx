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
  useToast,
} from '@chakra-ui/react';
import {
  useNavigate,
  Link as TanstackLink
} from '@tanstack/react-router';
import Logo from '../../components/logo';
import { postRegister } from './register.api';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const cardBgColor = useColorModeValue('white', 'gray.700');

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "密碼不匹配",
        description: "請確保兩次輸入的密碼相同",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setIsLoading(true);
    try {
      await postRegister({ username, email, password });
      toast({
        title: "註冊成功",
        description: "請使用您的新帳號登入",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate({ to: '/login' });
    } catch (error) {
      toast({
        title: "註冊失敗",
        description: error instanceof Error ? error.message : "發生未知錯誤",
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
        <form onSubmit={handleRegister}>
          <VStack spacing={4} align="flex-start" w="full">
            <Flex justifyContent="center" w="full">
              <Logo width="150px" height="75px" />
            </Flex>
            <Heading as="h2" size="xl" textAlign="center" w="full">
              註冊
            </Heading>
            <FormControl isRequired>
              <FormLabel>用戶名稱</FormLabel>
              <Input
                type="text"
                placeholder="username"
                focusBorderColor="purple.500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>電子郵件</FormLabel>
              <Input
                type="email"
                placeholder="email@example.com"
                focusBorderColor="purple.500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>密碼</FormLabel>
              <Input
                type="password"
                placeholder="********"
                focusBorderColor="purple.500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>確認密碼</FormLabel>
              <Input
                type="password"
                placeholder="********"
                focusBorderColor="purple.500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormControl>
            <Button
              colorScheme="purple"
              width="full"
              type="submit"
              isLoading={isLoading}
            >
              註冊
            </Button>
            <Flex justifyContent="center" width="full">
              <Link
                as={TanstackLink}
                to="/login"
                color="purple.500"
              >
                已有帳號？點此登入
              </Link>
            </Flex>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default RegisterPage;
