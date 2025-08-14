import { notFound } from 'next/navigation';
import Link from 'next/link';

const mock = [
	{ id: '1', date: '2025-07-01', result: 'Negative', score: 0.18, notes: 'Mild fatigue only.' },
	{ id: '2', date: '2025-08-03', result: 'Positive', score: 0.76, notes: 'Multiple symptoms reported.' },
	{ id: '3', date: '2025-09-20', result: 'Negative', score: 0.22, notes: 'Improved after rest.' },
];

export default function ResultDetailPage({ params }: { params: { id: string } }) {
	const item = mock.find(m => m.id === params.id);
	if (!item) return notFound();
	const positive = item.result === 'Positive';
	return (
		<div className="container-px max-w-page py-12">
			<div className="max-w-xl mx-auto card p-6">
				<div className="text-sm text-white/70">{new Date(item.date).toLocaleString()}</div>
				<div className="mt-2 text-2xl font-semibold">{item.result}</div>
				<div className="text-white/80">Model confidence: {Math.round(item.score * 100)}%</div>
				<div className="mt-4 text-sm text-white/80">{item.notes}</div>
				<div className="mt-6 flex gap-3">
					<Link href="/history" className="btn-secondary">Back to history</Link>
					<Link href="/home" className="btn-primary">Go to home</Link>
				</div>
			</div>
		</div>
	);
}