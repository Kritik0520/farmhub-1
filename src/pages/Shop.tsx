import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { Product } from "../App";

type ShopProps = {
  addToCart: (product: Product) => void;
};

const sections: { title: string; products: Product[] }[] = [
  {
    title: "Crops",
    products: [
      { id: "wheat", name: "Wheat", price: 1200, image: "https://images.unsplash.com/photo-1437252611977-07f74518abd7?w=1000&auto=format&fit=crop&q=60" },
      { id: "rice", name: "Rice", price: 1400, image: "https://plus.unsplash.com/premium_photo-1705338026411-00639520a438?w=1000&auto=format&fit=crop&q=60" },
      { id: "maize", name: "Maize", price: 900, image: "https://images.unsplash.com/photo-1651667343153-6dc318e27e41?w=1000&auto=format&fit=crop&q=60" },
      { id: "barley", name: "Barley", price: 1000, image: "https://plus.unsplash.com/premium_photo-1705404738459-c4cb25ad7933?w=1000&auto=format&fit=crop&q=60" },
    ],
  },
  // Fruits and Vegetables sections...
];

const Shop: React.FC<ShopProps> = ({ addToCart }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setSnackbarMsg(`${product.name} added to cart — ₹${product.price}`);
    setSnackbarOpen(true);
  };

  return (
    <Box sx={{ bgcolor: "#f0fdf4", minHeight: "100vh", py: 6 }}>
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 2 }}>
        <Typography variant="h4" sx={{ mb: 3, color: "#2e7d32", fontWeight: 700 }}>
          Agri Shop
        </Typography>

        {sections.map((section) => (
          <Box key={section.title} sx={{ mb: 6 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
                pb: 1,
                borderBottom: "2px solid #388e3c",
              }}
            >
              <Typography sx={{ color: "#2e7d32", fontWeight: 700, fontSize: "1.25rem" }}>
                {section.title}
              </Typography>
            </Box>

            <Grid container spacing={2}>
              {section.products.map((p) => (
                <Grid item key={p.id} xs={12} sm={6} md={4} lg={3}>
                  <Card
                    sx={{
                      borderRadius: 2,
                      boxShadow: 3,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      overflow: "hidden",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={p.image}
                      alt={p.name}
                      sx={{
                        height: 300,
                        objectFit: "cover",
                        transition: "transform 0.3s ease",
                        "&:hover": { transform: "scale(1.05)" },
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {p.name}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ mt: 1 }}>
                        ₹{p.price}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{ bgcolor: "#388e3c", "&:hover": { bgcolor: "#2e7d32" } }}
                        onClick={() => handleAddToCart(p)}
                      >
                        Add to Cart
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Box>

      {/* Snackbar for added-to-cart notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: "100%" }}>
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Shop;
