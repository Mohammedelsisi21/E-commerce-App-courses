"use client"

import { onChangeOpen } from "@/app/features/global/globalSlice"
import { useAppDispatch, useAppSelector } from "@/app/store"
import { Button, CloseButton, Drawer, Portal } from "@chakra-ui/react"
import CartDrawerProduct from "./CartDrawerProduct"
import { removeCartAll } from "@/app/features/cart/cartSlice"

const CartDrawer = () => {
  const dispatch = useAppDispatch()
  const {isOpenCartDrawer} = useAppSelector((store) => store.global)

  const onChange = () => {
    dispatch(onChangeOpen())
  }
  const onRemoveAll = () => {
    dispatch(removeCartAll())
    setTimeout(()=> {
      dispatch(onChangeOpen())
    },400)
  }
  return (
    <Drawer.Root open={isOpenCartDrawer} onOpenChange={onChange} size={"sm"}>
      <Drawer.Trigger asChild>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Your Shoping Cart</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <CartDrawerProduct />
            </Drawer.Body>
            <Drawer.Footer>
              <Button variant="outline" onClick={onChange}>Cancel</Button>
              <Button variant="outline" color={"red"} onClick={onRemoveAll}>Clear All</Button>
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