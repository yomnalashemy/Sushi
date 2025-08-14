"use client";

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import Link from 'next/link';

// Placeholder question format; replace with backend integration
interface Question {
	id: string;
	text: string;
	type: 'boolean' | 'scale' | 'multi' | 'text';
	options?: string[];
}

const MOCK: Question[] = [
	{ id: 'q1', text: 'Do you experience persistent joint pain?', type: 'boolean' },
	{ id: 'q2', text: 'Rate your fatigue today', type: 'scale', options: ['1','2','3','4','5'] },
	{ id: 'q3', text: 'Any recent rashes or skin changes?', type: 'boolean' },
	{ id: 'q4', text: 'Sensitive to sunlight?', type: 'boolean' },
	{ id: 'q5', text: 'Describe any new symptoms', type: 'text' },
];

export default function DiagnosisQuestionsPage() {
	const [index, setIndex] = useState(0);
	const [answers, setAnswers] = useState<Record<string, string>>({});
	const total = MOCK.length;
	const q = MOCK[index];

	const progress = Math.round(((index) / total) * 100);

	const select = (value: string) => {
		setAnswers(prev => ({ ...prev, [q.id]: value }));
		setTimeout(() => setIndex(i => Math.min(i + 1, total - 1)), 250);
	};

	const submit = async () => {
		toast.loading('Submitting…', { id: 'submit' });
		await new Promise((r) => setTimeout(r, 900));
		toast.success('Done!', { id: 'submit' });
		window.location.href = '/results/new?result=negative&score=0.22';
	};

	return (
		<div className="container-px max-w-page py-10">
			<div className="max-w-2xl mx-auto">
				<div className="flex items-center justify-between">
					<h1 className="text-2xl font-semibold">Screening questions</h1>
					<div className="text-sm text-white/70">{index+1} / {total}</div>
				</div>
				<div className="mt-3 h-2 w-full rounded-full bg-white/10 overflow-hidden">
					<div className="h-full bg-primary-500 transition-all" style={{ width: `${progress}%` }} />
				</div>

				<div className="mt-8">
					<AnimatePresence mode="wait">
						<motion.div
							key={q.id}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.28 }}
							className="card p-6"
						>
							<div className="text-lg font-semibold">{q.text}</div>
							<div className="mt-4">
								{q.type === 'boolean' && (
									<div className="flex gap-3">
										<button className="btn-primary" onClick={() => select('yes')}>Yes</button>
										<button className="btn-secondary" onClick={() => select('no')}>No</button>
									</div>
								)}
								{q.type === 'scale' && (
									<div className="flex flex-wrap gap-2">
										{q.options?.map(o => (
											<button key={o} className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20" onClick={() => select(o)}>{o}</button>
										))}
									</div>
								)}
								{q.type === 'text' && (
									<div className="space-y-3">
										<textarea className="w-full rounded-xl bg-white/5 p-3 h-28" onChange={(e) => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}></textarea>
										<div className="text-right">
											<button className="btn-primary" onClick={() => index === total - 1 ? submit() : setIndex(i => Math.min(i + 1, total - 1))}>{index === total - 1 ? 'Submit' : 'Next'}</button>
										</div>
									</div>
								)}
							</div>
						</motion.div>
					</AnimatePresence>
				</div>

				<div className="mt-6 flex items-center justify-between text-sm text-white/70">
					{index > 0 ? <button onClick={() => setIndex(i => Math.max(i - 1, 0))} className="underline">Back</button> : <span />}
					<button onClick={() => index === total - 1 ? submit() : setIndex(i => Math.min(i + 1, total - 1))} className="underline">{index === total - 1 ? 'Submit' : 'Skip'}</button>
				</div>
			</div>
		</div>
	);
}