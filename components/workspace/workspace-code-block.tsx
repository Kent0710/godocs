"use client";

import { getWorkspaceCode } from "@/actions/workspace/get-workspaces";
import { Button } from "../ui/button";
import { Copy} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface WorkspaceCodeBlockProps {
    workspaceId: string;
}

export default function WorkspaceCodeBlock({
    workspaceId,
}: WorkspaceCodeBlockProps) {
    const [ready, setIsReady] = useState(false);
    const [code, setCode] = useState("");

    useEffect(() => {
        async function handleGetWorkspaceCode() {
            if (!workspaceId) return;

            const code = await getWorkspaceCode(workspaceId);
            setCode(code);
            setIsReady(true);
        }

        handleGetWorkspaceCode();

        return () => {
            setCode("");
        };
    }, [workspaceId]);

    // copy when clicked
    const handleClick = () => {
        navigator.clipboard.writeText(code);
        toast.success("Workspace code copied to clipboard!");
    };

    return (
        <Button variant={"outline"} onClick={handleClick}>
            {ready ? (
                <>
                    <Copy />
                    <span>{code}</span>
                </>
            ) : (
                <>Loading code...</>
            )}
        </Button>
    );
}
