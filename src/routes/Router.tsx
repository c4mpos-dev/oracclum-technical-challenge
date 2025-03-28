import { Route, Routes } from "react-router-dom";

import { RedirectToHome } from "../components/RedirectToHome.tsx";
import { ProtectedRoutes } from "./ProtectedRoutes.tsx";
import { SignIn } from "../pages/signIn.tsx";
import { SignUp } from "../pages/signUp.tsx";

export function Router() { 
    return(
        <Routes>
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route element={<ProtectedRoutes />}>
                <Route path="/" element={<RedirectToHome />} />
            </Route>
        </Routes>
    );
}