import { HeartHandshake, SunMedium, GlassWater, BedDouble } from 'lucide-react';

const tips = [
	{ icon: GlassWater, title: 'Hydration', desc: 'Aim for 2 liters of water daily. Set small reminders.' },
	{ icon: SunMedium, title: 'Sun care', desc: 'SPF 50+, wide-brim hat, and UV clothing outdoors.' },
	{ icon: BedDouble, title: 'Rest', desc: 'Prioritize 7–9 hours sleep. Short naps when fatigued.' },
	{ icon: HeartHandshake, title: 'Support', desc: 'Share trends with your clinician; ask for clarity.' },
];

export default function WellnessPage() {
	return (
		<div className="container-px max-w-page py-12">
			<h1 className="text-2xl font-semibold">Wellness tips</h1>
			<p className="text-white/70">Small habits that help across many lupus journeys.</p>
			<div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{tips.map((t) => (
					<div key={t.title} className="card p-5">
						<div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10"><t.icon size={18} /></div>
						<div className="mt-2 font-semibold">{t.title}</div>
						<p className="text-sm text-white/70">{t.desc}</p>
					</div>
				))}
			</div>
		</div>
	);
}