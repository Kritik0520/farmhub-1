import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";
import theme from "./theme";
import { CartProvider } from "./context/CartContext"; // ✅ import

// Error boundary (your existing code)
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean, error: Error | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: 'red' }}>
          <h1>Something went wrong</h1>
          <p>{this.state.error?.message || 'Unknown error'}</p>
          <p>{this.state.error?.stack}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

const root = document.getElementById("root");
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <ErrorBoundary>

        <ThemeProvider theme={theme}>
          <CssBaseline />
          
            <BrowserRouter>
              <App />
            </BrowserRouter>
        </ThemeProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found - check index.html");
}
