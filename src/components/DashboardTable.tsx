import { ButtonGroup, Heading, IconButton, Stack, Table, Image} from "@chakra-ui/react";
// import { LuChevronLeft, LuChevronRight } from "react-icons/lu"; Pagination
import { AiFillDelete, AiFillEdit, AiFillEye  } from "react-icons/ai";
import { useGetProductListQuery, useRemoveProductListMutation } from "@/app/services/productApiSlice";
import TableSkeleton from "./TableSkeleton";
import type { IProduct } from "@/interfaces";
import AlertDialog from "@/Shared/AlertDialog";
import { toast } from "react-toastify";
import { useEffect } from "react";

const DashboardTable = () => {
    const {isLoading, data} = useGetProductListQuery(1)
    const [destroyProduct, {isLoading: isLoadingDelete, isSuccess}] = useRemoveProductListMutation()
    useEffect(() => {
        if(isSuccess) {
            toast.success(`Removed is Product.`, {
                position: "bottom-right",
                autoClose: 500,
                theme: "colored",
            });
        }
    },[isSuccess])
    
    if(isLoading) return <TableSkeleton />
return (
    <Stack width="70%" gap="5" mr={{base: "10px", md: "auto"}} ml={{base: "0", md: "auto"}}>
        <Heading size="xl">Products</Heading>
            <Table.Root size="sm" variant="outline" striped>
            <Table.Header>
            <Table.Row>
                <Table.ColumnHeader>Image</Table.ColumnHeader>
                <Table.ColumnHeader>ID</Table.ColumnHeader>
                <Table.ColumnHeader>Title</Table.ColumnHeader>
                <Table.ColumnHeader>Category</Table.ColumnHeader>
                <Table.ColumnHeader>Stock</Table.ColumnHeader>
                <Table.ColumnHeader>Price</Table.ColumnHeader>
                <Table.ColumnHeader>Actions</Table.ColumnHeader>
            </Table.Row>
            </Table.Header>
            <Table.Body>
            {data?.data?.map((product: IProduct, idx: number) => (
                <Table.Row key={product.id}>
                <Table.Cell>
                    <Image src={`${import.meta.env.VITE_LOCAL_API}${product.thumbnail.url}`} alt={product.title} boxSize="40px" objectFit="cover" borderRadius="md"/>
                </Table.Cell>
                <Table.Cell>{idx + 1}</Table.Cell>
                <Table.Cell>{product.title}</Table.Cell>
                <Table.Cell>{product.category.title}</Table.Cell>
                <Table.Cell>{product.stock}</Table.Cell>
                <Table.Cell>${product.price.toFixed(2)}</Table.Cell>
                <Table.Cell>
                <ButtonGroup p={2}>
                {/* <AlertDialog btn={ */}
                    <IconButton aria-label="View" variant={"outline"} size="sm" color="white" bg={"blue.400"} _hover={{ transform: "scale(1.08)", bg: "blue.500" }}>
                        <AiFillEye  />
                    </IconButton>
                {/* }/> */}
                <AlertDialog btn={
                    <IconButton aria-label="Remove" variant={"outline"} size="sm" color="white" bg={"red.400"} _hover={{ transform: "scale(1.08)", bg: "red.500"}}>
                        <AiFillDelete />
                    </IconButton>
                }isLoading={isLoadingDelete} onHandleOkText={() => destroyProduct(product.documentId)} variant="outline" color="red" title="Are you Sure" description="Do You really want to destory this Product? This product cannot be undone." okText="remove"/>
                <AlertDialog btn={
                    <IconButton aria-label="Update" variant={"outline"} size="sm" color="white" bg={"tan"} _hover={{ transform: "scale(1.08)", bg: "tan"}}>
                        <AiFillEdit />
                    </IconButton>
                } variant={"plain"} color="black" bg="tan" title="Are you Sure" description="Do you really want to update this product? The changes will be applied immediately." okText="updata"/>
                </ButtonGroup>
            </Table.Cell>
            </Table.Row>
        ))}
        </Table.Body>
    </Table.Root>
      {/* <Pagination.Root count={products.length * 5} pageSize={5} page={1} mx={"auto"}>
        <ButtonGroup variant="ghost" size="sm" wrap="wrap">
            <Pagination.PrevTrigger asChild>
                <IconButton>
                <LuChevronLeft />
                </IconButton>
            </Pagination.PrevTrigger>

            <Pagination.Items render={(page) => (
                <IconButton key={page.value} variant={{ base: "ghost", _selected: "outline" }}>
                    {page.value}
                </IconButton>
            )}/>

            <Pagination.NextTrigger asChild>
                <IconButton>
                <LuChevronRight />
                </IconButton>
            </Pagination.NextTrigger>
            </ButtonGroup>
        </Pagination.Root> */}
    </Stack>
);
};

export default DashboardTable;
