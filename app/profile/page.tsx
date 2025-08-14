export default function ProfilePage() {
	return (
		<div className="container-px max-w-page py-12">
			<div className="max-w-2xl card p-6">
				<h1 className="text-2xl font-semibold">Your profile</h1>
				<div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
					<div className="bg-white/5 rounded-xl p-4">
						<div className="text-white/70">Username</div>
						<div className="font-semibold">moonwalker</div>
					</div>
					<div className="bg-white/5 rounded-xl p-4">
						<div className="text-white/70">Email</div>
						<div className="font-semibold">you@example.com</div>
					</div>
					<div className="bg-white/5 rounded-xl p-4">
						<div className="text-white/70">Country</div>
						<div className="font-semibold">United States</div>
					</div>
					<div className="bg-white/5 rounded-xl p-4">
						<div className="text-white/70">Ethnicity</div>
						<div className="font-semibold">Prefer not to say</div>
					</div>
				</div>
				<div className="mt-6 flex gap-3">
					<a href="/history" className="btn-primary">View history</a>
					<a href="/tracker" className="btn-secondary">Open tracker</a>
				</div>
			</div>
		</div>
	);
}