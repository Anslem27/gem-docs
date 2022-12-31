
import DefaultHead from 'src/components/default-head';
import { TITLE } from 'src/pages/_document';
import { sanitize } from 'src/utilities/sanitize';

interface Props {
	version: string // x.y
	updated: string // timestamp
	body: string    // HTML
	desc: string    // non-HTML version of `body`
}

export default function Privacy({ version, updated, body, desc }: Props) {
	return (
		<>
			<DefaultHead title={`Privacy • ${TITLE}`}>
				<meta
					key=".$og:description"
					property="og:description"
					content={desc}
				/>
				<meta
					key=".$description"
					name="description"
					content={desc}
				/>
			</DefaultHead>

			<h1 className="pt-4 mb-0">
				Privacy Policy (v
				{version}
				)
			</h1>

			<p className="text-xs text-fg-variant">
				Last updated:
				{' '}
				<time
					title={updated}
					dateTime={updated}
				>
					{new Date(updated).toLocaleString()}
				</time>
			</p>

			{/* eslint-disable-next-line react/no-danger */}
			<span dangerouslySetInnerHTML={{
				__html: sanitize(body),
			}}
			/>

		</>
	);
}

