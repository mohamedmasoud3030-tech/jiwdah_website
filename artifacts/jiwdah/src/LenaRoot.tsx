import "./lena.css";
import { Route, Routes } from "react-router";
import LenaExperience from "./pages/LenaExperience";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
export default function LenaRoot(){return <Routes><Route path="/" element={<LenaExperience/>}/><Route path="/services" element={<LenaExperience/>}/><Route path="/services/:serviceId" element={<LenaExperience/>}/><Route path="/portfolio" element={<LenaExperience/>}/><Route path="/work/:projectId" element={<LenaExperience/>}/><Route path="/about" element={<LenaExperience/>}/><Route path="/ai-solutions" element={<LenaExperience/>}/><Route path="/contact" element={<LenaExperience/>}/><Route path="/dashboard" element={<Dashboard/>}/><Route path="/login" element={<Login/>}/><Route path="*" element={<NotFound/>}/></Routes>}
