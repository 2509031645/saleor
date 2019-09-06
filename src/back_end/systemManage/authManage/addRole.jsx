/*
*   fileName: addUser
*   author: 宋均辉
*   time: 2019/8/29
*/
// @flow
import * as React from 'react';
import FromGenerator from '@/components/form/formGenerator';

type Props = {
    type: string,
    data?: Object,
    role_list: Array<any>
}

class AddRole extends React.Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            fieldList: [
                {
                    filedName: '角色名称',
                    paramName: 'name',
                    type: 'input',
                    initialValue: props.data ? props.data.name : '',
                    rules: [
                        {
                            required: true
                        }
                    ],
                    span: 20
                },
                {
                    filedName: '角色编码',
                    paramName: 'code',
                    type: 'input',
                    initialValue: props.data ? props.data.code : '',
                    rules: [
                        {
                            required: true
                        }
                    ],
                    span: 20
                },
                {
                    filedName: '排序',
                    paramName: 'orderIndex',
                    type: 'number',
                    initialValue: props.data ? props.data.orderIndex*1 : 1,
                    span: 20,
                    attr: {
                        min: 1,
                        precision: 0.1
                    }
                },
                {
                    filedName: '状态',
                    paramName: 'enabled',
                    type: 'switch',
                    initialValue: props.data ? props.data.enabled : false,
                    span: 20
                }

            ]
        }
    }

    searchForm = null;

    onFormInit = form => {
        this.searchForm = form;
    };

    formatOption = data => {
        data.forEach(item => {
            item.title = item.name;
            item.value = item.id;
            item.key = item.name;
            item.children && item.children.length && this.formatOption(item.children)
        });
        return data;
    };

    render() {
        const {fieldList} = this.state;
        return (<div style={{paddingRight:30}}>
            <FromGenerator fieldList={fieldList} formConfig={{layout: 'Horizontal'}} onFormInit={this.onFormInit}/>
        </div>)
    }
}

export default AddRole;

