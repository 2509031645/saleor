/*
*   fileName: index
*   author: 宋均辉
*   time: 2019/8/20
*/
// @flow
import React, {Component} from 'react';
import style from './index.module.scss';

type Props = {

}
type State = {

}
class Home extends Component<Props,State>{
    constructor(props:Props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div className={style['home-wrapper']}>
                <img src="/img/be_home.jpeg" alt=""/>
            </div>
        )
    }
}

export default Home;