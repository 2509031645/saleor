import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRouter from './router'
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import store from "./store";
import 'antd/dist/antd.css';
import {ConfigProvider} from "antd";
import zhCN from 'antd/es/locale/zh_CN';
import './common/font/iconfont.css';
import 'animate.css'

ReactDOM.render(<ConfigProvider local={zhCN}>
    <Provider store={store}>
        <AppRouter />
    </Provider>
</ConfigProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
