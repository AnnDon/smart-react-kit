const glob = require("glob");
const path = require("path");
const fs = require("fs");
const url = require("url");
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const optimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin"); 

const appDirectory = fs.realpathSync(process.cwd());

const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const moduleFileExtensions = [
    "web.mjs",
    "mjs",
    "web.js",
    "js",
    "web.ts",
    "ts",
    "web.tsx",
    "tsx",
    "json",
    "web.jsx",
    "jsx",
];

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
    const extension = moduleFileExtensions.find(extension =>
        fs.existsSync(resolveFn(`${filePath}.${extension}`)),
    );

    if (extension) {
        return resolveFn(`${filePath}.${extension}`);
    }

    return resolveFn(`${filePath}.js`);
};
const setMPA = () => {
    let entry = {};
    let htmlWebpackPlugins = [];
    let entryFiles = glob.sync(path.join(appDirectory,"./src/features/*/index.js"));

    Object.keys(entryFiles).map((index)=>{
        let entryFile = entryFiles[index];
        const match = entryFile.match(/src\/features\/(.*)\/index\.js/);
        const pageName = match && match[1];
        entry[pageName] = entryFile;
        return htmlWebpackPlugins.push(
        	new HtmlWebpackPlugin({
        		inlineSource: ".css$",
        		template: path.join(appDirectory,`./src/features/${pageName}/index.html`),
        		filename: `${pageName}.html`,
                chunks: ["vendors", pageName],
                inject: true,
                minify: {
                    html5: true,
                    collapseWhitespace: false,
                    preserveLineBreaks: false,
                    minifyCSS: false,
                    minifyJS: true,
                    removeComments: false,
                },
        	})
    	);
    });
    return {
        entry,
        htmlWebpackPlugins,
    };
};
const { entry, htmlWebpackPlugins } = setMPA();
module.exports = {
    mode: "development",
    entry: entry,
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name]_[chunkhash:8].js"
    },
    module: {
        rules: [
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                ]
            },
            {
                test: /.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240
                        }
                    }
                ]
            },
            {
                test: /.(woff|woff2|eot|ttf|otf)$/,
                use: 'file-loader'
            }
        ]
    },
    optimization:{
      splitChunks: {
        cacheGroups:{
            commons:{
                test:/(react|react-dom)/,
                chunks: 'async',
                name: 'vendors',
            }
        }
      },
      runtimeChunk: false,
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css',
        }),
        new CleanWebpackPlugin(),
        // new HtmlWebpackExternalsPlugin({ // 引入外部库，纯粹演示
        //     externals: [
        //       {
        //         module: 'react',
        //         entry: 'https://unpkg.com/react@16/umd/react.development.js',
        //         global: 'React',
        //       },
        //       {
        //         module: 'react-dom',
        //         entry: 'https://unpkg.com/react-dom@16/umd/react-dom.development.js',
        //         global:'ReactDOM'
        //       },
        //     ],
        // })
    ].concat(htmlWebpackPlugins),
}
