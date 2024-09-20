import { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button
} from '@chakra-ui/react';

type ForceLogoutAlertDialogProps = {
  isOpen: boolean;
  onClose: () => void;
}

const ForceLogoutAlertDialog = (props: ForceLogoutAlertDialogProps) => {
  const { isOpen, onClose } = props;
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      closeOnEsc={false}
      closeOnOverlayClick={false}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            登入狀態過期
          </AlertDialogHeader>
          <AlertDialogBody>
            您的登入狀態已過期，請重新登入以繼續使用服務。
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              colorScheme="purple"
              width="full"
              ref={cancelRef}
              onClick={onClose}
            >
              前往登入
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
};

export default ForceLogoutAlertDialog;
