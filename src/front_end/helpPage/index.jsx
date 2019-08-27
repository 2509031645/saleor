/*
*   fileName: index
*   author: 宋均辉
*   time: 2019/8/22
*/
// @flow
import React, {Component} from 'react';

type Props = {}

type State = {}

class HelpPage extends Component<Props,State>{
    constructor(props: Props){
        super(props);
        this.state = {}
    }

    render(){
        return (
            <div>
                帮助中心
            </div>
        )
    }
}

export default HelpPage;
