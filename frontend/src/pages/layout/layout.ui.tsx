import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from '@tanstack/react-router';
import { jwtDecode } from 'jwt-decode';
import { Box, Flex } from '@chakra-ui/react';
import TopBar from './top-bar';
import Sidebar from './sidebar';
import ForceLogoutAlertDialog from './force-logout-alert-dialog';

const Layout = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const handleAlertClose = () => {
    setIsAlertOpen(false);
    navigate({ to: '/login' });
  };

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken = jwtDecode<{
            email: string;
            sub: number;
            iat: number;
            exp: number;
          }>(token);
          const currentTime = Date.now() / 1000;
          if (decodedToken.exp > currentTime) {
            setIsLogin(true);
          } else {
            setIsLogin(false);
            setIsAlertOpen(true);
            localStorage.removeItem('token');
          }
        } catch (error) {
          console.error('Invalid token:', error);
          setIsLogin(false);
          setIsAlertOpen(true);
          localStorage.removeItem('token');
        }
      } else {
        setIsLogin(false);
      }
    };

    checkAuthStatus();
    const intervalId = setInterval(checkAuthStatus, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <ForceLogoutAlertDialog
        isOpen={isAlertOpen}
        onClose={handleAlertClose}
      />
      <TopBar
        isLogin={isLogin}
        isCollapsed={isCollapsed}
        onToggle={toggleSidebar}
      />
      <Flex>
        <Sidebar
          isLogin={isLogin}
          isCollapsed={isCollapsed}
        />
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
