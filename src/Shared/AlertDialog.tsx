import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"
import type { ReactNode } from "react"

interface IProps {
    btn: ReactNode,
    title: string
    description: string
    onCancel?: string
    okText?: string
    variant: "surface" | "subtle" | "solid" | "plain" | "outline" | "ghost"
    color: string
    bg?: string
}
const AlertDialog = ({btn, title, description, okText= "Yes", onCancel= "Cancel", variant, color,bg}: IProps) => {
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                {btn}
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                    <Dialog.Header>
                        <Dialog.Title>{title}</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                    <p>
                        {description}
                    </p>
                </Dialog.Body>
                <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                    <Button variant="outline">{onCancel}</Button>
                    </Dialog.ActionTrigger>
                    <Button border={`${color} .5px solid`} textTransform={"capitalize"} fontSize={"md"} variant={variant} color={color} bg={bg}>{okText}</Button>
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