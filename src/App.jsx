import "./App.css";
import { PrivateRoutes } from "./Components";
import { Room, LoginPage, RegisterPage } from "./Pages";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./utils/AuthContext";


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage/>}/>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Room />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
