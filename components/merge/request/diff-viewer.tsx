'use client'

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DiffLine } from "@/components/merge/request/diff-line";
import { BranchType } from "@/lib/types";

export interface DocumentVersion {
    title?: string;
    lines: string[];
    branch?: string;
}

export interface BranchWithLines extends BranchType, DocumentVersion {}

export interface DiffData {
    type: 'added' | 'removed' | 'unchanged' | 'modified';
    mainLine: string;
    featureLine: string;
    mainLineNumber: number;
    featureLineNumber: number;
}

interface DiffViewerProps {
    leftDocument: DocumentVersion;
    rightDocument: DocumentVersion;
    className?: string;
}

function generateDiffData(leftLines: string[], rightLines: string[]): DiffData[] {
    const diffData: DiffData[] = [];
    let leftIndex = 0;
    let rightIndex = 0;
    
    while (leftIndex < leftLines.length || rightIndex < rightLines.length) {
        const leftLine = leftLines[leftIndex] || '';
        const rightLine = rightLines[rightIndex] || '';
        
        // If we've reached the end of one array, handle remaining lines
        if (leftIndex >= leftLines.length) {
            // Only right lines remain - they are added
            diffData.push({
                type: 'added',
                mainLine: '',
                featureLine: rightLine,
                mainLineNumber: -1,
                featureLineNumber: rightIndex + 1
            });
            rightIndex++;
        } else if (rightIndex >= rightLines.length) {
            // Only left lines remain - they are removed
            diffData.push({
                type: 'removed',
                mainLine: leftLine,
                featureLine: '',
                mainLineNumber: leftIndex + 1,
                featureLineNumber: -1
            });
            leftIndex++;
        } else if (leftLine === rightLine) {
            // Lines are identical
            diffData.push({
                type: 'unchanged',
                mainLine: leftLine,
                featureLine: rightLine,
                mainLineNumber: leftIndex + 1,
                featureLineNumber: rightIndex + 1
            });
            leftIndex++;
            rightIndex++;
        } else {
            // Lines are different - look ahead to see if we can find a match
            let foundMatch = false;
            
            // Look ahead in right array to see if current left line appears later
            for (let j = rightIndex + 1; j < Math.min(rightIndex + 5, rightLines.length); j++) {
                if (leftLines[leftIndex] === rightLines[j]) {
                    // Found left line later in right - means lines were inserted
                    diffData.push({
                        type: 'added',
                        mainLine: '',
                        featureLine: rightLine,
                        mainLineNumber: -1,
                        featureLineNumber: rightIndex + 1
                    });
                    rightIndex++;
                    foundMatch = true;
                    break;
                }
            }
            
            if (!foundMatch) {
                // Look ahead in left array to see if current right line appears later
                for (let j = leftIndex + 1; j < Math.min(leftIndex + 5, leftLines.length); j++) {
                    if (rightLines[rightIndex] === leftLines[j]) {
                        // Found right line later in left - means lines were removed
                        diffData.push({
                            type: 'removed',
                            mainLine: leftLine,
                            featureLine: '',
                            mainLineNumber: leftIndex + 1,
                            featureLineNumber: -1
                        });
                        leftIndex++;
                        foundMatch = true;
                        break;
                    }
                }
            }
            
            if (!foundMatch) {
                // No match found in lookahead - treat as modified
                diffData.push({
                    type: 'modified',
                    mainLine: leftLine,
                    featureLine: rightLine,
                    mainLineNumber: leftIndex + 1,
                    featureLineNumber: rightIndex + 1
                });
                leftIndex++;
                rightIndex++;
            }
        }
    }
    
    return diffData;
}

export function DiffViewer({ leftDocument, rightDocument, className }: DiffViewerProps) {
    const diffData = generateDiffData(leftDocument.lines, rightDocument.lines);
    
    const stats = diffData.reduce(
        (acc, item) => {
            if (item.type === 'added') acc.additions++;
            else if (item.type === 'removed') acc.deletions++;
            else if (item.type === 'modified') {
                acc.additions++;
                acc.deletions++;
            }
            return acc;
        },
        { additions: 0, deletions: 0 }
    );

    return (
        <div className={`flex flex-col gap-4 flex-1 ${className || ''}`}>
            {/* Diff Stats */}
            <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg border">
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 dark:bg-green-950/30 dark:border-green-800">
                        +{stats.additions} additions
                    </Badge>
                    <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50 dark:bg-red-950/30 dark:border-red-800">
                        -{stats.deletions} deletions
                    </Badge>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <span className="text-sm text-muted-foreground">
                    {diffData.length} lines total
                </span>
            </div>

            {/* Side-by-side diff viewer */}
            <div className="border rounded-lg overflow-hidden">
                {/* Header */}
                <div className="grid grid-cols-2 bg-muted/50 border-b">
                    <div className="p-3 border-r">
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="font-mono text-xs">
                                {leftDocument.branch || 'left'}
                            </Badge>
                            <span className="font-medium text-sm">
                                {leftDocument.title}
                            </span>
                        </div>
                    </div>
                    <div className="p-3">
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="font-mono text-xs">
                                {rightDocument.branch || 'right'}
                            </Badge>
                            <span className="font-medium text-sm">
                                {rightDocument.title}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Diff content */}
                <div className="grid grid-cols-2">
                    {/* Left side */}
                    <div className="border-r">
                        {diffData.map((item, index) => (
                            <DiffLine
                                key={`left-${index}`}
                                line={item.mainLine}
                                lineNumber={item.mainLineNumber}
                                type={item.type === 'added' ? 'unchanged' : item.type}
                                isLeft={true}
                            />
                        ))}
                    </div>

                    {/* Right side */}
                    <div>
                        {diffData.map((item, index) => (
                            <DiffLine
                                key={`right-${index}`}
                                line={item.featureLine}
                                lineNumber={item.featureLineNumber}
                                type={item.type === 'removed' ? 'unchanged' : item.type}
                                isLeft={false}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}