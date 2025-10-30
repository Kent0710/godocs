"use client";

import { useEffect, useState } from "react";

interface RewriteOptions {
    tone?: "more-formal" | "as-is" | "more-casual";
    context?: string;
}

interface RewriterInstance {
    rewrite(input: string, options?: RewriteOptions): Promise<string>;
    rewriteStreaming(input: string, options?: RewriteOptions): AsyncGenerator<string>;
    destroy(): void;
}

interface RewriterCreateOptions {
    monitor?: (m: {
        addEventListener: (
            type: "downloadprogress",
            listener: (event: { loaded: number; total: number }) => void,
        ) => void;
    }) => void;
}

interface Rewriter {
    availability(): Promise<"available" | "after-download" | "no" | "readily">;
    create(options?: RewriterCreateOptions): Promise<RewriterInstance>;
}

declare global {
    interface Window {
        Rewriter: Rewriter;
    }
}

type RewriterStatus = "unsupported" | "checking" | "ready" | "requires_download" | "downloading" | "error";

export default function TestPage() {
    const [message, setMessage] = useState("");
    const [rewriter, setRewriter] = useState<RewriterInstance | null>(null);
    const [inputText, setInputText] = useState("This is a test, can you make it more formal?");
    const [outputText, setOutputText] = useState("");
    const [isRewriting, setIsRewriting] = useState(false);
    const [status, setStatus] = useState<RewriterStatus>("checking");

    useEffect(() => {
        async function checkAvailability() {
            if (!("Rewriter" in self)) {
                setStatus("unsupported");
                setMessage("Rewriter API is not supported in this browser.");
                return;
            }

            try {
                const availability = await (self as any).Rewriter.availability();
                if (availability === "available" || availability === "readily") {
                    const rewriterInstance = await (self as any).Rewriter.create();
                    setRewriter(rewriterInstance);
                    setStatus("ready");
                    setMessage("Rewriter is ready.");
                } else {
                    setStatus("requires_download");
                    setMessage(`Rewriter model needs to be downloaded.`);
                }
            } catch (error) {
                console.error(error);
                setStatus("error");
                setMessage("Error checking rewriter availability.");
            }
        }

        checkAvailability();
    }, []);

    const handleCreateRewriter = async () => {
        setStatus("downloading");
        setMessage("Downloading model...");
        try {
            const rewriterInstance = await (self as any).Rewriter.create({
                monitor(m: any) {
                    m.addEventListener("downloadprogress", (e: any) => {
                        console.log(`Downloaded ${e.loaded * 100}%`);
                        setMessage(`Downloading model: ${Math.round((e.loaded / e.total) * 100)}%`);
                    });
                },
            });
            setRewriter(rewriterInstance);
            setStatus("ready");
            setMessage("Rewriter is ready after download.");
        } catch (error) {
            console.error(error);
            setStatus("error");
            setMessage("Error setting up rewriter.");
        }
    };

    const handleRewrite = async () => {
        if (!rewriter) {
            setMessage("Rewriter not initialized.");
            return;
        }
        setIsRewriting(true);
        setOutputText("");
        try {
            const result = await rewriter.rewrite(inputText, {
                tone: "more-formal",
            });
            setOutputText(result);
        } catch (error) {
            console.error(error);
            setOutputText("Error rewriting text.");
        } finally {
            setIsRewriting(false);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Rewriter API Test</h1>
            <p className="text-gray-600">{message}</p>

            {status === "requires_download" && (
                <button
                    onClick={handleCreateRewriter}
                    className="px-4 py-2 my-4 font-bold text-white bg-green-500 rounded hover:bg-green-700"
                >
                    Download and Initialize Rewriter
                </button>
            )}

            {status === "ready" && (
                <>
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        rows={5}
                        cols={50}
                        className="w-full p-2 my-4 border border-gray-300 rounded"
                    />
                    <br />
                    <button
                        onClick={handleRewrite}
                        disabled={!rewriter || isRewriting}
                        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 disabled:bg-gray-400"
                    >
                        {isRewriting ? "Rewriting..." : "Rewrite (more formal)"}
                    </button>
                    <br />
                    <h2 className="mt-4 text-xl font-bold">Output:</h2>
                    <p className="p-2 bg-gray-100 border border-gray-200 rounded">{outputText}</p>
                </>
            )}
        </div>
    );
}
