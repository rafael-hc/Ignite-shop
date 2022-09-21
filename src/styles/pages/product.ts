import { styled } from "@stitches/react";

export const ProductContainer = styled('main', {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    alignItems: "stretch",
    gap: "4rem",

    maxWidth: 1180,
    margin: "0 auto"

})

export const ImageContainer = styled('div', {
    width: "100%",
    maxWidth: 576,
    height: 656,

    background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
    borderRadius: 8,
    padding: "0.25rem",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    img: {
        objectFit: "cover"
    }
})

export const ProductDetails = styled('div', {
    display: "flex",
    flexDirection: "column",

    h1: {
        fontSize: "$2xl",
        color: "$text",
    },

    span: {
        marginTop: "1rem",
        display: "block",
        fontSize: "$2xl",
        color: "$green-light",
    },

    p: {
        marginTop: "2.5rem",
        fontSize: "$md",
        lineHeight: 1.6,
        color: "$text",
    },

    button: {
        marginTop: "auto",
        backgroundColor: "$green",
        border: 0,
        color: "$white",
        borderRadius: 8,
        padding: "1.25rem",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "$md",
        transition: "all 0.2s",

        '&:disabled':{
            opacity: 0.6,
            cursor: "not-allowed",
        },

        '&:enabled:hover': {
            backgroundColor: "$green-light",
        }
    },
})