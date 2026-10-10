import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/global.css";
import "./styles/login.css";

const root = document.getElementById("root");
if (!root) throw new Error("Élément #root introuvable");
createRoot(root).render(<StrictMode><App /></StrictMode>);