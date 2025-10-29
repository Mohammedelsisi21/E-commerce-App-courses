import  * as yup from "yup"
import CustomeModal from "@/Shared/Modal"
import { Box, Button, Dialog, Field, Fieldset, FileUpload, Flex, IconButton, Input, Text } from "@chakra-ui/react"
import { IoCreateSharp } from "react-icons/io5";
import { useColorMode } from "../ui/color-mode"
import { LuHardDriveUpload } from "react-icons/lu"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useCreateCategoryListMutation } from "@/app/services/categoryApiSlice";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { categorySchema } from "@/validation";
import { uploadImage } from "@/utils";

type Inputs = yup.InferType<typeof categorySchema>;

const CreateCategory = () => {
  const { colorMode } = useColorMode()
  const isDark = colorMode === "dark";
  const [createProduct, {isLoading, isSuccess}] = useCreateCategoryListMutation()
  const [isOpen, setIsOpen] = useState(false);
const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
  resolver: yupResolver(categorySchema),
});
  useEffect(()=> {
    if(isSuccess) {
        toast.success(`Create product successfully.`, {
        position: "bottom-right",
        autoClose: 500,
        theme: "colored"
    })
    setIsOpen(false)
  }},[isSuccess])

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const uploadData = await uploadImage(data.thumbnail[0]);
      const body = {
        data: {
          title: data.title,
          thumbnail: uploadData[0].id ? [uploadData[0].id] : [],
        }
      }
      await createProduct(body);
    } catch (error) {
      console.error("❌ Error creating Cagegory:", error);
    }
  }

  return (
        <CustomeModal open={isOpen} onClose={setIsOpen}
        openModal={
            <IconButton aria-label="Create" onClick={() => setIsOpen(true)} variant={"outline"} size="md" colorScheme="green" color="white" bg={"green.500"} _hover={{ transform: "scale(1.08)", bg: "green.600"}} _active={{bg: "green.700"}} borderColor={"green.400"}>
              <Flex gap={"5px"} p={2}>
                <Text fontSize="md" fontWeight="medium">Create Category</Text>
                <IoCreateSharp size={20} />
              </Flex>
            </IconButton>
        }title="Create Category">
          <Box as={"form"} onSubmit={handleSubmit(onSubmit)}>
            <Fieldset.Root size="lg" maxW="md">
              <Fieldset.Content>
                <Field.Root>
                  <Field.Label color={ errors.title ? "red.500" : isDark ? "teal.200" : "teal.700"}>
                    Title
                  </Field.Label>
                    <Input {...register("title")} bg={isDark ? "gray.800" : "white"} borderColor={errors.title ? "red.500" : isDark ? "gray.700" : "teal.300"} _focus={{ borderColor: `${errors.title ? "red.500" : "teal.400"}`, boxShadow: "0 0 0 1px teal.400" }} color={errors.title ? "red.500" : isDark ? "teal.100" : "gray.700"}/>
                </Field.Root>
                    {errors.title && (<Text color={"red.500"}>{errors.title.message}</Text>)}
                <Field.Root>
                  <Flex>
                    <Field.Label mr={"5px"} color={errors.title ? "red.500" : isDark ? "teal.200" : "teal.700"}>Thumbnail</Field.Label>
                  </Flex>
                  <FileUpload.Root>
                    <FileUpload.HiddenInput type="file" accept="image/*"  {...register("thumbnail")}/>
                    <FileUpload.Trigger borderColor={ errors.thumbnail ? "red.500" : isDark ? "gray.700" : "teal.300"} asChild w={"100%"} name="stock" bg={isDark ? "gray.800" : "white"} _focus={{ borderColor: "teal.400", boxShadow: "0 0 0 1px teal.400" }} color={ errors.thumbnail ? "red.500" : isDark ? "teal.100" : "gray.700"}>
                      <Button  variant="outline" size="sm" w={"100%"}>
                        <LuHardDriveUpload/> Upload file
                      </Button>
                    </FileUpload.Trigger>
                    <FileUpload.List />
                  </FileUpload.Root>
                </Field.Root>
                    {errors.thumbnail && (<Text color={"red.500"}>{errors.thumbnail.message}</Text>)}
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

export default CreateCategory