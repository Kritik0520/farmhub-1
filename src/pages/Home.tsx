import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  useTheme,
  Chip,
} from "@mui/material";
import {
  Agriculture,
  WbSunny,
  TrendingUp,
  Notifications,
  Insights,
  Security,
  Storefront,
  Terrain,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import CountUp from "react-countup";

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const Home: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ bgcolor: "background.default" }}>
      {/* Hero */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          py: { xs: 10, md: 14 },
          background:
            "radial-gradient(1200px 600px at 10% -10%, rgba(56,142,60,.25), transparent 60%), radial-gradient(1000px 500px at 110% 10%, rgba(25,118,210,.18), transparent 60%), linear-gradient(180deg, #f7faf7, #fff)",
        }}
      >
        {/* soft blobs */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(600px 300px at 50% 0%, rgba(76,175,80,.12), transparent 50%)",
          }}
        />
        <Container maxWidth="lg" sx={{ position: "relative" }}>
          <MotionBox
            variants={fadeUp}
            initial="hidden"
            animate="show"
            sx={{ textAlign: "center" }}
          >
            <Chip
              label="Made for Indian Farmers"
              color="success"
              variant="outlined"
              sx={{ mb: 2, fontWeight: 600 }}
            />
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                mb: 2,
              }}
            >
              FarmHub
              <Typography
                component="span"
                sx={{
                  ml: 1,
                  background:
                    "linear-gradient(90deg, #2e7d32 0%, #66bb6a 50%, #42a5f5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                — Precision Farming Advisor
              </Typography>
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 820, mx: "auto" }}
            >
              Real-time weather intelligence, market insights, and smart
              recommendations to increase yields and profits — all in one clean
              dashboard.
            </Typography>

            <Box sx={{ mt: 4, display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
              <Button
                variant="contained"
                size="large"
                href="/farmer/register"
                sx={{
                  px: 3.5,
                  py: 1.25,
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: 700,
                  bgcolor: "#2e7d32",
                  "&:hover": { bgcolor: "#236528" },
                }}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                size="large"
                href="/farmer/login"
                sx={{
                  px: 3.5,
                  py: 1.25,
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: 700,
                }}
              >
                Farmer Login
              </Button>
              <Button
                variant="text"
                size="large"
                href="/shop"
                sx={{ textTransform: "none", fontWeight: 700 }}
                startIcon={<Storefront />}
              >
                Visit Shop
              </Button>
            </Box>
          </MotionBox>

          {/* Stats */}
          <MotionBox
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            sx={{
              mt: { xs: 6, md: 10 },
              display: "grid",
              gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" },
              gap: 2,
            }}
          >
            {[
              { label: "Farmers Onboarded", end: 12000 },
              { label: "Acres Optimized", end: 85000 },
              { label: "Districts Covered", end: 210 },
              { label: "Avg. Yield Gain", suffix: "%", end: 18 },
            ].map((s, i) => (
              <MotionCard
                key={i}
                variants={fadeUp}
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: 3,
                  border: `1px solid ${theme.palette.divider}`,
                  backdropFilter: "blur(4px)",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 800, lineHeight: 1 }}
                >
                  <CountUp end={s.end} duration={1.6} suffix={s.suffix || ""} />
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {s.label}
                </Typography>
              </MotionCard>
            ))}
          </MotionBox>
        </Container>
      </Box>

      {/* Features */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <MotionBox variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <MotionBox variants={fadeUp} sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              Powerful features, simple UI
            </Typography>
            <Typography color="text.secondary">
              Everything you need to plan, monitor and sell — without the bloat.
            </Typography>
          </MotionBox>

          <Grid container spacing={3}>
            {[
              {
                icon: <Agriculture />,
                title: "Smart Farming Decisions",
                text:
                  "Recommendations for irrigation, fertilization, pests and crop rotation based on satellite and local weather.",
              },
              {
                icon: <WbSunny />,
                title: "Weather Intelligence",
                text:
                  "Hyperlocal forecasts, rain alerts and growing degree days to protect and schedule farm work.",
              },
              {
                icon: <TrendingUp />,
                title: "Market Insights",
                text:
                  "MSP tracking, mandi signals and demand heatmaps so you sell at the right time, right place.",
              },
              {
                icon: <Notifications />,
                title: "Smart Alerts",
                text:
                  "Timely notifications for weather shifts, pest risks and price spikes across nearby markets.",
              },
              {
                icon: <Insights />,
                title: "Crop Health & NDVI",
                text:
                  "Field health maps and anomaly detection from satellite imagery to act before losses grow.",
              },
              {
                icon: <Security />,
                title: "Own Your Data",
                text:
                  "Data is encrypted in transit and at rest. You decide what to share with buyers or advisors.",
              },
            ].map((f, i) => (
              <Grid item xs={12} md={6} lg={4} key={i}>
                <MotionCard
                  variants={fadeUp}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  elevation={0}
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    border: `1px solid ${theme.palette.divider}`,
                    p: 2,
                  }}
                >
                  <CardContent sx={{ display: "grid", gap: 1 }}>
                    <Avatar
                      sx={{
                        bgcolor: "success.light",
                        color: "success.dark",
                        width: 48,
                        height: 48,
                      }}
                    >
                      {f.icon}
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 800, mt: 1 }}>
                      {f.title}
                    </Typography>
                    <Typography color="text.secondary">{f.text}</Typography>
                  </CardContent>
                </MotionCard>
              </Grid>
            ))}
          </Grid>
        </MotionBox>
      </Container>

      {/* How it Works */}
      <Box sx={{ py: { xs: 6, md: 8 }, background: "linear-gradient(180deg,#fbfffb, #f6fbff)" }}>
        <Container maxWidth="lg">
          <MotionBox variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} sx={{ textAlign: "center", mb: 5 }}>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>How FarmHub Works</Typography>
            <Typography color="text.secondary">Simple, guided steps to get value on day one.</Typography>
          </MotionBox>

          <Grid container spacing={3} alignItems="stretch">
            {[
              {
                step: 1,
                title: "Register & Profile",
                text: "Create your profile with farm location, soil type and crops.",
              },
              {
                step: 2,
                title: "Get Insights",
                text: "We combine weather + satellite + market data to advise actions.",
              },
              {
                step: 3,
                title: "Smart Alerts",
                text: "Get alerts for rain, frost, pests and price spikes in your area.",
              },
              {
                step: 4,
                title: "Optimize & Profit",
                text: "Act with confidence to boost yield and sell at better prices.",
              },
            ].map((s, i) => (
              <Grid item xs={12} md={3} key={i}>
                <MotionCard
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  elevation={0}
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    border: `1px solid ${theme.palette.divider}`,
                    p: 2.5,
                    textAlign: "center",
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "primary.main",
                      color: "primary.contrastText",
                      width: 48,
                      height: 48,
                      mx: "auto",
                      fontWeight: 800,
                    }}
                  >
                    {s.step}
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 800, mt: 1.5 }}>
                    {s.title}
                  </Typography>
                  <Typography color="text.secondary">{s.text}</Typography>
                </MotionCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={5}>
            <MotionBox variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                Farmers are seeing real impact
              </Typography>
              <Typography color="text.secondary">
                From water savings to timely selling — FarmHub is a dependable digital ally.
              </Typography>
            </MotionBox>
          </Grid>
          <Grid item xs={12} md={7}>
            <Grid container spacing={2}>
              {[
                {
                  name: "R. Singh",
                  place: "Punjab",
                  quote:
                    "Got rain alert just in time — saved my urea application and money.",
                },
                {
                  name: "S. Patil",
                  place: "Maharashtra",
                  quote:
                    "NDVI showed stress early. We irrigated only where needed. Great results.",
                },
                {
                  name: "K. Reddy",
                  place: "Telangana",
                  quote:
                    "Sold onions at higher prices by tracking nearby mandi signals.",
                },
              ].map((t, i) => (
                <Grid item xs={12} sm={6} md={4} key={i}>
                  <MotionCard
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    elevation={0}
                    sx={{
                      height: "100%",
                      borderRadius: 3,
                      border: `1px solid ${theme.palette.divider}`,
                    }}
                  >
                    <CardContent sx={{ display: "grid", gap: 1 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Avatar sx={{ bgcolor: "success.main" }}>
                          <Terrain />
                        </Avatar>
                        <Box>
                          <Typography sx={{ fontWeight: 700 }}>{t.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {t.place}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                        “{t.quote}”
                      </Typography>
                    </CardContent>
                  </MotionCard>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>

      {/* CTA */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          background:
            "linear-gradient(90deg, rgba(46,125,50,1) 0%, rgba(102,187,106,1) 100%)",
          color: "primary.contrastText",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h4" sx={{ fontWeight: 900 }}>
                Ready to transform your farming?
              </Typography>
              <Typography sx={{ opacity: 0.9 }}>
                Join thousands of farmers increasing yields and profits with FarmHub.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: { xs: "left", md: "right" } }}>
              <Button
                variant="contained"
                size="large"
                href="/farmer/register"
                sx={{
                  bgcolor: "rgba(255,255,255,.15)",
                  backdropFilter: "blur(4px)",
                  borderRadius: 3,
                  px: 3.5,
                  py: 1.25,
                  textTransform: "none",
                  fontWeight: 800,
                  "&:hover": { bgcolor: "rgba(255,255,255,.25)" },
                }}
              >
                Register as Farmer
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
