/*
*   fileName: index
*   author: 宋均辉
*   time: 2019/8/20
*/
// @flow
import React, {Component} from 'react';
import FormGenerator from '@/components/form/formGenerator';
import FormScheme from '@/components/form/formScheme';
import {Button} from 'antd';
import {postRequest} from "@/common/api/source";
import Api from '@/common/api';

type Props = {
    getProductList(): viod,
    product_list: Array<any>
}
type State = {
    fieldList: Array<Object>
}

class ProductList extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            fieldList: [
                {
                    filedName: '产品名称',
                    paramName: 'name',
                    type: 'input'
                }
            ]
        };
    }

    searchForm = null;

    onFormInit = (form: any) => {
        this.searchForm = form;
    };

    componentDidMount(): * {
        /*Api.login.hello().then(res => {
            console.log(res);
        });*/
        postRequest({
            url: '/api/login', param: {
                username: 'admin168',
                password: 123
            }
        }).then(res => {
            console.log(res);
        })
        //return super.componentDidMount();
    }

    componentDidCatch(error, info) {
    debugger;
    }

    render() {
        const {fieldList} = this.state;
        const {getProductList, product_list} = this.props;

        console.log(product_list);
        return (
            <div>
                <FormGenerator fieldList={fieldList} onFormInit={this.onFormInit}/>
                <div>
                    <Button onClick={() => {
                        getProductList({name: '999'})
                    }}>查询</Button>
                </div>
            </div>
        )
    }
}

export default FormScheme({
    stateKeys: ['product_list'],
    actionKeys: ['getProductList']
})(ProductList);
