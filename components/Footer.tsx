import Link from 'next/link';

export function Footer() {
	return (
		<footer className="mt-16 border-t border-white/10 bg-background/60">
			<div className="container-px max-w-page py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
				<div>
					<p className="text-sm text-white/70">© {new Date().getFullYear()} Lupus AI. For education and support. Not medical advice.</p>
				</div>
				<nav className="flex gap-4 text-sm text-white/80">
					<Link href="/about" className="hover:text-white">About</Link>
					<Link href="/languages" className="hover:text-white">Languages</Link>
					<Link href="/settings" className="hover:text-white">Settings</Link>
					<Link href="/profile" className="hover:text-white">Profile</Link>
				</nav>
				<div className="text-sm text-white/70">Made with ❤️, colors, and motion.</div>
			</div>
		</footer>
	);
}