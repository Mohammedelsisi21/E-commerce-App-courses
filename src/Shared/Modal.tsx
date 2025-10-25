import { useColorMode } from "@/components/ui/color-mode"
import { Button, CloseButton, Dialog, Portal, VStack,} from "@chakra-ui/react"
import { useState, type ReactNode } from "react"

interface IProps {
    children: ReactNode
    title: string
    openModal: ReactNode
    onHandleOkText?: () => void
    okText: string
    color: string
}
const CustomeModal = ({children, openModal, title, onHandleOkText, color, okText} : IProps) => {
    const { colorMode } = useColorMode()
    const isDark = colorMode === "dark"
    const [open, setOpen] = useState(false)
    
    const handleOk = async () => {
        if (onHandleOkText) {
        await onHandleOkText()
        }
    setOpen(false)
}
return (
    <VStack alignItems="start">
        <Dialog.Root placement="center" open={open} onOpenChange={(e) => setOpen(e.open)}>
        <Dialog.Trigger asChild>
      {openModal}
        </Dialog.Trigger>
        <Portal>
            <Dialog.Backdrop bg="blackAlpha.600" backdropFilter={"blur(5px)"}/>
            <Dialog.Positioner>
            <Dialog.Content borderRadius="2xl" p="6" bg={isDark ? "gray.900" : "white"}>
        <Dialog.Header>
            <Dialog.Title fontSize="xl" fontWeight="semibold" color={isDark ? "teal.200" : "teal.700"}>
                {title}
            </Dialog.Title>
        </Dialog.Header>

        <Dialog.Body pb="8">
            {children}
        </Dialog.Body>

        <Dialog.CloseTrigger asChild>
            <CloseButton size="sm" position="absolute" top="3" right="3" />
        </Dialog.CloseTrigger>

        <Dialog.Footer display="flex" justifyContent="flex-end" gap="3">
        <Button variant="outline" onClick={() => setOpen(false)} borderColor={isDark ? "gray.600" : "teal.400"}>
            Cancel
        </Button>
        <Button onClick={handleOk} textTransform="capitalize" fontSize="md" colorScheme="teal" color={color}>
            {okText}
        </Button>
        </Dialog.Footer>
        </Dialog.Content>
    </Dialog.Positioner>
    </Portal>
</Dialog.Root>
</VStack>)}

export default CustomeModal



