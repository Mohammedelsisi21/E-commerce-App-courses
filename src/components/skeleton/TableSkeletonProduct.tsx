import { ButtonGroup, Heading, Pagination, Stack, Table, Skeleton, Flex,} from "@chakra-ui/react";

const TableSkeletonProduct = () => {
    const skeletonRows = Array.from({ length: 5 });

    return (
        <Stack width={{base: "60%", md:"90%"}} gap="5" mx={{md: "auto", base: "10px"}}>
            <Flex justifyContent={"space-between"}>
                <Heading size="xl">
                    <Skeleton height="30px" w="200px"/>
                </Heading>

                <Skeleton bg={"green.500"} height="30px" w="80px" />
            </Flex>

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
                {skeletonRows.map((_, index) => (
                <Table.Row key={index}>
                <Table.Cell>
                    <Skeleton boxSize="40px" borderRadius="md" />
                </Table.Cell>
                <Table.Cell>
                    <Skeleton height="20px" w="20px" />
                </Table.Cell>
                <Table.Cell>
                    <Skeleton height="20px" w="100px" />
                </Table.Cell>
                <Table.Cell>
                    <Skeleton height="20px" w="80px" />
                </Table.Cell>
                <Table.Cell>
                    <Skeleton height="20px" w="30px" />
                </Table.Cell>
                <Table.Cell>
                    <Skeleton height="20px" w="50px" />
                </Table.Cell>
                <Table.Cell>
                    <Flex>
                        <Skeleton bg={"blue.500"} mr={2} height="30px" w="25px" />
                        <Skeleton bg={"red.500"} mr={2} height="30px" w="25px" />
                        <Skeleton bg={"tan"} height="30px" w="25px" />
                    </Flex>
                </Table.Cell>
            </Table.Row>
        ))}
        </Table.Body>
        </Table.Root>
        <Pagination.Root count={5} pageSize={5} page={1} mx="auto">
        <ButtonGroup variant="ghost" size="sm" wrap="wrap">
            <Pagination.PrevTrigger asChild>
                <Skeleton boxSize="32px" />
            </Pagination.PrevTrigger>

            <Pagination.Items render={() => <Skeleton boxSize="32px" m="1" />}/>
            <Pagination.NextTrigger asChild>
            <Skeleton boxSize="32px" />
            </Pagination.NextTrigger>
        </ButtonGroup>
        </Pagination.Root>
    </Stack>);
};

export default TableSkeletonProduct;
