import type { ReactNode } from 'react';
import type { IconType } from 'react-icons';
import { Link, Icon, useColorModeValue } from '@chakra-ui/react';
import { Link as TanstackLink, useLocation } from '@tanstack/react-router';

type MenuItemProps = {
  icon: IconType;
  children: ReactNode;
  to: string | undefined;
}

const MenuItem = (props: MenuItemProps) => {
  const { icon, children, to } = props;
  const location = useLocation();
  const activeBg = useColorModeValue('blue.50', 'blue.900');
  const activeColor = useColorModeValue('blue.700', 'blue.200');
  const hoverBg = useColorModeValue('gray.100', 'gray.700')

  return (
    <Link
      as={TanstackLink}
      to={to}
      fontSize="md"
      fontWeight="medium"
      display="flex"
      alignItems="center"
      justifyContent={children ? undefined :  "center"}
      py={2}
      px={2}
      _hover={{ bg: hoverBg }}
      bg={location.pathname === to ? activeBg : 'transparent'}
      color={location.pathname === to ? activeColor : undefined}
      transition="all 0.2s"
      borderRadius="4px"
    >
      <Icon
        as={icon}
        mr={children ? 3 : 0}
        w={children ? undefined : '24px'}
        h={children ? undefined : '24px'}
      />
      {children}
    </Link>
  );
};

export default MenuItem;
