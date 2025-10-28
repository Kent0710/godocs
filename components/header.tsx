"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "./ui/button";
import { User } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
    className?: string;
}

export default function Header({ className }: HeaderProps) {
    const pathname = usePathname();
    const navs = useMemo(
        () => [{ label: "Home", href: "/home", active: pathname === "/home" }],
        [pathname]
    );

    return (
        <header
            className={twMerge(
                `flex items-center justify-between w-full py-2 px-8 border-b`,
                className
            )}
        >
            {/* left section  */}
            <section className="flex items-center gap-10">
                <p className="font-bold">GOODOCS</p>

                <ul>
                    {navs.map((nav) => (
                        <li
                            key={nav.href}
                            className={twMerge(nav.active ? "underline" : "")}
                        >
                            <Link href={nav.href}>{nav.label}</Link>
                        </li>
                    ))}
                </ul>
            </section>

            {/* right section  */}
            <section>
                <Button variant={"outline"}>
                    <User /> John Doe
                </Button>
            </section>
        </header>
    );
}
