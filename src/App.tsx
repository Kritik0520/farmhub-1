import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Slide,
} from "@mui/material";
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
  const [cart, setCart] = useState<any[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();

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
  };

  const updateQty = (id: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      {/* Navbar */}
      <AppBar
        position="sticky"
        elevation={3}
        sx={{
          bgcolor: "transparent",
          backgroundImage: "linear-gradient(90deg, #2e7d32, #388e3c, #43a047)",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              cursor: "pointer",
              letterSpacing: 0.5,
            }}
            onClick={() => navigate("/")}
          >
            🌾 FarmHub
          </Typography>

          {[
            { label: "Home", path: "/" },
            { label: "Farmer Login", path: "/farmer/login" },
            { label: "Shop", path: "/shop" },
            { label: "Admin Login", path: "/admin/login" },
          ].map((item) => (
            <Button
              key={item.path}
              onClick={() => navigate(item.path)}
              sx={{
                color: "white",
                position: "relative",
                mx: 1,
                "&:after": {
                  content: '""',
                  position: "absolute",
                  width: "0%",
                  height: "2px",
                  bottom: 0,
                  left: 0,
                  bgcolor: "white",
                  transition: "width 0.3s ease",
                },
                "&:hover:after": {
                  width: "100%",
                },
              }}
            >
              {item.label}
            </Button>
          ))}

          {/* Cart Button */}
          <Box sx={{ position: "relative" }}>
            <IconButton
              color="inherit"
              onClick={() => setCartOpen((prev) => !prev)}
              sx={{ color: "white" }}
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

            {/* Animated Cart Overlay */}
            <Slide direction="down" in={cartOpen} mountOnEnter unmountOnExit>
              <Box>
                <CartOverlay
                  cart={cart}
                  updateQty={updateQty}
                  removeFromCart={removeFromCart}
                />
              </Box>
            </Slide>
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
