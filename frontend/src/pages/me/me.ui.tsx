import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
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
  SimpleGrid,
  Box,
  useDisclosure,
} from '@chakra-ui/react';
import { HiOutlineFilm } from 'react-icons/hi';
import {
  useGetMeQuery,
  useGetUserVideosQuery,
} from './me.query';
import { type Video } from './me.api';
import UploadDialog from './upload-dialog';

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

export const VideoList = ({ videos }: { videos: Video[]; }) => {
  return (
    <SimpleGrid columns={[1, 2, 3]} spacing={6}>
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </SimpleGrid>
  );
};

const VideoCard = ({ video }: { video: Video }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleClick = () => {
    navigate({
      to: '/video/$videoId',
      params: { videoId: video.id.toString() }
    });
  };

  return (
    <Box
      borderRadius="lg"
      overflow="hidden"
      borderWidth="1px"
      _hover={{ shadow: 'md' }}
      transition="all 0.2s"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <Box position="relative" w="100%" paddingTop="56.25%">
        {isLoading && (
          <Skeleton
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height="100%"
          />
        )}
        {hasError && <Text>Failed to load video</Text>}
        <video
          src={video.url}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
          preload="metadata"
          onLoadedData={() => setIsLoading(false)}
          muted
          autoPlay={isHovered}
          loop={isHovered}
          playsInline
          onError={() => {
            setIsLoading(false);
            setHasError(true);
            console.error('Video load error:', video.url);
          }}
        />
      </Box>
      <VStack align="stretch" p={3} spacing={2}>
        <Text fontWeight="bold" noOfLines={2}>
          {video.title}
        </Text>
        <Text fontSize="sm" color="gray.600" noOfLines={1}>
          {video.uploader.username}
        </Text>
        <Text fontSize="sm" color="gray.500">
          {video.views.toLocaleString()} views • {new Date(video.uploadedAt).toLocaleDateString()}
        </Text>
      </VStack>
    </Box>
  );
};

const MePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: userData, isLoading: isUserLoading } = useGetMeQuery();
  const { data: videos, isLoading: isVideosLoading } = useGetUserVideosQuery(userData?.id || 0);

  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={6} align="stretch">
        {isUserLoading ? <ProfileSkeleton /> : <ProfileContent {...userData} />}
        <Tabs colorScheme="gray" mt={6}>
          <TabList borderBottomWidth="1px">
            <Tab>My Videos</Tab>
            <Tab>Upload Video</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {isVideosLoading ? (
                <Text>Loading videos...</Text>
              ) : videos?.length ? (
                <VideoList videos={videos} />
              ) : (
                <Text>No videos found.</Text>
              )}
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
                <Button colorScheme="purple" size="lg" mt={4} onClick={onOpen}>
                  Upload
                </Button>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
      {userData?.id && <UploadDialog isOpen={isOpen} onClose={onClose} userId={userData.id} />}
    </Container>
  );
};

export default MePage;
