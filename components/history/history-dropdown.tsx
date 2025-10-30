import Link from "next/link";
import { Button } from "../ui/button";
import { ChevronDown, HistoryIcon } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HistoryDropdownProps {
    workspaceId: string;
    branchId: string;
}

export default function HistoryDropdown({ workspaceId, branchId }: HistoryDropdownProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"outline"}>
                    <HistoryIcon />
                    View History
                    <ChevronDown />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <Link href={`/workspace/history/${workspaceId}`}>
                        <Button variant={"ghost"}>
                            <HistoryIcon />
                            Workspace History
                        </Button>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href={`/history/branch/${branchId}`}>
                        <Button variant={"ghost"}>
                            <HistoryIcon />
                            Branch History
                        </Button>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
