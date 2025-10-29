import { keyframes } from "@emotion/react";
export const animateLogo = keyframes`
    0%, 40%, 100% {
        transform: translateY(0);
    }
    20% {
        transform: translateY(-10px);
    }
`;
export const lettersLogo = ["F", "r", "e", "s", "h", "C", "a", "r", "t"];


export const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Dashboard", path: "/dashboard" },
];
