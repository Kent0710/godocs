"use client";

import { getBranchById } from "@/actions/branch/get-branches-action";
import { updateBranchContentAction } from "@/actions/branch/update-branch-content-action";
// import { updateBranchContent } from "@/actions/branch/update-branch-action"; // Your save action
import { BranchType } from "@/lib/types";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import { toast } from "sonner";
import CommitDialog from "../commit/commit-dialog";

export default function DocumentArea() {
    const pathname = usePathname();

    const editableRef = useRef<HTMLDivElement>(null);
    const [allowCommit, setAllowCommit] = useState(false);
    const [branchData, setBranchData] = useState<BranchType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);

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
                    newContent,
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
                <div>
                    {allowCommit && (
                        <CommitDialog />
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
