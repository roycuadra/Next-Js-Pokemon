//#region Footer
import { createStyles, Container, Group, Anchor } from '@mantine/core';
import { Skeleton } from '@mantine/core';
//#endregion

//#region Styles
const useStyles = createStyles((theme) => ({
    footer: {
        paddingBottom: 5,
        borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
            }`,
    },

    logo: {
        top: 10
    },

    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',

        [theme.fn.smallerThan('xs')]: {
            flexDirection: 'column',
        },
    },

}));
//#endregion

const AppFooter = () => {
    const { classes } = useStyles();

    return (
        <div className={classes.footer}>
            <Container className={classes.inner}>
                <Skeleton height={40} circle mb="xl" className={classes.logo} />
                <Group>Created by Kyooowe ♡</Group>
            </Container>
        </div>
    );
}

export default AppFooter