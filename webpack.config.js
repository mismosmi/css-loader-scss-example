/* eslint-disable */

const fs = require('fs');
const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssModules = require('postcss-modules-scope');
const postcssLocal = require('postcss-modules-local-by-default');
const genericNames = require('generic-names');
const autoprefixer = require('autoprefixer');

const BUILD_DIR = path.resolve(__dirname, './public');

const config = {
    mode: 'development',
    entry: [
        path.resolve(__dirname, 'index.js'),
    ],
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(css|scss|sass)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: false,
                            importLoaders: 1,
                            esModule: true,
                            modules: { auto: true },
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            parser: 'postcss-scss',
                            plugins: () => [
                                autoprefixer,
                            ],
                        },
                    },
                ],
            },
        ],
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'theme.scss',
            allChunks: true,
            esModule: true,
        }),
    ],
};

module.exports = config;
