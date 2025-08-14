// src/routes.tsx
import { Routes, Route } from "react-router-dom";
import ReferencePage from "../components/referencePage/ReferencePage";
import OtherPage from "../components/otherPages/OtherPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ReferencePage />} />
      <Route path="/otra-pagina" element={<OtherPage />} />
    </Routes>
  );
}
