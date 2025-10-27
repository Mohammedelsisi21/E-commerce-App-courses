import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"
import { useState } from "react"
import type { ReactNode } from "react"

interface IProps {
    btn: ReactNode
    title: string
    description: string
    onCancel?: string
    okText?: string
    variant: "surface" | "subtle" | "solid" | "plain" | "outline" | "ghost"
    color: string
    bg?: string
    isLoading?: boolean
    onHandleOkText?: () => Promise<void> | void
}

const AlertDialog = ({ isLoading, btn, title, description, okText = "Yes", onCancel = "Cancel", variant, color, bg, onHandleOkText,}: IProps) => {
    const [open, setOpen] = useState(false)
    const handleOk = async () => {
        if (onHandleOkText) {
        await onHandleOkText()
        }
    setOpen(false)
    }

    return (
        <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)} placement="center">
            <Dialog.Trigger asChild>{btn}</Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop bg="blackAlpha.600" backdropFilter={"blur(5px)"} />
                <Dialog.Positioner>
                <Dialog.Content>
                <Dialog.Header>
                    <Dialog.Title>{title}</Dialog.Title>
                </Dialog.Header>
            <Dialog.Body>
                <p>{description}</p>
            </Dialog.Body>
            <Dialog.Footer>
                <Button variant="outline" onClick={() => setOpen(false)}>
                    {onCancel}
                </Button>
                <Button loading={isLoading} onClick={handleOk} textTransform="capitalize" fontSize="md" fontWeight="semibold" variant={variant} bg={bg} color={color} _hover={{ transform: "scale(1.02)", boxShadow: "md" }} _active={{transform: "scale(0.98)"}}>
                {okText}
                </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
            </Dialog.CloseTrigger>
        </Dialog.Content>
        </Dialog.Positioner>
    </Portal>
    </Dialog.Root>
)
}

export default AlertDialog
