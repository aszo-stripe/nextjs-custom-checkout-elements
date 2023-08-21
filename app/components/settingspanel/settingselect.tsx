import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid";
import { classNames } from "@/lib/utils";
import { SelectObjectList } from "@/lib/checkout";

function SettingSelect({
	selected,
	setSelected,
	label,
	list,
}: {
	selected: string;
	setSelected: (val: string) => void;
	label: string;
	list: string[];
}) {
	return (
		<Listbox value={selected} onChange={setSelected}>
			{({ open }) => (
				<div className="basis-0 grow flex items-center gap-2">
					<Listbox.Label className="block text-sm font-medium leading-6 text-gray-900 basis-1 grow">
						{label}
					</Listbox.Label>
					<div className="relative basis grow">
						<Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
							<span className="block truncate">{selected}</span>
							<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
								<ChevronUpDownIcon
									className="h-5 w-5 text-gray-400"
									aria-hidden="true"
								/>
							</span>
						</Listbox.Button>

						<Transition
							show={open}
							as={Fragment}
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
								{list?.map((item) => (
									<Listbox.Option
										key={item}
										className={({ active }) =>
											classNames(
												active ? "bg-paleblurple text-white" : "text-gray-900",
												"relative cursor-default select-none py-2 pl-3 pr-9"
											)
										}
										value={item}
									>
										{({ selected, active }) => (
											<>
												<span
													className={classNames(
														selected ? "font-semibold" : "font-normal",
														"block truncate"
													)}
												>
													{item}
												</span>

												{selected ? (
													<span
														className={classNames(
															active ? "text-white" : "text-paleblurple",
															"absolute inset-y-0 right-0 flex items-center pr-4"
														)}
													>
														<CheckIcon className="h-5 w-5" aria-hidden="true" />
													</span>
												) : null}
											</>
										)}
									</Listbox.Option>
								))}
							</Listbox.Options>
						</Transition>
					</div>
				</div>
			)}
		</Listbox>
	);
}

function SettingSelectObject({
	selected,
	setSelected,
	label,
	list,
}: {
	selected: string;
	setSelected: (val: string) => void;
	label: string;
	list: SelectObjectList;
}) {
	return (
		<Listbox value={selected} onChange={setSelected}>
			{({ open }) => (
				<div className="basis-0 grow flex items-center gap-2">
					<Listbox.Label className="block text-sm font-medium leading-6 text-gray-900 basis-1 grow">
						{label}
					</Listbox.Label>
					<div className="relative basis grow">
						<Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
							<span className="block truncate">{list[selected].label}</span>
							<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
								<ChevronUpDownIcon
									className="h-5 w-5 text-gray-400"
									aria-hidden="true"
								/>
							</span>
						</Listbox.Button>

						<Transition
							show={open}
							as={Fragment}
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
								{Object.keys(list).map((key) => (
									<Listbox.Option
										key={key}
										className={({ active }) =>
											classNames(
												active ? "bg-paleblurple text-white" : "text-gray-900",
												"relative cursor-default select-none py-2 pl-3 pr-9"
											)
										}
										value={key}
									>
										{({ selected, active }) => (
											<>
												<span
													className={classNames(
														selected ? "font-semibold" : "font-normal",
														"block truncate"
													)}
												>
													{list[key].label}
												</span>

												{selected ? (
													<span
														className={classNames(
															active ? "text-white" : "text-paleblurple",
															"absolute inset-y-0 right-0 flex items-center pr-4"
														)}
													>
														<CheckIcon className="h-5 w-5" aria-hidden="true" />
													</span>
												) : null}
											</>
										)}
									</Listbox.Option>
								))}
							</Listbox.Options>
						</Transition>
					</div>
				</div>
			)}
		</Listbox>
	);
}

export { SettingSelect, SettingSelectObject };
