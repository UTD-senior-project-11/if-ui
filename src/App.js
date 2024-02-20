import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import ImageGrid from "./components/ImageGrid";

const App = () => {
  //console.log("App rendered");
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/grid" element={<ImageGrid />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
