import { Route, Routes } from "react-router-dom";

import { RedirectToHome } from "../components/RedirectToHome.tsx";
import { ProtectedRoutes } from "./ProtectedRoutes.tsx";

import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { Questions } from "../pages/Questions";

export function Router() { 
    return (
        <Routes>
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route element={<ProtectedRoutes />}>
                <Route path="/" element={<RedirectToHome />} />
                <Route path="/questions" element={<Questions />} />
            </Route>
        </Routes>
    );
}