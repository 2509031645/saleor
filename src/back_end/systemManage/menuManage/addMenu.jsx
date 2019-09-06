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
    menu_list: Array<any>
}

class AddMenu extends React.Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            fieldList: [
                {
                    filedName: '菜单名称',
                    paramName: 'name',
                    type: 'input',
                    initialValue: props.data && props.data.name,
                    rules: [
                        {
                            required: true
                        }
                    ],
                    span: 20
                },
                {
                    filedName: '父菜单',
                    paramName: 'parentId',
                    type: 'treeSelect',
                    initialValue: props.data && (props.data.parentId || ''),
                    option: this.formatOption(props.menu_list.list),
                    span: 20,
                    attr: {
                        style: {
                            width: '100%'
                        },
                        showSearch:true,
                        filterTreeNode: (val,node) => node.key.indexOf(val) > -1,
                        disabled: props.type === 'edit'
                    }
                },
                {
                    filedName: '后端链接',
                    paramName: 'url',
                    type: 'input',
                    initialValue: props.data && props.data.url,
                    span: 20
                },
                {
                    filedName: '后台路由（前端）',
                    paramName: 'path',
                    type: 'input',
                    initialValue: props.data && props.data.path,
                    span: 20
                },
                {
                    filedName: '后台组件',
                    paramName: 'component',
                    type: 'input',
                    initialValue: props.data && props.data.component,
                    span: 20
                },
                {
                    filedName: '后台图标',
                    paramName: 'iconCls',
                    type: 'input',
                    initialValue: props.data ? props.data.iconCls : '',
                    span: 20
                },
                {
                    filedName: '前台路由（前端）',
                    paramName: 'frontPath',
                    type: 'input',
                    initialValue: props.data && props.data.frontPath,
                    span: 20
                },
                {
                    filedName: '前台组件',
                    paramName: 'frontCom',
                    type: 'input',
                    initialValue: props.data && props.data.frontCom,
                    span: 20
                },
                {
                    filedName: '前台图标',
                    paramName: 'frontIcon',
                    type: 'input',
                    initialValue: props.data && props.data.frontIcon,
                    span: 20
                },
                {
                    filedName: '显示端',
                    paramName: 'pagetype',
                    type: 'select',
                    option: [
                        {
                            key: '前台',
                            value: 1
                        },
                        {
                            key: '后台',
                            value: 2
                        },
                        {
                            key: '全部显示',
                            value: 3
                        }
                    ],
                    initialValue: props.data ? props.data.pagetype : 1,
                    span: 20,
                    rules:[
                        {
                            required: true,
                            message: '请选择显示端'
                        }
                    ]
                },
                {
                    filedName: '状态',
                    paramName: 'enabled',
                    type: 'switch',
                    initialValue: props.data ? props.data.enabled : true,
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

export default AddMenu;
