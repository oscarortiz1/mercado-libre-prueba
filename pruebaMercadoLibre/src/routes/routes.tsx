// src/routes.tsx
import { Routes, Route } from "react-router-dom";
import ReferencePage from "../components/referencePage/ReferencePage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ReferencePage />} />
    </Routes>
  );
}
