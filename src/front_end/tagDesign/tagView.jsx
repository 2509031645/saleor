/*
*   fileName: tagView
*   author: 宋均辉
*   time: 2019/9/6
*/
// @flow

import * as React from 'react';
import style from './index.module.scss';
import Swiper from 'swiper';

type Props = {}
type State = {}

// 模拟数据
const imgData = [
    {
        url: '/img/editor-072.jpg'
    },
    {
        url: '/img/logo.jpg'
    },
    {
        url: '/img/editor-023.png'
    },
    {
        url: '/img/editor-031.jpg'
    },
    {
        url: '/img/be_home.jpeg'
    }
];

class TagView extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {}
    }

    swiper = null;
    thumbsSwiper = null;

    componentDidMount(): * {
        this.thumbsSwiper = new Swiper('.thumbs', {
            spaceBetween: 10,
            slidesPerView: 4,
            watchSlidesVisibility: true,//防止不可点击
            grabCursor : true
        });
        this.swiper = new Swiper('.swiper-container', {
            thumbs: {
                swiper: this.thumbsSwiper,
            },
            navigation: {
                nextEl: '.swipe-button-next',
                prevEl: '.swipe-button-prev',
            }
        });
        this.swiper.el.onmouseover = function () {
            this.swiper.navigation.$nextEl.removeClass('fadeOutRight').addClass('fadeInRight');
            this.swiper.navigation.$prevEl.removeClass('fadeOutLeft').addClass('fadeInLeft');
        };
        this.swiper.el.onmouseout = function () {
            this.swiper.navigation.$nextEl.removeClass('fadeInRight').addClass('fadeOutRight');
            this.swiper.navigation.$prevEl.removeClass('fadeInLeft').addClass('fadeOutLeft');
        }
        // return super.componentDidMount();
    }

    render() {
        return (
            <div className={style['view-container']}>
                <div className={'swiper-container'}>
                    <div className="swiper-wrapper">
                        {
                            imgData.map((item, index) => (
                                <div key={index} className={`swiper-slide ${style['view-cell']}`}>
                                    <img src={item.url} alt=""/>
                                </div>
                            ))
                        }
                    </div>
                    <div className={`swipe-button-prev animated faster ${style['pg-bt']}`}><i
                        className={'iconfont iconicon-test3'} style={{fontSize: 28, color: 'white'}}/></div>
                    <div className={`swipe-button-next animated faster ${style['pg-bt']}`}><i
                        className={'iconfont iconicon-test5'} style={{fontSize: 28, color: 'white'}}/></div>
                </div>

                <div className={`thumbs ${style['thumbs']}`}
                >
                    <div className="swiper-wrapper">
                        {
                            imgData.map((item, index) => (
                                <div key={index} className={`swiper-slide ${style['view-thumb-cell']}`}>
                                    <img src={item.url} alt=""/>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default TagView;