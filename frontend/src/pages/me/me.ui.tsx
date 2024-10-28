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
} from '@chakra-ui/react';
import { HiOutlineFilm } from 'react-icons/hi';

const MePage = () => {
  return (
    <Container maxW="container.lg" py={8}>
      {/* Profile Section */}
      <VStack spacing={6} align="stretch">
        <HStack spacing={6} align="flex-start">
          {/* Avatar */}
          <Avatar
            size="2xl"
            name="Simone"
            src="/placeholder-avatar.jpg"
            bg="gray.400"
          />
          
          {/* Profile Info */}
          <VStack align="stretch" flex={1} spacing={2}>
            <Text fontSize="2xl" fontWeight="bold">
              Simone
            </Text>
            <Text color="gray.600">
              123
            </Text>
            <Text color="gray.600">
              simone123@example.com
            </Text>
            <Button
              variant="outline"
              colorScheme="purple"
              size="sm"
              maxW="150px"
            >
              Edit Profile
            </Button>
          </VStack>
        </HStack>

        {/* Tabs Section */}
        <Tabs colorScheme="gray" mt={6}>
          <TabList borderBottomWidth="1px">
            <Tab>My Videos</Tab>
            <Tab>Upload Video</Tab>
          </TabList>

          <TabPanels>
            {/* My Videos Tab */}
            <TabPanel>
              <Text>Your videos will appear here.</Text>
            </TabPanel>

            {/* Upload Video Tab */}
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
