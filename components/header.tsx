"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "./ui/button";
import { BookOpen, ChevronDown, Home, LogOut, User } from "lucide-react";
import Link from "next/link";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { getUsername } from "@/actions/user/get-username";
import { signOut } from "@/actions/auth";
import { ThemeToggle } from "./ui/theme-toggle";

import Image from "next/image";
import GODUXLOGO from "@/public/godux-logo.png";

interface HeaderProps {
    className?: string;
}

export default function Header({ className }: HeaderProps) {
    const [username, setUsername] = useState<string>("");

    const router = useRouter();

    const pathname = usePathname();
    const navs = useMemo(
        () => [
            {
                label: "Home",
                icon: Home,
                href: "/home",
                active: pathname === "/home",
            },
            {
                label: "Documentation",
                icon: BookOpen,
                href: "/documentation",
                active: pathname === "/documentation",
            },
        ],
        [pathname]
    );

    useEffect(() => {
        async function fetchUsername() {
            const name = await getUsername();
            setUsername(name);
        }

        fetchUsername();
    }, []);

    return (
        <header
            className={twMerge(
                `flex items-center justify-between w-full py-2 px-8 border-b bg-card text-card-foreground`,
                className
            )}
        >
            {/* left section  */}
            <section className="flex items-center gap-16">
                <div className="flex items-center gap-2">
                    <Image
                        src={GODUXLOGO}
                        alt="Godux Logo"
                        width={40}
                        height={40}
                        className="w-5 h-5"
                    />
                    <p className="font-bold text-blue-600">godux</p>
                </div>

                <ul className="flex items-center gap-10">
                    {navs.map((nav) => (
                        <li
                            key={nav.href}
                            className={twMerge('flex items-center gap-2', nav.active ? "text-blue-600 font-medium border-b pb-0.5 rounded-b-sm px-1" : "")}
                        >
                            <nav.icon
                                className="w-4 h-4"
                            />
                            <Link href={nav.href}>{nav.label}</Link>
                        </li>
                    ))}
                </ul>
            </section>

            {/* right section  */}
            <section className="flex items-center gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant={"outline"}
                            className="bg-gradient-to-r from-blue-500 via-pink-500 border-white to-purple-500 text-white hover:text-white/80"
                        >
                            <User /> {username}
                            <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <Button
                            variant={"ghost"}
                            className="border-none shadow-none"
                            onClick={async () => {
                                await signOut();
                                router.push("/signIn");
                            }}
                        >
                            <LogOut /> Sign Out
                        </Button>
                    </DropdownMenuContent>
                </DropdownMenu>
                <ThemeToggle />
            </section>
        </header>
    );
}
