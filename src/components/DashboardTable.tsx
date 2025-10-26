import { ButtonGroup, Heading, IconButton, Stack, Pagination,Table, Image} from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useGetProductListQuery } from "@/app/services/productApiSlice";
import TableSkeleton from "./TableSkeleton";
import type { IProduct } from "@/interfaces";
import { useState } from "react";
import UpdateProduct from "./curdProduct/UpdateProduct";
import DeleteProduct from "./curdProduct/deleteProduct";
import ViewDitails from "./curdProduct/ViewDitails";


const DashboardTable = () => {
    const [page, setPage] = useState<number>(1);
    const {isLoading, data} = useGetProductListQuery(page)
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
                    <ViewDitails product={product}/>
                    <DeleteProduct id={product.documentId}/>
                    <UpdateProduct product={product}/>
                </ButtonGroup>
            </Table.Cell>
            </Table.Row>
        ))}
        </Table.Body>
    </Table.Root>
    <Pagination.Root mx="auto" count={data?.meta?.pagination.total} pageSize={data?.meta?.pagination.pageSize} page={page} onPageChange={(details) => setPage(details.page)}>
        <ButtonGroup variant="ghost" size="sm">
            <Pagination.PrevTrigger asChild>
                <IconButton>
                    <LuChevronLeft />
                </IconButton>
            </Pagination.PrevTrigger>

    <Pagination.Items render={(p) => (
        <Pagination.Item asChild key={p.value} {...p}>
            <IconButton variant={p.value === page ? "solid" : "ghost"}>
                {p.value}
            </IconButton>
    </Pagination.Item>
    )}/>

        <Pagination.NextTrigger asChild>
            <IconButton>
                <LuChevronRight />
            </IconButton>
        </Pagination.NextTrigger>
        </ButtonGroup>
    </Pagination.Root>
    </Stack>
);
};

export default DashboardTable;
