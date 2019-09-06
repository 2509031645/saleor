/*
*   fileName: index
*   author: 宋均辉
*   time: 2019/9/6
*/
// @flow

import * as React from 'react';
import style from './index.module.scss';

type Props = {
    initialValue: Array<number>,
    options: Array<Object>,
    onChange(value: Array<number>): void,
    multiple: boolean
}
type State = {

}

class CheckButton extends React.Component<Props,State>{
    constructor(props){
        super(props);
        this.state = {
            value: props.initialValue || (props.multiple && [])
        }
    }

    changeSel = checkObj => {
        let staticState = this.state.value;
        if(this.props.multiple){
            if(staticState.indexOf(checkObj.id) === -1){
                staticState.push(checkObj.id)
            }else{
                staticState.splice(staticState.indexOf(checkObj.id),1)
            }
            this.setState({
                value: staticState
            },() => this.props.onChange(this.state.value))
        }else{
            if(staticState !== checkObj.id){
                this.setState({
                    value: checkObj.id
                },() => this.props.onChange(this.state.value))
            }
        }
    };

    matchClass = item => {
        const {value} = this.state;
        const {multiple} = this.props;
        if(item.disabled){
            return style['btn-cell-disabled']
        }
        if(multiple){
            return value.indexOf(item.id) === -1 ? style['btn-cell'] : style['btn-cell-active']
        }else{
            return value === item.id ? style['btn-cell-active'] : style['btn-cell']
        }
    };

    render(){
        const {options} = this.props;
        return (
            <div className={style.wrapper}>
                {
                    options.map(item => (
                        <div className={this.matchClass(item)} onClick={() => this.changeSel(item)}>
                            <div className={style['cell-inner']}>
                                {item.name}
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default CheckButton;
