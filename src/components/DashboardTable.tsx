import { ButtonGroup, Heading, IconButton, Pagination, Stack, Table, Image} from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
// import TableSkeleton from "./TableSkeleton";

const DashboardTable = () => {
  const products = [
    {
      id: 1,
      title: "Laptop",
      description: "High-end gaming laptop",
      documentId: "doc1",
      price: 999.99,
      stock: 10,
      thumbnail: { url: "https://via.placeholder.com/40" },
      category: { title: "Electronics" },
    },
    {
      id: 2,
      title: "Coffee Maker",
      description: "Automatic coffee maker",
      documentId: "doc2",
      price: 49.99,
      stock: 5,
      thumbnail: { url: "https://via.placeholder.com/40" },
      category: { title: "Home Appliances" },
    },
    {
      id: 3,
      title: "Desk Chair",
      description: "Comfortable office chair",
      documentId: "doc3",
      price: 150.0,
      stock: 7,
      thumbnail: { url: "https://via.placeholder.com/40" },
      category: { title: "Furniture" },
    },
  ];


  return (
    <Stack width="70%" gap="5" mx={"auto"}>
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
            {products.map((product) => (
                <Table.Row key={product.id}>
                <Table.Cell>
                    <Image src={product.thumbnail.url} alt={product.title} boxSize="40px" objectFit="cover" borderRadius="md"/>
                </Table.Cell>
                <Table.Cell>{product.id}</Table.Cell>
                <Table.Cell>{product.title}</Table.Cell>
                <Table.Cell>{product.category.title}</Table.Cell>
                <Table.Cell>{product.stock}</Table.Cell>
                <Table.Cell>${product.price.toFixed(2)}</Table.Cell>
                <Table.Cell>
                <ButtonGroup p={2}>
                <IconButton aria-label="Update" variant={"outline"} size="sm" color="blue" _hover={{ transform: "scale(1.2)" }}>
                    <AiFillEdit />
                </IconButton>
                <IconButton aria-label="Remove" variant={"outline"} size="sm" color="red" _hover={{ transform: "scale(1.2)" }}>
                    <AiFillDelete />
                </IconButton>
                </ButtonGroup>
            </Table.Cell>
            </Table.Row>
        ))}
        </Table.Body>
    </Table.Root>

      <Pagination.Root count={products.length * 5} pageSize={5} page={1} mx={"auto"}>
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
        </Pagination.Root>
    </Stack>
);
};

export default DashboardTable;
