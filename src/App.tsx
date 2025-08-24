import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Box, AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { ShoppingCart } from "lucide-react";

import Home from "./pages/Home";
import FarmerLogin from "./pages/FarmerLogin";
import FarmerRegister from "./pages/FarmerRegister";
import FarmerDashboard from "./pages/FarmerDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Shop from "./pages/Shop";
import CartOverlay from "./components/CartOverlay";

const App: React.FC = () => {
  const [cart, setCart] = useState<any[]>([]); // cart items

  const addToCart = (product: any) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    alert(`${product.name} added to cart — ₹${product.price}`);
  };

  const updateQty = (id: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const [cartOpen, setCartOpen] = useState(false);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      {/* Navbar */}
      <AppBar position="static" sx={{ bgcolor: "#388e3c" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            FarmHub - Precision Farming Advisor
          </Typography>
          <Button color="inherit" href="/">Home</Button>
          <Button color="inherit" href="/farmer/login">Farmer Login</Button>
          <Button color="inherit" href="/shop">Shop</Button>
          <Button color="inherit" href="/admin/login">Admin Login</Button>

          {/* Cart Button */}
          <Box sx={{ position: "relative" }}>
            <IconButton
              color="inherit"
              onClick={() => setCartOpen((prev) => !prev)}
              onMouseEnter={() => setCartOpen(true)}
              onMouseLeave={() => setCartOpen(false)}
            >
              <ShoppingCart />
              {cart.length > 0 && (
                <Box
                  sx={{
                    position: "absolute",
                    top: -4,
                    right: -4,
                    bgcolor: "red",
                    color: "white",
                    fontSize: "0.75rem",
                    px: 0.7,
                    borderRadius: "50%",
                  }}
                >
                  {cart.length}
                </Box>
              )}
            </IconButton>

            {cartOpen && (
              <CartOverlay
                cart={cart}
                updateQty={updateQty}
                removeFromCart={removeFromCart}
              />
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/farmer/login" element={<FarmerLogin />} />
        <Route path="/farmer/register" element={<FarmerRegister />} />
        <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/shop" element={<Shop addToCart={addToCart} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Box>
  );
};

export default App;
