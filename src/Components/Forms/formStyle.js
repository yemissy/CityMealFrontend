
import { makeStyles, createMuiTheme, useMediaQuery } from '@material-ui/core';

const themes = createMuiTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 340,
            md: 360,
            lg: 411,
            xl: 700,
        },
    },
})
const themes2 = createMuiTheme({
    breakpoints: {
        values: {
            tablet: 760,
            laptop: 1024,
            desktop: 1280,
        },
    },
})

const modalStyle = makeStyles(() => ({
    root: {
        borderRadius: 2 + 'px',
        position: 'relative',
        margin: 'auto',
        padding: 10 + '%',
        [themes.breakpoints.between('xs', 'sm')]: {
            width: 67 + '%',
            marginTop: 8 + 'em',
        },
        [themes.breakpoints.between('md', 'xl')]: {
            width: 70 + '%',
            marginTop: 10 + 'em',
        },
        [themes.breakpoints.up('xl')]: {
            width: 40 + '%',
            marginTop: 10 + 'em',
        },
    }
}))

const formStyle = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        position: 'relative',
        padding: '5% 5% 5% 5%',
        top: -5.5 + 'em',
        justifyContent: 'center',
        backgroundColor: ' #f4eee8',
        '& .MuiTextField-root': {
            margin: theme.spacing(0.8),
            width: 15 + 'em',
        },
        '& Button': {
            margin: 'auto',
            color: '#f4eee8',
            backgroundColor: '#325288',
        },
        [themes2.breakpoints.up('tablet')]: {
            top: -13.5 + 'em',
            position: 'relative',

            '& .MuiFormControl-root': {
                flexDirection: 'row',
                // marginLeft: 5 + 'em',
                margin: theme.spacing(0.5),
                width: 33 + 'em',
                // backgroundColor: '#FBF7F7',
            },
            '& .MuiInputBase-root': {
                display: 'contents',
                position: 'relative',
                alignItems: 'center',
                left: 8 + 'em',
            },
            '& .MuiInputLabel-formControl': {
                left: -6 + 'em',
                color: '#000000'
            },
            '& Button': {
                marginTop: 3 + '%',
            }
        },
        [themes2.breakpoints.up('laptop')]: {
            width: 40 + 'em',
            margin: theme.spacing(0.5),

            '& .MuiFormControl-root': {
                flexDirection: 'row',
            },
            '& Button': {
                marginTop: '3%',
                marginLeft: 22 + 'em',
            },
        },
        [themes2.breakpoints.up('desktop')]: {
            width: 40 + 'em',
            margin: theme.spacing(0.5),

            '& .MuiFormControl-root': {
                flexDirection: 'row',
            },
            '& Button': {
                marginTop: '3%',
                marginLeft: 22 + 'em',
            },
        },
    }
}))

const logoStyles = makeStyles(() => ({
    root: {
        position: 'relative',
        width: 5 + 'em',
        height: 5 + 'em',
        left: 1 + 'em',
        top: 0.6 + 'em',
        [themes2.breakpoints.up('laptop')]: {
            position: 'relative',
            left: 2 + 'em',
        }
    }
}))

export { themes, themes2, modalStyle, formStyle, useMediaQuery, logoStyles }