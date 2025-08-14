"use client";

import { useState } from 'react';

const LANGS = ['English', 'Español', 'Français', 'العربية'] as const;

type Lang = typeof LANGS[number];

export default function LanguagesPage() {
	const [lang, setLang] = useState<Lang>('English');
	return (
		<div className="container-px max-w-page py-12">
			<h1 className="text-2xl font-semibold">Languages</h1>
			<p className="text-white/70">Choose your language. (Demo)</p>
			<div className="mt-6 flex flex-wrap gap-3">
				{LANGS.map(l => (
					<button key={l} onClick={() => setLang(l)} className={`px-4 py-2 rounded-xl ${lang === l ? 'bg-primary-500' : 'bg-white/10 hover:bg-white/20'}`}>{l}</button>
				))}
			</div>
			<p className="mt-4 text-sm text-white/80">Current: {lang}</p>
		</div>
	);
}