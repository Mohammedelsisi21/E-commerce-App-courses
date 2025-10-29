import CustomeModal from "@/Shared/Modal"
import { Box, Button, Dialog, Field, Fieldset, FileUpload, Flex, IconButton, Input } from "@chakra-ui/react"
import { AiFillEdit } from "react-icons/ai";
import { useColorMode } from "../ui/color-mode"
import { LuHardDriveUpload } from "react-icons/lu"
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { toast } from "react-toastify"
import { useUpdateCategoryListMutation } from "@/app/services/categoryApiSlice";
import { uploadImage } from "@/utils";
import type { ICategory } from "@/interfaces";

interface IProps {
  category: ICategory
}
const UpdateCategory = ({category} : IProps) => {
  const { colorMode } = useColorMode()
  const isDark = colorMode === "dark";
  const [updateProductFun, {isLoading, isSuccess}] = useUpdateCategoryListMutation()
  const [isOpen, setIsOpen] = useState(false);
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [formData, setFormData] = useState({
      title: category.title,
  });
  useEffect(()=> {
    if(isSuccess) {
        toast.success(`Updata product successfully.`, {
        position: "bottom-right",
        autoClose: 500,
        theme: "colored"
    })
    setIsOpen(false)
  }},[isSuccess])
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
            title: formData.title,
            thumbnail: imageId ? [imageId] : category.thumbnail ? [category.thumbnail[0].id] : [],
          },
        };
        updateProductFun({id: category.documentId, body: body})
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
      }title="Update Category">
          <Box as={"form"} onSubmit={handleSubmit}>
            <Fieldset.Root size="lg" maxW="md">
              <Fieldset.Content>
                <Field.Root>
                  <Field.Label color={ isDark ? "teal.200" : "teal.700"}>
                    Title
                  </Field.Label>
                    <Input name="title" value={formData.title} onChange={handleChange} bg={isDark ? "gray.800" : "white"} borderColor={isDark ? "gray.700" : "teal.300"} _focus={{ borderColor: `${"teal.400"}`, boxShadow: "0 0 0 1px teal.400" }} color={isDark ? "teal.100" : "gray.700"}/>
                </Field.Root>
                <Field.Root>
                  <Flex>
                    <Field.Label mr={"5px"} color={isDark ? "teal.200" : "teal.700"}>Thumbnail</Field.Label>
                  </Flex>
                  <FileUpload.Root>
                    <FileUpload.HiddenInput onChange={handlerImage} type="file" accept="image/*" />
                    <FileUpload.Trigger borderColor={isDark ? "gray.700" : "teal.300"} asChild w={"100%"} name="stock" bg={isDark ? "gray.800" : "white"} _focus={{ borderColor: "teal.400", boxShadow: "0 0 0 1px teal.400" }} color={isDark ? "teal.100" : "gray.700"}>
                      <Button  variant="outline" size="sm" w={"100%"}>
                        <LuHardDriveUpload /> Upload file
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

export default UpdateCategory