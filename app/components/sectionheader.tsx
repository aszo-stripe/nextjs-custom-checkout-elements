export default function SectionHeader({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="relative my-4">
			<div
				className="flex items-center gap-2 text-base font-semibold leading-6 text-gray-900 dark:text-white"
				aria-hidden="true"
			>
				<div className="">{children}</div>
				<div className="grow border-t border-gray-300" />
			</div>
		</div>
	);
}
