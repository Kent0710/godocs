"use client";

import Image from "next/image";
import GODUXLOGO from "../public/godux-logo.png";
import { Button } from "@/components/ui/button";
import DOCUMENTAREAIMAGE from "../public/document-area-image.png";
import { useMemo } from "react";

import { BookOpen, Code, Contact, Home, LinkIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function LandingPage() {
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
            {
                label: "About",
                icon: Contact,
                href: "/about",
                active: pathname === "/about",
            },
            {
                label: "Acknowledgements",
                icon: Code,
                href: "/acknowledgements",
                active: pathname === "/acknowledgements",
            },
            {
                label: "Resources",
                icon: LinkIcon,
                href: "/resources",
                active: pathname === "/resources",
            },
        ],
        [pathname]
    );

    return (
        <div className="grid grid-cols-2 h-dvh text-blue-600 ">
            {/* left section  */}
            <section className="p-10">
                <nav>
                    <ul>
                        {navs.map((nav) => (
                            <Link key={nav.href} href={nav.href}>
                                <li
                                    className={`
                        inline-block mr-6
                        pb-2
                        font-medium
                        ${
                            nav.active
                                ? "border-b-2 border-blue-600"
                                : "hover:border-b-2 hover:border-blue-300"
                        }
                        `}
                                >
                                    <nav.icon className="inline mr-2 h-4 w-4" />
                                    {nav.label}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </nav>

                <div className="flex items-center mt-[15%]">
                    <Image
                        src={GODUXLOGO}
                        alt="Godux Logo"
                        width={1000}
                        height={1000}
                        className="w-[10rem] h-[10rem]"
                    />
                    <p
                        className="text-[10rem] 
                    font-poetsen-one
                    "
                    >
                        odux
                    </p>
                </div>
                <p className="font-medium text-2xl indent-[6rem]">
                    Git-like experience for research paper writing, powered by
                    Chrome&apos;s built-in AI. Official entry to Google Chrome
                    Built-in AI Challenge 2025.
                </p>
                <div className="mt-8 flex gap-2">
                    <Button>Get Started</Button>
                    <Button variant={"secondary"}>Project Resources</Button>
                </div>
            </section>

            {/* right section  */}
            <section className="flex flex-col items-center justify-center p-10 bg-primary text-primary-foreground rounded-l-4xl">
                <div className="mb-16">
                    <p className="text-3xl font-poetsen-one font-extrabold  text-center">
                        WHERE RESEARCH EVOLVES LIKE CODE.
                    </p>
                    <p className="font-semibold text-center mt-2">
                        Start a project, invite your teammates, and write
                        together with full version history. Every change is
                        tracked automatically, so you can always see who edited
                        what and restore older versions anytime.
                    </p>
                </div>
                <Image
                    src={DOCUMENTAREAIMAGE}
                    alt="document area image"
                    width={1000}
                    height={1000}
                    className="w-[50rem] h-auto border rounded-2xl shadow-md p-4 bg-white"
                />
            </section>
        </div>
    );
}
