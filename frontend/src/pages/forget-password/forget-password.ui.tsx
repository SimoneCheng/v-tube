import { useState, FormEvent } from 'react';
import { Link as TanstackLink } from '@tanstack/react-router';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  VStack,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';
import Logo from '../../components/logo';

const ForgetPasswordPage = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const cardBgColor = useColorModeValue('white', 'gray.700');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleForgotPassword = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // await postForgotPassword({ email });
      toast({
        title: "重置密碼郵件已發送",
        description: "請檢查您的郵箱",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch {
      toast({
        title: "發送失敗",
        description: "請確認您輸入的郵箱地址正確",
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
        <form onSubmit={handleForgotPassword}>
          <VStack spacing={4} align="flex-start" w="full">
            <Flex justifyContent="center" w="full">
              <Logo width="150px" height="75px" />
            </Flex>
            <Heading as="h2" size="xl" textAlign="center" w="full">
              忘記密碼
            </Heading>
            <FormControl>
              <FormLabel>電子郵件</FormLabel>
              <Input
                type="email"
                placeholder="email@example.com"
                focusBorderColor="purple.500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <Button
              colorScheme="purple"
              width="full"
              type="submit"
              isLoading={isLoading}
            >
              發送重置密碼郵件
            </Button>
            <Flex justifyContent="center" width="full">
              <TanstackLink to="/login">
                <Link color="purple.500">
                  返回登入
                </Link>
              </TanstackLink>
            </Flex>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default ForgetPasswordPage;
