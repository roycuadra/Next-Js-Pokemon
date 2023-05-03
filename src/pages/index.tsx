//#region Imports
import { useCallback, useEffect, useState } from 'react';
import PCard from '@/core/components/_card';
import AppLayout from '@/core/layout';
import {
	ActionIcon,
	Center,
	createStyles,
	Flex,
	Grid,
	Kbd,
	Pagination,
	Paper,
	TextInput,
	Tooltip,
	useMantineTheme,
	Text
} from '@mantine/core';
import { ReactElement } from 'react'
import { Search, Refresh, ArrowRight } from 'tabler-icons-react';
import { NextPageWithLayout } from './_app'
import { pokemonService } from './api/pokemonService'
import { useQuery, useIsFetching } from 'react-query';
import { IApiResult, IPokemonBasic } from '@/core/interface/Pokemon';
import { useRouter } from 'next/router';
import { useDebouncedState } from '@mantine/hooks';

const { fetchPokemons } = pokemonService
//#endregion

//#region Styles
const useStyles = createStyles((theme) => ({
	parent: {
		marginTop: 30
	},

	input: {
		width: '40%',

		// Media query with value from theme
		[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
			width: '95%',
		},

	},

	loader: {
		marginTop: '30%'
	},

	paperSpan: {
		fontWeight: 300,
		fontSize: 15
	}
}))
//#endregion

const Page: NextPageWithLayout = () => {

	//#region State Helper
	const { classes, cx } = useStyles();
	const theme = useMantineTheme();
	const isFetching = useIsFetching();
	const router = useRouter();
	//#endregion

	//#region States

	// Pagination
	const [offset, setOffset] = useState<number>(0)
	const [initialPage, setInitialPage] = useState<number>(1)
	const [itemsPerPage, setItemsPerPage] = useState<number>(18)
	const [currentItems, setCurrentItems] = useState<IPokemonBasic[]>([])
	const [totalPageCount, setTotalPageCount] = useState<number>(0)

	// Child Component: Card
	const [isChildLoading, setIsChildLoading] = useState<boolean>(false)

	// Search
	const [searchKey, setSearchKey] = useDebouncedState("", 300)

	//#endregion

	//#region Queries
	const { data, isSuccess } = useQuery<IApiResult>("pokemons", () => fetchPokemons(1279, offset))
	//#endregion

	//#region Callback
	const callBackKeyCode = useCallback((e: any) => {

		const { code } = e

		// For next page
		if (code === 'ArrowRight') {

			if (initialPage !== totalPageCount) {
				setInitialPage(initialPage + 1)
				setOffset(18 * initialPage)
			}
		}

		if (code === 'ArrowLeft') {
			if (initialPage !== 1) {

				// Get the Absolute Page
				// eg. Current page is 4, since we are going to page 3 we need to subtract 1
				const absolutePage = initialPage - 1

				// Get the Absolute Offset
				// eg. We are going to page 3, so we need to get the 2 remaining pages so we can check how many offset we need: 
				// eg. We are at page 4, then we click the left. So basically we are going thru page 3
				const absoluteOffSet = absolutePage - 1;

				// Get the Offset Multiplier
				// eg. We are now at page 3, and we already get the 2 remaining pages which is absoluteOffSet
				// eg. Multiply the absoluteOffset to 18 (itemsPerPage)
				const offSetMultiplier = itemsPerPage * absoluteOffSet

				setInitialPage(absolutePage)
				setOffset(absolutePage === 1 ? 0 : offSetMultiplier)
			}
		}


	}, [initialPage, offset])
	//#endregion

	//#region UseEffect
	useEffect(() => {
		if (isFetching === 0)
			setTimeout(() => {
				setIsChildLoading(false)
			}, 200)
	}, [isFetching])

	useEffect(() => {
		handlePagination()
	}, [data, searchKey, offset])

	useEffect(() => {
		document.addEventListener('keydown', callBackKeyCode);
		return () => {
			document.removeEventListener('keydown', callBackKeyCode);
		}
	}, [callBackKeyCode])
	//#endregion

	//#region Handle

	const handlePagination = () => {
		if (data?.results !== undefined) {

			const endOffSet = offset + itemsPerPage;
			const currentItems = searchKey === "" ? data.results.slice(offset, endOffSet) : data.results.filter((e) => e.name.toLowerCase().includes(searchKey.toLowerCase())).slice(offset, endOffSet)

			// For search: at the top is the currentItems with already sliced data
			// So this functions helps the exact page count 
			const searchTotalCurrentItems = searchKey === "" ? [] : data.results.filter((e) => e.name.includes(searchKey))

			const pageCount = searchKey === "" ? Math.ceil(data.results.length / itemsPerPage) : Math.ceil(searchTotalCurrentItems.length / itemsPerPage)

			setCurrentItems(currentItems)
			setTotalPageCount(pageCount)
		}
	}

	const handlePageClick = (e: number) => {
		if (e === 1) {
			setOffset(0)
			setInitialPage(1)
		}
		else {
			const absolutePageNumber = e - 1;
			setOffset(18 * absolutePageNumber)
			setInitialPage(e)
		}

		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const handleRefreshClick = () => {
		setSearchKey("")
		setInitialPage(1)
		setOffset(0)
	}
	//#endregion

	return (
		<>
			<Flex
				direction={{ base: 'row-reverse', sm: 'row-reverse' }}
				gap={{ base: 'xs', sm: 'xs' }}
				justify={{ sm: 'flex-start' }}
			>
				<Tooltip label="Refresh">
					<ActionIcon size={38} radius="xl" color="teal" variant="filled" onClick={() => handleRefreshClick()}>
						<Refresh size={18} />
					</ActionIcon>
				</Tooltip>
				<TextInput
					icon={<Search size={18} strokeWidth={1.5} />}
					radius="xl"
					size="md"
					className={classes.input}
					onChange={(e) => setSearchKey(e.target.value)}
					placeholder="Search pokemon.."
					rightSectionWidth={42}
				/>
			</Flex>

			
					
			

			<Grid columns={12} mt={15}>
				{
					currentItems && currentItems.map((pokeBasic: IPokemonBasic, i) => {
						return (
							<Grid.Col xs={6} sm={6} md={4} lg={4} key={i}>
								<PCard name={pokeBasic.name} url={pokeBasic.url} loading={isChildLoading} setLoading={setIsChildLoading} />
							</Grid.Col>
						)
					})
				}
			</Grid>
			{
				isFetching ? (
					""
				) : (
					<Center mt={30} mb={20}>
						<Pagination total={totalPageCount} initialPage={initialPage} radius="md" onChange={handlePageClick} withEdges />
					</Center>
				)
			}
		</>
	)
}

/**
 * @remarks
 * This page is needed to add layout to the page
 *
 * @param page - the page itself
 * @returns the page with appLayout
 */
Page.getLayout = function getLayout(page: ReactElement) {
	return <AppLayout>{page}</AppLayout>;
};

export default Page;
