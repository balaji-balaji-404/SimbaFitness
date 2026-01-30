"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User as UserIcon, LogOut, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    // Auth & Navigation Hooks
    const { user, logout } = useAuth();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "HOME", href: "#hero" },
        { name: "BRANCHES", href: "#branches" },
        { name: "ABOUT US", href: "#about" },
        { name: "OUR GOAL", href: "#goal" },
        // Enquiry only for guests
        ...(!user ? [{ name: "ENQUIRY", href: "/contact" }] : []),
        // Role based dashboard links
        ...(user?.isAdmin ? [{ name: "REVENUE", href: "/admin/revenue" }] : []),
        ...(user && !user?.isAdmin ? [{ name: "TRACKER", href: "/dashboard/tracker" }] : []),
    ];

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        setIsOpen(false);
        setIsProfileOpen(false);

        if (href.startsWith("#")) {
            e.preventDefault();
            if (pathname !== "/") {
                // If not on home page, navigate to home with hash
                router.push(`/${href}`);
            } else {
                // Smooth scroll if already on home
                const element = document.querySelector(href);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }
        }
    };

    const handleLogout = () => {
        setIsProfileOpen(false);
        setIsOpen(false);
        logout();
    };

    return (
        <nav
            className={cn(
                "fixed w-full z-50 transition-all duration-300",
                scrolled
                    ? "bg-black/80 backdrop-blur-md border-b border-white/10 py-2"
                    : "bg-transparent border-transparent py-4"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                                SIMBA FITNESS
                            </span>
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => handleLinkClick(e, link.href)}
                                    className="text-gray-300 hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                >
                                    {link.name}
                                </Link>
                            ))}

                            {user ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className="flex items-center gap-2 bg-zinc-800 border border-white/10 text-white px-4 py-2 rounded-full font-medium hover:bg-zinc-700 transition-all"
                                    >
                                        <UserIcon size={16} className="text-yellow-500" />
                                        <span className="uppercase">{user.name.split(' ')[0]}</span>
                                        <ChevronDown size={14} className={cn("transition-transform", isProfileOpen ? "rotate-180" : "")} />
                                    </button>

                                    <AnimatePresence>
                                        {isProfileOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-white/10 rounded-xl shadow-xl overflow-hidden py-1"
                                            >
                                                <Link
                                                    href={user.isAdmin ? "/admin" : "/dashboard"}
                                                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-yellow-400"
                                                    onClick={() => setIsProfileOpen(false)}
                                                >
                                                    Profile Dashboard
                                                </Link>
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 flex items-center gap-2"
                                                >
                                                    <LogOut size={14} />
                                                    Sign Out
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <Link
                                    href="/login"
                                    className="bg-yellow-500 text-black px-4 py-2 rounded-full font-bold hover:bg-yellow-400 transition-all transform hover:scale-105"
                                >
                                    LOGIN
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-300 hover:text-white focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-black/95 border-b border-white/10"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => handleLinkClick(e, link.href)}
                                    className="text-gray-300 hover:text-yellow-400 block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    {link.name}
                                </Link>
                            ))}

                            {user ? (
                                <div className="border-t border-white/10 mt-4 pt-4">
                                    <div className="flex items-center gap-3 px-3 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500 font-bold">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">{user.name}</p>
                                            <p className="text-xs text-gray-500">{user.email}</p>
                                        </div>
                                    </div>
                                    <Link
                                        href={user.isAdmin ? "/admin" : "/dashboard"}
                                        onClick={() => setIsOpen(false)}
                                        className="text-gray-300 hover:text-yellow-400 block px-3 py-2 rounded-md text-base font-medium"
                                    >
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-3 py-2 text-red-400 hover:bg-white/5 rounded-md text-base font-medium flex items-center gap-2"
                                    >
                                        <LogOut size={16} />
                                        Log Out
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    href="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="block w-full text-center bg-yellow-500 text-black px-4 py-2 rounded-md font-bold hover:bg-yellow-400 mt-4"
                                >
                                    LOGIN
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
