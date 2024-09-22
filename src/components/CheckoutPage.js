// src/components/CheckoutPage.js
import React from 'react';
import { List, Button, Typography, Avatar } from 'antd';

const { Title } = Typography;

const CheckoutPage = ({ cart, setCart }) => {
  // Calculate total price of all items in the cart
  const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);

  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === productId) {
          if (item.quantity === 1) {
            return null; // Mark for removal
          } else {
            return { ...item, quantity: item.quantity - 1 };
          }
        }
        return item;
      }).filter(item => item) // Filter out nulls
    );
  };

  const removeProduct = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  if (cart.length === 0) {
    return <Title level={4}>Your cart is empty!</Title>; // Show a message if cart is empty
  }

  return (
    <div style={{ padding: '30px' }}>
      <Title level={3}>Your Cart</Title>
      <List
        itemLayout="horizontal"
        bordered
        dataSource={cart}
        renderItem={item => (
          <List.Item
            actions={[
              <Button onClick={() => decreaseQuantity(item.id)}>-</Button>,
              <Button onClick={() => increaseQuantity(item.id)}>+</Button>,
              <Button type="danger" onClick={() => removeProduct(item.id)}>Remove</Button>
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={`/images/${item.image}`} size={64} />}
              title={item.name}
              description={`Quantity: ${item.quantity} | Total Price: $${item.price * item.quantity}`}
            />
          </List.Item>
        )}
      />
      <Title level={4}>Total: ${totalPrice}</Title>
      <Button type="primary" size="large" style={{ marginTop: '20px' }}>
        Proceed to Payment
      </Button>
    </div>
  );
};

export default CheckoutPage;
