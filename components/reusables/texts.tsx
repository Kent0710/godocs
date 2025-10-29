import { ReactNode } from "react";

interface TextProps {
    children: ReactNode;
    className?: string;
}

export function Title({ children, className }: TextProps) {
    return <h1 className={`${className} text-2xl font-semibold`}>{children}</h1>;
}

export function Subtitle({ children, className }: TextProps) {
    return (
        <h2 className={`${className} text-xl font-semibold`}>{children}</h2>
    );
}

export function SubHeading({ children, className }: TextProps) {
    return <h3 className={`${className} text-lg font-medium`}>{children}</h3>;
}

export function Paragraph({ children, className }: TextProps) {
    return <p className={`${className} text-base`}>{children}</p>;
}
