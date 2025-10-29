'use client'

import { cn } from "@/lib/utils";

interface DiffLineProps {
    line: string;
    lineNumber: number;
    type: 'added' | 'removed' | 'unchanged' | 'modified';
    isLeft?: boolean;
}

export function DiffLine({ line, lineNumber, type, isLeft = false }: DiffLineProps) {
    const getLineStyles = () => {
        switch (type) {
            case 'added':
                return 'bg-green-50 border-l-2 border-l-green-500 dark:bg-green-950/30';
            case 'removed':
                return 'bg-red-50 border-l-2 border-l-red-500 dark:bg-red-950/30';
            case 'modified':
                return isLeft 
                    ? 'bg-red-50 border-l-2 border-l-red-500 dark:bg-red-950/30'
                    : 'bg-green-50 border-l-2 border-l-green-500 dark:bg-green-950/30';
            default:
                return 'hover:bg-muted/50';
        }
    };

    const getLineNumberStyles = () => {
        switch (type) {
            case 'added':
                return 'text-green-600 dark:text-green-400';
            case 'removed':
                return 'text-red-600 dark:text-red-400';
            case 'modified':
                return isLeft 
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-green-600 dark:text-green-400';
            default:
                return 'text-muted-foreground';
        }
    };

    const getPrefixSymbol = () => {
        switch (type) {
            case 'added':
                return '+';
            case 'removed':
                return '-';
            case 'modified':
                return isLeft ? '-' : '+';
            default:
                return ' ';
        }
    };

    return (
        <div className={cn(
            "flex font-mono text-sm min-h-[1.5rem] group",
            getLineStyles()
        )}>
            <div className={cn(
                "w-12 px-2 py-1 text-right select-none border-r bg-muted/30 shrink-0",
                getLineNumberStyles()
            )}>
                {lineNumber > 0 ? lineNumber : ''}
            </div>
            <div className="w-6 px-1 py-1 text-center select-none border-r bg-muted/30 shrink-0 text-muted-foreground">
                {getPrefixSymbol()}
            </div>
            <div className="px-4 py-1 flex-1 whitespace-pre-wrap break-words">
                {line || ' '}
            </div>
        </div>
    );
}