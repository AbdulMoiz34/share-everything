import { Routes, Route } from "react-router-dom";
import { Home, HowToUse, Login, NotFound } from "../pages";
import { Signup } from "../pages/Auth";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/howToUse" element={<HowToUse />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default Router;