import {
    PageContainer,
    PageContainerHeader,
    PageContainerMain,
} from "@/components/reusables/containers";
import { Title, Paragraph, SubHeading } from "@/components/reusables/texts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
    GitBranch, 
    GitCommit, 
    GitMerge, 
    Users, 
    FileText, 
    Sparkles,
    CheckCircle,
    Code,
    Bot
} from "lucide-react";

export default function DocumentationPage() {
    return (
        <PageContainer>
            <PageContainerHeader>
                <Title>Documentation</Title>
                <Paragraph>
                    Learn how to use GoodDocs - a collaborative document editing platform 
                    with advanced version control and AI-powered features.
                </Paragraph>
            </PageContainerHeader>

            <PageContainerMain className="space-y-8">
                {/* Overview Section */}
                <section>
                    <SubHeading className="mb-4">What is GoodDocs?</SubHeading>
                    <Card>
                        <CardContent className="pt-6">
                            <Paragraph>
                                GoodDocs is a collaborative document editing platform that combines 
                                the power of Git-style version control with AI-enhanced writing tools. 
                                It allows teams to work together on documents while maintaining full 
                                history, branching capabilities, and automated content improvements.
                            </Paragraph>
                        </CardContent>
                    </Card>
                </section>

                {/* Core Concepts */}
                <section>
                    <SubHeading className="mb-4">Core Concepts</SubHeading>
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="h-5 w-5" />
                                    Workspaces
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Paragraph>
                                    Workspaces are collaborative environments where teams can work on 
                                    documents together. Each workspace has a unique code for easy sharing 
                                    and contains multiple branches for different versions of content.
                                </Paragraph>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <GitBranch className="h-5 w-5" />
                                    Branches
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Paragraph>
                                    Branches allow you to work on different versions of your document 
                                    simultaneously. Create feature branches for new content, experiment 
                                    with changes, or work on different sections independently.
                                </Paragraph>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <GitCommit className="h-5 w-5" />
                                    Commits
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Paragraph>
                                    Commits save snapshots of your work with descriptive messages. 
                                    They create a permanent history of changes and allow you to 
                                    revert to previous versions when needed.
                                </Paragraph>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <GitMerge className="h-5 w-5" />
                                    Merge Requests
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Paragraph>
                                    Merge requests propose changes from one branch to another. 
                                    They include automated content analysis and provide a 
                                    collaborative review process before integrating changes.
                                </Paragraph>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Getting Started */}
                <section>
                    <SubHeading className="mb-4">Getting Started</SubHeading>
                    <div className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>1. Create or Join a Workspace</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Paragraph>
                                    <strong>Create New:</strong> Start a new workspace from the dashboard 
                                    by providing a name and description.
                                </Paragraph>
                                <Paragraph>
                                    <strong>Join Existing:</strong> Use a workspace code to join an 
                                    existing collaborative workspace.
                                </Paragraph>
                                <Badge variant="outline">💡 Tip: Workspace codes make sharing easy!</Badge>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>2. Understanding the Interface</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Paragraph>
                                    <strong>Branch Selector:</strong> Switch between different document versions
                                </Paragraph>
                                <Paragraph>
                                    <strong>Document Area:</strong> Rich text editor with real-time auto-save
                                </Paragraph>
                                <Paragraph>
                                    <strong>AI Tools:</strong> Proofread, rewrite, and generate content
                                </Paragraph>
                                <Paragraph>
                                    <strong>Version Controls:</strong> Commit, merge, and history management
                                </Paragraph>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Document Editing */}
                <section>
                    <SubHeading className="mb-4">Document Editing Features</SubHeading>
                    <div className="grid md:grid-cols-3 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="h-5 w-5" />
                                    Real-time Editing
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm">
                                    <li>• Auto-save every few seconds</li>
                                    <li>• Rich text formatting</li>
                                    <li>• Visual diff highlighting</li>
                                    <li>• Undo/redo support</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Sparkles className="h-5 w-5" />
                                    AI-Powered Tools
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm">
                                    <li>• Proofread for grammar/style</li>
                                    <li>• Rewrite for clarity</li>
                                    <li>• Generate new content</li>
                                    <li>• Smart suggestions</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5" />
                                    Change Tracking
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm">
                                    <li>• Visual change indicators</li>
                                    <li>• Commit when ready</li>
                                    <li>• Revert to any version</li>
                                    <li>• Compare versions</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Version Control Workflow */}
                <section>
                    <SubHeading className="mb-4">Version Control Workflow</SubHeading>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                                        <GitBranch className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-2">1. Create a Branch</h4>
                                        <Paragraph>
                                            Start working on a new feature or section by creating a branch. 
                                            This keeps your changes isolated until they&apos;re ready.
                                        </Paragraph>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                                        <FileText className="h-4 w-4 text-green-600 dark:text-green-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-2">2. Edit & Save</h4>
                                        <Paragraph>
                                            Make your changes in the document editor. Content is auto-saved, 
                                            and you&apos;ll see visual indicators of what&apos;s changed.
                                        </Paragraph>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full">
                                        <GitCommit className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-2">3. Commit Changes</h4>
                                        <Paragraph>
                                            When satisfied with your changes, commit them with a descriptive 
                                            message. This creates a permanent snapshot in the version history.
                                        </Paragraph>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-orange-100 dark:bg-orange-900 p-2 rounded-full">
                                        <GitMerge className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-2">4. Create Merge Request</h4>
                                        <Paragraph>
                                            Propose your changes by creating a merge request. This triggers 
                                            automated content analysis and allows team review.
                                        </Paragraph>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Merge Requests & Automation */}
                <section>
                    <SubHeading className="mb-4">Merge Requests & Automation</SubHeading>
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Merge Request Process</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Paragraph>
                                    <strong>Create:</strong> Submit changes with title and description
                                </Paragraph>
                                <Paragraph>
                                    <strong>Review:</strong> Team members can review and comment
                                </Paragraph>
                                <Paragraph>
                                    <strong>Automate:</strong> AI analyzes content automatically
                                </Paragraph>
                                <Paragraph>
                                    <strong>Accept:</strong> Merge approved changes into target branch
                                </Paragraph>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Bot className="h-5 w-5" />
                                    Automation Features
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Paragraph>
                                    <strong>Proofreading:</strong> Automatic grammar and style checking
                                </Paragraph>
                                <Paragraph>
                                    <strong>Summarization:</strong> AI-generated content summaries
                                </Paragraph>
                                <Paragraph>
                                    <strong>Custom Automations:</strong> Configure per-branch automation rules
                                </Paragraph>
                                <Badge variant="secondary">Powered by AI</Badge>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* History & Navigation */}
                <section>
                    <SubHeading className="mb-4">History & Navigation</SubHeading>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold mb-3">Branch History</h4>
                                    <ul className="space-y-2 text-sm">
                                        <li>• View all commits for a branch</li>
                                        <li>• See detailed change descriptions</li>
                                        <li>• Revert to any previous commit</li>
                                        <li>• Compare different versions</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-3">Merge History</h4>
                                    <ul className="space-y-2 text-sm">
                                        <li>• Track all merge requests</li>
                                        <li>• View automation results</li>
                                        <li>• Revert to previous merges</li>
                                        <li>• Understand change evolution</li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Best Practices */}
                <section>
                    <SubHeading className="mb-4">Best Practices</SubHeading>
                    <div className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Collaboration Tips</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Paragraph>
                                    <strong>Use Descriptive Branch Names:</strong> Name branches after features 
                                    or sections (e.g., &ldquo;chapter-3-revision&rdquo;, &ldquo;marketing-copy&rdquo;)
                                </Paragraph>
                                <Paragraph>
                                    <strong>Commit Often:</strong> Make frequent commits with clear messages 
                                    to track your progress and facilitate collaboration
                                </Paragraph>
                                <Paragraph>
                                    <strong>Review Before Merging:</strong> Use merge requests to ensure 
                                    quality and get team input on changes
                                </Paragraph>
                                <Paragraph>
                                    <strong>Leverage AI Tools:</strong> Use proofreading and rewriting features 
                                    to improve content quality before committing
                                </Paragraph>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Workflow Organization</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Paragraph>
                                    <strong>Main Branch:</strong> Keep the main branch stable and polished
                                </Paragraph>
                                <Paragraph>
                                    <strong>Feature Branches:</strong> Create separate branches for different 
                                    features, chapters, or experimental content
                                </Paragraph>
                                <Paragraph>
                                    <strong>Regular Merging:</strong> Merge completed features back to main 
                                    regularly to avoid conflicts
                                </Paragraph>
                                <Paragraph>
                                    <strong>Automation Setup:</strong> Configure branch automations to 
                                    maintain content quality automatically
                                </Paragraph>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Technical Features */}
                <section>
                    <SubHeading className="mb-4">Technical Features</SubHeading>
                    <div className="grid md:grid-cols-3 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Code className="h-5 w-5" />
                                    Platform
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm">
                                    <li>• Built with Next.js & React</li>
                                    <li>• Firebase backend</li>
                                    <li>• Real-time synchronization</li>
                                    <li>• Responsive design</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Sparkles className="h-5 w-5" />
                                    AI Integration
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm">
                                    <li>• Chrome AI (Gemini Nano)</li>
                                    <li>• Local processing</li>
                                    <li>• Privacy-focused</li>
                                    <li>• Offline capabilities</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5" />
                                    Security
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm">
                                    <li>• User authentication</li>
                                    <li>• Workspace access control</li>
                                    <li>• Data encryption</li>
                                    <li>• Secure collaboration</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </PageContainerMain>
        </PageContainer>
    );
}