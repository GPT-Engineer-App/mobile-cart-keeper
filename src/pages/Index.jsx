import { useState } from "react";
import { Container, VStack, HStack, Box, Text, Button, Image, IconButton, useToast } from "@chakra-ui/react";
import { FaShoppingCart, FaTrash } from "react-icons/fa";

const products = [
  { id: 1, name: "Product 1", price: 10, image: "https://via.placeholder.com/150" },
  { id: 2, name: "Product 2", price: 20, image: "https://via.placeholder.com/150" },
  { id: 3, name: "Product 3", price: 30, image: "https://via.placeholder.com/150" },
];

const Index = () => {
  const [cart, setCart] = useState([]);
  const toast = useToast();

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    toast({
      title: `${product.name} added to cart.`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    toast({
      title: `Product removed from cart.`,
      status: "error",
      duration: 2000,
      isClosable: true,
    });
  };

  const saveCart = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
    toast({
      title: "Cart saved.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8}>
        <Text fontSize="3xl" fontWeight="bold">Shopping Website</Text>
        <HStack spacing={4} wrap="wrap" justify="center">
          {products.map((product) => (
            <Box key={product.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} maxW="200px">
              <Image src={product.image} alt={product.name} mb={4} />
              <Text fontSize="xl" fontWeight="bold">{product.name}</Text>
              <Text>${product.price}</Text>
              <Button mt={4} colorScheme="teal" onClick={() => addToCart(product)}>Add to Cart</Button>
            </Box>
          ))}
        </HStack>
        <Box w="100%" borderWidth="1px" borderRadius="lg" p={4}>
          <HStack justify="space-between" mb={4}>
            <Text fontSize="2xl" fontWeight="bold">Cart</Text>
            <Button colorScheme="teal" onClick={saveCart}>Save Cart</Button>
          </HStack>
          {cart.length === 0 ? (
            <Text>Your cart is empty.</Text>
          ) : (
            cart.map((item) => (
              <HStack key={item.id} justify="space-between" mb={4}>
                <Text>{item.name} (x{item.quantity})</Text>
                <HStack>
                  <Text>${item.price * item.quantity}</Text>
                  <IconButton
                    aria-label="Remove from cart"
                    icon={<FaTrash />}
                    colorScheme="red"
                    onClick={() => removeFromCart(item.id)}
                  />
                </HStack>
              </HStack>
            ))
          )}
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;