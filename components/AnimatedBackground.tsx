"use client";

import { motion } from 'framer-motion';

export function AnimatedBackground() {
	return (
		<div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
			<motion.div
				className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary-500/25 blob"
				animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
				transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
			/>
			<motion.div
				className="absolute top-1/2 -right-24 h-[28rem] w-[28rem] rounded-full bg-secondary-500/20 blob"
				animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
				transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
			/>
			<motion.div
				className="absolute bottom-0 left-1/3 h-[22rem] w-[22rem] rounded-full bg-accent/20 blob"
				animate={{ y: [0, -10, 0], x: [0, 10, 0] }}
				transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
			/>
		</div>
	);
}