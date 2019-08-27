/*
*   fileName: index
*   author: 宋均辉
*   time: 2019/8/22
*/
// @flow
import React, {Component} from 'react';

type Props = {}

type State = {}

class MyInfo extends Component<Props,State>{
    constructor(props: Props){
        super(props);
        this.state = {}
    }

    render(){
        return (
            <div>
                我的资料
            </div>
        )
    }
}

export default MyInfo;
