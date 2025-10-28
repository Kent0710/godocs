"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { GitBranch, ChevronDown } from "lucide-react";

import { useRouter } from "next/navigation";

interface BranchDropdownProps {
    workspaceId: string;
    currentBranch?: string;
}

export function BranchDropdown({ workspaceId, currentBranch = 'main' }: BranchDropdownProps) {
    const router = useRouter();
    const branches = ["main", "introduction", "review-of-related-literature"];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"outline"}>
                    <GitBranch /> main <ChevronDown />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Switch branches</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {branches.map((branch) => (
                    <DropdownMenuItem
                        key={branch}
                        onSelect={() => {
                            router.push(
                                `/workspace/${workspaceId}?branch=${branch}`
                            );
                        }}
                        className={currentBranch === branch ? "text-blue-500" : ""}
                    >
                        {branch}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
