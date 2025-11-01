import { twMerge } from "tailwind-merge";

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

export function PageContainer({ children, className }: ContainerProps) {
    return (
        <div className={twMerge("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-full w-full flex flex-col", className)}>
            {children}
        </div>
    );
}

export function PageContainerHeader({ children, className }: ContainerProps) {
    return (
        <header className={twMerge("mb-4", className)}>
            {children}
        </header>
    );
}

export function PageContainerMain({ children, className }: ContainerProps) {
    return (
        <main className={twMerge("flex-1", className)}>
            {children}
        </main>
    );
}