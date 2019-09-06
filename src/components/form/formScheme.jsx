/*
*   fileName:
*   author:宋均辉
*   time:2019/5/30
*/
// @flow
import * as React from 'react'
import Api from '@/common/api';
import {getApiByKey, downloadFile} from '@/common/utils';
import {connect} from "react-redux";
import {
    message,
    Modal,
    Drawer,
    Button
} from 'antd';

type schemeOption = {
    stateKeys: Array<string>,
    actionKeys: Array<string>
}

type Props = {}
type State = {}
const confirm = Modal.confirm;
const FormScheme = ({stateKeys, actionKeys}: schemeOption) => {
    return (ChildrenForm: React.Node) => {
        class FormSchemeSup extends React.Component<Props, State> {
            constructor() {
                super();
                this.state = {
                    dataList: [],//表格列表数据
                    detailData: null,
                    total: 0,//数据总数
                    pageSize: 15,
                    page: 1,
                    selectedRowKeys: [],// 表格里选中的item
                    useDefault: true,
                    selectedRows: {},
                    drawerVisible: false,
                    drawerProps: {},
                    modalVisible: false,//modal是否显示
                    modalConfig: {
                        cancelText: '取消',
                        okText: '确定',
                        destroyOnClose: true
                    },//modal的配置
                    modalContent: <p>'loading...'</p>,//默认modal内容
                    modalForm: null
                };
                this.searchApiKey = [];
            }

            formIns = null;//子表单实例
            componentDidMount() {
                console.log(this.formIns);
            }

            // 查询 重置页码
            search = (apiKey) => {
                apiKey ? this.setState({
                    page: 1
                }, () => this.getList(apiKey)) : this.getList(apiKey);
            };

            // 获取列表数据
            getList = (actionKey) => {
                //!this.searchApiKey.length && (this.searchApiKey = apiKey);// 存储apiKey 文件内部调用时候不用继续赋值
                actionKey && (this.searchApiKey = actionKey);// 存储apiKey 文件内部调用时候不用继续赋值
                const {formatFields, searchForm} = this.formIns;
                const {pageSize, page} = this.state;
                if (searchForm) {
                    searchForm.validateFields((errList, fields) => {
                        //是否需要格式化表单数据
                        typeof formatFields === 'function' && (fields = formatFields(fields));
                        if (!errList) {
                            this.formIns.props[this.searchApiKey]({...fields, pageSize, page})
                        }
                    });
                } else {
                    this.formIns.props[this.searchApiKey]({...formatFields(), pageSize, page})
                }

            };

            //重置
            reset = () => {
                const {searchForm} = this.formIns;
                searchForm.resetFields();
            };

            // 导出
            exportList = ({apiKey, param}) => {
                getApiByKey(Api, apiKey)(param).then(res => {
                    downloadFile(res);
                });
            };

            // 每页显示数量切换
            onShowSizeChange = (currentPage, pageSize) => {
                this.setState({
                    pageSize,
                    page: 1
                }, this.getList);
            };

            // 翻页
            onPageChange = (currentPage) => {
                this.setState({
                    page: currentPage
                }, this.getList);
            };

            //弹窗确认
            modalEvents = () => {
                console.error('需要改写此方法再调用');
            };
            modalCancel = () => {
                this.setState({
                    modalVisible: false
                });
            };

            // 操作按钮事件
            /*
            * @params: type 操作类型 'warn' 弹出警告框  'default' 直接执行  'modal' 弹出modal层
            * */
            operateItem = ({type, extensions = []}) => {
                let that = this;
                switch (type) {
                    case 'warn' :
                        return ({apiKey, title, content, param}) => {
                            confirm({
                                title,
                                content,
                                onOk() {
                                    return new Promise((resolve, reject) => {
                                        getApiByKey(Api, apiKey)(param).then(res => {
                                            if (res.code === 0) {
                                                resolve();
                                                message.success(res.msg);
                                                that.search();
                                            } else {
                                                reject();
                                            }
                                        });
                                    }).catch(() => console.log('Oops errors!'));
                                },
                                onCancel() {
                                }
                            });
                        };
                    case 'default' :
                        return ({apiKey, param}) => {
                            getApiByKey(Api, apiKey)(param).then(res => {
                                if (res.code === 0) {
                                    message.success(res.msg);
                                    that.search();
                                }
                            });
                        };
                    case 'modal' :
                        /*
                          * @params: apiKey = API方法名, title = 弹出层的title, formatFields = 格式化参数（参数为表单值）, reactDom = 返回reactComponent的一个方法, param = 表单之外额外参数
                          * 如果extensions有footer那么 apiKey 和 formatFields 使用footer数组内部对象的值
                          * */
                        return ({apiKey, modalConfig, searchApiKey, formatFields, reactDom, param, footer}) => {
                            let apiAction = (params, apiKey) => {
                                getApiByKey(Api, apiKey)(params).then(res => {
                                    if (res.code === 0) {
                                        message.success(res.msg);
                                        extensions && extensions.indexOf('stilledList') === -1 && that.search(searchApiKey);
                                        this.setState({
                                            modalVisible: false
                                        });
                                    }
                                }).finally(

                                );
                            };
                            if (extensions && extensions.indexOf('footer') > -1) {
                                let modalFooter = [
                                    <Button key="0" onClick={this.modalCancel}>取消</Button>
                                ];
                                footer.forEach(item => {
                                    // item { attr, formatFields, apiKey, text}
                                    modalFooter.push(
                                        <Button
                                            {...item.attr}
                                            onClick={() => {
                                                this.state.modalForm && this.state.modalForm.validateFields((errList, fieldList) => {
                                                    if (!errList) {
                                                        let params = Object.assign({}, item.formatFields(fieldList), typeof param === 'function' ? param() : param);
                                                        apiAction(params, item.apiKey);
                                                    }
                                                });
                                            }}
                                        >{item.text}</Button>
                                    );
                                });
                                modalConfig.footer = modalFooter;
                            } else {
                                this.modalEvents = () => {
                                    if (this.state.modalForm) {
                                        this.state.modalForm.validateFields((errList, fieldList) => {
                                            console.log(fieldList);
                                            if (!errList) {
                                                let params = Object.assign({}, formatFields(fieldList), typeof param === 'function' ? param() : param);
                                                apiAction(params, apiKey);
                                            }
                                        });
                                    } else {
                                        apiAction(typeof param === 'function' ? param() : param, apiKey);
                                    }
                                    /*this.state.modalForm && this.state.modalForm.validateFields((errList,fieldList) => {
                                      if(!errList){
                                        let params = Object.assign({},formatFields(fieldList),typeof param === 'function' ? param() : param);
                                        apiAction(params);
                                      }
                                    });*/
                                };
                            }

                            this.setState(() => {
                                let config = Object.assign({
                                    width: 360,
                                    bodyStyle: {
                                        padding: '12px 0'
                                    }
                                }, modalConfig);
                                return {
                                    modalVisible: true,
                                    modalContent: <div><span
                                        style={{paddingLeft: 43}}>{modalConfig.contentText}</span>{reactDom(this.onModalFormInit)}
                                    </div>,
                                    modalConfig: config
                                };
                            });
                        };
                    default :
                        return (apiKey) => {
                            getApiByKey(Api, apiKey)().then(res => {
                                if (res.code === 0) {
                                    message.success(res.msg);
                                    that.search();
                                }
                            });
                        };
                }
            };
            onModalFormInit = form => {
                this.setState({
                    modalForm: form
                });
            };

            // 表格配置 selection、page等等
            /*
            * @param config ['rowSelection'] //数组中包含的选项则在table中不展示
            * */
            tableConfig = (config = [], option = {}) => {
                const {pageSize, page, selectedRowKeys, useDefault} = this.state;
                const defaultSelectedKeys = option.rowSelection ? option.rowSelection.defaultSelectedKeys || [] : [];
                const rowSelection = {
                    onChange: (selectedRowKeys, selectedRows) => {
                        //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                        this.setState({
                            selectedRowKeys,
                            selectedRows,
                            useDefault: false
                        });
                    },
                    getCheckboxProps: record => ({
                        disabled: typeof option.disabledRule === 'function' && option.disabledRule(record) // Column configuration not to be checked
                    }),
                    selectedRowKeys: useDefault ? defaultSelectedKeys : selectedRowKeys,
                    ...option.rowSelection
                };
                const showTotal = (total) => `总共 ${total} 条`;
                let tableConfigObj = {
                    rowSelection: config.indexOf('rowSelection') === -1 ? rowSelection : null,
                    pagination: config.indexOf('pagination') === -1 ? {
                        showSizeChanger: config.indexOf('showSizeChanger') === -1,
                        onShowSizeChange: this.onShowSizeChange,
                        pageSize: pageSize,
                        total: option.total,
                        current: page,
                        onChange: this.onPageChange,
                        showQuickJumper: config.indexOf('showQuickJumper') === -1,
                        showTotal: config.indexOf('showTotal') === -1 ? showTotal : false
                    } : false,
                    rowKey: 'id',
                    scroll: {y: 580},
                    size: 'small',
                    loading:option.loading
                };
                config.indexOf('dataSource') === -1 && (tableConfigObj.dataSource = option.list);
                return tableConfigObj;
            };

            closeDrawer = () => {
                this.setState({
                    drawerVisible: false
                });
            };
            // 详情右侧滑出
            DetailControl = ({children, title, drawerConfig}) => {
                const {drawerVisible, drawerProps} = this.state;
                return (
                    <Drawer
                        title={title}
                        placement="right"
                        closable={false}
                        onClose={this.closeDrawer}
                        visible={drawerVisible}
                        {...drawerConfig}
                    >
                        {React.cloneElement(children, {...drawerProps})}
                    </Drawer>
                );
            };
            // 获取详情
            getDetailData = (apiKey, param, props) => {
                getApiByKey(Api, apiKey)(param).then(res => {
                    this.setState({
                        detailData: res.data,
                        drawerVisible: true,
                        drawerProps: props
                    });
                });
            };

            render() {
                const {dataList, modalContent, modalVisible, modalConfig, detailData, selectedRowKeys, selectedRows} = this.state;
                const {match, history} = this.props;
                const commonActions = {
                    search: this.search, // 查询搜索
                    reset: this.reset, // 重置表单
                    operateItem: this.operateItem, // 操作弹窗 modal、warn
                    DetailControl: this.DetailControl, // 获取详情(右侧弹出框)
                    getDetailData: this.getDetailData, // 获取详情数据
                    openBatchModal: this.openBatchModal, // 打开批量操作弹窗
                    closeDrawer: this.closeDrawer, // 关闭drawer
                    exportList: this.exportList // 导出
                };
                const commonStates = {
                    dataList, // 查询的列表数据结果
                    detailData, // 详情数据
                    selectedRowKeys, // 表格中的选中keys
                    selectedRows, // 表格中的选中行数据
                    modalForm: this.state.modalForm, // 弹窗表单antd form对象
                    match, // 路由match
                    history // 路由history
                };
                return (
                    <div>
                        <Modal
                            {...modalConfig}
                            visible={modalVisible}
                            onOk={this.modalEvents}
                            onCancel={this.modalCancel}
                            destroyOnClose={true}
                        >
                            {modalContent}
                        </Modal>
                        <ChildrenForm {...commonActions} {...this.props} {...commonStates}
                                      tableConfig={this.tableConfig} ref={ins => (this.formIns = ins)}/>
                    </div>
                );
            }
        };
        const mapStateToProps = (state) => {
            let combineState = {};
            stateKeys.forEach(item => {
                combineState[item] = state[item]
            });

            return combineState;
        };
        const mapDispatchToProps: any = dispatch => {
            let combineAction = {};
            actionKeys.forEach(item => {
                combineAction[item] = param => {
                    dispatch({
                        type: item,
                        payload: param
                    })
                }
            });
            return combineAction;
        };
        return connect(mapStateToProps, mapDispatchToProps)(FormSchemeSup);
    }
};


export default FormScheme;



