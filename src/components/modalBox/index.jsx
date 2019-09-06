/*
*   fileName: index.jsx
*   author: 宋均辉
*   time: 2019/9/3
*/
// @flow

import * as React from 'react';
import style from './index.module.scss';

type Props = {
    visible: boolean, // 是否显示
    onModalCancel(): void, // 弹窗关闭回调
}
type State = {}

class ModalBox extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            isShow: props.visible
        }
    }

    componentWillReceiveProps(nextProps: Props, nextContext: *): * {
        if(nextProps.visible){
            this.setState({
                isShow: true
            })
        }else{
            setTimeout(() => {
                this.setState({
                    isShow: false
                })
            },500)
        }

        //return super.componentWillReceiveProps(nextProps, nextContext);
    }

    render() {
        const {visible, onModalCancel} = this.props;
        const {isShow} = this.state;
        console.log(visible);
        return (
            <>
                {
                    isShow && <div className={`${style.wrapper}`} onClick={onModalCancel}>
                        <div className={`animated faster ${visible ? 'bounceInDown' : 'bounceOutDown'} ${style.container}`} onClick={e => e.stopPropagation()}>
                            {
                                this.props.children
                            }
                        </div>
                    </div>
                }
            </>
        )
    }
}

export default ModalBox;