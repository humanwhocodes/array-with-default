import minify from "rollup-plugin-babel-minify";

export default [
    {
        input: "src/array-with-default.js",
        output: [
            {
                file: "dist/array-with-default.cjs",
                format: "cjs"
            },
            {
                file: "dist/array-with-default.js",
                format: "esm"
            }
        ]
    },
    {
        input: "src/array-with-default.js",
        plugins: [minify({
            comments: false
        })],
        output: {
            file: "dist/array-with-default.min.js",
            format: "esm"
        }
    }    
];
