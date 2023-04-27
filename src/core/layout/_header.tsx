//#region Import
import { useState } from 'react';
import { createStyles, Header, Group, ActionIcon, Container, Burger, Transition, Paper } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { BrandGithub, BrandFacebook } from 'tabler-icons-react';
import { IHeader } from '../interface/Layout';
import Link from 'next/link';
//#endregion

//#region Styles
const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
	inner: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 56,

		// [theme.fn.smallerThan('md')]: {
		//   justifyContent: 'flex-start',
		// },
	},

	dropdown: {
		position: 'absolute',
		top: HEADER_HEIGHT,
		left: 0,
		right: 0,
		zIndex: 0,
		borderTopRightRadius: 0,
		borderTopLeftRadius: 0,
		borderTopWidth: 0,
		overflow: 'hidden',

		[theme.fn.largerThan('sm')]: {
			display: 'none',
		},
	},

	links: {
		width: 260,

		[theme.fn.smallerThan('sm')]: {
			display: 'none',
		},
	},

	logo: {
		top: 10
	},

	social: {
		width: 260,

		[theme.fn.smallerThan('sm')]: {
			width: 'auto',
			marginLeft: 'auto',
		},

	},

	burger: {
		marginRight: theme.spacing.md,

		[theme.fn.largerThan('sm')]: {
			display: 'none',
		},
	},

	link: {
		display: 'block',
		lineHeight: 1,
		padding: '8px 12px',
		borderRadius: theme.radius.sm,
		textDecoration: 'none',
		color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : '#ffffff',
		fontSize: theme.fontSizes.sm,
		fontWeight: 500,

		'&:hover': {
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[4],
		},

		// Media query with value from theme
		[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
			color: theme.colors.dark[6],
			padding: '20px'
		},

	},

	linkActive: {
		'&, &:hover': {
			backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
			color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
		},
	},
}));
//#endregion

const AppHeader = ({ links }: IHeader) => {

	//#region State Helper
	const [opened, { toggle }] = useDisclosure(false);
	const [active, setActive] = useState(links[0].link);
	const { classes, cx } = useStyles();
	//#endregion

	//#region Queries
	const items = links.map((link, i) => (
		<Link
			key={i}
			href={link.link}
			className={cx(classes.link, { [classes.linkActive]: active === link.link })}
			onClick={(event) => {
				setActive(link.link);
			}}
		>
			{link.label}
		</Link>
	));
	//#endregion

	return (
		<Header height={56} mb={120}>
			<Container className={classes.inner}>
				<Burger opened={opened} onClick={toggle} size="sm" className={classes.burger} color="#ffffff" />
				<Group className={classes.links} spacing={5}>
					{items}
				</Group>

				<Transition transition="pop-top-right" duration={200} mounted={opened}>
					{(styles) => (
						<Paper className={classes.dropdown} withBorder style={styles}>
							{items}
						</Paper>
					)}
				</Transition>


				<Group spacing={0} className={classes.social} position="right" noWrap>

					<ActionIcon size="lg" variant='transparent' onClick={() => window.open('https://github.com/roycuadra')}>
						<BrandGithub size={18} strokeWidth={1.5} color="#ffffff" />
					</ActionIcon>
				
					
				</Group>
			</Container>
		</Header>
	);
}

export default AppHeader