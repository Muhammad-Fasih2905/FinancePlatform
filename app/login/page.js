//app/login/page.js

export const metadata = {
    title: "Log in Free Finance Education | Finance Platform Demo",
    description: "Sign in to track your progress, unlock modules and earn certificates. Free, private, and no real account required.",
    keywords: "login, finance learning, free courses, progress tracking",
    robots: "index, follow",
};


import { Suspense } from "react";
import LoginContent from "../components/loginComp/LoginContent";

export default function LoginPage() {

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginContent />
        </Suspense>
    );
}