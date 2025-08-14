"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CalendarRange, Flame, SunMedium, Umbrella, ThermometerSun, Notebook, Stethoscope, Bot, ChevronRight } from 'lucide-react';

export default function AppHomePage() {
	return (
		<div className="container-px max-w-page py-10">
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<section className="lg:col-span-2 card p-6">
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-2xl font-semibold">Welcome back 👋</h1>
							<p className="text-white/70">Your gentle dashboard for today.</p>
						</div>
						<Link href="/diagnosis/questions" className="btn-primary">Quick diagnosis</Link>
					</div>

					<div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div className="rounded-2xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 p-5">
							<div className="flex items-center justify-between"><div className="font-semibold">Daily nudges</div><SunMedium size={18} /></div>
							<ul className="mt-3 text-sm text-white/80 list-disc list-inside">
								<li>Hydrate: target 2L today</li>
								<li>Sun protection: SPF 50 if outdoors</li>
								<li>Gentle stretch: 5 min routine</li>
							</ul>
						</div>
						<div className="rounded-2xl bg-gradient-to-br from-accent/20 to-primary-500/20 p-5">
							<div className="flex items-center justify-between"><div className="font-semibold">This week</div><CalendarRange size={18} /></div>
							<p className="mt-3 text-sm text-white/70">3 symptom logs • 1 diagnosis • Energy trending up</p>
						</div>
					</div>

					<div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
						<Link href="/tracker" className="group rounded-2xl bg-white/5 p-4 hover:bg-white/10 transition">
							<div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10"><Flame size={16} /></div>
							<div className="mt-2 font-semibold">Log a flare</div>
							<p className="text-xs text-white/70">2 min check-in • mood, pain, fatigue</p>
							<div className="mt-2 text-xs text-white/70 group-hover:text-white inline-flex items-center gap-1">Open <ChevronRight size={14} /></div>
						</Link>
						<Link href="/coach" className="group rounded-2xl bg-white/5 p-4 hover:bg-white/10 transition">
							<div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10"><Bot size={16} /></div>
							<div className="mt-2 font-semibold">Ask the coach</div>
							<p className="text-xs text-white/70">FAQs, tips, and friendly support</p>
							<div className="mt-2 text-xs text-white/70 group-hover:text-white inline-flex items-center gap-1">Open <ChevronRight size={14} /></div>
						</Link>
						<Link href="/diagnosis/questions" className="group rounded-2xl bg-white/5 p-4 hover:bg-white/10 transition">
							<div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10"><Stethoscope size={16} /></div>
							<div className="mt-2 font-semibold">New diagnosis</div>
							<p className="text-xs text-white/70">When symptoms change or new ones appear</p>
							<div className="mt-2 text-xs text-white/70 group-hover:text-white inline-flex items-center gap-1">Open <ChevronRight size={14} /></div>
						</Link>
					</div>
				</section>

				<aside className="card p-6 h-fit">
					<div className="font-semibold">Today’s weather care</div>
					<div className="mt-3 flex items-center gap-3 text-sm text-white/80">
						<ThermometerSun size={18} />
						<span>UV Moderate • Wear SPF 50 and hat</span>
					</div>
					<div className="mt-2 flex items-center gap-3 text-sm text-white/80">
						<Umbrella size={18} />
						<span>Keep a light layer for temperature swings</span>
					</div>
					<div className="mt-6">
						<div className="font-semibold">Notes</div>
						<textarea className="mt-2 w-full rounded-xl bg-white/5 p-3 h-28"></textarea>
						<div className="mt-2 text-right">
							<button className="btn-secondary">Save note</button>
						</div>
					</div>
				</aside>
			</div>
		</div>
	);
}