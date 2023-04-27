//#endregion Import
import AppLayout from "@/core/layout";
import { ReactElement, useState, useEffect, useCallback } from "react";
import { NextPageWithLayout } from "../_app";
import {
    createStyles,
    Anchor,
    Flex,
    Image,
    Title,
    Badge,
    Group,
    Grid,
    useMantineTheme,
    Avatar,
    Paper,
    Center,
    Accordion,
    Text,
    Kbd,
    Container,
    Divider,
    ScrollArea,
    Timeline,
    Loader,
    Breadcrumbs
} from '@mantine/core';
import { useMutation } from 'react-query'
import { useRouter } from "next/router";
import { useMediaQuery } from "@mantine/hooks";
import { IAccordionDetails, IPokemonEvolutionOrder } from "@/core/interface/Pokemon";
import { helpers } from "@/core/helpers/helper";
import { pokemonService } from "../api/pokemonService";
import MoveSetModal from "@/core/components/_moveSetModal";
import { usePokemonEvolutionStore, usePokemonSpeciesStore, usePokemonStore } from "@/core/zustand/store";
import { openAIService } from "../api/openAIService";

const { fetchPokemonSpeciesDetailsByUrl } = pokemonService;
const { getProperPokemonImg, getProperPokemonBadgeColor, getProperPokemonBadgeEmoji, generateRandomColor } = helpers
const { createCompletion } = openAIService
//#endregion

//#region Styles
const useStyles = createStyles((theme) => ({

    loader: {
        marginTop: '40%'
    },

    card: {
        height: 350,
        width: '100%'
    },

    evolutionCard: {
        height: 100,
        width: 120
    },

    flex: {
        height: '100%'
    },

    accordionGrid: {

        // Media query with value from theme
        [`@media (max-width: ${theme.breakpoints.xs}px)`]: {

            // Assign margin here if mobile view is not responsive
        },
    },

    accordionPanel: {
        backgroundColor: "#ffffff"
    },

    paperSpan: {
        fontWeight: 300,
        fontSize: 15
    },

    statsContainer: {
        marginTop: 10
    }
}));
//#endregion

const Page: NextPageWithLayout = () => {

    //#region State Helper
    const { classes } = useStyles();
    const router = useRouter();
    const theme = useMantineTheme();

    // Add max-width when mobile view
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

    // Get Params in URL
    const name = router.query["name"];

    // Zustand
    const pokemonDetails = usePokemonStore(state => state.pokemon);
    const pokemonSpeciesDetails = usePokemonSpeciesStore(state => state.species);
    const pokemonEvolutionDetails = usePokemonEvolutionStore(state => state.evolution);

    // Mutate
    const { mutateAsync } = useMutation(fetchPokemonSpeciesDetailsByUrl)

    //#endregion

    //#region State

    // Helper State
    const [loading, setLoading] = useState(true)

    // Evolution State
    const [pokemonEvolutionDetailed, setPokemonEvolutionDetailed] = useState<IPokemonEvolutionOrder[]>([])
    const [evolutionCurrentOrder, setEvolutionCurrentOrder] = useState<number>(0)
    const [pokemonUniqueEvolution, setPokemonUniqueEvolution] = useState<boolean>(false)

    // Moveset Modal State
    const [modalShow, setModalShow] = useState<boolean>(false);
    const [modalUrl, setModalUrl] = useState<string>("")
    const [modalTitle, setModalTitle] = useState<string>("")
    //#endregion

    //#region Callback
    const callBackKeyCode = useCallback((e: any) => {

        const { code } = e

        if (code === 'Backspace') {
            setLoading(true)
            router.push('/')
        }

    }, [])
    //#endregion

    //#region UseEffect
    useEffect(() => {
        if (pokemonDetails.id === 0) {
            setLoading(true)
            router.push('/')
        }
        else
            getProperEvolution()
    }, [])

    useEffect(() => {

        if (pokemonEvolutionDetailed.length !== 0 && loading)
            getPokemonDescription()

    }, [pokemonEvolutionDetailed])

    useEffect(() => {
        document.addEventListener('keydown', callBackKeyCode);
        return () => {
            document.removeEventListener('keydown', callBackKeyCode);
        }
    }, [callBackKeyCode])
    //#endregion

    //#region Helper
    /**
     * @remarks
     * multiple functions for getting proper data for usage
     *
     * @function getProperNameString - get proper pokemon name as string and also uppercase string
     * @function getProperNameStringLowerCase - get proper pokemon name as string and also lowercase string
     * @function getProperStatName - get proper string for the pokemon stats, just shorten the special-attack and special-defense
     */
    const getProperNameString = () => {
        if (name === undefined)
            return "";
        else
            return name.toString().toUpperCase();
    }

    const getProperStatName = (name: string) => {
        if (name === "special-attack")
            return "SP. ATK"
        else if (name === "special-defense")
            return "SP. DEF"
        else
            return name.toUpperCase()
    }

    /**
     * @remarks
     * This function is to get the dynamic pokemon species data
     *
     * @param url - then pokemon-species url
     * @returns pokemon species data
     */
    const dynamicPokemonSpecies = async (url: string) => {

        const data = await mutateAsync(url)

        // Return absolute pokemon Id
        return data
    }

    /**
     * @remarks
     * This function is to get the pokemon id; 
     * because pokemon details and species has different id
     *
     * @param name - name of the pokemon
     * @returns pokemon details id
     */
    const getPokemonVarietyId = (name: string, varieties: any) => {
        const filtered = varieties.filter((e: any) => e.pokemon.name === name.toLowerCase())
        const initialSliceUrl = filtered[0].pokemon.url.replace('https://pokeapi.co/api/v2/pokemon/', '')
        const sliceId = initialSliceUrl.slice(0, -1)
        return parseInt(sliceId)
    }

    const getPokemonSpritesUrl = (id: number) => {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    }

    /**
    * @remarks
    * This function is to get the proper evolution of pokemon
    * created since the json evolution is an headache
    */
    const getProperEvolution = async () => {

        let pokemonEvolutionDetailed = []

        // Check if there's multiple paths of evolution. Mostly Eevee and Oddish
        if (pokemonEvolutionDetails.chain.evolves_to.length > 1) {

            // first evolution
            const firstEvolutionSpecies = await dynamicPokemonSpecies(pokemonEvolutionDetails.chain.species.url)
            const firstEvolutionId = firstEvolutionSpecies.id;
            const firstEvolution = {
                name: pokemonEvolutionDetails.chain.species.name,
                imageUrl: getPokemonSpritesUrl(getPokemonVarietyId(firstEvolutionSpecies.name, firstEvolutionSpecies.varieties)),
                order: 1,
                id: firstEvolutionId,
                description: ""
            }

            pokemonEvolutionDetailed.push(firstEvolution)
            setPokemonUniqueEvolution(true)

            pokemonEvolutionDetails.chain.evolves_to.forEach(async (e, i) => {

                // first evolution
                const nextEvolutionSpecies = await dynamicPokemonSpecies(e.species.url)
                const nextEvolutionPokemonId = nextEvolutionSpecies.id;
                const nextEvolution = {
                    name: e.species.name,
                    imageUrl: getPokemonSpritesUrl(getPokemonVarietyId(nextEvolutionSpecies.name, nextEvolutionSpecies.varieties)),
                    order: 0,
                    id: nextEvolutionPokemonId,
                    description: ""
                }

                pokemonEvolutionDetailed.push(nextEvolution)
            })

        }
        else {

            // first evolution
            const firstEvolutionSpecies = await dynamicPokemonSpecies(pokemonEvolutionDetails.chain.species.url)
            const firstEvolutionId = firstEvolutionSpecies.id;
            const firstEvolution = {
                name: pokemonEvolutionDetails.chain.species.name,
                imageUrl: getPokemonSpritesUrl(getPokemonVarietyId(firstEvolutionSpecies.name, firstEvolutionSpecies.varieties)),
                order: 1,
                id: firstEvolutionId,
                description: ""
            }

            if (firstEvolution.name === pokemonDetails.name)
                setEvolutionCurrentOrder(1)

            pokemonEvolutionDetailed.push(firstEvolution)
            setPokemonUniqueEvolution(false)

            // Next Evolution
            pokemonEvolutionDetails.chain.evolves_to.forEach(async (e, i) => {

                // second evolution
                const secondEvolutionSpecies = await dynamicPokemonSpecies(e.species.url)
                const secondEvolutionId = secondEvolutionSpecies.id
                const secondEvolution = {
                    name: e.species.name,
                    imageUrl: getPokemonSpritesUrl(getPokemonVarietyId(secondEvolutionSpecies.name, secondEvolutionSpecies.varieties)),
                    order: 2,
                    id: secondEvolutionId,
                    description: ""

                }

                if (secondEvolution.name === pokemonDetails.name)
                    setEvolutionCurrentOrder(2)

                pokemonEvolutionDetailed.push(secondEvolution)

                // checking for third evolution. If not equals to 0, continue;
                if (e.evolves_to.length !== 0) {
                    e.evolves_to.forEach(async (e1, i1) => {

                        // third evolution
                        const thirdEvolutionSpecies = await dynamicPokemonSpecies(e1.species.url)
                        const thirdEvolutionId = thirdEvolutionSpecies.id;
                        const thirdEvolution = {
                            name: e1.species.name,
                            imageUrl: getPokemonSpritesUrl(getPokemonVarietyId(thirdEvolutionSpecies.name, thirdEvolutionSpecies.varieties)),
                            order: 3,
                            id: thirdEvolutionId,
                            description: ""
                        }

                        if (thirdEvolution.name === pokemonDetails.name)
                            setEvolutionCurrentOrder(3)

                        pokemonEvolutionDetailed.push(thirdEvolution)

                        // checking for fourth evolution. If not equals to 0, continue;
                        if (e1.evolves_to.length !== 0) {
                            e1.evolves_to.forEach(async (e2, i2) => {

                                // fourth evolution
                                const fourthEvolutionSpecies = await dynamicPokemonSpecies(e2.species.url)
                                const fourthEvolutionId = fourthEvolutionSpecies.id;
                                const fourthEvolution = {
                                    name: e2.species.name,
                                    imageUrl: getPokemonSpritesUrl(getPokemonVarietyId(fourthEvolutionSpecies.name, fourthEvolutionSpecies.varieties)),
                                    order: 4,
                                    id: fourthEvolutionId,
                                    description: ""
                                }

                                if (fourthEvolution.name === pokemonDetails.name)
                                    setEvolutionCurrentOrder(4)

                                pokemonEvolutionDetailed.push(fourthEvolution)

                            })
                        }

                    })
                }
            })
        }

        setPokemonEvolutionDetailed(pokemonEvolutionDetailed)
    }
    //#endregion

    //#region Queries

    /**
     * @remarks
     * This function is for create Array of DOM and add data base on items map
     *
     * @param e - item itself
     * @param i - item index
     * @returns DOM Array with data
     */
    const features = pokemonDetails.types.map((e, i) => (
        <Badge
            color={getProperPokemonBadgeColor(e.type.name.toUpperCase())}
            key={i}
            leftSection={getProperPokemonBadgeEmoji(e.type.name.toUpperCase())}
        >
            {e.type.name}
        </Badge>
    ));

    const abilities = pokemonDetails.abilities.map((e, i) => (
        <Badge
            color={generateRandomColor()}
            key={i}
        >
            {e.ability.name}
        </Badge>
    ))

    const stats = pokemonDetails.stats.map((e, i) => (
        <Grid.Col span={4} key={i}>
            <Center>
                <Text fw={700}>{getProperStatName(e.stat.name)}</Text>
            </Center>
            <Center>
                <Text c="black">{e.base_stat}</Text>
            </Center>
        </Grid.Col>
    ))

    const moves = pokemonDetails.moves.map((e, i) => (
        <Grid.Col span={1} key={i}>
            <Badge
                color={generateRandomColor()}
                sx={{ cursor: 'pointer' }}
                onClick={() => handleMoveBadgeClick(e.move.url, e.move.name)}
            >
                {e.move.name}
            </Badge>
        </Grid.Col>
    ))

    const evolutions = pokemonEvolutionDetailed.map((e, i) => (
        <Timeline.Item
            title={e.name.toUpperCase()}
            bullet={
                <Avatar size={22} radius="xl" src={e.imageUrl} />
            }
            lineVariant={pokemonUniqueEvolution === true ? 'dashed' : 'solid'}
            key={i}
        >
            <Text color="dimmed" size="sm">
                {e.description}
            </Text>
        </Timeline.Item>
    ))

    const breadCrumbs = [{ title: 'HOME', href: '/' }, { title: pokemonDetails.name.toUpperCase(), href: '#' }].map(
        (e, i) => (
            <Anchor href={e.href} key={i}>
                <Text fw={500}>{e.title}</Text>
            </Anchor>
        )
    )
    //#endregion

    //#region Reusable Components
    /**
     * @remarks
     * This is a custom component for accordion control
     *
     * @param label - title of the component
     * @param description - description of the component
     * @returns TSX element 
     */
    const AccordionPlainDetails = ({ label, description }: IAccordionDetails) => {
        return (
            <Group noWrap>
                <Avatar src="/pokeball.png" radius="xl" size="lg" />
                <div>
                    <Text>{label}</Text>
                    <Text size="sm" color="dimmed" weight={400}>
                        {description}
                    </Text>
                </div>
            </Group>
        )
    }
    //#endregion

    //#region Handle
    const handleMoveBadgeClick = (url: string, title: string) => {
        setModalUrl(url)
        setModalTitle(title)
        setModalShow(true)
    }
    //#endregion

    //#region Get
    const getPokemonDescription = async () => {

        let emptyPokemonEvolutionDetailed: IPokemonEvolutionOrder[] = []
        let isOpenAIAlreadyError = false

        for (const pokemon of pokemonEvolutionDetailed) {

            // Check if OpenAI is already error in previous data
            if (isOpenAIAlreadyError) {
                pokemon.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vehicula tempus ipsum, vitae efficitur erat condimentum id. Praesent erat libero, maximus sed lobortis et, consequat nec ligula. Maecenas congue tellus a augue suscipit, at ultrices ex pretium."
            }
            else {

                // Call OpenAI API
                const openai = await createCompletion(pokemon.name)

                // OpenAI Flagger
                if (openai !== null)
                    pokemon.description = openai.data.choices[0].text === undefined ? "" : openai.data.choices[0].text
                else {
                    pokemon.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vehicula tempus ipsum, vitae efficitur erat condimentum id. Praesent erat libero, maximus sed lobortis et, consequat nec ligula. Maecenas congue tellus a augue suscipit, at ultrices ex pretium."
                    isOpenAIAlreadyError = true
                }
            }

            emptyPokemonEvolutionDetailed.push(pokemon)
        }

        setPokemonEvolutionDetailed(emptyPokemonEvolutionDetailed)
        setLoading(false)
    }
    //#endregion

    return (
        <>
            {
                loading ? (
                    <Center className={classes.loader}>
                        <Loader variant="bars" />
                    </Center>
                ) : (
                    <>
                        <MoveSetModal show={modalShow} setShow={setModalShow} url={modalUrl} title={modalTitle} />
                        <div>
                            <Breadcrumbs>{breadCrumbs}</Breadcrumbs>
                        </div>

                        <Paper shadow="sm" radius="lg" p="lg" mt={15} withBorder>
                            <Text><b>Keyboard Shortcuts</b><span className={classes.paperSpan}> (under experimentation & ongoing keys to be added)</span></Text>
                            <Grid columns={12} mt={15}>
                                <Grid.Col xs={6} sm={6} md={6} lg={6}>
                                    <Center>
                                        <Flex
                                            mih={50}
                                            gap="md"
                                            justify="flex-start"
                                            align="flex-start"
                                            direction="row"
                                            wrap="wrap"
                                        >
                                            <Kbd>Back Space</Kbd>
                                            <Text>=</Text>
                                            <Text>Go to Main Page</Text>
                                        </Flex>
                                    </Center>
                                </Grid.Col>
                                <Grid.Col xs={6} sm={6} md={6} lg={6}>
                                    <Center>
                                        <Flex
                                            mih={50}
                                            gap="md"
                                            justify="flex-start"
                                            align="flex-start"
                                            direction="row"
                                            wrap="wrap"
                                        >
                                            <Kbd>NULL</Kbd> + <Kbd>NULL</Kbd>
                                            <Text>=</Text>
                                            <Text>NULL</Text>
                                        </Flex>
                                    </Center>
                                </Grid.Col>
                            </Grid>
                        </Paper>

                        <Grid columns={12} mt={10}>
                            <Grid.Col xs={6} sm={6} md={6} lg={6} sx={{ height: 470 }}>
                                <Center>
                                    <Paper
                                        radius="md"
                                        shadow="sm"
                                        sx={{ backgroundImage: `url(/poke-bg.jpg)` }}
                                        withBorder
                                        className={classes.card}
                                    >
                                        <Flex
                                            className={classes.flex}
                                            mih={50}
                                            gap="md"
                                            justify="center"
                                            align="center"
                                            direction="row"
                                            wrap="wrap"
                                        >
                                            <Image
                                                imageProps={{ loading: "lazy" }}
                                                fit="contain"
                                                src={getProperPokemonImg(pokemonDetails.sprites.other.dream_world.front_default === null ? pokemonDetails.sprites.front_default : pokemonDetails.sprites.other.dream_world.front_default)}
                                                alt={getProperNameString()}
                                                width={250}
                                                height={200}
                                            />
                                        </Flex>
                                        <Paper
                                            radius="md"
                                            shadow="sm"
                                            p="sm"
                                            mt={15}
                                            withBorder
                                        >
                                            <Title order={5} weight={600}>{getProperNameString()} - (Pokémon)</Title>
                                            <Group spacing={7} mt={10}>
                                                {features}
                                            </Group>
                                        </Paper>
                                    </Paper>
                                </Center>
                            </Grid.Col>
                            <Grid.Col xs={6} sm={6} md={6} lg={6} className={classes.accordionGrid}>

                                {/* Add defaultValue="value of item" to add default opened item */}
                                <Accordion chevronPosition="right" variant="contained">

                                    {/* Details */}
                                    <Accordion.Item value="Details">
                                        <Accordion.Control>
                                            <AccordionPlainDetails label="Details" description={`A pieces of information or fact about pokemon ${getProperNameString()}.`} />
                                        </Accordion.Control>
                                        <Accordion.Panel className={classes.accordionPanel}>

                                            {/* Abilities */}
                                            <div>
                                                <Center>
                                                    <Text fw={700}>Abilities</Text>
                                                </Center>
                                                <Center>
                                                    <Group spacing={7} mt={10}>
                                                        {abilities}
                                                    </Group>
                                                </Center>
                                            </div>
                                            <Divider mt={25} />

                                            {/* Body Mass */}
                                            <div>
                                                <Center mt={15}>
                                                    <Text fw={700}>Body Mass</Text>
                                                </Center>
                                                <Grid mt={11}>
                                                    <Grid.Col span={6}>
                                                        <Center>
                                                            <Text fw={700}>Height</Text>
                                                        </Center>
                                                        <Center>
                                                            <Text c="black">{pokemonDetails.height} cm</Text>
                                                        </Center>
                                                    </Grid.Col>
                                                    <Grid.Col span={6}>
                                                        <Center>
                                                            <Text fw={700}>Weight</Text>
                                                        </Center>
                                                        <Center>
                                                            <Text c="black">{pokemonDetails.weigth} Kg</Text>
                                                        </Center>
                                                    </Grid.Col>
                                                </Grid>
                                            </div>
                                            <Divider mt={25} />

                                            {/* Stats */}
                                            <div className={classes.statsContainer}>
                                                <Center mt={15}>
                                                    <Text fw={700}>Base Stats</Text>
                                                </Center>
                                                <Grid mt={11} mb={11}>
                                                    {stats}
                                                </Grid>
                                            </div>
                                        </Accordion.Panel>
                                    </Accordion.Item>

                                    {/* Moves */}
                                    <Accordion.Item value="Moves">
                                        <Accordion.Control>
                                            <AccordionPlainDetails label="Move Set" description="A technique that a Pokémon uses during Battles. Moves are mainly used to inflict damage on the opponent." />
                                        </Accordion.Control>
                                        <Accordion.Panel>
                                            <Container>
                                                <ScrollArea style={{ height: 250 }} offsetScrollbars type="hover" scrollbarSize={5}>
                                                    <Grid grow gutter="xs">
                                                        {moves}
                                                    </Grid>
                                                </ScrollArea>
                                            </Container>
                                        </Accordion.Panel>
                                    </Accordion.Item>

                                    {/* Evolution */}
                                    <Accordion.Item value="Evolution">
                                        <Accordion.Control>
                                            <AccordionPlainDetails label="Evolution (Powered by OpenAI)" description="Most Pokémon evolve when they reach or surpass a certain level. Once such a Pokémon has reached the required level." />
                                        </Accordion.Control>
                                        <Accordion.Panel>
                                            <Center>
                                                <ScrollArea style={{ height: 210 }} offsetScrollbars type="always" scrollbarSize={5}>
                                                    {
                                                        pokemonUniqueEvolution ? (
                                                            <Timeline color="green" active={pokemonEvolutionDetailed.length} radius="md" lineWidth={2} bulletSize={30} mt={10} mb={15}>
                                                                {evolutions}
                                                            </Timeline>
                                                        ) : (
                                                            <Timeline color="green" active={evolutionCurrentOrder - 1} radius="md" lineWidth={2} bulletSize={30} mt={10} mb={15}>
                                                                {evolutions}
                                                            </Timeline>
                                                        )
                                                    }
                                                </ScrollArea>
                                            </Center>
                                        </Accordion.Panel>
                                    </Accordion.Item>
                                </Accordion>
                            </Grid.Col>
                        </Grid>
                    </>
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