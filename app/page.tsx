"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Brain, Stethoscope, History, HeartHandshake, Activity, Sparkles, Zap, ShieldCheck, Bot } from 'lucide-react';

const services = [
	{
		title: 'AI-Powered Diagnosis',
		desc: 'Friendly questions, instant guidance. Privacy-first.',
		icon: Stethoscope,
		href: '/diagnosis/questions',
		accent: 'from-primary-400 to-primary-200'
	},
	{
		title: 'Diagnosis History',
		desc: 'See past results and trends in a beautiful timeline.',
		icon: History,
		href: '/history',
		accent: 'from-secondary-400 to-secondary-200'
	},
	{
		title: 'Wellness Tips',
		desc: 'Micro-habits, hydration nudges, sun-protection reminders.',
		icon: ShieldCheck,
		href: '/wellness',
		accent: 'from-accent to-primary-200'
	},
	{
		title: 'Symptom Tracker',
		desc: 'Track flares with mood, fatigue, pain, rashes—weekly insights.',
		icon: Activity,
		href: '/tracker',
		accent: 'from-primary-300 to-secondary-300'
	},
	{
		title: 'Coach Chat',
		desc: 'A supportive bot for FAQs. Not medical advice.',
		icon: Bot,
		href: '/coach',
		accent: 'from-secondary-300 to-accent'
	}
];

export default function LandingPage() {
	return (
		<div className="container-px max-w-page">
			<section className="pt-20 pb-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
				<div>
					<div className="badge mb-4">Colorful. Friendly. Helpful.</div>
					<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
						<span className="gradient-text">Lupus AI</span> that feels like a friend
					</h1>
					<p className="mt-4 text-white/80 text-lg max-w-[55ch]">Explore smart, approachable tools: diagnosis, history, trackers, and playful wellness nudges. Built with empathy and motion.</p>
					<div className="mt-6 flex flex-wrap gap-3">
						<Link href="/diagnosis/questions" className="btn-primary">Start diagnosis</Link>
						<Link href="/signup" className="btn-secondary">Create account</Link>
					</div>
					<div className="mt-4 text-xs text-white/60">Not a substitute for professional medical advice.</div>
				</div>
				<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative">
					<div className="card p-6 shiny-bg">
						<div className="grid grid-cols-2 gap-4">
							{services.slice(0,4).map((s, i) => (
								<Link key={s.title} href={s.href} className="group rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition">
									<div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${s.accent} text-background`}>{<s.icon size={18} />}</div>
									<div className="mt-3 font-semibold text-white">{s.title}</div>
									<p className="text-sm text-white/70">{s.desc}</p>
								</Link>
							))}
						</div>
					</div>
					<div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-secondary-500/40 blur-2xl" />
				</motion.div>
			</section>

			<section className="py-12">
				<h2 className="text-2xl font-semibold mb-6">Why people like it</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{[
						{ title: 'Fast & private', icon: Zap, desc: 'On-device options and privacy-first API calls.' },
						{ title: 'Gentle design', icon: HeartHandshake, desc: 'Calm motion and colors to lower anxiety.' },
						{ title: 'Real insights', icon: Brain, desc: 'Trends you can share with your doctor.' },
					].map((f) => (
						<div key={f.title} className="card p-5">
							<div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10"><f.icon size={18} /></div>
							<div className="mt-3 font-semibold">{f.title}</div>
							<p className="text-sm text-white/70">{f.desc}</p>
						</div>
					))}
				</div>
			</section>

			<section className="py-12">
				<div className="card p-6 flex items-center justify-between gap-6">
					<div>
						<div className="text-sm text-white/80">Ready?</div>
						<div className="text-xl font-semibold">Start your AI-powered lupus screening</div>
					</div>
					<Link href="/diagnosis/questions" className="btn-primary">Begin</Link>
				</div>
			</section>
		</div>
	);
}