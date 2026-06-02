import "./lena.css";
import { Route, Routes } from "react-router";
import LenaPlatform from "./pages/LenaPlatform";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LenaPlatform />} />
      <Route path="/services" element={<LenaPlatform />} />
      <Route path="/services/:serviceId" element={<LenaPlatform />} />
      <Route path="/portfolio" element={<LenaPlatform />} />
      <Route path="/work/:projectId" element={<LenaPlatform />} />
      <Route path="/about" element={<LenaPlatform />} />
      <Route path="/ai-solutions" element={<LenaPlatform />} />
      <Route path="/contact" element={<LenaPlatform />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<LenaPlatform />} />
    </Routes>
  );
}
