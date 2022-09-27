import { styled } from "@stitches/react";
import Link from "next/link";

export const HeaderContainer = styled('header', {
    padding: "2rem 0",
    width: "100%",
    maxWidth: 1180,
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
})

export const BagLink = styled(Link, {
    width: 48,
    height: 48,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "$elements",
    borderRadius: 8,
    position: "relative",


    span: {
        width: 24,
        height: 24,
        position: "absolute",
        top: "-12px",
        right: "-12px",
        borderRadius: "50%",
        backgroundColor: "$green",
        outline: "$background solid",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
})