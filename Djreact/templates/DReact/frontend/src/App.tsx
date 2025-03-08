import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "./components/Loader";


const Home = lazy(() => import("./page/HomePage"));
const NotFound = lazy(() => import("./page/NotFoundPage"));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loader message="loading"/>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
