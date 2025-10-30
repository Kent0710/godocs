"use client";

import { Button } from "../ui/button";
import { Sparkles, Loader } from "lucide-react";

type ProofreadDocumentButtonProps = {
    onProofread: () => void;
    isProofreading: boolean;
};

export default function ProofreadDocumentButton({
    onProofread,
    isProofreading,
}: ProofreadDocumentButtonProps) {
    return (
        <Button
            variant={"special"}
            onClick={onProofread}
            disabled={isProofreading}
        >
            {isProofreading ? (
                <>
                    <Loader className="animate-spin mr-2" /> Proofreading...
                </>
            ) : (
                <>
                    <Sparkles fill="white" /> Proofread 
                </>
            )}
        </Button>
    );
}
