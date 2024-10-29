import {
  VStack,
  HStack,
  Avatar,
  Text,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Container,
  Skeleton,
  SkeletonCircle,
} from '@chakra-ui/react';
import { HiOutlineFilm } from 'react-icons/hi';
import { useGetMeQuery } from './me.query';

const ProfileSkeleton = () => {
  return (
    <HStack spacing={6} align="flex-start">
      <SkeletonCircle size="96px" />
      <VStack align="stretch" flex={1} spacing={2}>
        <Skeleton height="36px" width="150px" />
        <Skeleton height="20px" width="80px" />
        <Skeleton height="20px" width="200px" />
        <Skeleton height="32px" width="150px" />
      </VStack>
    </HStack>
  );
};

const ProfileContent = (props: {
  id?: number;
  username?: string;
  email?: string;
  createdAt?: string;
  updatedAt?: string;
}) => {
  const {
    username = '',
    email = '',
  } = props;

  return (
    <HStack spacing={6} align="flex-start">
      <Avatar
        size="2xl"
        name={username}
        src="/placeholder-avatar.jpg"
        bg="gray.400"
      />
      <VStack align="stretch" flex={1} spacing={2}>
        <Text fontSize="2xl" fontWeight="bold">
          {username}
        </Text>
        <Text color="gray.600">
          {email}
        </Text>
      </VStack>
      <Button
        variant="outline"
        colorScheme="purple"
        size="sm"
        maxW="150px"
      >
        Edit Profile
      </Button>
    </HStack>
  );
};

const MePage = () => {
  const { data, isLoading } = useGetMeQuery();

  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={6} align="stretch">
        {isLoading ? <ProfileSkeleton /> : <ProfileContent {...data} />}
        <Tabs colorScheme="gray" mt={6}>
          <TabList borderBottomWidth="1px">
            <Tab>My Videos</Tab>
            <Tab>Upload Video</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Text>Your videos will appear here.</Text>
            </TabPanel>
            <TabPanel>
              <VStack spacing={4} align="center" py={10}>
                <HiOutlineFilm size={64} color="var(--chakra-colors-gray-400)" />
                <Text fontSize="lg" textAlign="center">
                  No matter you are at home or out, you can upload videos.
                </Text>
                <Text color="gray.600" textAlign="center">
                  Everything you make public will appear here.
                </Text>
                <Button colorScheme="purple" size="lg" mt={4}>
                  Upload
                </Button>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Container>
  );
};

export default MePage;
