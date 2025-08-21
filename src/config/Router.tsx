import { Routes, Route, Navigate } from "react-router-dom";
import { Home, HowToUse, Login, NotFound } from "../pages";
import { Signup } from "../pages/Auth";
import { useContext } from "react";
import { AuthContext } from "../context";

const Router = () => {
    const { user } = useContext(AuthContext);

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/view/:id" element={<Home />} />
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
            <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
            <Route path="/howToUse" element={<HowToUse />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default Router;