"use client";

import { useEffect, useState } from "react";

export default function TestPage() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        function checkAPI() {
            if (!("Summarizer" in self)) {
                setMessage("Summarizer API is not supported in this browser.");
            } else {
                setMessage("Summarizer API is supported!");
            }
        }

        checkAPI();
    }, []);

    return <div>{message}</div>;
}
