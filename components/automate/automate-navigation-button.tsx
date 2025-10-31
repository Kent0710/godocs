import { Workflow } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

interface AutomateNavigationButtonProps {
    workspaceId: string;
}

export function AutomateNavigationButton({
    workspaceId,
}: AutomateNavigationButtonProps) {
    return (
        <Link href={`/automate/workspace/${workspaceId}`}>
            <Button variant={"outline"}>
                <Workflow className="w-4 h-4" />
                Automate
            </Button>
        </Link>
    );
}
