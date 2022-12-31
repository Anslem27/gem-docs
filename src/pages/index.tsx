/* eslint-disable react/no-multi-comp */
import { faAnglesDown, faStar as fasStar, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'preact/hooks';
import Accordion from 'src/components/accordion';
import DefaultHead from 'src/components/default-head';
import ExternalLink from 'src/components/external-link';
import { featuredReviews } from 'src/data/featured-reviews.list';
import { introItemList } from 'src/data/intro-items.list';
import { useTheme } from 'src/hooks/theme';
import type { PlayStoreReview } from 'src/models/review_model';
import type { Theme } from 'src/models/theme.type';
import { TITLE } from 'src/pages/_document';
import styles from 'src/styles/Index.module.scss';
import { BREAKPOINT_SM } from 'src/utilities/breakpoints';
import { sanitize } from 'src/utilities/sanitize';


const PREFERS_REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

gsap.registerPlugin(ScrollTrigger);

type GsapContent = (HTMLElement & {
	enter?: () => gsap.core.Tween;
	leave?: () => gsap.core.Tween;
});

interface Props {
	totalEnabledDevices: number
	featuredReviews: PlayStoreReview[]
}

export default function Home({

}: Props) {

	const { theme } = useTheme();

	const [themeSuffix, setThemeSuffix] = useState<Theme>();
	const [padForDevices, setPadForDevices] = useState<number[]>([]);

	const asideRef = useRef<HTMLElement>(null);

	const scrollTriggerRef = useRef<ScrollTrigger>();

	/**
	 * Initially check if reduced motion is preferred. Value is never updated.
	 *
	 * Used for disabling:
	 * - smooth scroll in {@link scrollToAside}
	 * - ScrollTrigger snapping in {@link setupScrollTrigger}
	 */
	let prefersReducedMotionRef = useRef(false);

	let contentMarkersRef = useRef<(HTMLElement & { content: GsapContent | null })[]>();
	let previousContentRef = useRef<GsapContent>();
	let previousProgressRef = useRef(0);

	let deviceColumnsPerRowRef = useRef<number>();

	useEffect(() => setThemeSuffix(theme), [theme]);

	useEffect(() => {
		const disableStIfMobile = (small: boolean) => small
			? scrollTriggerRef.current?.enable()
			: scrollTriggerRef.current?.disable();
		const smBreakpointListener = (event: MediaQueryListEvent) => {
			updatePadForDevices();
			disableStIfMobile(event.matches);
		};
		const prmListener = (event: MediaQueryListEvent) => {
			prefersReducedMotionRef.current = event.matches;
		};

		const smBreakpointMql = window.matchMedia(BREAKPOINT_SM);
		const prmMql = window.matchMedia(PREFERS_REDUCED_MOTION);

		// Safari <14 doesn't support the non-deprecated counterparts:
		// https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList#browser_compatibility
		smBreakpointMql.addListener(smBreakpointListener);
		prmMql.addListener(prmListener);

		disableStIfMobile(smBreakpointMql.matches);
		prefersReducedMotionRef.current = prmMql.matches;

		// Cleanup
		return () => {
			smBreakpointMql.removeListener(smBreakpointListener);
			prmMql.removeListener(prmListener);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []); // Perf: run only once (on mount & unmount)

	useLayoutEffect(() => {
		updatePadForDevices();
		setupGsap();
		setupContentMarkers();
		setupScrollTrigger();

		ScrollTrigger.addEventListener('refreshInit', stRefreshRefreshInitListener);

		// Cleanup
		return () => {
			ScrollTrigger.removeEventListener('refreshInit', stRefreshRefreshInitListener);
			// Disable all ST functionality and remove internal listeners:
			// should be done because it's being used only on this page, and
			// NextJS/Preact routes to other pages.
			// Note #1: `ScrollTrigger.enable()` needs to be called before setup
			// Note #2: we don't need to call `scrollTriggerRef.current?.kill()`
			//          because it's done internally (for each trigger)
			// Note #3: trigger's `kill()` calls `disable()` internally
			ScrollTrigger.disable(true, true);
			scrollTriggerRef.current = undefined;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const stRefreshRefreshInitListener = useCallback(() => updatePadForDevices(), []);

	const scrollToAside = useCallback(() => asideRef.current?.scrollIntoView({
		behavior: prefersReducedMotionRef.current ? 'auto' : 'smooth',
	}), []);

	const setupContentMarkers = useCallback(() => {
		contentMarkersRef.current = gsap.utils.toArray('div[data-scroll-marker]');
		contentMarkersRef.current.forEach(marker => {
			marker.content = document.getElementById(marker.dataset.scrollMarker!);

			if (!marker.content) {
				// No marker content found; skip to next iteration
				return;
			}

			marker.content.enter = () => gsap.effects.fadeIn(marker.content);
			marker.content.leave = () => gsap.effects.fadeOut(marker.content);
		});
	}, []);

	const setupScrollTrigger = useCallback(() => {
		if (!scrollTriggerRef.current) {
			ScrollTrigger.enable(); // must be called first
			scrollTriggerRef.current = ScrollTrigger.create({
				trigger: `#${styles.scroller}`,
				toggleClass: 'active',
				start: 0,
				end: 'bottom center',
				pin: `#${styles.scrollerLeft}`,
				onUpdate: ({ progress }) => onScrollUpdate(progress),
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	/**
	 * Handle the updated position
	 */
	const onScrollUpdate = useCallback((progress: number) => {
		// Perf: skip unless progress is at least 1.5%
		if (progress < 0.15) {
			return;
		}

		// Perf: skip unless progress difference is at least 9% (obtained experimentally)
		// Previous progress is updated only if new & previous content are different)
		if (Math.abs(progress - previousProgressRef.current) < 0.09) {
			return;
		}

		let newContent: GsapContent | null = null;
		const currentScrollY = scrollY;

		// Find new content: element that's roughly at the center of the screen
		// Perf: iterate from the end to find the last element that fits the criteria
		const contentMarkers = contentMarkersRef.current ?? [];
		for (let index = contentMarkers.length - 1; index >= 0; index--) {
			const marker = contentMarkers[index];
			if (currentScrollY > marker.offsetTop - (marker.offsetHeight >>> 1)) {
				newContent = marker.content;
				break;
			}
		}

		if (newContent && newContent !== previousContentRef.current) {
			// New & previous content are different, so...
			// 1. Animate previousContent out
			previousContentRef.current?.leave!();
			// 2. Animate newContent in
			newContent.enter!();

			// 3. Finally, update previous references
			previousProgressRef.current = progress;
			previousContentRef.current = newContent;
		}
	}, []);

	const updatePadForDevices = useCallback(() => {


		const parentContainerWidth = document.getElementById(styles.scrollerRight)?.offsetWidth || document.body.offsetWidth;
		const deviceContainerWidth = document.getElementById('device-0')?.offsetWidth || 200;
		const columnsPerRow = Math.floor(parentContainerWidth / deviceContainerWidth);
		if (columnsPerRow === 1) {
			// Perf: padding isn't needed if there's only one column
			setPadForDevices([]);
			return;
		}
		if (deviceColumnsPerRowRef.current === columnsPerRow) {
			// Perf: don't unnecessarily recalculate
			return;
		}

		const danglingColumnFraction = (length / columnsPerRow) % 1;
		if (danglingColumnFraction !== 0) {
			const remaining = columnsPerRow - Math.floor(danglingColumnFraction * columnsPerRow);
			// Instead of assigning to `Array(remaining)`, intentionally push
			// one by one: https://v8.dev/blog/elements-kinds#avoid-creating-holes
			const padForDevices = [];
			for (let i = 0; i < remaining; i++) {
				padForDevices.push(i);
			}

			setPadForDevices(padForDevices);
		} else {
			setPadForDevices([]);
		}

		deviceColumnsPerRowRef.current = columnsPerRow;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<DefaultHead title={TITLE} />

			<div id={styles.scroller}>
				<svg
					id={styles.scrollerLeft}
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 511 1060"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="0"
					stroke="#000"
				>
					<defs>
						<clipPath id="a">
							<rect
								x="13"
								y="8"
								rx="40"
								width="calc(100% - 27px)"
								height="calc(100% - 16px)"
							/>
						</clipPath>
					</defs>
					<path
						d="M504 420v-60h3c1.662 0 3 1.784 3 4v52c0 2.216-1.338 4-3 4zM6 360V260H3c-1.662 0-3 2.973-3 6.667v86.667C0 357.027 1.338 360 3 360zm498-25v-50h3c1.662 0 3 1.487 3 3.333v43.333c0 1.847-1.338 3.333-3 3.333z"
						strokeWidth="1"
					/>
					<rect
						x="5"
						width="500"
						height="1060"
						rx="45"
					/>
					<rect
						x="14"
						y="9"
						width="482"
						height="1043"
						rx="40"
						fill="var(--bg)"
					/>
					{introItemList.map(item =>
						<image
							key={item.image}
							id={'image-' + item.image}
							className={styles.screenshot}
							href={item.image}
							width="100%"
							height="calc(100% - 16px)"
							x="-0.5"
							y="8"
							clipPath="url(#a)"
						/>
					)}
				</svg>

				<div id={styles.scrollerRight}>
					<header>
						<img
							src="img/logo.png"
							height="120"
							width="120"
							alt="logo"
						/>

						<h1>Gem Music</h1>
						<p>
							v
							{'0.0.0.beta'}
							{` 29 MB`}
						</p>

						<p>
							Gem Music is a modernly designed music app,
							{' '}
							<a
								href="/"
								target="_blank"
								rel="noopener noreferrer"
							>
								with more
							</a>
							{' '}
							than you could've ever imagined.
							{' '}
						</p>

						<div>
							{/* eslint-disable-next-line react/jsx-no-target-blank */}
							<a
								href="/"
								target="_blank"
								rel="noopener"
							>
								<img
									src="/img/google-play-store-badge-en.svg?v=1"
									width="200"
									alt="Soon Coming to the PlayStore"
								/>
							</a>
							<button onClick={scrollToAside}>
								<FontAwesomeIcon icon={faAnglesDown} />
								<span>Skip intro</span>
							</button>
						</div>

						<p>
							A
							{' '}
							<ExternalLink href="/">
								collaboratively
							</ExternalLink>
							{' '}
							developed app and looking for more
							{' '}
							<ExternalLink href="/">
								companions
							</ExternalLink>
							to join development.
						</p>
					</header>

					<h2>App description</h2>

					<p>
						Here, you'll carefully have a breakdown of all the features Gem Music has to offer to you.
						You'll have a glipse of what Gem has to offer, and surely you'll love the experience.
					</p>



					{introItemList.map(item =>
						<div
							key={item.image}
							data-scroll-marker={'image-' + item.image}
						>
							{/* Wrap img in div with a fixed height, to prevent content jumps */}
							<div>
								<img
									loading="lazy"
									decoding="async"
									src={item.image}
									alt={item.image}
									style={{ objectPosition: item.crop }}
								/>
							</div>

							<h2>{item.h2}</h2>

							{item.p.map(text =>
								<p
									key={text.substring(0, 50)}
									// eslint-disable-next-line react/no-danger
									dangerouslySetInnerHTML={{
										__html: sanitize(text),
									}}
								/>
							)}

							{item.li && item.li.length > 0 ?
								<ul>
									{item.li.map(text =>
										<li key={text.substring(0, 50)}>{text}</li>
									)}
								</ul> : ''}

							{item.note ?
								<p className="text-xs">
									Note:
									{' '}
									{item.note}
								</p> : ''}
						</div>
					)}
				</div>
			</div>

			<aside
				ref={asideRef}
				className={styles.content}
			>
				<h1>Featured reviews from our Beta Testers</h1>

				<p>
					You&apos;ve read what we had to say about our app, but actual user reviews are far more important and clearly have a more vibrant tale to tell.
					{' '}
					You can also email us if you have a special feature request or bug fix here 👉
					{' '}
					<ExternalLink href="mailto:">anslembarn@gmail.com</ExternalLink>
					{' '}
				</p>

				<Accordion
					contentClassName="border-l bg-hover"
					summaryClassName="border bg-hover hover:!bg-border"
					summary="Featured tester reviews"
					openByDefault
				>
					{featuredReviews.map(review =>
						<div

							className={styles.featuredReview}
						>
							<div>
								<p>{review.author.name}</p>
							</div>
							<span>{review.content}</span>
						</div>
					)}
				</Accordion>
			</aside>
		</>
	);
}

const setupGsap = () => {
	gsap.defaults({
		duration: 0.3,
		overwrite: 'auto',
	});

	gsap.registerEffect({
		name: 'fadeIn',
		effect: (targets: gsap.TweenTarget) => gsap.to(targets, {
			autoAlpha: 1,
		}),
	});

	gsap.registerEffect({
		name: 'fadeOut',
		effect: (targets: gsap.TweenTarget) => gsap.to(targets, {
			autoAlpha: 0,
		}),
	});
};
