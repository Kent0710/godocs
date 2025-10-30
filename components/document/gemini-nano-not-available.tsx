"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export default function GeminiNanoNotAvailable() {
    return (
        <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
                The Proofreader API is not available in your browser. Please
                ensure you are using a compatible version of Chrome and have
                enabled the necessary flags.
            </AlertDescription>
        </Alert>
    );
}
