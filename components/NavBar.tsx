"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/Logo';
import { Brain, History, Home, User, Settings, Globe, Stethoscope, Sparkles } from 'lucide-react';

const links = [
	{ href: '/', label: 'Explore', icon: Home },
	{ href: '/diagnosis/questions', label: 'Diagnosis', icon: Stethoscope },
	{ href: '/history', label: 'History', icon: History },
	{ href: '/home', label: 'Home', icon: Sparkles },
	{ href: '/about', label: 'About', icon: Brain },
];

export function NavBar() {
	const pathname = usePathname();
	return (
		<header className="sticky top-0 z-40 w-full border-b border-white/10 bg-background/70 backdrop-blur">
			<div className="container-px max-w-page flex h-16 items-center justify-between">
				<Link href="/" className="inline-flex items-center gap-3">
					<Logo />
					<span className="font-semibold">Lupus AI</span>
				</Link>
				<nav className="hidden md:flex items-center gap-2">
					{links.map(({ href, label, icon: Icon }) => (
						<Link key={href} href={href} className={cn('px-3 py-2 rounded-lg text-sm transition', pathname === href ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white hover:bg-white/5')}>
							<span className="inline-flex items-center gap-2"><Icon size={16} />{label}</span>
						</Link>
					))}
				</nav>
				<div className="flex items-center gap-2">
					<Link href="/languages" className="px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/5 hover:text-white"><Globe size={18} /></Link>
					<Link href="/settings" className="px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/5 hover:text-white"><Settings size={18} /></Link>
					<Link href="/profile" className="px-3 py-2 rounded-lg text-sm text-white bg-primary-500 hover:bg-primary-400 rounded-xl"><User size={18} /></Link>
				</div>
			</div>
		</header>
	);
}