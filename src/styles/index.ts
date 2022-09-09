import { createStitches } from '@stitches/react'

export const {
    getCssText,
    config,
    styled,
    globalCss,
    keyframes,
    theme,
    createTheme,
    css
} = createStitches({
    theme:{
        colors:{
            "green": "#00875F",
            "green-light": "#00B37E",
            "background": "#121214",
            "elements": "#202024",
            "text": "#C4C4CC",
            "title": "#E1E1E6",
            "white": "#FFFFFF"
        }
    }
})