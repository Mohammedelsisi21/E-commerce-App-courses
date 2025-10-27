import { useColorMode } from "@/components/ui/color-mode"
import { CloseButton, Dialog, Portal, VStack,} from "@chakra-ui/react"
import {type ReactNode } from "react"

interface IProps {
    children: ReactNode
    title: string
    openModal: ReactNode
    open: boolean
    onClose: (open: boolean) => void
}
const CustomeModal = ({children, openModal, title, onClose, open} : IProps) => {
    const { colorMode } = useColorMode()
    const isDark = colorMode === "dark"
    // const [open, setOpen] = useState(false)
return (
    <VStack alignItems="start">
        <Dialog.Root placement="center" open={open} onOpenChange={()=>onClose}>
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
        </Dialog.Content>
    </Dialog.Positioner>
    </Portal>
</Dialog.Root>
</VStack>)}

export default CustomeModal



