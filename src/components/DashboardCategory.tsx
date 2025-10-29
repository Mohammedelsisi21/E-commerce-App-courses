import { ButtonGroup, Heading, IconButton, Stack, Pagination,Table, Image, Flex, Text} from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import type { ICategory } from "@/interfaces";
import { useState } from "react";
import { useGetCategoryListQuery } from "@/app/services/categoryApiSlice";
import TableSkeletonCategory from "./skeleton/TableSkeletonCategory";
import CreateCategory from "./curdCategory/CreateCategory";
import UpdateCategory from "./curdCategory/UpdateCategory";
import DeleteCategory from "./curdCategory/DeleteCategory";
import ViewCategory from "./curdCategory/ViewCategory";


const DashboardCategory = () => {
    const [page, setPage] = useState<number>(1);
    const {isLoading, data} = useGetCategoryListQuery(page)
    if(isLoading) return <TableSkeletonCategory />

return (
    <Stack width="70%" gap="5" mr={{base: "10px", md: "auto"}} ml={{base: "0", md: "auto"}}>
        <Flex justifyContent={"space-between"}>
            <Heading size="xl">Categories</Heading>
            <CreateCategory />
        </Flex>
            <Table.Root size="sm" variant="outline" striped>
            <Table.Header>
            <Table.Row>
                <Table.ColumnHeader>Image</Table.ColumnHeader>
                <Table.ColumnHeader>ID</Table.ColumnHeader>
                <Table.ColumnHeader>Title</Table.ColumnHeader>
                <Table.ColumnHeader>Numer of product</Table.ColumnHeader>
                <Table.ColumnHeader>Actions</Table.ColumnHeader>
            </Table.Row>
            </Table.Header>
            <Table.Body>
            {data?.data?.map((category: ICategory, idx: number) => (
                <Table.Row key={category.id}>
                <Table.Cell>
                    <Image src={`${import.meta.env.VITE_LOCAL_API}${category.thumbnail[0].url}`} alt={category.title} boxSize="40px" objectFit="cover" borderRadius="md"/>
                </Table.Cell>
                <Table.Cell>{idx + 1}</Table.Cell>
                <Table.Cell>{category.title}</Table.Cell>
                <Table.Cell>
                    <Text>{category.products.length}</Text>
                </Table.Cell>
                <Table.Cell>
                <ButtonGroup p={2}>
                    <ViewCategory />
                    <DeleteCategory />
                    <UpdateCategory category={category}/>
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

export default DashboardCategory;
