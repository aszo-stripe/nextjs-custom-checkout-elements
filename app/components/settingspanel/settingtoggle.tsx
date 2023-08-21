import { Switch } from "@headlessui/react";
import { classNames } from "@/lib/utils";

export default function SettingToggle({
	enabled,
	setEnabled,
	label,
	disabled,
}: {
	enabled: boolean;
	setEnabled: (val: boolean) => void;
	label: string;
	disabled?: boolean;
}) {
	return (
		<Switch.Group as="div" className="flex items-center my-2">
			<Switch
				checked={enabled}
				onChange={setEnabled}
				disabled={disabled}
				className={classNames(
					enabled ? "bg-blurple" : "bg-gray-200",
					disabled ? "opacity-50 cursor-not-allowed" : "",
					"relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
				)}
			>
				<span
					aria-hidden="true"
					className={classNames(
						enabled ? "translate-x-5" : "translate-x-0",
						disabled ? "opacity-50" : "cursor-pointer",
						"pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
					)}
				/>
			</Switch>
			<Switch.Label as="span" className="ml-3 text-sm">
				<span
					className={classNames(
						disabled ? "opacity-50 text-gray-500" : "text-gray-900",
						"font-medium"
					)}
				>
					{label}
				</span>
			</Switch.Label>
		</Switch.Group>
	);
}
