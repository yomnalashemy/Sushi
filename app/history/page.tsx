import { CalendarDays, Activity, CheckCircle2, XCircle } from 'lucide-react';

const mock = [
	{ id: '1', date: '2025-07-01', result: 'Negative', score: 0.18 },
	{ id: '2', date: '2025-08-03', result: 'Positive', score: 0.76 },
	{ id: '3', date: '2025-09-20', result: 'Negative', score: 0.22 },
];

export default function HistoryPage() {
	return (
		<div className="container-px max-w-page py-12">
			<h1 className="text-2xl font-semibold">Diagnosis history</h1>
			<div className="mt-6 space-y-4">
				{mock.map((i) => (
					<div key={i.id} className="card p-5 flex items-center justify-between">
						<div className="flex items-center gap-4">
							<div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${i.result === 'Positive' ? 'bg-secondary-500/30' : 'bg-primary-500/30'}`}>{i.result === 'Positive' ? <XCircle /> : <CheckCircle2 />}</div>
							<div>
								<div className="font-semibold">{i.result}</div>
								<div className="text-sm text-white/70">{new Date(i.date).toLocaleDateString()} • score {Math.round(i.score * 100)}%</div>
							</div>
						</div>
						<a href={`/results/${i.id}`} className="text-sm text-white/80 underline">View</a>
					</div>
				))}
			</div>
		</div>
	);
}