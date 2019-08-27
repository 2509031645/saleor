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
import Api from '@/common/api';

type Props = {}
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
        Api.login.hello().then(res => {
            console.log(res);
        });
        //return super.componentDidMount();
    }

    render() {
        const {fieldList} = this.state;
        const {getProductList,product_list} = this.props;

        console.log(product_list);
        return (
            <div>
                <FormGenerator fieldList={fieldList} onFormInit={this.onFormInit}/>
                <div>
                    <Button onClick={() => {getProductList({name:'999'})}}>查询</Button>
                </div>
            </div>
        )
    }
}

export default FormScheme({
    stateKeys: ['product_list'],
    actions: ['getProductList']
})(ProductList);
