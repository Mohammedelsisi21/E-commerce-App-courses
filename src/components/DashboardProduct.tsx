import { ButtonGroup, Heading, IconButton, Stack, Pagination,Table, Image, Flex, Text, NativeSelect} from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useGetProductListQuery } from "@/app/services/productApiSlice";
import TableSkeleton from "./skeleton/TableSkeletonProduct";
import type { IProduct } from "@/interfaces";
import { useState } from "react";
import UpdateProduct from "./curdProduct/UpdateProduct";
import DeleteProduct from "./curdProduct/DeleteProduct";
import ViewDitails from "./curdProduct/ViewDitails";
import CreateProdcut from "./curdProduct/CreateProdcut";
import { useColorMode } from "./ui/color-mode";


const DashboardProduct = () => {
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const { colorMode } = useColorMode()
    const isDark = colorMode === "dark"
    const {isLoading, data} = useGetProductListQuery({page, pageSize})
    if(isLoading) return <TableSkeleton />
return (
    <Stack shadow={"sm"} p={2} width={{base: "60%", md:"90%"}} gap="5" mr={{base: "10px", md: "auto"}} ml={{base: "0", md: "auto"}}>
        <Flex justifyContent={"space-between"}>
            <Heading size="xl">Products</Heading>
            <CreateProdcut />
        </Flex>
            <Table.Root size="sm" striped>
            <Table.Header>
            <Table.Row>
                <Table.ColumnHeader>Image</Table.ColumnHeader>
                <Table.ColumnHeader>ID</Table.ColumnHeader>
                <Table.ColumnHeader>Title</Table.ColumnHeader>
                <Table.ColumnHeader>Category</Table.ColumnHeader>
                <Table.ColumnHeader>Stock</Table.ColumnHeader>
                <Table.ColumnHeader>Discount</Table.ColumnHeader>
                <Table.ColumnHeader>Price & discount</Table.ColumnHeader>
                <Table.ColumnHeader>Price</Table.ColumnHeader>
                <Table.ColumnHeader>Actions</Table.ColumnHeader>
            </Table.Row>
            </Table.Header>
            <Table.Body>
            {data?.data?.map((product: IProduct, idx: number) => (
                <Table.Row key={product.id}>
                <Table.Cell>
                    <Image src={`${product.thumbnail.url}`} alt={product.title} boxSize="40px" objectFit="cover" borderRadius="md"/>
                </Table.Cell>
                <Table.Cell>{idx + 1}</Table.Cell>
                <Table.Cell>{product.title}</Table.Cell>
                <Table.Cell>
                    <Text>{product.category.title}</Text>
                </Table.Cell>
                <Table.Cell>{product.stock}</Table.Cell>
                <Table.Cell>{`%${product.discount || 0}`}</Table.Cell>
                <Table.Cell>{product.discount ? <>{`$${(product.price * (1 - product.discount / 100)).toFixed(2)}`}</> : <>No Discount</>}</Table.Cell>
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
    <Flex w={"100%"} justifyContent={"space-between"} alignItems={"center"} mx={"auto"}>
        <Flex gap={1} alignItems={"center"}>
            <NativeSelect.Root size="sm" width="200px">
                <NativeSelect.Field onChange={e => setPageSize(parseInt(e.target.value))} name="pageSize" bg={isDark ? "gray.800" : "white"} borderColor={isDark ? "gray.700" : "teal.300"} _focus={{ borderColor: "teal.400", boxShadow: "0 0 0 1px teal.400" }} color={isDark ? "teal.100" : "gray.700"}>
                        <option value="10" selected>10</option>
                        <option value="15">15</option>
                        <option value="30">30</option>
                        <option value="50">50</option>
                </NativeSelect.Field>
            <NativeSelect.Indicator />
            </NativeSelect.Root>
            <Text color={isDark ? "teal.100" : "gray.700"}>
                Entries per page
            </Text>
        </Flex>
        <Pagination.Root count={data?.meta?.pagination.total} pageSize={data?.meta?.pagination.pageSize} page={page} onPageChange={(details) => setPage(details.page)}>
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
    </Flex>
    </Stack>
);
};

export default DashboardProduct;
