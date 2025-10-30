import { CommitType } from "@/lib/types";
import { Button } from "../ui/button";
import { FileClock } from "lucide-react";
import Link from "next/link";
import { RevertToCommitButton } from "../commit/revert-to-commit-button";

interface BranchHistoryItemProps {
    // Every item is just a commit item
    commit: CommitType;
}

export function BranchHistoryItem({ commit }: BranchHistoryItemProps) {
    return (
        <li className="flex items-center justify-between">
            {/* left section  */}

            <section className="flex items-center gap-3">
                <div className="w-8 h-8 bg-black rounded-full" />
                <div>
                    <p className="font-semibold">{commit.title}</p>
                    <p className="text-muted-foreground">
                        {commit.description}
                    </p>
                </div>
            </section>

            {/* right section */}
            <section className="flex items-center gap-2">
                <RevertToCommitButton 
                    branchId={commit.branchId} 
                    content={commit.content}
                />
                <Link href={`/commit/${commit.id}`}>
                    <Button variant={"outline"}>
                        <FileClock />
                        See Changes
                    </Button>
                </Link>
            </section>
        </li>
    );
}
