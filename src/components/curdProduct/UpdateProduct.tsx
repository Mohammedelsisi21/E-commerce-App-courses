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
    const [formData, setFormData] = useState({
        title: product.title,
        description: product.description,
        price: product.price,
        stock: product.stock
    });

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
    const handleChange = (e: ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
            ...thumbnail
        });
    };
    const handlerImage = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        setThumbnail(file)
      }
    }

    const handleSubmit = async (e: FormEvent<HTMLDivElement>) => {
        e.preventDefault();
        try {
            await updateProductFun({
                id: product.documentId,
                body: formData
            }).unwrap();
        } catch (error) {
            console.error('Failed to update:', error);
        }
    };

  return (
    <CustomeModal
    openModal={
        <IconButton aria-label="Update" variant={"outline"} size="sm" color="white" bg={"tan"} _hover={{ transform: "scale(1.08)", bg: "tan"}}>
          <AiFillEdit />
        </IconButton>
    }title="Update Product">
      <Box as={"form"} onSubmit={handleSubmit}>
        <Fieldset.Root size="lg" maxW="md">
          <Fieldset.Content>
            <Field.Root>
              <Field.Label color={isDark ? "teal.200" : "teal.700"}>
                Title
              </Field.Label>
                <Input value={formData.title} onChange={handleChange} name="title" bg={isDark ? "gray.800" : "white"} borderColor={isDark ? "gray.700" : "teal.300"} _focus={{ borderColor: "teal.400", boxShadow: "0 0 0 1px teal.400" }} color={isDark ? "teal.100" : "gray.700"}/>
            </Field.Root>
            <Field.Root>
              <Field.Label color={isDark ? "teal.200" : "teal.700"}>
                Description
              </Field.Label>
                <Textarea value={formData.description} onChange={handleChange} name="description" bg={isDark ? "gray.800" : "white"} borderColor={isDark ? "gray.700" : "teal.300"} _focus={{ borderColor: "teal.400", boxShadow: "0 0 0 1px teal.400" }} color={isDark ? "teal.100" : "gray.700"}/>
            </Field.Root>
            <Flex gap={4}>
              <Field.Root>
                <Field.Label color={isDark ? "teal.200" : "teal.700"}>Price</Field.Label>
                <NumberInput.Root min={0} value={`${formData.price}`}
                onValueChange={({valueAsNumber}) => {
                  setFormData({
                    ...formData,
                    price: Number.isNaN(valueAsNumber) ? 0: valueAsNumber
                  })
                }}>
                  <NumberInput.Control />
                  <NumberInput.Input name="price" bg={isDark ? "gray.800" : "white"} borderColor={isDark ? "gray.700" : "teal.300"} _focus={{ borderColor: "teal.400", boxShadow: "0 0 0 1px teal.400" }} color={isDark ? "teal.100" : "gray.700"}/>
                </NumberInput.Root>
              </Field.Root>
              <Field.Root>
                <Field.Label color={isDark ? "teal.200" : "teal.700"}>Count in Stock</Field.Label>
                <NumberInput.Root min={0} value={`${formData.stock}`}
                onValueChange={({valueAsNumber}) => {
                  setFormData({
                    ...formData,
                    stock: Number.isNaN(valueAsNumber) ? 0 : valueAsNumber,
                    })
                  }}>
                  <NumberInput.Control />
                  <NumberInput.Input name="stock" bg={isDark ? "gray.800" : "white"} borderColor={isDark ? "gray.700" : "teal.300"} _focus={{ borderColor: "teal.400", boxShadow: "0 0 0 1px teal.400" }} color={isDark ? "teal.100" : "gray.700"}/>
                </NumberInput.Root>
              </Field.Root>
            </Flex>
            <Field.Root>
              <Flex>
                <Field.Label mr={"5px"} color={isDark ? "teal.200" : "teal.700"}>Thumbnail</Field.Label>
                <Image src={`${import.meta.env.VITE_LOCAL_API}${product.thumbnail?.url}`} alt={product.title} w={"50px"} h={"50px"} borderRadius={"sm"}></Image>
              </Flex>
              <FileUpload.Root>
                <FileUpload.HiddenInput onChange={handlerImage}/>
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
                    Cancel
                </Button>
              </Dialog.ActionTrigger>
              <Button variant={"outline"} type={"submit"} loading={isLoading} textTransform="capitalize" fontSize="md" fontWeight="semibold" colorScheme="blue" color={"blue.500"} _hover={{ transform: "scale(1.02)", boxShadow: "md" }} _active={{transform: "scale(0.98)"}}>
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