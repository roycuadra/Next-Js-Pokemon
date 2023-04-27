//#region Import
import { Center, createStyles, Divider, Grid, Loader, Modal, Text } from '@mantine/core'
import { useQuery } from 'react-query';
import { IMovesetModal } from '../interface/PModal';
import { pokemonService } from '@/pages/api/pokemonService';
import { IPokemonMoveDetails } from '../interface/Pokemon';
const { fetchPokemonMoveset } = pokemonService
//#endregion

//#region Styles
const useStyles = createStyles((theme) => ({
    container: {
        paddingLeft: 10,
        paddingRight: 10
    }
}));
//#endregion

const MoveSetModal = ({ show, setShow, title, url }: IMovesetModal) => {

    //#region State Helper
    const { classes } = useStyles();
    //#endregion

    //#region Queries
    const { data, isLoading } = useQuery<IPokemonMoveDetails>(`${title}-moveset`, () => fetchPokemonMoveset(url))
    //#endregion

    //#region Helpers
    /**
     * @remarks
     * This function is replacing the included %effect_chance% 
     *
     * @returns proper effect string to be shown in UI
     */
    const getProperEffectEntries = () => {
        if (data !== undefined) {
            
            // Get the 1st entry of effect
            const effectDetails = data?.effect_entries[0].effect;

            // Check if %effect_chance% is included
            const isApproved = effectDetails?.includes("$effect_chance%");

            if (!isApproved)
                return effectDetails;
            else
                return effectDetails?.replace("$effect_chance%", `${data.effect_chance}%`);
        }
    }
    //#endregion

    //#region Local Components
    const ModalTitle = () => {
        return (
            <Text size="xl" c="#15AABF" fw={700}>{title.toUpperCase()}</Text>
        )
    }
    //#endregion

    return (
        <Modal
            opened={show}
            onClose={() => setShow(false)}
            title={ModalTitle()}
            centered
        >
            {
                isLoading ? (
                    <Center>
                        <Loader mt={30} mb={30} variant="bars" />
                    </Center>
                ) : (
                    <div className={classes.container}>
                        <Grid>
                            <Grid.Col span={4}>
                                <Center>
                                    <Text fw={700}>Accuracy</Text>
                                </Center>
                                <Center>
                                    <Text c="black">{data?.accuracy === null ? 0 : data?.accuracy}</Text>
                                </Center>
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <Center>
                                    <Text fw={700}>PP</Text>
                                </Center>
                                <Center>
                                    <Text c="black">{data?.pp}</Text>
                                </Center>
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <Center>
                                    <Text fw={700}>Power</Text>
                                </Center>
                                <Center>
                                    <Text c="black">{data?.power === null ? 0 : data?.power}</Text>
                                </Center>
                            </Grid.Col>
                        </Grid>
                        <Divider mt={25} />
                        <Text mt={15}>{getProperEffectEntries()}</Text>
                    </div>
                )
            }
        </Modal>
    )
}

export default MoveSetModal;