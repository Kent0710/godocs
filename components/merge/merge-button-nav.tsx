import { MergeIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

interface MergeButtonNavProps {
    workspaceId?: string;
}

export default async function MergeButtonNav({workspaceId}: MergeButtonNavProps) {
    return (
        <Link href={`/workspace/merge/${workspaceId}`}>
            <Button variant={"outline"}>
                <MergeIcon />
                Merge Requests
            </Button>
        </Link>
    );
}
