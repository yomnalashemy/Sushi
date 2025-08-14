import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from 'react-hot-toast';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { AnimatedBackground } from '@/components/AnimatedBackground';

export const metadata: Metadata = {
	title: 'Lupus AI – Friendly Diagnosis & Wellness',
	description: 'A colorful, friendly, AI-powered lupus diagnosis and wellness companion. Not medical advice.',
	icons: {
		icon: [{ url: '/favicon.ico' }]
	}
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="min-h-dvh bg-background text-white antialiased">
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
					<AnimatedBackground />
					<div className="relative z-10 flex min-h-dvh flex-col">
						<NavBar />
						<main className="flex-1">{children}</main>
						<Footer />
					</div>
					<Toaster position="top-right" />
				</ThemeProvider>
			</body>
		</html>
	);
}