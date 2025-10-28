import { ChevronRight } from "lucide-react";
import { WorkspaceType } from "../../lib/types";
import { Paragraph, SubHeading } from "../reusables/texts";
import Link from "next/link";

interface WorkspaceCardProps {
    workspace: WorkspaceType;
}

export function WorkspaceCard({ workspace }: WorkspaceCardProps) {
    return (
        <li className="p-4 rounded border">
            <Link href={`/workspace/${workspace.id}`}>
                {/* header  */}
                <div className="flex">
                    <SubHeading className="text-lg font-semibold">
                        {workspace.name}
                    </SubHeading>
                    <ChevronRight className="shrink-0" />
                </div>
                {/* description  */}
                {workspace.description && (
                    <Paragraph className="text-sm text-gray-600">
                        {workspace.description}
                    </Paragraph>
                )}
            </Link>
        </li>
    );
}
