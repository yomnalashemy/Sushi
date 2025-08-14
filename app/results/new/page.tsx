"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, XCircle } from 'lucide-react';
import Link from 'next/link';

function ResultInner() {
	const params = useSearchParams();
	const result = (params.get('result') ?? 'negative').toLowerCase();
	const score = Number(params.get('score') ?? '0.22');
	const positive = result === 'positive';

	return (
		<div className="max-w-xl mx-auto card p-6 text-center">
			<div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl mx-auto mb-3 ${positive ? 'bg-secondary-500/30' : 'bg-primary-500/30'}`}>
				{positive ? <XCircle size={28} /> : <CheckCircle2 size={28} />}
			</div>
			<h1 className="text-2xl font-semibold">{positive ? 'Potential Lupus detected' : 'Lupus unlikely'}</h1>
			<p className="text-white/70">Model confidence: {Math.round(score * 100)}%</p>
			<div className="mt-6 text-left space-y-2 text-sm text-white/80">
				<p>• This is not a medical diagnosis. Please consult a healthcare professional.</p>
				{positive ? (
					<p>• Consider scheduling an appointment and bringing your history logs.</p>
				) : (
					<p>• Keep tracking symptoms and repeat screening if anything changes.</p>
				)}
			</div>
			<div className="mt-6 flex items-center justify-center gap-3">
				<Link href="/history" className="btn-secondary">View history</Link>
				<Link href="/home" className="btn-primary">Go to home</Link>
			</div>
		</div>
	);
}

export default function NewResultsPage() {
	return (
		<div className="container-px max-w-page py-12">
			<Suspense fallback={<div className="max-w-xl mx-auto card p-6 text-center">Loading result…</div>}>
				<ResultInner />
			</Suspense>
		</div>
	);
}