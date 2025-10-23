import { onChangeOpen } from "@/app/features/global/globalSlice"
import { useAppDispatch, useAppSelector } from "@/app/store"
import { Button, CloseButton, Drawer, Portal, Dialog, Flex, Text} from "@chakra-ui/react"
import CartDrawerProduct from "./CartDrawerProduct"
import { removeCartAll } from "@/app/features/cart/cartSlice"

const CartDrawer = () => {
  const dispatch = useAppDispatch()
  const { isOpenCartDrawer } = useAppSelector((store) => store.global)
  const { cartItems } = useAppSelector((store) => store.cart)
  
  const onChange = () => {
    dispatch(onChangeOpen())
  }

  const onRemoveAll = () => {
    dispatch(removeCartAll())
    setTimeout(() => {
      dispatch(onChangeOpen())
    }, 300)
  }

  return (
    <Drawer.Root open={isOpenCartDrawer} onOpenChange={onChange} size="sm">
      <Drawer.Trigger asChild></Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Your Shopping Cart</Drawer.Title>
            </Drawer.Header>

            <Drawer.Body>
              <CartDrawerProduct />
            </Drawer.Body>

            <Drawer.Footer>
              <Flex w="full" justify="space-between">
                <Button variant="outline" onClick={onChange}>
                  Cancel
                </Button>

                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <Button variant="outline" color="red">
                      Clear All
                    </Button>
                  </Dialog.Trigger>

                  <Portal>
                    <Dialog.Backdrop />
                    {cartItems.length > 0 ? <>
                                          <Dialog.Positioner top={"30%"}>
                      <Dialog.Content>
                        <Dialog.Header>
                          <Dialog.Title>Confirm Delete</Dialog.Title>
                        </Dialog.Header>

                        <Dialog.Body>
                          <Text>
                            Are you sure you want to remove all items from your
                            cart?
                          </Text>
                        </Dialog.Body>

                        <Dialog.Footer>
                          <Dialog.ActionTrigger asChild>
                            <Button variant="outline">Cancel</Button>
                          </Dialog.ActionTrigger>
                          <Button  color={"red"} colorScheme="red" onClick={onRemoveAll}>
                            Yes, Clear All
                          </Button>
                        </Dialog.Footer>

                        <Dialog.CloseTrigger asChild>
                          <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                      </Dialog.Content>
                    </Dialog.Positioner>
                    </>: null}
                  </Portal>
                </Dialog.Root>
              </Flex>
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
