import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import NotFound from "./NotFound";

export default function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:url" element={<App />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
