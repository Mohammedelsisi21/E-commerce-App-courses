import type { IProduct } from "@/interfaces"
import CustomeModal from "@/Shared/Modal"
import { Box, Button, Dialog, Field, Fieldset, FileUpload, Flex, IconButton, Image, Input, NumberInput, Textarea } from "@chakra-ui/react"
import { AiFillEdit } from "react-icons/ai"
import { useColorMode } from "../ui/color-mode"
import { LuHardDriveUpload } from "react-icons/lu"
import { useState, type ChangeEvent, type FormEvent } from "react"
import { useUpdateProductListMutation } from "@/app/services/productApiSlice"
import { useEffect } from "react"
import { toast } from "react-toastify"

interface IProps {
  product: IProduct
}
const UpdateProduct = ({ product } : IProps) => {
  
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [updateProduct, setUpdateProduct] = useState<Partial<IProduct>>({
    title: product.title,
    description: product.description,
    price: product.price,
    stock: product.stock,
    thumbnail: product.thumbnail,
  })

  const { colorMode } = useColorMode()
  const isDark = colorMode === "dark";
  const [updateProductFun, {isLoading, isSuccess}] = useUpdateProductListMutation();
  useEffect(()=> {
    if(isSuccess) {
        toast.success(`Updata product successfully.`, {
        position: "bottom-right",
        autoClose: 500,
        theme: "colored"
    })}
  },[isSuccess])


  const onChangeHandler = (e : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target
    setUpdateProduct({
      ...updateProduct,
      [name]: value
    })
  }

  const onChangeNumberHandler = (e : ChangeEvent<HTMLInputElement>) => {
    const {name, value}  = e.target
    setUpdateProduct({
      ...updateProduct,
      [name]: +value
    })
  }

  const onChangeThumbnailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setThumbnail(file)
    }
  }
  
  const onSubmitHandeler = (e: FormEvent<HTMLDivElement> ) => {
    e.preventDefault()
    const formData = new FormData()

    formData.append("data", JSON.stringify({
      title: updateProduct.title,
      description: updateProduct.description,
      price: updateProduct.price,
      stock: updateProduct.stock
    }))

  if (thumbnail) {
    formData.append("files.thumbnail", thumbnail)
  }

  updateProductFun({id: product.documentId, body: formData})
  }

  return (
    <CustomeModal
    openModal={
        <IconButton aria-label="Update" variant={"outline"} size="sm" color="white" bg={"tan"} _hover={{ transform: "scale(1.08)", bg: "tan"}}>
          <AiFillEdit />
        </IconButton>
    }title="Update Product">
      <Box as={"form"} onSubmit={onSubmitHandeler}>
        <Fieldset.Root size="lg" maxW="md">
          <Fieldset.Content>
            <Field.Root>
              <Field.Label color={isDark ? "teal.200" : "teal.700"}>
                Title
              </Field.Label>
                <Input value={updateProduct.title} onChange={onChangeHandler} name="title" bg={isDark ? "gray.800" : "white"} borderColor={isDark ? "gray.700" : "teal.300"} _focus={{ borderColor: "teal.400", boxShadow: "0 0 0 1px teal.400" }} color={isDark ? "teal.100" : "gray.700"}/>
            </Field.Root>
            <Field.Root>
              <Field.Label color={isDark ? "teal.200" : "teal.700"}>
                Description
              </Field.Label>
                <Textarea value={updateProduct.description} onChange={onChangeHandler} name="description" bg={isDark ? "gray.800" : "white"} borderColor={isDark ? "gray.700" : "teal.300"} _focus={{ borderColor: "teal.400", boxShadow: "0 0 0 1px teal.400" }} color={isDark ? "teal.100" : "gray.700"}/>
            </Field.Root>
            <Flex gap={4}>
              <Field.Root>
                <Field.Label color={isDark ? "teal.200" : "teal.700"}>Price</Field.Label>
                <NumberInput.Root min={0}>
                  <NumberInput.Control />
                  <NumberInput.Input  value={updateProduct.price} onChange={onChangeNumberHandler} name="price" bg={isDark ? "gray.800" : "white"} borderColor={isDark ? "gray.700" : "teal.300"} _focus={{ borderColor: "teal.400", boxShadow: "0 0 0 1px teal.400" }} color={isDark ? "teal.100" : "gray.700"}/>
                </NumberInput.Root>
              </Field.Root>
              <Field.Root>
                <Field.Label color={isDark ? "teal.200" : "teal.700"}>Count in Stock</Field.Label>
                <NumberInput.Root min={0}>
                  <NumberInput.Control />
                  <NumberInput.Input value={updateProduct.stock} onChange={onChangeNumberHandler} name="stock" bg={isDark ? "gray.800" : "white"} borderColor={isDark ? "gray.700" : "teal.300"} _focus={{ borderColor: "teal.400", boxShadow: "0 0 0 1px teal.400" }} color={isDark ? "teal.100" : "gray.700"}/>
                </NumberInput.Root>
              </Field.Root>
            </Flex>
            <Field.Root>
              <Flex>
                <Field.Label mr={"5px"} color={isDark ? "teal.200" : "teal.700"}>Thumbnail</Field.Label>
                <Image src={`${import.meta.env.VITE_LOCAL_API}${updateProduct.thumbnail?.url}`} alt={product.title} w={"50px"} h={"50px"} borderRadius={"sm"}></Image>
              </Flex>
              <FileUpload.Root>
                <FileUpload.HiddenInput onChange={onChangeThumbnailHandler}/>
                <FileUpload.Trigger asChild w={"100%"} name="stock" bg={isDark ? "gray.800" : "white"} borderColor={isDark ? "gray.700" : "teal.300"} _focus={{ borderColor: "teal.400", boxShadow: "0 0 0 1px teal.400" }} color={isDark ? "teal.100" : "gray.700"}>
                  <Button  variant="outline" size="sm" w={"100%"}>
                    <LuHardDriveUpload/> Upload file
                  </Button>
                </FileUpload.Trigger>
                <FileUpload.List />
              </FileUpload.Root>
            </Field.Root>

            <Dialog.Footer display="flex" justifyContent="flex-end" gap="3">
              <Dialog.ActionTrigger asChild>
                <Button type={"button"} variant={"outline"}>
                    Cansle
                </Button>
              </Dialog.ActionTrigger>
              <Button type={"submit"} loading={isLoading} textTransform="capitalize" fontSize="md" colorScheme="teal" color={"blue.400"}>
                    Update
                </Button>
            </Dialog.Footer>
          </Fieldset.Content>
        </Fieldset.Root>
      </Box>
    </CustomeModal>
  )
}

export default UpdateProduct