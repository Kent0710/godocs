import { MergeIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

interface MergeProps {
    workspaceId?: string;
}

export default async function Merge({workspaceId}: MergeProps) {
    return (
        <Link href={`/workspace/merge/${workspaceId}`}>
            <Button variant={"outline"}>
                <MergeIcon />
                Merge Requests
            </Button>
        </Link>
    );
}
