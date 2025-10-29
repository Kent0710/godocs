import Link from "next/link";
import { Button } from "../ui/button";
import { HistoryIcon } from "lucide-react";

interface HistoryProps {
    workspaceId: string;
}

export default function History({ workspaceId }: HistoryProps) {
    return (
        <Link href={`/workspace/history/${workspaceId}`}>
            <Button variant={'outline'}>
                <HistoryIcon />
                History
            </Button>
        </Link>
    );
}
