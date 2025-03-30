import { useEffect } from "react";

export function RedirectToHome() {
    useEffect(() => {
        window.location.href = "/index.html";
    }, []);

    return null;
};
