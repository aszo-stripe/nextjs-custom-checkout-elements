import { useEffect } from "react";
import Prism from "prismjs";
import "@/public/css/prismjs-nord.css";

export default function CodeBlock({
	language,
	children,
}: {
	language: string;
	children: React.ReactNode;
}) {
	useEffect(() => {
		Prism.highlightAll();
	});

	return (
		<pre className="rounded-lg text-xs overflow-y-scroll">
			<code className={`language-${language}`}>{children}</code>
		</pre>
	);
}
