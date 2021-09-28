import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from "rollup-plugin-babel";
import typescript from 'rollup-plugin-typescript';
import pkg from './package.json';
import react from 'react';
export default {
    input: 'src/index.ts', // 打包入口
    output: { // 打包出口
        file: pkg.module, // 最终打包出来的文件路径和文件名，这里是在package.json的browser: 'dist/index.js'字段中配置的
        format: 'es'
    },
    plugins: [ // 打包插件
        resolve(), // 查找和打包node_modules中的第三方模块
        commonjs({
            include: 'node_modules/**',
            namedExports: {
                react: Object.keys(react)
            }
        }),
        typescript(), // 解析TypeScript
        babel({
            exclude: 'node_modules/**', // 防止打包node_modules下的文件
            runtimeHelpers: true,       // 使plugin-transform-runtime生效
        }),
    ],
};