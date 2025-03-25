import { Routes, Route } from "react-router-dom"

import { SignIn } from "./pages/signIn.tsx";

export function Router() {
    return (
        <Routes>
            <Route path="/home.html" />
            <Route path="/login" element={<SignIn />}/>
        </Routes>
    );
}