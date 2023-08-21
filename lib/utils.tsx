export function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

export function prettyPrintJson(
	json: object,
	indent: number = 2,
	depth: number = 1
): string {
	const keys = Object.keys(json);
	const array = Array.isArray(json);
	return (
		(array ? `[\n` : `{\n`) +
		keys
			.map((key) => {
				if (json[key as keyof typeof json] !== undefined)
					return (
						" ".repeat(indent * depth) +
						(array
							? ""
							: (key[0] === "." ? `"` : "") +
							  `${key}` +
							  (key[0] === "." ? `": ` : ": ")) +
						(typeof json[key as keyof typeof json] === "object"
							? prettyPrintJson(
									json[key as keyof typeof json],
									indent,
									depth + 1
							  )
							: `"${json[key as keyof typeof json]}",\n`)
					);
			})
			.join("") +
		" ".repeat(indent * (depth - 1)) +
		(Array.isArray(json) ? `]` : `}`) +
		(depth > 1 ? "\n" : "")
	);
}

export function capitalize(name: string) {
	return name.charAt(0).toUpperCase() + name.slice(1);
}

export function getHostname() {
	const env = process.env.NODE_ENV;
	if (env === "development" || !env) {
		return "http://localhost:3000";
	} else {
		return process.env.NEXT_PUBLIC_HOSTNAME;
	}
}
