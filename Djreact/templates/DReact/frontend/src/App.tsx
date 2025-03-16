import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "./components/Loader";
import AuthenticatedRoute from "./hooks/AuthenticationRequired";
import DisallowIfAuthenticated from "./hooks/AuthenticationDisallowed";

const Home = lazy(() => import("./page/HomePage"));
const NotFound = lazy(() => import("./page/NotFoundPage"));
const Profile = lazy(() => import("./page/Profile"));
const Register = lazy(() => import("./page/Register"));
const Login = lazy(() => import("./page/LoginPage"));
const Logout = lazy(() => import("./page/LogoutPage"));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loader message="loading" />}>
        <Routes>
          <Route path="/" element={<Home />} />

          {/** Auth Routes */}
          <Route
            path="/profile"
            element={
              <AuthenticatedRoute>
                <Profile />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <DisallowIfAuthenticated>
                <Register />
              </DisallowIfAuthenticated>
            }
          />
          <Route
            path="/login"
            element={
              <DisallowIfAuthenticated>
                <Login />
              </DisallowIfAuthenticated>
            }
          />
          <Route
            path="/logout"
            element={
              <AuthenticatedRoute>
                <Logout />
              </AuthenticatedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
