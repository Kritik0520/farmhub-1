import React from "react";
import { Box, Typography, Divider, IconButton, Button, Avatar } from "@mui/material";
import { Product } from "../App";

type CartItem = Product & { quantity: number };

type CartOverlayProps = {
  cart: CartItem[];
  updateQty: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
};

const CartOverlay: React.FC<CartOverlayProps> = ({ cart, updateQty, removeFromCart }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Box
      sx={{
        position: "absolute",
        top: 50,
        right: 0,
        width: 320,
        bgcolor: "white",
        boxShadow: 3,
        borderRadius: 2,
        p: 2,
        zIndex: 10,
      }}
    >
      <Typography variant="h6">🛒 Your Cart</Typography>
      <Divider sx={{ my: 1 }} />

      {cart.length === 0 ? (
        <Typography>No items in cart</Typography>
      ) : (
        <>
          {cart.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                mb: 2,
                gap: 1,
              }}
            >
              {/* Left column: Image */}
              <Avatar
                src={item.image}
                alt={item.name}
                variant="square"
                sx={{ width: 60, height: 60 }}
              />

              {/* Right column: Name, Price, Quantity */}
              <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                {/* Top: Name */}
                <Typography variant="body2" fontWeight={600}>
                  {item.name}
                </Typography>

                {/* Middle: Price */}
                <Typography variant="body2" fontWeight={500}>
                  ₹{item.price * item.quantity}
                </Typography>

                {/* Bottom: Quantity controls */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.5 }}>
                  <IconButton
                    size="small"
                    onClick={() => updateQty(item.id, Math.max(item.quantity - 1, 1))}
                  >
                    -
                  </IconButton>
                  <Typography>{item.quantity}</Typography>
                  <IconButton
                    size="small"
                    onClick={() => updateQty(item.id, item.quantity + 1)}
                  >
                    +
                  </IconButton>
                  <IconButton size="small" onClick={() => removeFromCart(item.id)}>
                    ✕
                  </IconButton>
                </Box>
              </Box>
            </Box>
          ))}

          <Divider sx={{ my: 1 }} />
          <Typography fontWeight={700}>Total: ₹{total}</Typography>
          <Button
            fullWidth
            sx={{ mt: 1, bgcolor: "#388e3c", "&:hover": { bgcolor: "#2e7d32" } }}
          >
            Checkout
          </Button>
        </>
      )}
    </Box>
  );
};

export default CartOverlay;
