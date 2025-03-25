import { Routes, Route } from "react-router-dom"

import { SignIn } from "./pages/signIn.tsx";
import { RedirectToHome } from "./components/RedirectToHome.tsx";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<RedirectToHome />}/>
            <Route path="/login" element={<SignIn />}/>
        </Routes>
    );
}