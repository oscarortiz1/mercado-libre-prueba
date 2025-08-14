// src/App.tsx
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { UserProvider } from "./contexts/userContext";
import AppRoutes from "./routes/routes";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Navbar
          height={80}
          iconSrc="https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/6.6.143/mercadolibre/logo_large_plus@2x.webp"
          iconAlt="Inicio"
          iconHref="#"
        />
        <AppRoutes />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
