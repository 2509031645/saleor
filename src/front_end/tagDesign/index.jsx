/*
*   fileName: index
*   author: 宋均辉
*   time: 2019/8/21
*/
// @flow
import React, {Component} from 'react';
import TagView from "./tagView";
import TagDetail from "./tagDetail";
import style from './index.module.scss';

class TagDesign extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return (
            <div className={style.wrapper}>
                <div className={style['cell-container']}>
                    <TagView />
                    <TagDetail />
                </div>
                <div>
                    内容区域
                </div>
            </div>
        )
    }
}

export default TagDesign;