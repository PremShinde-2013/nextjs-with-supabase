"use client";

import Image from "next/image";
import Link from "next/link";

const socialMedia = [
    {
        name: "YouTube",
        href: "#",
        src: "https://dhyeneqgxucokgtxiyaj.supabase.co/storage/v1/object/public/avatars/youtube-color-svgrepo-com.svg",
    },
    {
        name: "LinkedIn",
        href: "#",
        src: "https://dhyeneqgxucokgtxiyaj.supabase.co/storage/v1/object/public/avatars/linkedin-svgrepo-com.svg",
    },
    {
        name: "Instagram",
        href: "#",
        src: "https://dhyeneqgxucokgtxiyaj.supabase.co/storage/v1/object/public/avatars/instagram-svgrepo-com.svg",
    },
    {
        name: "Telegram",
        href: "#",
        src: "https://dhyeneqgxucokgtxiyaj.supabase.co/storage/v1/object/public/avatars/telegram-svgrepo-com.svg",
    },
];

export default function Footer() {
    return (
        <footer className="w-full bg-gradient-to-t from-yellow-50 via-yellow-100 to-yellow-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 text-black dark:text-white py-16 px-6 md:px-20  border-yellow-200 dark:border-neutral-700">
            <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
                {/* Branding & Welcome */}
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                        <Image
                            src="https://dhyeneqgxucokgtxiyaj.supabase.co/storage/v1/object/public/avatars/Skillveta_Startup.png"
                            alt="Skillveta Logo"
                            width={50}
                            height={50}
                            className="object-contain"
                        />
                        <h2 className="text-xl md:text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500">
                            SkillVeta
                        </h2>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                        Join a supportive community of passionate coders, where learning, collaboration, and innovation come together. Embark on your coding journey with us.
                    </p>
                    <div className="flex gap-4 mt-2">
                        {socialMedia.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                aria-label={item.name}
                                className="hover:scale-110 transition-transform duration-300"
                            >
                                <Image
                                    src={item.src}
                                    alt={item.name}
                                    width={28}
                                    height={28}
                                    className="object-contain"
                                />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-bold text-yellow-600 dark:text-yellow-400">Quick Links</h3>
                    <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-yellow-500 transition-all">Home</Link>
                    <Link href="/courses" className="text-gray-700 dark:text-gray-300 hover:text-yellow-500 transition-all">Courses</Link>
                    <Link href="/internships" className="text-gray-700 dark:text-gray-300 hover:text-yellow-500 transition-all">Internships</Link>
                    <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-yellow-500 transition-all">Contact</Link>
                    <Link href="/verify-certificate" className="text-gray-700 dark:text-gray-300 hover:text-yellow-500 transition-all">Verify Certificate</Link>
                </div>

                {/* Legal */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-bold text-yellow-600 dark:text-yellow-400">Legal</h3>
                    <Link href="/privacy-policy" className="text-gray-700 dark:text-gray-300 hover:text-yellow-500 transition-all">Privacy Policy</Link>
                    <Link href="/terms" className="text-gray-700 dark:text-gray-300 hover:text-yellow-500 transition-all">Terms of Use</Link>
                    <Link href="/refund" className="text-gray-700 dark:text-gray-300 hover:text-yellow-500 transition-all">Refund & Cancellation Policy</Link>
                    <Link href="/ShippingPolicyPage" className="text-gray-700 dark:text-gray-300 hover:text-yellow-500 transition-all">Shipping Policy</Link>
                </div>

                {/* Get in Touch */}
                {/* Get in Touch */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                        Get in Touch
                    </h3>

                    {/* Support Email */}
                    <p className="text-gray-700 dark:text-gray-300">
                        For queries & support:{" "}
                        <a
                            href="mailto:help.skillveta@gmail.com"
                            className="underline text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300"
                        >
                            help.skillveta@gmail.com
                        </a>
                    </p>

                    {/* Main Email */}
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                        For urgent matters only:{" "}
                        <a
                            href="mailto:skillveta@gmail.com"
                            className="underline text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        >
                            skillveta@gmail.com
                        </a>
                    </p>

                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-auto">
                        &copy; 2025 SkillVeta. All Rights Reserved.
                    </p>
                </div>

            </div>
        </footer>
    );
}
