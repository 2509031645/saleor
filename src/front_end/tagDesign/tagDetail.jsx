/*
*   fileName: tagDetail
*   author: 宋均辉
*   time: 2019/9/6
*/
// @flow

import * as React from 'react';
import style from './index.module.scss';
import CheckButton from "@/components/checkButton";


type Props = {}
type State = {}

class TagDetail extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className={style['detail-container']}>
                <div className={style['check-cell']}>
                    <div className={style['check-cell-label']}>覆膜：</div>
                    <CheckButton
                        onChange={val => console.log(val)}
                        initialValue={2}
                        options={[
                            {
                                name: '不覆膜',
                                id: 1
                            },
                            {
                                name: '覆哑膜',
                                id: 2
                            },
                            {
                                name: '覆亮膜',
                                id: 3,
                                disabled: true
                            }
                        ]}/>
                </div>
                <div className={style['check-cell']}>
                    <div className={style['check-cell-label']}>覆膜：</div>
                    <CheckButton
                        onChange={val => console.log(val)}
                        initialValue={2}
                        options={[
                            {
                                name: '不覆膜',
                                id: 1
                            },
                            {
                                name: '覆哑膜',
                                id: 2
                            },
                            {
                                name: '覆亮膜',
                                id: 3,
                                disabled: true
                            }
                        ]}/>
                </div>
                <div className={style['check-cell']}>
                    <div className={style['check-cell-label']}>覆膜多选：</div>
                    <CheckButton
                        multiple={true}
                        onChange={val => console.log(val)}
                        initialValue={[2]}
                        options={[
                            {
                                name: '不覆膜',
                                id: 1
                            },
                            {
                                name: '覆哑膜',
                                id: 2
                            },
                            {
                                name: '覆亮膜',
                                id: 3,
                                disabled: true
                            }
                        ]}/>
                </div>
                <div className={style['check-cell']}>
                    <div className={style['check-cell-label']}>覆膜：</div>
                    <CheckButton
                        onChange={val => console.log(val)}
                        initialValue={2}
                        options={[
                            {
                                name: '不覆膜',
                                id: 1
                            },
                            {
                                name: '覆哑膜',
                                id: 2
                            },
                            {
                                name: '覆亮膜',
                                id: 3,
                                disabled: true
                            }
                        ]}/>
                </div>
            </div>
        )
    }
}

export default TagDetail;