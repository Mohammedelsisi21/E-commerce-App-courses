"use client"

import { onChangeOpen } from "@/app/features/global/globalSlice"
import { useAppDispatch, useAppSelector } from "@/app/store"
import { Button, CloseButton, Drawer, Portal } from "@chakra-ui/react"

const CartDrawer = () => {
  const dispatch = useAppDispatch()
  const {isOpenCartDrawer} = useAppSelector((store) => store.global)

  const onChange = () => {
    dispatch(onChangeOpen())
  }
  return (
    <Drawer.Root open={isOpenCartDrawer} onOpenChange={onChange}>
      <Drawer.Trigger asChild>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Drawer Title</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </Drawer.Body>
            <Drawer.Footer>
              <Button variant="outline">Cancel</Button>
              <Button>Save</Button>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}


export default CartDrawer