import { classNames, capitalize } from "@/lib/utils";

export default function Tabs({
	tab,
	setTab,
	options,
	suffix,
}: {
	tab: string;
	setTab: (tab: string) => void;
	options: string[];
	suffix?: string;
}) {
	return (
		<div>
			<div className="sm:hidden">
				<label htmlFor="tabs" className="sr-only">
					Mode
				</label>
				<select
					id="tabs"
					name="tabs"
					className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
					defaultValue={tab}
				>
					{options.map((item) => (
						<option key={item}>{item}</option>
					))}
				</select>
			</div>
			<div className="hidden sm:block">
				<nav className="mb-4 flex gap-2" aria-label="Tabs">
					{options.map((item, i) => (
						<div
							onClick={() => setTab(item)}
							key={item}
							className={classNames(
								tab === item
									? "border-blurple text-blurple"
									: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
								"w-1/4 border-b-2 py-4 px-1 text-center text-sm font-medium cursor-pointer"
							)}
							aria-current={tab === item ? "page" : undefined}
						>
							{`${capitalize(item)} ${suffix ? suffix : ""}`}
						</div>
					))}
				</nav>
			</div>
		</div>
	);
}
