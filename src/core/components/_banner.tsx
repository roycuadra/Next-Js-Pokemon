//#endregion Import
import { createStyles, Container, Text, Button, Group } from '@mantine/core';
//#endregion

//#region Styles
const BREAKPOINT = '@media (max-width: 755px)';

const useStyles = createStyles((theme) => ({
    wrapper: {
        position: 'relative',
        boxSizing: 'border-box',
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },

    inner: {
        position: 'relative',
        paddingTop: 200,
        paddingBottom: 60,

        [BREAKPOINT]: {
            paddingBottom: 50,
            paddingTop: 80,
        },
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: 62,
        fontWeight: 900,
        lineHeight: 1.1,
        margin: 0,
        padding: 0,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [BREAKPOINT]: {
            fontSize: 42,
            lineHeight: 1.2,
        },
    },

    description: {
        marginTop: theme.spacing.xl,
        fontSize: 24,

        [BREAKPOINT]: {
            fontSize: 18,
        },
    },

    controls: {
        marginTop: theme.spacing.xl * 2,

        [BREAKPOINT]: {
            marginTop: theme.spacing.xl,
        },
    },

    control: {
        height: 54,
        paddingLeft: 38,
        paddingRight: 38,

        [BREAKPOINT]: {
            height: 54,
            paddingLeft: 18,
            paddingRight: 18,
            flex: 1,
        },
    },
}));
//#endregion

const Banner = () => {
    const { classes } = useStyles();

    return (
        <div className={classes.wrapper}>
            <Container size={700} className={classes.inner}>
                <h1 className={classes.title}>
                    A{' '}
                    <Text component="span" variant="gradient" gradient={{ from: 'blue', to: 'red' }} inherit>
                        Lorem ipsum
                    </Text>{' '}
                    dolor sit amet nulla vitae lectus
                </h1>

                <Text className={classes.description} color="dimmed">
                    eu arcu congue viverra. Proin vehicula sapien in ex sodales convallis donec scelerisque erat ac ligula vulputate
                </Text>

                <Group className={classes.controls}>
                    <Button
                        size="xl"
                        className={classes.control}
                        variant="gradient"
                        gradient={{ from: 'blue', to: 'red' }}
                    >
                        Get started
                    </Button>
                </Group>
            </Container>
        </div>
    );
}

export default Banner;