import { useState, FormEvent } from 'react';
import {
  Link as TanstackLink,
  getRouteApi
} from '@tanstack/react-router';
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
import { postResetPassword } from './reset-password.api';

const route = getRouteApi('/reset-password/$token');

const ResetPasswordPage = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const cardBgColor = useColorModeValue('white', 'gray.700');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const navigate = route.useNavigate();
  const { token } = route.useParams();

  const handleResetPassword = async (e: FormEvent) => {
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
      await postResetPassword({ token, newPassword: password });
      toast({
        title: "密碼重置成功",
        description: "請使用新密碼登入",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate({ to: '/login' });
    } catch {
      toast({
        title: "重置失敗",
        description: "請重新申請密碼重置",
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
        <form onSubmit={handleResetPassword}>
          <VStack spacing={4} align="flex-start" w="full">
            <Flex justifyContent="center" w="full">
              <Logo width="150px" height="75px" />
            </Flex>
            <Heading as="h2" size="xl" textAlign="center" w="full">
              重設密碼
            </Heading>
            <FormControl>
              <FormLabel>新密碼</FormLabel>
              <Input
                type="password"
                placeholder="輸入新密碼"
                focusBorderColor="purple.500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>確認新密碼</FormLabel>
              <Input
                type="password"
                placeholder="再次輸入新密碼"
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
              重設密碼
            </Button>
            <Flex justifyContent="center" width="full">
              <Link
                as={TanstackLink}
                to="/login"
                color="purple.500"
              >
                返回登入
              </Link>
            </Flex>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default ResetPasswordPage;
