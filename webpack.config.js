/* eslint-disable */

const fs = require('fs');
const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssModules = require('postcss-modules-scope');
const postcssLocal = require('postcss-modules-local-by-default');
const genericNames = require('generic-names');

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
                test: /\.module\.(css|scss|sass)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: false,
                            importLoaders: 1,
                            esModule: true,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            parser: 'postcss-scss',
                            plugins: () => [
                                postcssLocal(),
                                postcssModules({
                                    generateScopedName: genericNames('xc_[hash:base64]', {
                                        context: process.cwd(),
                                    }),
                                }),
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
