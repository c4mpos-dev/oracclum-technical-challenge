import { useEffect } from "react";

export function RedirectToHome() {
    useEffect(() => {
        window.location.href = "/home.html";
    }, []);

    return null;
};
