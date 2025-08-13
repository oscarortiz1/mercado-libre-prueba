import "./App.css";
import Navbar from "./components/navbar/Navbar";
import ReferencePage from "./components/referencePage/ReferencePage";

import { UserProvider } from "./contexts/userContext";

function App() {
  return (
    <>
      <UserProvider>
        <Navbar
          height={80}
          iconSrc="https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/6.6.143/mercadolibre/logo_large_plus@2x.webp"
          iconAlt="Inicio"
          iconHref="#"
        />
        <ReferencePage />
      </UserProvider>
    </>
  );
}

export default App;
