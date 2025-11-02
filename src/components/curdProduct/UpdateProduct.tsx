import type { ICategory, IProduct } from "@/interfaces"
import CustomeModal from "@/Shared/Modal"
import { Box, Button, Dialog, Field, Fieldset, FileUpload, Flex, IconButton, Image, Input, NativeSelect, NumberInput, Textarea } from "@chakra-ui/react"
import { AiFillEdit } from "react-icons/ai"
import { useColorMode } from "../ui/color-mode"
import { LuHardDriveUpload } from "react-icons/lu"
import { useState, type ChangeEvent, type FormEvent } from "react"
import { useUpdateProductListMutation } from "@/app/services/productApiSlice"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { uploadImage } from "@/utils"
import { useGetCategoryListQuery } from "@/app/services/categoryApiSlice"

interface IProps {
  product: IProduct
}
const UpdateProduct = ({ product } : IProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [thumbnail, setThumbnail] = useState<File | null>(null)
    const [formData, setFormData] = useState({
        title: product.title,
        description: product.description,
        price: product.price,
        stock: product.stock,
        rating: product.rating,
        discount: product.discount,
        category: product.category.documentId || "",
    });

  const { colorMode } = useColorMode()
  const isDark = colorMode === "dark";
  const [updateProductFun, {isLoading, isSuccess}] = useUpdateProductListMutation();
  const { data } = useGetCategoryListQuery({page: 1, pageSize: 30});
  
  useEffect(()=> {
    if(isSuccess) {
        toast.success(`Updata product successfully.`, {
        position: "bottom-right",
        autoClose: 500,
        theme: "colored"
    })}
  },[isSuccess])
    const handleChange = (e: ChangeEvent<HTMLInputElement| HTMLTextAreaElement| HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
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
          let imageId = null
            if(thumbnail) {
              const uploadData = await uploadImage(thumbnail);
              imageId = uploadData[0]?.id;
            }
            const body = {
              data: {
                description: formData.description,
                price: formData.price,
                stock: formData.stock,
                title: formData.title,
                rating: formData.rating,
                discount: formData.discount,
                category: { connect: [formData.category] },
                thumbnail: imageId ? [imageId] : product.thumbnail ? [product.thumbnail.id] : [],
              },
            };
            updateProductFun({id: product.documentId, body: body})
          } catch (error) {
            console.error('Failed to update:', error);
          }
        };

  return (
    <CustomeModal open={isOpen} onClose={setIsOpen}
    openModal={
        <IconButton aria-label="Update" onClick={() => setIsOpen(true)} variant={"outline"} size="sm" color="white" bg={"tan"} _hover={{ transform: "scale(1.08)", bg: "tan"}}>
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
                <Textarea autoresize value={formData.description} onChange={handleChange} name="description" bg={isDark ? "gray.800" : "white"} borderColor={isDark ? "gray.700" : "teal.300"} _focus={{ borderColor: "teal.400", boxShadow: "0 0 0 1px teal.400" }} color={isDark ? "teal.100" : "gray.700"}/>
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
            <Flex gap={4}>
              <Field.Root>
                <Field.Label color={isDark ? "teal.200" : "teal.700"}>Rating</Field.Label>
                <NumberInput.Root min={0} max={5} value={`${formData.rating}`}
                onValueChange={({valueAsNumber}) => {
                  setFormData({
                    ...formData,
                    rating: Number.isNaN(valueAsNumber) ? 0: valueAsNumber
                  })
                }}>
                  <NumberInput.Control />
                  <NumberInput.Input name="price" bg={isDark ? "gray.800" : "white"} borderColor={isDark ? "gray.700" : "teal.300"} _focus={{ borderColor: "teal.400", boxShadow: "0 0 0 1px teal.400" }} color={isDark ? "teal.100" : "gray.700"}/>
                </NumberInput.Root>
              </Field.Root>
              <Field.Root>
                <Field.Label color={isDark ? "teal.200" : "teal.700"}>Discount</Field.Label>
                <NumberInput.Root min={0} max={100} value={`${formData.discount}`}
                onValueChange={({valueAsNumber}) => {
                  setFormData({
                    ...formData,
                    discount: Number.isNaN(valueAsNumber) ? 0 : valueAsNumber,
                    })
                  }}>
                  <NumberInput.Control />
                  <NumberInput.Input name="stock" bg={isDark ? "gray.800" : "white"} borderColor={isDark ? "gray.700" : "teal.300"} _focus={{ borderColor: "teal.400", boxShadow: "0 0 0 1px teal.400" }} color={isDark ? "teal.100" : "gray.700"}/>
                </NumberInput.Root>
              </Field.Root>
            </Flex>
            <Field.Root>
              <Field.Label color={isDark ? "teal.200" : "teal.700"}>
                Category
              </Field.Label>
              <NativeSelect.Root size="sm" width="240px">
                <NativeSelect.Field name="category" value={formData.category}
                onChange={(e) => {
                  setFormData({ ...formData, category: e.target.value });
                }}
                bg={isDark ? "gray.800" : "white"} borderColor={isDark ? "gray.700" : "teal.300"} _focus={{ borderColor: "teal.400", boxShadow: "0 0 0 1px teal.400" }} color={isDark ? "teal.100" : "gray.700"}>
                  {data?.data.map((category: ICategory)=>(
                    <option value={category.documentId} key={category.id}>{category.title}</option>
                  ))}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </Field.Root>
            <Field.Root>
              <Flex>
                <Field.Label mr={"5px"} color={isDark ? "teal.200" : "teal.700"}>Thumbnail</Field.Label>
                <Image src={`${product.thumbnail?.url}`} loading="lazy" alt={product.title} w={"50px"} h={"50px"} borderRadius={"sm"}></Image>
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
                <Button type={"button"} variant={"outline"} onClick={()=> setIsOpen(false)}>
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