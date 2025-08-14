"use client";

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function TrackerPage() {
	const [mood, setMood] = useState(3);
	const [pain, setPain] = useState(2);
	const [fatigue, setFatigue] = useState(3);

	return (
		<div className="container-px max-w-page py-12">
			<h1 className="text-2xl font-semibold">Symptom tracker</h1>
			<div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="card p-5">
					<div className="font-semibold">Mood</div>
					<input type="range" min={1} max={5} value={mood} onChange={(e) => setMood(Number(e.target.value))} className="w-full" />
					<div className="text-sm text-white/70">{mood}</div>
				</div>
				<div className="card p-5">
					<div className="font-semibold">Pain</div>
					<input type="range" min={0} max={10} value={pain} onChange={(e) => setPain(Number(e.target.value))} className="w-full" />
					<div className="text-sm text-white/70">{pain}/10</div>
				</div>
				<div className="card p-5">
					<div className="font-semibold">Fatigue</div>
					<input type="range" min={1} max={5} value={fatigue} onChange={(e) => setFatigue(Number(e.target.value))} className="w-full" />
					<div className="text-sm text-white/70">{fatigue}</div>
				</div>
			</div>
			<div className="mt-6"><button className="btn-primary" onClick={() => toast.success('Logged!')}>Save log</button></div>
		</div>
	);
}