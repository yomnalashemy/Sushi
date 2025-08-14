"use client";

import { useTheme } from 'next-themes';
import { useState } from 'react';

export default function SettingsPage() {
	const { theme, setTheme } = useTheme();
	const [privacyLocal, setPrivacyLocal] = useState(true);
	const [notifications, setNotifications] = useState(true);

	return (
		<div className="container-px max-w-page py-12">
			<h1 className="text-2xl font-semibold">Settings</h1>
			<div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="card p-5">
					<div className="font-semibold">Appearance</div>
					<div className="mt-3 flex items-center gap-3">
						<button onClick={() => setTheme('dark')} className={`px-4 py-2 rounded-xl ${theme === 'dark' ? 'bg-primary-500' : 'bg-white/10 hover:bg-white/20'}`}>Dark</button>
						<button onClick={() => setTheme('light')} className={`px-4 py-2 rounded-xl ${theme === 'light' ? 'bg-primary-500' : 'bg-white/10 hover:bg-white/20'}`}>Light</button>
						<button onClick={() => setTheme('system')} className={`px-4 py-2 rounded-xl ${theme === 'system' ? 'bg-primary-500' : 'bg-white/10 hover:bg-white/20'}`}>System</button>
					</div>
				</div>
				<div className="card p-5">
					<div className="font-semibold">Privacy</div>
					<label className="mt-3 flex items-center justify-between">
						<span className="text-sm text-white/80">Store history locally only</span>
						<input type="checkbox" checked={privacyLocal} onChange={(e) => setPrivacyLocal(e.target.checked)} />
					</label>
					<label className="mt-3 flex items-center justify-between">
						<span className="text-sm text-white/80">Notifications</span>
						<input type="checkbox" checked={notifications} onChange={(e) => setNotifications(e.target.checked)} />
					</label>
				</div>
			</div>
		</div>
	);
}