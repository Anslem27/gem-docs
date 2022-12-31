import { faFaceFrown } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import styles from 'src/styles/404.module.scss';

export default function Custom404() {
	const { asPath } = useRouter();

	return (
		<div className={styles.host}>
			<section>
				<FontAwesomeIcon
					icon={faFaceFrown}
					className="dark:!text-purple-300"
				/>

				<div>
					<h1>404 &bull; Not Found</h1>

					<p>
						Sorry, the page
						{' '}
						<strong><samp>{asPath}</samp></strong>
						{' '}
						could not be found.
					</p>
					<p>
						Check the URL and try again.
					</p>
				</div>
			</section>

		</div>
	);
}
