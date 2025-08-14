"use client";

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import toast from 'react-hot-toast';

const schema = z.object({
	username: z.string().min(2, 'Username too short'),
	ethnicity: z.string().min(1, 'Select an option'),
	birthDate: z.string().min(1, 'Select your birth date'),
	email: z.string().email('Invalid email'),
	phone: z.string().min(6, 'Enter phone'),
	country: z.string().min(2, 'Enter country'),
	password: z.string().min(8, 'Min 8 characters'),
	confirmPassword: z.string()
}).refine((values) => values.password === values.confirmPassword, { path: ['confirmPassword'], message: 'Passwords do not match' });

const ETHNICITIES = ['African', 'African American', 'Arab', 'Asian', 'Caucasian', 'Hispanic/Latino', 'Indigenous', 'Mixed', 'Pacific Islander', 'Prefer not to say'];

export default function SignUpPage() {
	const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });
	const [birthDate, setBirthDate] = useState('');

	const onSubmit = async (values: z.infer<typeof schema>) => {
		await new Promise((r) => setTimeout(r, 600));
		toast.success('Account created!');
		reset();
	};

	return (
		<div className="container-px max-w-page py-12">
			<div className="max-w-2xl mx-auto card p-6">
				<h1 className="text-2xl font-semibold">Create your account</h1>
				<p className="text-white/70 text-sm">Join for history, trackers, and personalized nudges.</p>
				<form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
					<div className="sm:col-span-2">
						<label className="text-sm">Username</label>
						<input {...register('username')} className="mt-1 w-full rounded-xl bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-primary-500" placeholder="e.g. moonwalker" />
						{errors.username && <p className="text-xs text-secondary-300 mt-1">{errors.username.message}</p>}
					</div>

					<div>
						<label className="text-sm">Ethnicity</label>
						<select {...register('ethnicity')} className="mt-1 w-full rounded-xl bg-white/5 px-3 py-2">
							<option value="">Select…</option>
							{ETHNICITIES.map(e => <option key={e} value={e}>{e}</option>)}
						</select>
						{errors.ethnicity && <p className="text-xs text-secondary-300 mt-1">{errors.ethnicity.message}</p>}
					</div>

					<div>
						<label className="text-sm">Birth date</label>
						<input type="date" {...register('birthDate')} className="mt-1 w-full rounded-xl bg-white/5 px-3 py-2" />
						{errors.birthDate && <p className="text-xs text-secondary-300 mt-1">{errors.birthDate.message}</p>}
					</div>

					<div>
						<label className="text-sm">Email</label>
						<input type="email" {...register('email')} className="mt-1 w-full rounded-xl bg-white/5 px-3 py-2" placeholder="you@example.com" />
						{errors.email && <p className="text-xs text-secondary-300 mt-1">{errors.email.message}</p>}
					</div>

					<div>
						<label className="text-sm">Phone number</label>
						<input type="tel" {...register('phone')} className="mt-1 w-full rounded-xl bg-white/5 px-3 py-2" placeholder="+1 555 123 4567" />
						{errors.phone && <p className="text-xs text-secondary-300 mt-1">{errors.phone.message}</p>}
					</div>

					<div>
						<label className="text-sm">Country</label>
						<input {...register('country')} className="mt-1 w-full rounded-xl bg-white/5 px-3 py-2" placeholder="United States" />
						{errors.country && <p className="text-xs text-secondary-300 mt-1">{errors.country.message}</p>}
					</div>

					<div>
						<label className="text-sm">Password</label>
						<input type="password" {...register('password')} className="mt-1 w-full rounded-xl bg-white/5 px-3 py-2" />
						{errors.password && <p className="text-xs text-secondary-300 mt-1">{errors.password.message}</p>}
					</div>

					<div>
						<label className="text-sm">Confirm password</label>
						<input type="password" {...register('confirmPassword')} className="mt-1 w-full rounded-xl bg-white/5 px-3 py-2" />
						{errors.confirmPassword && <p className="text-xs text-secondary-300 mt-1">{errors.confirmPassword.message}</p>}
					</div>

					<div className="sm:col-span-2 flex items-center justify-between gap-3 mt-2">
						<button type="submit" className="btn-primary min-w-40" disabled={isSubmitting}>{isSubmitting ? 'Creating…' : 'Create account'}</button>
						<p className="text-xs text-white/60">By signing up you agree to our friendly terms.</p>
					</div>
				</form>
			</div>
		</div>
	);
}