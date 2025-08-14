"use client";

import { useState } from 'react';

export default function CoachPage() {
	const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
		{ role: 'assistant', content: 'Hi! I’m your friendly coach. Ask a question about lupus self-care.' },
	]);
	const [input, setInput] = useState('');

	const send = async () => {
		if (!input.trim()) return;
		const content = input.trim();
		setMessages((m) => [...m, { role: 'user', content }, { role: 'assistant', content: 'This is a demo response. I will provide general guidance and references. Not medical advice.' }]);
		setInput('');
	};

	return (
		<div className="container-px max-w-page py-12">
			<h1 className="text-2xl font-semibold">Coach</h1>
			<div className="mt-4 max-w-2xl card p-4 mx-auto">
				<div className="h-80 overflow-y-auto space-y-3">
					{messages.map((m, i) => (
						<div key={i} className={`rounded-xl px-3 py-2 text-sm ${m.role === 'user' ? 'bg-primary-500/20 ml-auto max-w-[80%]' : 'bg-white/10 max-w-[85%]'}`}>{m.content}</div>
					))}
				</div>
				<div className="mt-3 flex gap-2">
					<input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about sun care, fatigue, etc." className="flex-1 rounded-xl bg-white/5 px-3 py-2" />
					<button onClick={send} className="btn-primary">Send</button>
				</div>
				<p className="mt-2 text-xs text-white/60">Not medical advice.</p>
			</div>
		</div>
	);
}