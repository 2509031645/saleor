/*
*   fileName: index
*   author: 宋均辉
*   time: 2019/8/21
*/
// @flow
import React, {Component} from 'react';
type Props = {

}
type State = {

}

class CopyRight extends Component<Props,State>{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return (
            <div style={{position:'absolute',zIndex:1,bottom:0}}>
                版权部分
            </div>
        )
    }
}

export default CopyRight;
