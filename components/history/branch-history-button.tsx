import Link from "next/link";
import { Button } from "../ui/button";
import { HistoryIcon } from "lucide-react";

interface BranchHistoryButtonProps {
    branchId: string;
}

export default function BranchHistoryButton({ branchId }: BranchHistoryButtonProps) {
    return (
        <Link href={`/history/branch/${branchId}`}>
            <Button variant={"outline"}>
                <HistoryIcon />
                Branch History
            </Button>
        </Link>
    );
}
