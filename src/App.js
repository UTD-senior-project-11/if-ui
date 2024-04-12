import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import ImageGrid from "./components/ImageGrid";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import Navbar from "./components/Navbar";

const App = () => {
  //console.log("App rendered");
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/grid" element={<ImageGrid />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
