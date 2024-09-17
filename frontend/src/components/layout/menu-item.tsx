import type { ReactNode } from 'react';
import type { IconType } from 'react-icons';
import { Link, Icon } from '@chakra-ui/react';
import { Link as TanstackLink } from '@tanstack/react-router';

type MenuItemProps = {
  icon: IconType;
  children: ReactNode;
  to: string | undefined;
}

const MenuItem = (props: MenuItemProps) => {
  const { icon, children, to } = props;

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
