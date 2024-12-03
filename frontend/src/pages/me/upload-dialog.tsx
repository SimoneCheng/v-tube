import {
  useState,
  useRef,
  type ChangeEvent,
  type DragEvent,
  type FormEvent
} from 'react';
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useToast,
  Box,
  Text,
  Icon,
  Progress,
  Flex,
  IconButton
} from '@chakra-ui/react';
import { HiUpload, HiX } from 'react-icons/hi';
import { useUploadVideoMutation } from './me.query';

interface UploadFormProps {
  userId: number;
  onSuccess?: () => void;
}

interface UploadDialogProps extends UploadFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UploadMutationOptions {
  userId: number;
  onUploadProgress: (progress: number) => void;
}

interface UploadData {
  file: File;
  title: string;
  description: string;
}

const UploadForm = ({ userId, onSuccess }: UploadFormProps) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const { mutate, isPending } = useUploadVideoMutation({
    userId,
    onUploadProgress: (progress: number) => setUploadProgress(progress)
  } as UploadMutationOptions);

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type.startsWith('video/')) {
      setFile(droppedFile);
      const url = URL.createObjectURL(droppedFile);
      setPreviewUrl(url);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setFile(null);
    setPreviewUrl('');
    setUploadProgress(0);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    const uploadData: UploadData = {
      file,
      title,
      description
    };

    mutate(uploadData, {
      onSuccess: () => {
        toast({
          title: 'Video uploaded successfully',
          status: 'success',
          duration: 3000,
        });
        resetForm();
        onSuccess?.();
      },
      onError: () => {
        toast({
          title: 'Failed to upload video',
          status: 'error',
          duration: 3000,
        });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={6} align="stretch">
        <Box
          position="relative"
          height="200px"
          borderRadius="lg"
          borderWidth={2}
          borderStyle="dashed"
          borderColor={file ? "purple.500" : "gray.300"}
          bg={file ? "purple.50" : "gray.50"}
          transition="all 0.2s"
          _hover={{ borderColor: "purple.400", bg: "purple.50" }}
          onDragOver={(e: DragEvent) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          cursor="pointer"
        >
          <Input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileSelect}
            hidden
          />

          {!file ? (
            <Flex
              height="100%"
              direction="column"
              align="center"
              justify="center"
              color="gray.500"
            >
              <Icon as={HiUpload} boxSize={8} mb={2} />
              <Text fontWeight="medium">Drop your video here or click to browse</Text>
              <Text fontSize="sm" mt={1}>MP4, WebM or Ogg (max. 10MB)</Text>
            </Flex>
          ) : (
            <Box position="relative" height="100%">
              <video
                src={previewUrl}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '0.5rem'
                }}
                muted
              />
              <IconButton
                aria-label="Remove video"
                icon={<HiX />}
                size="sm"
                position="absolute"
                top={2}
                right={2}
                colorScheme="red"
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                  setPreviewUrl('');
                }}
              />
            </Box>
          )}
        </Box>

        {isPending && (
          <Box>
            <Text mb={2} fontSize="sm" color="gray.600">
              Uploading... {Math.round(uploadProgress)}%
            </Text>
            <Progress
              value={uploadProgress}
              size="sm"
              colorScheme="purple"
              borderRadius="full"
            />
          </Box>
        )}

        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <Input
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            placeholder="Enter video title"
            bg="white"
            borderColor="gray.300"
            _hover={{ borderColor: "purple.400" }}
            _focus={{ borderColor: "purple.500", boxShadow: "0 0 0 1px var(--chakra-colors-purple-500)" }}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            value={description}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
            placeholder="Add a description for your video"
            minH="120px"
            bg="white"
            borderColor="gray.300"
            _hover={{ borderColor: "purple.400" }}
            _focus={{ borderColor: "purple.500", boxShadow: "0 0 0 1px var(--chakra-colors-purple-500)" }}
          />
        </FormControl>

        <Button
          type="submit"
          colorScheme="purple"
          size="lg"
          isLoading={isPending}
          isDisabled={!file || !title}
          _hover={{ transform: 'translateY(-1px)', boxShadow: 'lg' }}
          _active={{ transform: 'translateY(0)' }}
        >
          Upload Video
        </Button>
      </VStack>
    </form>
  );
};

const UploadDialog = ({ isOpen, onClose, userId }: UploadDialogProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      motionPreset="slideInBottom"
    >
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(4px)" />
      <ModalContent borderRadius="xl" p={2}>
        <ModalHeader fontSize="2xl" color="purple.700">Upload New Video</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <UploadForm userId={userId} onSuccess={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UploadDialog;
