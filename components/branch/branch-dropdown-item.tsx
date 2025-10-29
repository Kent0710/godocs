"use client";

import { useRouter } from "next/navigation";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { BranchType } from "@/lib/types";

interface BranchDropdownItemProps {
    workspaceId: string;
    currentBranch?: string;
    branch: BranchType;
}

export default function BranchDropdownItem({
    workspaceId,
    currentBranch,
    branch,
}: BranchDropdownItemProps) {
    const router = useRouter();

    const { name, id } = branch;

    const className =
        currentBranch === id || currentBranch === name ? "text-blue-500" : "";

    return (
        <DropdownMenuItem
            onSelect={() => {
                router.push(`/workspace/${workspaceId}?branch=${id}`);
            }}
            className={className}
        >
            {name}
        </DropdownMenuItem>
    );
}
