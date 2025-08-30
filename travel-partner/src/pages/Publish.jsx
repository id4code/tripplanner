import React, { useMemo, useState } from 'react';

function PlusIcon({ className = 'w-5 h-5' }) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
			<path d="M12 4.5a1 1 0 011 1V11h5.5a1 1 0 110 2H13v5.5a1 1 0 11-2 0V13H5.5a1 1 0 110-2H11V5.5a1 1 0 011-1z" />
		</svg>
	);
}
function TrashIcon({ className = 'w-5 h-5' }) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
			<path d="M9 3a1 1 0 00-1 1v1H5.5a1 1 0 100 2H6v11a3 3 0 003 3h6a3 3 0 003-3V7h.5a1 1 0 100-2H16V4a1 1 0 00-1-1H9zm2 4a1 1 0 012 0v10a1 1 0 11-2 0V7z" />
		</svg>
	);
}
function ArrowRightIcon({ className = 'w-5 h-5' }) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
			<path d="M13.293 5.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L16.586 12l-3.293-3.293a1 1 0 010-1.414z" />
			<path d="M4 12a1 1 0 001 1h10a1 1 0 100-2H5a1 1 0 00-1 1z" />
		</svg>
	);
}
function EyeIcon({ className = 'w-5 h-5' }) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
			<path d="M12 5C7 5 2.73 8.11 1 12c1.73 3.89 6 7 11 7s9.27-3.11 11-7c-1.73-3.89-6-7-11-7zm0 12a5 5 0 110-10 5 5 0 010 10z" />
			<circle cx="12" cy="12" r="2.5" fill="currentColor" />
		</svg>
	);
}

function SectionTitle({ children }) {
	return <h3 className="text-base md:text-lg font-semibold text-gray-900">{children}</h3>;
}

export default function Publish({ onSubmit: onSubmitProp }) {
	const [pickupLocation, setPickupLocation] = useState('');
	const [primaryDestination, setPrimaryDestination] = useState({
		name: '',
		datetime: '',
	});
	const [subDestinations, setSubDestinations] = useState([]);
	const [numDays, setNumDays] = useState('1');
	const [numPassengers, setNumPassengers] = useState('1');
	const [errors, setErrors] = useState({});
	const [showPreview, setShowPreview] = useState(false);

	const dayOptions = useMemo(() => Array.from({ length: 30 }, (_, i) => `${i + 1}`), []);
	const passengerOptions = useMemo(() => Array.from({ length: 10 }, (_, i) => `${i + 1}`), []);

	function validate() {
		const newErrors = {};
		if (!pickupLocation.trim()) newErrors.pickupLocation = 'Pickup location is required.';
		if (!primaryDestination.name.trim()) newErrors.primaryDestinationName = 'Primary destination is required.';
		if (!primaryDestination.datetime) newErrors.primaryDestinationDatetime = 'Date & time for primary destination is required.';
		subDestinations.forEach((d, idx) => {
			if (d.name.trim() && !d.datetime) {
				newErrors[`sub_${idx}_datetime`] = 'Please select date & time.';
			}
			if (d.datetime && !d.name.trim()) {
				newErrors[`sub_${idx}_name`] = 'Please enter a location name.';
			}
		});
		if (Number.isNaN(Number(numDays)) || Number(numDays) < 1) newErrors.numDays = 'Enter a valid number of days.';
		if (Number.isNaN(Number(numPassengers)) || Number(numPassengers) < 1) newErrors.numPassengers = 'Enter a valid passenger count.';
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}

	function handleAddSubDestination() {
		setSubDestinations((prev) => [
			...prev,
			{ id: Date.now().toString(), name: '', datetime: '' },
		]);
	}

	function handleRemoveSubDestination(id) {
		setSubDestinations((prev) => prev.filter((d) => d.id !== id));
	}

	function handleSubChange(id, field, value) {
		setSubDestinations((prev) =>
			prev.map((d) => (d.id === id ? { ...d, [field]: value } : d))
		);
	}

	function handleSubmit(e) {
		e.preventDefault();
		if (!validate()) return;

		const payload = {
			pickupLocation: pickupLocation.trim(),
			primaryDestination: { ...primaryDestination },
			subDestinations: subDestinations
				.filter((d) => d.name.trim() || d.datetime)
				.map((d) => ({ name: d.name.trim(), datetime: d.datetime })),
			numDays: Number(numDays),
			numPassengers: Number(numPassengers),
		};

		if (onSubmitProp) {
			onSubmitProp(payload);
		} else {
			// default behavior: show preview
			setShowPreview(true);
			window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
		}
	}

	return (
		<div className="w-full">
			<form onSubmit={handleSubmit} className="mx-auto max-w-3xl bg-white border border-gray-200 shadow-sm rounded-xl p-4 md:p-6 space-y-6">
				<div className="space-y-1">
					<h2 className="text-xl md:text-2xl font-bold text-gray-900">Publish your trip</h2>
					<p className="text-gray-500 text-sm">Share your travel plan and invite co-travelers.</p>
				</div>

				{/* Pickup Location */}
				<section className="space-y-3">
					<SectionTitle>Pickup Location</SectionTitle>
					<div>
						<label htmlFor="pickup" className="block text-sm font-medium text-gray-700">
							Pickup location
						</label>
						<input
							id="pickup"
							type="text"
							value={pickupLocation}
							onChange={(e) => setPickupLocation(e.target.value)}
							placeholder="e.g., Pune"
							className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
						/>
						{errors.pickupLocation && (
							<p className="mt-1 text-sm text-red-600">{errors.pickupLocation}</p>
						)}
					</div>
				</section>

				{/* Primary Destination */}
				<section className="space-y-3">
					<SectionTitle>Primary Destination</SectionTitle>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
						<div>
							<label htmlFor="primaryName" className="block text-sm font-medium text-gray-700">
								Location name
							</label>
							<input
								id="primaryName"
								type="text"
								value={primaryDestination.name}
								onChange={(e) =>
									setPrimaryDestination((prev) => ({ ...prev, name: e.target.value }))
								}
								placeholder="e.g., Goa"
								className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
							/>
							{errors.primaryDestinationName && (
								<p className="mt-1 text-sm text-red-600">{errors.primaryDestinationName}</p>
							)}
						</div>
						<div>
							<label htmlFor="primaryDT" className="block text-sm font-medium text-gray-700">
								Date & time
							</label>
							<input
								id="primaryDT"
								type="datetime-local"
								value={primaryDestination.datetime}
								onChange={(e) =>
									setPrimaryDestination((prev) => ({ ...prev, datetime: e.target.value }))
								}
								className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
							/>
							{errors.primaryDestinationDatetime && (
								<p className="mt-1 text-sm text-red-600">{errors.primaryDestinationDatetime}</p>
							)}
						</div>
					</div>
				</section>

				{/* Sub-destinations */}
				<section className="space-y-3">
					<SectionTitle>Additional Destinations (optional)</SectionTitle>

					<div className="space-y-4">
						{subDestinations.map((d, idx) => (
							<div key={d.id} className="rounded-lg border border-gray-200 p-3">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
									<div>
										<label className="block text-sm font-medium text-gray-700">
											Location name
										</label>
										<input
											type="text"
											value={d.name}
											onChange={(e) => handleSubChange(d.id, 'name', e.target.value)}
											placeholder="e.g., Baga Beach"
											className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
										/>
										{errors[`sub_${idx}_name`] && (
											<p className="mt-1 text-sm text-red-600">{errors[`sub_${idx}_name`]}</p>
										)}
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700">
											Date & time
										</label>
										<input
											type="datetime-local"
											value={d.datetime}
											onChange={(e) => handleSubChange(d.id, 'datetime', e.target.value)}
											className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
										/>
										{errors[`sub_${idx}_datetime`] && (
											<p className="mt-1 text-sm text-red-600">
												{errors[`sub_${idx}_datetime`]}
											</p>
										)}
									</div>
								</div>
								<div className="mt-3 flex justify-end">
									<button
										type="button"
										onClick={() => handleRemoveSubDestination(d.id)}
										className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
									>
										<TrashIcon className="w-4 h-4" />
										Remove
									</button>
								</div>
							</div>
						))}
					</div>

					<button
						type="button"
						onClick={handleAddSubDestination}
						className="inline-flex items-center gap-2 rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200"
					>
						<PlusIcon />
						Add Destination
					</button>
				</section>

				{/* Meta */}
				<section className="space-y-3">
					<SectionTitle>Trip Details</SectionTitle>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
						<div>
							<label htmlFor="days" className="block text-sm font-medium text-gray-700">
								Number of days traveling
							</label>
							<select
								id="days"
								value={numDays}
								onChange={(e) => setNumDays(e.target.value)}
								className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
							>
								{dayOptions.map((d) => (
									<option key={d} value={d}>{d}</option>
								))}
							</select>
							{errors.numDays && <p className="mt-1 text-sm text-red-600">{errors.numDays}</p>}
						</div>
						<div>
							<label htmlFor="passengers" className="block text-sm font-medium text-gray-700">
								Passengers you can take
							</label>
							<select
								id="passengers"
								value={numPassengers}
								onChange={(e) => setNumPassengers(e.target.value)}
								className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
							>
								{passengerOptions.map((p) => (
									<option key={p} value={p}>{p}</option>
								))}
							</select>
							{errors.numPassengers && (
								<p className="mt-1 text-sm text-red-600">{errors.numPassengers}</p>
							)}
						</div>
					</div>
				</section>

				{/* Actions */}
				<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:justify-end">
					<button
						type="button"
						onClick={() => setShowPreview((v) => !v)}
						className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-800 hover:bg-gray-50"
					>
						<EyeIcon />
						Preview
					</button>
					<button
						type="submit"
						className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					>
						Next
						<ArrowRightIcon />
					</button>
				</div>
			</form>

			{showPreview && (
				<div className="mx-auto mt-6 max-w-3xl rounded-xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
					<h4 className="text-lg font-semibold text-gray-900 mb-3">Trip Preview</h4>
					<div className="space-y-2 text-sm text-gray-700">
						<p><span className="font-medium">Pickup:</span> {pickupLocation || '—'}</p>
						<p><span className="font-medium">Primary:</span> {primaryDestination.name || '—'} {primaryDestination.datetime ? `(${primaryDestination.datetime})` : ''}</p>
						<div>
							<span className="font-medium">Sub-destinations:</span>
							<div className="mt-1 space-y-1">
								{(subDestinations.filter(d => d.name || d.datetime).length === 0) && (
									<p className="text-gray-500">None</p>
								)}
								{subDestinations.filter(d => d.name || d.datetime).map((d, i) => (
									<p key={d.id} className="text-gray-700">
										{i + 1}. {d.name || '—'} {d.datetime ? `(${d.datetime})` : ''}
									</p>
								))}
							</div>
						</div>
						<p><span className="font-medium">Days:</span> {numDays}</p>
						<p><span className="font-medium">Passengers:</span> {numPassengers}</p>
					</div>
				</div>
			)}
		</div>
	);
}