// import type { IProduct } from "@/interfaces"
import CustomeModal from "@/Shared/Modal"
import { Box, Button, Dialog, Field, Fieldset, FileUpload, Flex, IconButton, Input, NativeSelect, NumberInput, Text, Textarea } from "@chakra-ui/react"
import { IoCreateSharp } from "react-icons/io5";
import { useColorMode } from "../ui/color-mode"
import { LuHardDriveUpload } from "react-icons/lu"
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { useCreateProductListMutation } from "@/app/services/productApiSlice"
import { uploadImage } from "@/utils";
import { toast } from "react-toastify"
import { useGetCategoryListQuery } from "@/app/services/categoryApiSlice";
import type { ICategory } from "@/interfaces";

const CreateProdcut = () => {
  const { colorMode } = useColorMode()
  const isDark = colorMode === "dark";
  const [createProduct, {isLoading, isSuccess}] = useCreateProductListMutation()
  const [thumbnail, setThumbnail] = useState<File>()
  const [product, setProduct] = useState({ title:"", description: "", price: 0, stock: 0, rating: 0, discount: 0, category: 0});
  const [isOpen, setIsOpen] = useState(false);

  // ** Get Category
  const {data} = useGetCategoryListQuery(1)

  useEffect(()=> {
    if(isSuccess) {
        toast.success(`Updata product successfully.`, {
        position: "bottom-right",
        autoClose: 500,
        theme: "colored"
    })
    setIsOpen(false)
  }},[isSuccess])

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement| HTMLTextAreaElement| HTMLSelectElement>) => {
    const {name, value} = e.target
    setProduct({
      ...product,
      [name]: value
    })
  }

  const onChangeThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setThumbnail(file)
  }
  
  const onSubmit = async (e: FormEvent<HTMLDivElement>) => {
  e.preventDefault();

  try {
    let imageId = null;
    if (thumbnail) {
      const uploadData = await uploadImage(thumbnail);
      imageId = uploadData[0]?.id;
    }

    const body = {
      data: {
        title: product.title,
        description: product.description,
        price: product.price,
        stock: product.stock,
        rating: product.rating,
        discount: product.discount,
        category: {connect: [product.category]},
        thumbnail: imageId ? [imageId] : [],
      },
    };
    await createProduct(body);

  } catch (error) {
    console.error("❌ Error creating product:", error);
  }
};
  return (
        <CustomeModal open={isOpen} onClose={setIsOpen}
        openModal={
            <IconButton aria-label="Create" onClick={() => setIsOpen(true)} variant={"outline"} size="md" colorScheme="green" color="white" bg={"green.500"} _hover={{ transform: "scale(1.08)", bg: "green.600"}} _active={{bg: "green.700"}} borderColor={"green.400"}>
              <Flex gap={"5px"} p={2}>
                <Text fontSize="md" fontWeight="medium">Create Product</Text>
                <IoCreateSharp size={20} />
              </Flex>
            </IconButton>
        }title="Create Product">
          <Box as={"form"} onSubmit={onSubmit}>
            <Fieldset.Root size="lg" maxW="md">
              <Fieldset.Content>
                <Field.Root>
                  <Field.Label color={isDark ? "teal.200" : "teal.700"}>
                    Title
                  </Field.Label>
                    <Input name="title" value={product.title} onChange={onChangeHandler} bg={isDark ? "gray.800" : "white"} borderColor={isDark ? "gray.700" : "teal.300"} _focus={{ borderColor: "teal.400", boxShadow: "0 0 0 1px teal.400" }} color={isDark ? "teal.100" : "gray.700"}/>
                </Field.Root>
                <Field.Root>
                  <Field.Label color={isDark ? "teal.200" : "teal.700"}>
                    Description
                  </Field.Label>
                    <Textarea autoresize name="description" value={product.description} onChange={onChangeHandler} bg={isDark ? "gray.800" : "white"} borderColor={isDark ? "gray.700" : "teal.300"} _focus={{ borderColor: "teal.400", boxShadow: "0 0 0 1px teal.400" }} color={isDark ? "teal.100" : "gray.700"}/>
                </Field.Root>
                <Flex gap={4}>
                  <Field.Root>
                    <Field.Label color={isDark ? "teal.200" : "teal.700"}>Price</Field.Label>
                    <NumberInput.Root min={0}
                    value={`${product.price}`}
                    onValueChange={({valueAsNumber}) => {
                      setProduct({
                        ...product,
                        price: Number.isNaN(valueAsNumber) ? 0 : valueAsNumber
                      })
                    }}>
                      <NumberInput.Control />
                      <NumberInput.Input name="price" bg={isDark ? "gray.800" : "white"} borderColor={isDark ? "gray.700" : "teal.300"} _focus={{ borderColor: "teal.400", boxShadow: "0 0 0 1px teal.400" }} color={isDark ? "teal.100" : "gray.700"}/>
                    </NumberInput.Root>
                  </Field.Root>
                  <Field.Root>
                    <Field.Label color={isDark ? "teal.200" : "teal.700"}>Count in Stock</Field.Label>
                    <NumberInput.Root min={0} value={`${product.stock}`}
                    onValueChange={({valueAsNumber})=> {
                      setProduct({
                        ...product,
                        stock: Number.isNaN(valueAsNumber) ? 0 : valueAsNumber
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
                    <NumberInput.Root min={0} max={5}
                    value={`${product.rating}`}
                    onValueChange={({valueAsNumber}) => {
                      setProduct({
                        ...product,
                        rating: Number.isNaN(valueAsNumber) ? 0 : valueAsNumber
                      })
                    }}>
                      <NumberInput.Control />
                      <NumberInput.Input name="rating" bg={isDark ? "gray.800" : "white"} borderColor={isDark ? "gray.700" : "teal.300"} _focus={{ borderColor: "teal.400", boxShadow: "0 0 0 1px teal.400" }} color={isDark ? "teal.100" : "gray.700"}/>
                    </NumberInput.Root>
                  </Field.Root>
                  <Field.Root>
                    <Field.Label color={isDark ? "teal.200" : "teal.700"}>Discount</Field.Label>
                    <NumberInput.Root min={0} max={100} value={`${product.discount}`}
                    onValueChange={({valueAsNumber})=> {
                      setProduct({
                        ...product,
                        discount: Number.isNaN(valueAsNumber) ? 0 : valueAsNumber
                      })
                    }}>
                      <NumberInput.Control />
                      <NumberInput.Input name="discount" bg={isDark ? "gray.800" : "white"} borderColor={isDark ? "gray.700" : "teal.300"} _focus={{ borderColor: "teal.400", boxShadow: "0 0 0 1px teal.400" }} color={isDark ? "teal.100" : "gray.700"}/>
                    </NumberInput.Root>
                  </Field.Root>
                </Flex>
                <Field.Root>
                  <Field.Label color={isDark ? "teal.200" : "teal.700"}>
                    Category
                  </Field.Label>
                  <NativeSelect.Root size="sm" width="240px">
                    <NativeSelect.Field name="category" onChange={onChangeHandler} placeholder="Select option" bg={isDark ? "gray.800" : "white"} borderColor={isDark ? "gray.700" : "teal.300"} _focus={{ borderColor: "teal.400", boxShadow: "0 0 0 1px teal.400" }} color={isDark ? "teal.100" : "gray.700"}>
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
                  </Flex>
                  <FileUpload.Root>
                    <FileUpload.HiddenInput onChange={onChangeThumbnail}/>
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
                  <Button type={"submit"} loading={isLoading} variant={"outline"} textTransform="capitalize" fontSize="md" fontWeight="semibold" colorScheme="green" color={"green.500"} _hover={{ transform: "scale(1.02)", boxShadow: "md" }} _active={{transform: "scale(0.98)"}}>
                        Done
                  </Button>
                </Dialog.Footer>
              </Fieldset.Content>
            </Fieldset.Root>
          </Box>
        </CustomeModal>
  )
}

export default CreateProdcut