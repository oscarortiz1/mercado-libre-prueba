// src/routes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import ReferencePage from "../components/referencePage/ReferencePage";
import OtherPage from "../components/otherPages/OtherPage";
import HomePage from "../components/otherPages/HomePage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/previous-step?locale=es-AR" replace />}
      />
      <Route path="/previous-step" element={<HomePage />} />
      <Route path="/step2" element={<ReferencePage />} />
      <Route path="/step3" element={<OtherPage />} />
    </Routes>
  );
}
