"use client";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";

import { setSession } from "@/actions/auth";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
    const router = useRouter();

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const idToken = await result.user.getIdToken();

        const sessionResult = await setSession(idToken);
        if (sessionResult.status === "success") {
            router.push("/home");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-dvh">
            <Button onClick={handleGoogleSignIn}>
                <FaGoogle />
                Sign in with Google
            </Button>
        </div>
    );
}
