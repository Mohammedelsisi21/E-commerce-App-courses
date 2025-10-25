import { useRemoveProductListMutation } from "@/app/services/productApiSlice"
import AlertDialog from "@/Shared/AlertDialog"
import { IconButton } from "@chakra-ui/react"
import { useEffect } from "react"
import { AiFillDelete } from "react-icons/ai"
import { toast } from "react-toastify"

interface IProps {
    id: string
}
const DeleteProduct = ({ id }: IProps) => {
    const [destroyProduct, { isLoading: isLoadingDelete, isSuccess }] = useRemoveProductListMutation()
    useEffect(() => {
        if (isSuccess) {
            toast.success(`Removed product successfully.`, {
            position: "bottom-right",
            autoClose: 500,
            theme: "colored",
        })
    }
}, [isSuccess])

    const onRemove = async () => {
        await destroyProduct(id)
    }

    return (
        <AlertDialog
        btn={
        <IconButton aria-label="Remove" variant="outline" size="sm" color="white" bg="red.400" _hover={{ transform: "scale(1.08)", bg: "red.500" }}>
            <AiFillDelete />
        </IconButton>
        } isLoading={isLoadingDelete} onHandleOkText={onRemove} variant="outline" color="red" title="Are you sure?" description="Do you really want to destroy this product? This action cannot be undone." okText="remove"
    />
  )
}

export default DeleteProduct
