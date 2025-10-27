// import type { IProduct } from "@/interfaces"
import CustomeModal from "@/Shared/Modal"
import { Box, Button, Dialog, Field, Fieldset, FileUpload, Flex, IconButton, Input, NumberInput, Text, Textarea } from "@chakra-ui/react"
import { IoCreateSharp } from "react-icons/io5";
import { useColorMode } from "../ui/color-mode"
import { LuHardDriveUpload } from "react-icons/lu"
// import { useState, type ChangeEvent, type FormEvent } from "react"
// import { useUpdateProductListMutation } from "@/app/services/productApiSlice"
// import { useEffect } from "react"
// import { toast } from "react-toastify"
const CreateProdcut = () => {
  const { colorMode } = useColorMode()
  const isDark = colorMode === "dark";

  
  return (
        <CustomeModal
        openModal={
            <IconButton aria-label="Create" variant={"outline"} size="md" colorScheme="green" color="white" bg={"green.500"} _hover={{ transform: "scale(1.08)", bg: "green.600"}} _active={{bg: "green.700"}} borderColor={"green.400"}>
              <Flex gap={"5px"} p={2}>
                <Text fontSize="md" fontWeight="medium">Create Product</Text>
                <IoCreateSharp size={20} />
              </Flex>
            </IconButton>
        }title="Create Product">
          <Box as={"form"}>
            <Fieldset.Root size="lg" maxW="md">
              <Fieldset.Content>
                <Field.Root>
                  <Field.Label color={isDark ? "teal.200" : "teal.700"}>
                    Title
                  </Field.Label>
                    <Input name="title" bg={isDark ? "gray.800" : "white"} borderColor={isDark ? "gray.700" : "teal.300"} _focus={{ borderColor: "teal.400", boxShadow: "0 0 0 1px teal.400" }} color={isDark ? "teal.100" : "gray.700"}/>
                </Field.Root>
                <Field.Root>
                  <Field.Label color={isDark ? "teal.200" : "teal.700"}>
                    Description
                  </Field.Label>
                    <Textarea name="description" bg={isDark ? "gray.800" : "white"} borderColor={isDark ? "gray.700" : "teal.300"} _focus={{ borderColor: "teal.400", boxShadow: "0 0 0 1px teal.400" }} color={isDark ? "teal.100" : "gray.700"}/>
                </Field.Root>
                <Flex gap={4}>
                  <Field.Root>
                    <Field.Label color={isDark ? "teal.200" : "teal.700"}>Price</Field.Label>
                    <NumberInput.Root min={0}>
                      <NumberInput.Control />
                      <NumberInput.Input name="price" bg={isDark ? "gray.800" : "white"} borderColor={isDark ? "gray.700" : "teal.300"} _focus={{ borderColor: "teal.400", boxShadow: "0 0 0 1px teal.400" }} color={isDark ? "teal.100" : "gray.700"}/>
                    </NumberInput.Root>
                  </Field.Root>
                  <Field.Root>
                    <Field.Label color={isDark ? "teal.200" : "teal.700"}>Count in Stock</Field.Label>
                    <NumberInput.Root min={0}>
                      <NumberInput.Control />
                      <NumberInput.Input name="stock" bg={isDark ? "gray.800" : "white"} borderColor={isDark ? "gray.700" : "teal.300"} _focus={{ borderColor: "teal.400", boxShadow: "0 0 0 1px teal.400" }} color={isDark ? "teal.100" : "gray.700"}/>
                    </NumberInput.Root>
                  </Field.Root>
                </Flex>
                <Field.Root>
                  <Flex>
                    <Field.Label mr={"5px"} color={isDark ? "teal.200" : "teal.700"}>Thumbnail</Field.Label>
                  </Flex>
                  <FileUpload.Root>
                    <FileUpload.HiddenInput />
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
                  <Button type={"submit"} variant={"outline"} textTransform="capitalize" fontSize="md" fontWeight="semibold" colorScheme="green" color={"green.500"} _hover={{ transform: "scale(1.02)", boxShadow: "md" }} _active={{transform: "scale(0.98)"}}>
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