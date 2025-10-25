import { useColorMode } from "@/components/ui/color-mode"
import { Button, CloseButton, Dialog, Portal, VStack,} from "@chakra-ui/react"
import type { ReactNode } from "react"

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

return (
    <VStack alignItems="start">
        <Dialog.Root placement="center">
        <Dialog.Trigger asChild>
      {openModal}
        </Dialog.Trigger>
        <Portal>
            <Dialog.Backdrop bg="blackAlpha.800" />
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
        <Dialog.ActionTrigger asChild>
            <Button variant="outline" borderColor={isDark ? "gray.600" : "teal.400"}>
                Cancel
            </Button>
        </Dialog.ActionTrigger>
        <Dialog.ActionTrigger asChild>
            <Button onClick={onHandleOkText} textTransform="capitalize" fontSize="md" colorScheme="teal" color={color}>
                {okText}
            </Button>
        </Dialog.ActionTrigger>
        </Dialog.Footer>
        </Dialog.Content>
    </Dialog.Positioner>
    </Portal>
</Dialog.Root>
</VStack>)}

export default CustomeModal



