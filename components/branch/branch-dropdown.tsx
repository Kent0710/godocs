
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

import BranchDropdownItem from "./branch-dropdown-item";
import { BranchType } from "@/lib/types";

interface BranchDropdownProps {
    workspaceId: string;
    currentBranch?: string;
    workspaceBranches: BranchType[];
}

export function BranchDropdown({
    workspaceId,
    currentBranch,
    workspaceBranches,
}: BranchDropdownProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"outline"}>
                    <GitBranch /> {currentBranch} <ChevronDown />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Switch branches</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {workspaceBranches.length === 0 ? (
                    <DropdownMenuItem>No branches found</DropdownMenuItem>
                ) : (
                    workspaceBranches.map((branch) => (
                        <BranchDropdownItem
                            key={branch.id}
                            branch={branch}
                            workspaceId={workspaceId}
                            currentBranch={currentBranch}
                        />
                    ))
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
