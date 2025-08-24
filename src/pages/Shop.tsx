import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
} from "@mui/material";
import { Product } from "../App"; // Make sure Product type is exported from App.tsx

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
  {
    title: "Fruits",
    products: [
      { id: "mango", name: "Mango", price: 250, image: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=1000&auto=format&fit=crop&q=60" },
      { id: "banana", name: "Banana", price: 60, image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=1000&auto=format&fit=crop&q=60" },
      { id: "apple", name: "Apple", price: 120, image: "https://plus.unsplash.com/premium_photo-1661322640130-f6a1e2c36653?w=1000&auto=format&fit=crop&q=60" },
    ],
  },
  {
    title: "Vegetables",
    products: [
      { id: "tomato", name: "Tomato", price: 40, image: "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?w=1000&auto=format&fit=crop&q=60" },
      { id: "potato", name: "Potato", price: 30, image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=1000&auto=format&fit=crop&q=60" },
      { id: "onion", name: "Onion", price: 50, image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=1000&auto=format&fit=crop&q=60" },
    ],
  },
];

const Shop: React.FC<ShopProps> = ({ addToCart }) => {
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
                        onClick={() => addToCart(p)}
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
    </Box>
  );
};

export default Shop;
