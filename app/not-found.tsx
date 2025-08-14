import Link from 'next/link';

export default function NotFound() {
	return (
		<div className="container-px max-w-page py-24 text-center">
			<div className="text-6xl font-bold gradient-text">404</div>
			<p className="mt-2 text-white/70">That page took a day off.</p>
			<div className="mt-6"><Link href="/" className="btn-primary">Go home</Link></div>
		</div>
	);
}