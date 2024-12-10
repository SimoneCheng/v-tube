import { useState, useRef, useEffect } from 'react';
import { getRouteApi } from '@tanstack/react-router';
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Avatar,
  Button,
  Divider,
  IconButton,
  useToast,
  Skeleton,
  SkeletonText,
  Spinner,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  List,
  ListItem,
} from '@chakra-ui/react';
import {
  HiThumbUp,
  HiBookmark,
  HiShare,
  HiPlay,
  HiPause,
  HiVolumeUp,
  HiVolumeOff,
  HiArrowsExpand,
  HiCog
} from 'react-icons/hi';
import { useGetSingleVideoQuery } from './single-video.query';

interface VideoPlaybackState {
  isPlaying: boolean;
  isMuted: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isFullscreen: boolean;
  playbackSpeed: number;
}

const PLAYBACK_SPEEDS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

const routeApi = getRouteApi('/_layout/video/$videoId');

const VideoPlayPage = () => {
  const { videoId } = routeApi.useParams();
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [playbackState, setPlaybackState] = useState<VideoPlaybackState>({
    isPlaying: false,
    isMuted: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isFullscreen: false,
    playbackSpeed: 1
  });
  const toast = useToast();

  const { data: video, isLoading: isVideoLoading } = useGetSingleVideoQuery({ id: videoId });

  // 控制音量
  const handleVolumeChange = (value: number) => {
    if (videoRef.current) {
      videoRef.current.volume = value;
      videoRef.current.muted = value === 0;
      setPlaybackState(prev => ({
        ...prev,
        volume: value,
        isMuted: value === 0
      }));
    }
  };

  // 控制播放速度
  const handleSpeedChange = (speed: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
      setPlaybackState(prev => ({ ...prev, playbackSpeed: speed }));
    }
  };

  // 全螢幕相關處理
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoContainerRef.current?.requestFullscreen();
      setPlaybackState(prev => ({ ...prev, isFullscreen: true }));
    } else {
      document.exitFullscreen();
      setPlaybackState(prev => ({ ...prev, isFullscreen: false }));
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setPlaybackState(prev => ({
        ...prev,
        isFullscreen: !!document.fullscreenElement
      }));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    const savedTime = localStorage.getItem(`video-${videoId}-time`);
    if (savedTime && videoRef.current) {
      videoRef.current.currentTime = parseFloat(savedTime);
      toast({
        title: 'Resuming from previous position',
        status: 'info',
        duration: 3000,
      });
    }
  }, [videoId, toast]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef.current) {
        localStorage.setItem(
          `video-${videoId}-time`,
          videoRef.current.currentTime.toString()
        );
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [videoId]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setPlaybackState(prev => ({
        ...prev,
        currentTime: videoRef.current!.currentTime,
        duration: videoRef.current!.duration
      }));
    }
  };

  const handleSeek = (value: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value;
      setPlaybackState(prev => ({ ...prev, currentTime: value }));
    }
  };

  const handleVideoError = () => {
    setIsLoading(false);
    toast({
      title: 'Error playing video',
      description: 'Unable to load the video. Please try again later.',
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  };

  const handleLoadedData = () => {
    setIsLoading(false);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (playbackState.isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(handleVideoError);
      }
      setPlaybackState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setPlaybackState(prev => ({ ...prev, isMuted: !prev.isMuted }));
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (isVideoLoading) {
    return (
      <Container maxW="container.lg" py={8}>
        <VStack spacing={6} align="stretch">
          <Skeleton height="400px" borderRadius="lg" />
          <SkeletonText noOfLines={4} spacing={4} />
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={6} align="stretch">
        <Box
          ref={videoContainerRef}
          position="relative"
          bg="black"
          borderRadius="lg"
          overflow="hidden"
          height="400px"
        >
          <video
            ref={videoRef}
            src={video?.url}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
            onLoadedData={handleLoadedData}
            onError={handleVideoError}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => {
              setPlaybackState(prev => ({ ...prev, isPlaying: false }));
            }}
            onClick={togglePlay}
          />
          {/* Loading Indicator */}
          {isLoading && (
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              bg="blackAlpha.700"
              p={4}
              borderRadius="xl"
              textAlign="center"
            >
              <Spinner size="xl" color="white" mb={2} />
              <Text color="white">Loading video...</Text>
            </Box>
          )}
          {/* Play/Pause Overlay */}
          {!isLoading && (
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              opacity={0}
              transition="opacity 0.2s"
              _hover={{ opacity: 1 }}
            >
              <IconButton
                aria-label={playbackState.isPlaying ? 'Pause' : 'Play'}
                icon={playbackState.isPlaying ? <HiPause size={28} /> : <HiPlay size={28} />}
                onClick={togglePlay}
                colorScheme="whiteAlpha"
                size="md"
                rounded="full"
              />
            </Box>
          )}
          {/* Control Bar */}
          <Box
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            px={4}
            py={2}
            bg="rgba(0,0,0,0.7)"
            color="white"
            opacity={0}
            transition="opacity 0.2s"
            _hover={{ opacity: 1 }}
          >
            <VStack spacing={3}>
              <Slider
                aria-label="video progress"
                value={playbackState.currentTime}
                min={0}
                max={playbackState.duration || 100}
                onChange={handleSeek}
                focusThumbOnChange={false}
                size="lg"
              >
                <SliderTrack bg="whiteAlpha.200" height="3px">
                  <SliderFilledTrack bg="purple.500" />
                </SliderTrack>
                <SliderThumb boxSize={4} />
              </Slider>
              <HStack width="100%" justify="space-between">
                <HStack spacing={4}>
                  <IconButton
                    aria-label={playbackState.isPlaying ? 'Pause' : 'Play'}
                    icon={playbackState.isPlaying ? <HiPause size={28} /> : <HiPlay size={28} />}
                    onClick={togglePlay}
                    variant="ghost"
                    color="white"
                    size="md"
                    _hover={{ bg: 'whiteAlpha.200' }}
                  />
                  {/* Volume Control */}
                  <Box position="relative" onMouseEnter={() => setShowVolumeSlider(true)} onMouseLeave={() => setShowVolumeSlider(false)}>
                    <IconButton
                      aria-label="Volume"
                      icon={playbackState.isMuted ? <HiVolumeOff size={28} /> : <HiVolumeUp size={28} />}
                      onClick={toggleMute}
                      variant="ghost"
                      color="white"
                      size="md"
                      _hover={{ bg: 'whiteAlpha.200' }}
                    />
                    {showVolumeSlider && (
                      <Box
                        position="absolute"
                        bottom="100%"
                        left="50%"
                        transform="translateX(-50%)"
                        p={4}
                        bg="rgba(0,0,0,0.9)"
                        borderRadius="md"
                        width="40px"
                        height="120px"
                      >
                        <Slider
                          aria-label="volume"
                          orientation="vertical"
                          min={0}
                          max={1}
                          step={0.1}
                          value={playbackState.volume}
                          onChange={handleVolumeChange}
                        >
                          <SliderTrack bg="whiteAlpha.200">
                            <SliderFilledTrack bg="purple.500" />
                          </SliderTrack>
                          <SliderThumb boxSize={3} />
                        </Slider>
                      </Box>
                    )}
                  </Box>
                  <Text fontSize="sm" minWidth="100px">
                    {formatTime(playbackState.currentTime)} / {formatTime(playbackState.duration)}
                  </Text>
                </HStack>
                <HStack spacing={4}>
                  {/* Playback Speed Control */}
                  <Popover placement="top">
                    <PopoverTrigger>
                      <IconButton
                        aria-label="Playback speed"
                        icon={<HiCog size={28} />}
                        variant="ghost"
                        color="white"
                        size="md"
                        _hover={{ bg: 'whiteAlpha.200' }}
                      />
                    </PopoverTrigger>
                    <PopoverContent bg="gray.800" borderColor="gray.700" width="120px">
                      <PopoverBody p={0}>
                        <List spacing={0}>
                          {PLAYBACK_SPEEDS.map((speed) => (
                            <ListItem
                              key={speed}
                              py={2}
                              px={4}
                              cursor="pointer"
                              onClick={() => handleSpeedChange(speed)}
                              bg={playbackState.playbackSpeed === speed ? 'purple.500' : 'transparent'}
                              _hover={{ bg: 'whiteAlpha.200' }}
                              color="white"
                              textAlign="center"
                            >
                              {speed}x
                            </ListItem>
                          ))}
                        </List>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                  <IconButton
                    aria-label="Toggle fullscreen"
                    icon={<HiArrowsExpand size={28} />}
                    onClick={toggleFullscreen}
                    variant="ghost"
                    color="white"
                    size="md"
                    _hover={{ bg: 'whiteAlpha.200' }}
                  />
                </HStack>
              </HStack>
            </VStack>
          </Box>
        </Box>
        <VStack align="stretch" spacing={4}>
          <Text fontSize="2xl" fontWeight="bold">
            {video?.title}
          </Text>
          <HStack justify="space-between">
            <HStack spacing={4}>
              <Avatar
                size="md"
                name={video?.uploader.username}
                src={undefined}
              />
              <VStack align="start" spacing={0}>
                <Text fontWeight="medium">{video?.uploader.username}</Text>
                <Text fontSize="sm" color="gray.600">
                  {video?.views.toLocaleString()} views
                </Text>
              </VStack>
            </HStack>
            <HStack spacing={2}>
              <Button
                leftIcon={<HiThumbUp />}
                variant="ghost"
                _hover={{ bg: 'purple.50' }}
              >
                Like
              </Button>
              <Button
                leftIcon={<HiBookmark />}
                variant="ghost"
                _hover={{ bg: 'purple.50' }}
              >
                Save
              </Button>
              <Button
                leftIcon={<HiShare />}
                variant="ghost"
                _hover={{ bg: 'purple.50' }}
              >
                Share
              </Button>
            </HStack>
          </HStack>
          <Divider />
          <Text whiteSpace="pre-wrap" color="gray.700">
            {video?.description}
          </Text>
        </VStack>
      </VStack>
    </Container>
  );
};

export default VideoPlayPage;
