/* eslint-env es6 */
/* eslint-disable no-console */
const plugin = require("tailwindcss/plugin");
const TailwindPreFunction = require("./tailwind.pre-function");

module.exports = {
    prefix: "",
    content: ["./src/**/*.html", "./src/**/*.ts"],
    darkMode: "class", // or 'media' or 'class'
    /**
     * Src: https://tailwindcss.com/docs/upgrade-guide#disabling-core-plugins
     * In v4, corePlugins doesn't support
     */
    corePlugins: {
        preflight: false,
    },
    theme: {
        // Overwrite the default tailwindCSS
        colors: {},
        spacing: {},
        //
        fontFamily: {},
        fontSize: {},
        fontWeight: {},
        lineHeight: {},
        // Border
        borderRadius: {},
        borderWidth: {},
        outlineWidth: {},
        ringWidth: {},
        //
        boxShadow: {},
        // Table
        borderSpacing: {},
        // SVG
        strokeWidth: {},
        //
        screens: {
            "1280px": "1280px",
            // => @media (min-width: 1280px) { ... } // For old design
            // We only use 3 of responsive sizes
            "768px": "768px",
            // => @media (min-width: 768px) { ... }
            "1024px": "1024px",
            // => @media (min-width: 1024px) { ... }
            "1440px": "1440px",
            // => @media (min-width: 1440px) { ... }
        },
        extend: {
            spacing: {
                auto: "auto",
                ...TailwindPreFunction.generatePixelValues({
                    fromNumber: 0,
                    toNumber: 100,
                    hasDefaultDecimalPart: true,
                    customNumbers: [120],
                }),
            },
            fontSize: TailwindPreFunction.generatePixelValues({
                fromNumber: 0,
                toNumber: 100,
                hasDefaultDecimalPart: true,
            }),
            lineHeight: TailwindPreFunction.generatePixelValues({
                fromNumber: 0,
                toNumber: 100,
                hasDefaultDecimalPart: true,
            }),
            // Border
            borderWidth: TailwindPreFunction.generatePixelValues({
                fromNumber: 0,
                toNumber: 100,
                hasDefaultDecimalPart: true,
            }),
            outlineWidth: TailwindPreFunction.generatePixelValues({
                fromNumber: 0,
                toNumber: 100,
                hasDefaultDecimalPart: true,
            }),
            ringWidth: TailwindPreFunction.generatePixelValues({
                fromNumber: 0,
                toNumber: 100,
                hasDefaultDecimalPart: true,
            }),
            // Table
            borderSpacing: TailwindPreFunction.generatePixelValues({
                fromNumber: 0,
                toNumber: 100,
                hasDefaultDecimalPart: true,
            }),
            // SVG
            strokeWidth: TailwindPreFunction.generatePixelValues({
                fromNumber: 0,
                toNumber: 100,
                hasDefaultDecimalPart: true,
            }),
        },
    },
    plugins: [
        plugin(function ({ addUtilities }) {
            addUtilities({
                ".break-words": {
                    "word-break": "break-word",
                },
                ".flex-center": {
                    display: "flex",
                    "align-items": "center",
                    "justify-content": "center",
                },
            });
        }),
    ],
};
