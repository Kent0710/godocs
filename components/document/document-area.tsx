"use client";

import { getBranchById } from "@/actions/branch/get-branches-action";
import {
    updateBranchContentAction,
    updateBranchAfterCommit,
} from "@/actions/branch/update-branch-content-action";

import { BranchType } from "@/lib/types";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import { toast } from "sonner";
import CommitDialog from "../commit/commit-dialog";
import ProofreadDocumentButton from "./proofread-document-button";
import GeminiNanoNotAvailable from "./gemini-nano-not-available";
import RewriteDocumentButton from "./rewrite-document-button";

export default function DocumentArea() {
    const pathname = usePathname();

    const editableRef = useRef<HTMLDivElement>(null);
    const [allowCommit, setAllowCommit] = useState(false);
    const [branchData, setBranchData] = useState<BranchType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const [isProofreading, setIsProofreading] = useState(false);
    const [isProofreaderApiAvailable, setIsProofreaderApiAvailable] =
        useState(true);
    const [proofreader, setProofreader] = useState<{
        proofread(text: string): Promise<{
            correctedInput: string;
            corrections: {
                startIndex: number;
                endIndex: number;
                replacement: string;
                label?: string;
                explanation?: string;
            }[];
        }>;
    } | null>(null);

    // Debounce timer ref
    const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const branchId = useSearchParams().get("branch");

    // Fetch branch data on mount
    useEffect(() => {
        async function fetchBranchData() {
            if (!branchId) {
                toast.error("Branch ID is missing in the URL");
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                const data = await getBranchById(branchId);

                if (!data) {
                    toast.error("Branch not found");
                    return;
                }

                if (data.oldContent !== data.newContent) {
                    setAllowCommit(true);
                }

                setBranchData(data);
            } catch (error) {
                console.error("Error fetching branch:", error);
                toast.error("Failed to load document");
            } finally {
                setIsLoading(false);
            }
        }

        fetchBranchData();
    }, [branchId]);

    useEffect(() => {
        async function initializeProofreader() {
            if (typeof Proofreader === "undefined") {
                setIsProofreaderApiAvailable(false);
                return;
            }
            try {
                if ((await Proofreader.availability()) === "available") {
                    const session = await Proofreader.create();
                    setProofreader(session);
                } else {
                    console.log("Proofreader not available");
                    setIsProofreaderApiAvailable(false);
                }
            } catch (error) {
                console.error("Failed to initialize proofreader:", error);
                toast.error("Could not initialize proofreader.");
                setIsProofreaderApiAvailable(false);
            }
        }
        initializeProofreader();
    }, []);

    // Set initial content
    useEffect(() => {
        if (
            branchData &&
            editableRef.current &&
            editableRef.current.innerHTML !== branchData.newContent
        ) {
            editableRef.current.innerHTML = branchData.newContent;
        }
    }, [branchData]);

    // Debounced save function
    const debouncedSave = useCallback(
        async (newContent: string) => {
            if (!branchId) return;

            try {
                setIsSaving(true);

                const workspaceId = pathname.split("/").pop();
                await updateBranchContentAction(
                    workspaceId!,
                    branchId,
                    newContent
                );

                if (branchData && branchData.oldContent !== newContent) {
                    setAllowCommit(true);
                } else {
                    setAllowCommit(false);
                }

                setLastSaved(new Date());
                toast.success("Document saved");
            } catch (error) {
                console.error("Error saving document:", error);
                toast.error("Failed to save document");
            } finally {
                setIsSaving(false);
            }
        },
        [branchData, branchId, pathname]
    );

    const handleInput = useCallback(() => {
        const newContent = editableRef.current?.innerHTML ?? "";

        // Update local state immediately
        setBranchData((prev) => (prev ? { ...prev, newContent } : prev));

        // Clear existing timeout
        if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
        }

        // Set new timeout to save after 2 seconds of inactivity
        saveTimeoutRef.current = setTimeout(() => {
            debouncedSave(newContent);
        }, 2000);
    }, [debouncedSave]);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (saveTimeoutRef.current) {
                clearTimeout(saveTimeoutRef.current);
            }
        };
    }, []);

    const handleProofread = async () => {
        if (!proofreader || !editableRef.current) {
            toast.info("Proofreader is not available or there is no content.");
            return;
        }

        setIsProofreading(true);
        try {
            const originalContent = editableRef.current.innerText;
            console.log("original content: ", originalContent);
            const result = await proofreader.proofread(originalContent);
            console.log("proofread result: ", result);

            if (editableRef.current) {
                editableRef.current.innerText = result.correctedInput;
                handleInput(); // Trigger save
            }

            toast.success("Document proofread successfully!");
        } catch (error) {
            console.error("Error proofreading document:", error);
            toast.error("Failed to proofread document.");
        } finally {
            setIsProofreading(false);
        }
    };

    const onCommitSuccess = async () => {
        setAllowCommit(false);
        if (branchData) {
            const workspaceId = pathname.split("/").pop();
            const updatedBranch = await updateBranchAfterCommit(
                workspaceId!,
                branchData.id,
                branchData.newContent
            );
            setBranchData(updatedBranch);
        }
    };

    // REWRITER
    const [isRewriting, setIsRewriting] = useState(false);
    const handleRewrite = async (
        tone: RewriterToneOption,
        format: RewriterFormatOption,
        additionalRewritePrompt: string
    ) => {
        setIsRewriting(true);

        toast.loading("Checking Rewrite AI model availability...");

        // Check if the Rewrite API (Gemini Nano) is available
        if (!("Rewriter" in self)) {
            toast.warning("Rewrite API not available.");
            return;
        }

        // plug in the rewriter token
        const otMeta = document.createElement("meta");
        otMeta.httpEquiv = "origin-trial";
        otMeta.content = process.env.NEXT_PUBLIC_REWRITER_ORIGIN_TRIAL_TOKEN!;
        document.head.append(otMeta);

        if (otMeta.content === "") {
            toast.error("Rewriter origin trial token is missing.");
            return;
        }

        const availability = await Rewriter.availability();
        if (availability === "unavailable") {
            toast.error(
                "Rewriter Gemini Nano model not available on this device."
            );
            return;
        }

        toast.dismiss();
        toast.message("Rewriting document using Gemini Nano...");

        const rewriter = await Rewriter.create({
            tone: tone,
            format: format,
            outputLanguage: "en",
        });

        const textToBeRewritten = editableRef.current?.innerText || "";
        const result = await rewriter.rewrite(textToBeRewritten, {
            context: additionalRewritePrompt,
        });

        if (editableRef.current) {
            editableRef.current.innerText = result;
            handleInput(); // Trigger save
        } else {
            toast.error("No content to rewrite.");
            return;
        }

        toast.success("Document rewritten successfully!");

        setIsRewriting(false);
    };

    if (isLoading) {
        return (
            <div className="w-[794px] h-[1123px] border mx-auto p-8 flex items-center justify-center">
                <p className="text-muted-foreground">Loading document...</p>
            </div>
        );
    }

    if (!branchData) {
        return (
            <div className="w-[794px] h-[1123px] border mx-auto p-8 flex items-center justify-center">
                <p className="text-muted-foreground">Document not found</p>
            </div>
        );
    }

    return (
        <div className="relative">
            {/* Save indicator */}
            <div className="absolute top-2 right-2 ">
                <div className="flex flex-col gap-2">
                    {isProofreaderApiAvailable ? (
                        <ProofreadDocumentButton
                            onProofread={handleProofread}
                            isProofreading={isProofreading}
                        />
                    ) : (
                        <GeminiNanoNotAvailable />
                    )}
                    <RewriteDocumentButton
                        onRewrite={handleRewrite}
                        isRewriting={isRewriting}
                    />

                    {allowCommit && (
                        <CommitDialog
                            branchId={branchData.id}
                            oldContent={branchData.oldContent}
                            newContent={branchData.newContent}
                            onCommitSuccess={onCommitSuccess}
                        />
                    )}
                </div>

                {isSaving ? (
                    <span className="flex items-center gap-2">
                        <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                        Saving...
                    </span>
                ) : lastSaved ? (
                    <div>
                        <span className="flex items-center gap-2 mt-4">
                            <span className="inline-block w-2 h-2 bg-green-500 rounded-full" />
                            Saved {lastSaved.toLocaleTimeString()}
                        </span>
                    </div>
                ) : null}
            </div>
            <div
                ref={editableRef}
                className="w-[794px] h-[1123px] border mx-auto p-8 focus:outline-none"
                contentEditable
                suppressContentEditableWarning
                onInput={handleInput}
                data-placeholder="Start typing..."
            />
        </div>
    );
}
