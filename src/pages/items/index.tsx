//#region Import
import AppLayout from "@/core/layout";
import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import { createStyles, Title, Text, Button, Container, Group } from '@mantine/core';
//#endregion

//#region Styles
const useStyles = createStyles((theme) => ({
    root: {
        paddingTop: 80,
        paddingBottom: 80,
    },

    label: {
        textAlign: 'center',
        fontWeight: 900,
        fontSize: 220,
        lineHeight: 1,
        marginBottom: theme.spacing.xl * 1.5,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],

        [theme.fn.smallerThan('sm')]: {
            fontSize: 120,
        },
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        textAlign: 'center',
        fontWeight: 900,
        fontSize: 38,

        [theme.fn.smallerThan('sm')]: {
            fontSize: 32,
        },
    },

    description: {
        maxWidth: 500,
        margin: 'auto',
        marginTop: theme.spacing.xl,
        marginBottom: theme.spacing.xl * 1.5,
    },
}));
//#endregion

const Page: NextPageWithLayout = () => {
    const { classes } = useStyles();

    return (
        <Container className={classes.root}>
            <div className={classes.label}>503</div>
            <Title className={classes.title}>You have found a secret place.</Title>
            <Text color="dimmed" size="lg" align="center" className={classes.description}>
                Unfortunately, this page is still under construction.
            </Text>
        </Container>
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