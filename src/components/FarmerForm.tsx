import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import AgricultureIcon from "@mui/icons-material/Agriculture";

interface FarmerFormProps {
  onSubmit: (data: { soil: string; crop: string; sowDate: string }) => void;
}

const FarmerForm: React.FC<FarmerFormProps> = ({ onSubmit }) => {
  const [soil, setSoil] = useState("");
  const [crop, setCrop] = useState("");
  const [sowDate, setSowDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ soil, crop, sowDate });
  };

  return (
    <Box sx={{ p: 2, maxWidth: 350 }}>
      <Box display="flex" alignItems="center" mb={2}>
        <AgricultureIcon sx={{ color: "green", mr: 1 }} />
        <Typography variant="h6" fontWeight="bold" color="green">
          Field Details
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Soil Type"
              value={soil}
              onChange={(e) => setSoil(e.target.value)}
              fullWidth
              required
              size="small"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Crop"
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              fullWidth
              required
              size="small"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Sow Date"
              type="date"
              value={sowDate}
              onChange={(e) => setSowDate(e.target.value)}
              fullWidth
              required
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 1,
                backgroundColor: "green",
                "&:hover": { backgroundColor: "darkgreen" },
                borderRadius: 2,
              }}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default FarmerForm;
