import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/organic/Home";
import MarketingServices from "./pages/organic/MarketingServices";
import WebServices from "./pages/organic/WebServices";
import IndustryLanding from "./pages/landing/IndustryLanding";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Organic Traffic Flow */}
        <Route path="/" element={<Home />} />
        <Route path="/services/web" element={<WebServices />} />
        <Route path="/services/marketing" element={<MarketingServices />} />

        {/* Dynamic Ad-Landing Flow */}
        <Route path="/industry/:slug" element={<IndustryLanding />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
