import type { IProduct } from "@/interfaces"
import CustomeModal from "@/Shared/Modal"
import { Box, Button, Field, Fieldset, FileUpload, Flex, IconButton, Input, NumberInput, Textarea } from "@chakra-ui/react"
import { AiFillEdit } from "react-icons/ai"
import { useColorMode } from "../ui/color-mode"
import { LuHardDriveUpload } from "react-icons/lu"

interface IProps {
  product: IProduct
}
const UpdateProduct = ({ product } : IProps) => {
  const { colorMode } = useColorMode()
  const isDark = colorMode === "dark"
  const onUpdata =() => {
    
  }
  return (
    <CustomeModal
    openModal={
        <IconButton aria-label="Update" variant={"outline"} size="sm" color="white" bg={"tan"} _hover={{ transform: "scale(1.08)", bg: "tan"}}>
          <AiFillEdit />
        </IconButton>
    }title="Update Product" okText="Update" color={"blue.600"} onHandleOkText={onUpdata}>
      <Box as={"form"}>
        <Fieldset.Root size="lg" maxW="md">
          <Fieldset.Content>
            <Field.Root>
              <Field.Label color={isDark ? "teal.200" : "teal.700"}>
                Title
              </Field.Label>
                <Input value={product.title} name="title" bg={isDark ? "gray.800" : "white"} borderColor={isDark ? "gray.700" : "teal.300"} _focus={{ borderColor: "teal.400", boxShadow: "0 0 0 1px teal.400" }} color={isDark ? "teal.100" : "gray.700"}/>
                {/* {errors.title?.message && <p style={{color: "#f87171", fontSize: 12}}>{errors.title.message}</p>} */}
            </Field.Root>
            <Field.Root>
              <Field.Label color={isDark ? "teal.200" : "teal.700"}>
                Description
              </Field.Label>
                <Textarea value={product.description} name="description" bg={isDark ? "gray.800" : "white"} borderColor={isDark ? "gray.700" : "teal.300"} _focus={{ borderColor: "teal.400", boxShadow: "0 0 0 1px teal.400" }} color={isDark ? "teal.100" : "gray.700"}/>
                {/* {errors.title?.message && <p style={{color: "#f87171", fontSize: 12}}>{errors.title.message}</p>} */}
            </Field.Root>
            <Flex gap={4}>
              <Field.Root>
                <Field.Label color={isDark ? "teal.200" : "teal.700"}>Price</Field.Label>
                <NumberInput.Root min={0}>
                  <NumberInput.Control />
                  <NumberInput.Input value={product.price} name="price" bg={isDark ? "gray.800" : "white"} borderColor={isDark ? "gray.700" : "teal.300"} _focus={{ borderColor: "teal.400", boxShadow: "0 0 0 1px teal.400" }} color={isDark ? "teal.100" : "gray.700"}/>
                </NumberInput.Root>
              </Field.Root>
              <Field.Root>
                <Field.Label color={isDark ? "teal.200" : "teal.700"}>Count in Stock</Field.Label>
                <NumberInput.Root min={0}>
                  <NumberInput.Control />
                  <NumberInput.Input value={product.stock} name="stock" bg={isDark ? "gray.800" : "white"} borderColor={isDark ? "gray.700" : "teal.300"} _focus={{ borderColor: "teal.400", boxShadow: "0 0 0 1px teal.400" }} color={isDark ? "teal.100" : "gray.700"}/>
                </NumberInput.Root>
              </Field.Root>
            </Flex>
            <Field.Root>
              <Field.Label color={isDark ? "teal.200" : "teal.700"}>Thumbnail</Field.Label>
              <FileUpload.Root>
                <FileUpload.HiddenInput />
                <FileUpload.Trigger asChild w={"100%"} name="stock" bg={isDark ? "gray.800" : "white"} borderColor={isDark ? "gray.700" : "teal.300"} _focus={{ borderColor: "teal.400", boxShadow: "0 0 0 1px teal.400" }} color={isDark ? "teal.100" : "gray.700"}>
                  <Button variant="outline" size="sm" w={"100%"}>
                    <LuHardDriveUpload values={product.thumbnail.url}/> Upload file
                  </Button>
                </FileUpload.Trigger>
                <FileUpload.List />
              </FileUpload.Root>
            </Field.Root>
          </Fieldset.Content>
        </Fieldset.Root>
      </Box>
    </CustomeModal>
  )
}

export default UpdateProduct