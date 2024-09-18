import { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  useToast,
  List,
  ListItem,
  Image,
} from '@chakra-ui/react';
import { FiUpload, FiVideo } from 'react-icons/fi';

const MePage = () => {
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const toast = useToast();

  useEffect(() => {
    // 這裡應該調用API來獲取用戶的影片列表
    // 暫時使用模擬數據
    setVideos([
      { id: 1, title: '我的第一個影片', views: 100 },
      { id: 2, title: '精彩瞬間', views: 250 },
    ]);
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      toast({
        title: '請選擇一個影片文件',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // 這裡應該調用API來上傳影片
    // 暫時使用模擬的上傳過程
    toast({
      title: '影片上傳中',
      description: '請稍候...',
      status: 'info',
      duration: 2000,
    });

    // 模擬上傳延遲
    setTimeout(() => {
      setVideos([...videos, { id: videos.length + 1, title, views: 0 }]);
      setTitle('');
      setDescription('');
      setFile(null);
      toast({
        title: '影片上傳成功',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }, 2000);
  };

  return (
    <Box p={5}>
      <VStack spacing={8} align="stretch">
        <Heading>會員中心</Heading>
        <Box borderWidth={1} borderRadius="lg" p={5}>
          <Heading size="md" mb={4}>上傳新影片</Heading>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>標題</FormLabel>
                <Input 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="輸入影片標題"
                />
              </FormControl>
              <FormControl>
                <FormLabel>描述</FormLabel>
                <Textarea 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  placeholder="輸入影片描述"
                />
              </FormControl>
              <FormControl>
                <FormLabel>選擇影片</FormLabel>
                <Input type="file" accept="video/*" onChange={handleFileChange} />
              </FormControl>
              <Button leftIcon={<FiUpload />} colorScheme="blue" type="submit">
                上傳影片
              </Button>
            </VStack>
          </form>
        </Box>

        <Box>
          <Heading size="md" mb={4}>我的影片</Heading>
          <List spacing={3}>
            {videos.map((video) => (
              <ListItem key={video.id} borderWidth={1} borderRadius="md" p={3}>
                <HStack>
                  <Image
                    boxSize="50px"
                    borderRadius="md"
                    // src={`https://picsum.photos/seed/${video.id}/100/100`}
                    alt={video.title}
                  />
                  <VStack align="start" flex={1}>
                    <Text fontWeight="bold">{video.title}</Text>
                    <Text fontSize="sm" color="gray.500">{video.views} 次觀看</Text>
                  </VStack>
                  <Button size="sm" leftIcon={<FiVideo />} colorScheme="teal">
                    查看
                  </Button>
                </HStack>
              </ListItem>
            ))}
          </List>
        </Box>
      </VStack>
    </Box>
  );
};

export default MePage;
