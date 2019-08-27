/*
*   fileName:
*   author:宋均辉
*   time:2019/5/30
*/
import React, {Component} from 'react';
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Icon,
  DatePicker,
  Select,
  Switch,
  InputNumber,
  Upload,
  Cascader,
  Radio,
  TreeSelect
} from 'antd';
// fixme: 需要改成 flow的格式
// import PropsTypes from 'prop-types';
import provinces from "china-division/dist/provinces.json";
import cities from "china-division/dist/cities.json";
import areas from "china-division/dist/areas.json";

//省市区
areas.forEach(area => {
  const matchCity = cities.filter(city => city.code === area.cityCode)[0];
  if (matchCity) {
    matchCity.children = matchCity.children || [];
    matchCity.children.push({
      label: area.name,
      value: area.name
    });
  }
});

cities.forEach(city => {
  const matchProvince = provinces.filter(
    province => province.code === city.provinceCode
  )[0];
  if (matchProvince) {
    matchProvince.children = matchProvince.children || [];
    matchProvince.children.push({
      label: city.name,
      value: city.name,
      children: city.children
    });
  }
});

const options = provinces.map(province => ({
  label: province.name,
  value: province.name,
  children: province.children
}));

const {TextArea} = Input;
const { RangePicker} = DatePicker;
const Option = Select.Option;

type Props = {
  fieldList: Array<any>,//字段列表
  hideExpand: boolean,//是否隐藏收起按钮
  formItemLayout: any,//可以修改表单key和value的布局，具体看antd
  formConfig:any
}

class UploadDefer extends Component {
  static getDerivedStateFromProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      return {
        ...(nextProps.value || {})
      };
    }
    return null;
  }
  constructor(props){
    super(props);
    this.state = {};
  }
  handleChange(changedValue){
    const { onChange } = this.props;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  }
  render(){
    return (
      <Upload beforeUpload={() => false} onChange={this.handleChange.bind(this)}>
        <Button>
          <Icon type="upload"/> 点击上传
        </Button>
      </Upload>
    );
  }
}

class FromGenerator extends Component<Props> {

  /*static propTypes = {
    fieldList: PropsTypes.array.isRequired,//字段列表
    hideExpand: PropsTypes.bool,//是否隐藏收起按钮
    formItemLayout: PropsTypes.shape({}),//可以修改表单key和value的布局，具体看antd
    formConfig:PropsTypes.shape({})
  };*/

  constructor(props) {
    super(props);
    this.state = {
      expand: true,
      expandNum: 5
    };
  }

  //渲染单个字段 根据列表的type返回不同的react元素 TODO:可以在这里进行扩展
  getFiledCell = (item) => {
    switch (item.type) {
    case 'input':
      return (<Input allowclear={'true'} {...item.attr} />);
    case 'RangePicker' :
      return (<RangePicker allowclear={'true'} {...item.attr} />);
    case 'select':
      return (
        <Select allowclear={'true'} allowClear={true} {...item.attr} >
          {
            item.option.map(temIn => (
              <Option key={temIn.key} value={temIn.value}>{temIn.key}</Option>
            ))
          }
        </Select>
      );
    case 'radio' :
      return (
        <Radio.Group {...item.attr}>
          {
            item.option.map(temIn => (
              <Radio key={temIn.key} value={temIn.value}>{temIn.key}</Radio>
            ))
          }
        </Radio.Group>
      );
    case 'switch' :
      return (<Switch {...item.attr} />);
    case 'number' :
      return (<InputNumber allowclear={'true'} {...item.attr} />);
    case 'textarea' :
      return (<TextArea allowclear={'true'} {...item.attr} />);
    case 'templateDownload' :
      return (
        <div>
          <a href={item.url} {...item.attr} download={item.fileName}>{item.fileName}</a>
          {/*<a href={item.url} {...item.attr}>{item.fileName}</a>*/}
        </div>
      );
    case 'importFile' :
      return (
        <UploadDefer />
      );
    case 'CascadeAddress' :
      return (
        <Cascader options={options} {...item.attr} />
      );
    case 'manual' :
      return <item.reactCom {...item.attr} />;
    case 'treeSelect' :
      return <TreeSelect treeData={item.option} {...item.attr} />;
    default:
      return (<Input allowclear={'true'} {...item.attr} />);
    }
  };

  getFieldList(fieldList) {
    //const {expand, expandNum} = this.state;
    const {form} = this.props;
    return fieldList.map((item,index) => {
      //const count = hideExpand ? 0 : (expand && expandNum);
      const {getFieldDecorator} = form;
      if (!item.type) {
        getFieldDecorator(item.paramName, {
          initialValue: item.initialValue
        });
        return '';
      }
      return (
        <Col span={item.span || 6} key={index.toString()}>
          <Form.Item
            label={item.filedName}
            style={{margin:'5px 0'}}
            {...this.formItemLayout}
            {...item.formItemConfig}
          >
            {getFieldDecorator(item.paramName, {
              initialValue: item.initialValue,
              rules: item.rules
            })(
              this.getFiledCell(item),
            )}
          </Form.Item>
        </Col>
      );
    });
  }


  toggle = () => {
    const {expand} = this.state;
    this.setState({expand: !expand});
  };

  handleSearch = (e) => {
    e.preventDefault();// 阻止表单默认事件
  };

  handleReset = () => {

  };
  //默认表单布局
  formItemLayout = this.props.formItemLayout || {
    /*labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }*/
  };

  render() {
    const {fieldList, hideExpand, onFormInit, form, rowConfig, formConfig} = this.props;
    let {expandNum} = this.state;
    let rowLayout = Object.assign({
      align:"middle",
      type:"flex"
    },rowConfig);
    let form_config = Object.assign({
      layout:"inline"
    },formConfig);
    onFormInit(form);
    return (
      <div className="search-area">
        {
          <Form
            className="ant-advanced-search-form"
            onSubmit={this.handleSearch}
            {...form_config}
          >
            <Row {...rowLayout} gutter={24}>
              {this.getFieldList(fieldList)}
            </Row>
            {
              !hideExpand && fieldList.length > expandNum && <Row>
                <Col span={24} style={{textAlign: 'right'}}>
                  {/*<a style={{marginLeft: 8, fontSize: 12}} onClick={this.toggle}>
                    {this.state.expand ? '展开' : '收起'}
                    <Icon type={this.state.expand ? 'down' : 'up'}/>
                  </a>*/}
                </Col>
              </Row>
            }
          </Form>
        }
      </div>
    );
  }
}

export default Form.create({
  name: 'form_generation',
  onValuesChange: (props, value) => {
    props.onValuesChange && typeof props.onValuesChange === 'function' && props.onValuesChange(value, props.form);
  }
})(FromGenerator);

