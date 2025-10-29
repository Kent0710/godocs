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

import { getWorkspaceBranches } from "@/actions/branch/get-branches-action";
import BranchDropdownItem from "./branch-dropdown-item";

interface BranchDropdownProps {
    workspaceId: string;
    currentBranch?: string;
}

export async function BranchDropdown({
    workspaceId,
    currentBranch,
}: BranchDropdownProps) {
    const branches = await getWorkspaceBranches(workspaceId);

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
                {branches.length === 0 ? (
                    <DropdownMenuItem>No branches found</DropdownMenuItem>
                ) : (
                    branches.map((branch) => (
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
