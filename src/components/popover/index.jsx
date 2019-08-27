/*
*   fileName: index
*   author: 宋均辉
*   time: 2019/8/22
*/
// @flow
import React, {Component} from 'react';
import style from './index.module.scss';

type Props = {
    width: number,
    children: React.Node,
    content: React.Node,
    onChange(): void
}

type State = {
    wrapperStyle: any,
    wrapperClassName: string
}

class PopOver extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            wrapperStyle: {
                left: 0,
                top: 0,
                display: 'none',
                width: props.width
            },
            wrapperClassName:`animated ${style.wrapper}`
        }
    }

    timer = null;

    closePop = () => {
        this.timer = setTimeout(() => {
            const oldClassName = this.state.wrapperClassName;
            this.setState(val => ({
                wrapperClassName:`animated zoomOut faster ${style.wrapper}`
            }),() => {
                this.state.wrapperClassName !== oldClassName && this.props.onChange()
            });
        }, 500);
    };

    cloneChildren = (child:React.Node) => React.cloneElement(
        child,
        {
            onMouseEnter: e => {
                clearTimeout(this.timer);
                const {offsetLeft, offsetTop, offsetWidth, offsetHeight} = e.target;
                const {width,onChange} = this.props;
                const oldClassName = this.state.wrapperClassName;
                this.setState(val => ({
                    wrapperStyle: {
                        ...val.wrapperStyle,
                        left: val.wrapperStyle.left || offsetLeft + offsetWidth / 2 - width / 2,
                        top: val.wrapperStyle.top || offsetTop + offsetHeight + 10,
                        display: 'block',
                    },
                    wrapperClassName: `animated zoomIn faster ${style.wrapper}`
                }),() => {
                    this.state.wrapperClassName !== oldClassName && onChange()
                });
            },
            onMouseLeave: this.closePop,
            style:{
                cursor:'pointer'
            },
            ...child.props
        }
    );

    componentWillReceiveProps(nextProps: Props, nextContext: *): * {
        this.newChildren = React.Children.map(nextProps.children, this.cloneChildren);
        // return super.componentWillReceiveProps(nextProps, nextContext);
    }

    newChildren = React.Children.map(this.props.children, this.cloneChildren);

    render() {
        const {wrapperStyle, wrapperClassName} = this.state;
        return (
            <>
                {this.newChildren.map(item => item)}
                <div onMouseEnter={() => clearTimeout(this.timer)}
                     onMouseLeave={this.closePop}
                     className={wrapperClassName}
                     style={wrapperStyle}>
                    {this.props.content}
                </div>
            </>
        )
    }
}

export default PopOver;
