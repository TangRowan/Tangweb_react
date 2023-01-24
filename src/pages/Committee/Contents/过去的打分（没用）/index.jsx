import React, { Component } from 'react'
import { Card,notification ,Table,Space,Button,Tag,Input,Select,Form} from 'antd'
import Highlighter from 'react-highlight-words';
import { SearchOutlined} from '@ant-design/icons';
import axios from 'axios'


import {connect} from 'react-redux'
import './index.css'

import Action from './Action';
const { Option } = Select;

class Examine extends Component {
  
  state={
    data:'',
    searchText: '',
    searchedColumn: '',
    children : [],
  }
  componentDidMount(){
    const nchildren=[]
    for (var i = 0; i < 9; i++) {
      nchildren.push({Value:i,Disabled:false});
    }
    console.log(nchildren)
    this.setState({
      children:nchildren
    })
    axios.get(this.props.url+'/IEEEbackend/searchdata.php?!='+("10")).then(
      response => {
          //console.log('成功了',response.data);
          if(response.data!==null)
          this.setState({
           data : response.data
          })
          },
      error => {
          this.openmsg('error','','Can not find server');
          //console.log('失败了',error);
      }
    )
  }
  openmsg = (type,title,inf,time)=> {
    time=10
    notification[type]({
      message: title,
      description:inf,
      duration: time,
    });
  };
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };
  
  render() {
    const onFinish = (values) => {
      console.log(values)
    };
    
    const columns = [
      {
        title: 'ID',
        dataIndex: 'key',
        key: 'key',
        width: 120 ,
      },
      {
        title: 'Project ID',
        dataIndex: 'ProjectID',
        key: 'ProjectID',
        width: 120 ,
        ...this.getColumnSearchProps('ProjectID'),
      },
      {
        title: 'Project Title',
        dataIndex: 'ProjectTitle',
        key: 'ProjectTitle',
        width: 500 ,
        ...this.getColumnSearchProps('ProjectTitle'),
          
      },
      {
        title: 'Applicant',
        dataIndex: 'Applicant',
        key: 'Applicant',
        ...this.getColumnSearchProps('Applicant'),
        
      },
      {
        title: 'Apply Time',
        dataIndex: 'ApplyTime',
        key: 'ApplyTime',
        width: 120 ,
        sorter: (a,b)=>a.key-b.key,
  
      },
      
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => {
          
          ////在这开始写
          return(//{record.Name}
            <Space size="small">
              <Action name={record.ApprovalState} id={record.key}/>
            </Space>
          )
         }
         
      },
      {
        title: 'Rank',
        key: 'action',
        render: (text, record) => {
          
          ////在这开始写
          const { children} = this.state;
          return(//{record.Name}
            <Space size="small">
              <Form.Item name={record.key}> 
              <Select 
              onSelect= {(value)=>{
                console.log(value)
                console.log('#')
              }}
              onChange={(value)=>{
                  const temp=children
                  console.log(value)
                  console.log('*')
                  temp.map((res,i)=>
                    {
                      //if(res.Value===value)temp[i]={Value:i,Disabled:true}
                      if(res.Value===value)temp.splice(i,1);
                    }
                  )
                  this.setState({
                    children:temp
                  })
              }}>

                {
                  children.map(item => (
                    <Option key={item.Value} value={item.Value} disabled={item.Disabled}>
                      {item.Value}
                    </Option>
                  ))
                }
              </Select>
              </Form.Item>
            </Space>
          )
         }
         
      },
    ];
    
    return (
      <div className="site-card-border-less-wrapper">
      <Card className='ncenter' title="Ranking Proposal" bordered={false}>
        <div className='container'>
        <Card style={{ width:'100%' }}>
          <Form
            name="ranking"
            onFinish={onFinish}
            //labelCol={{ span: 5 }}
            //wrapperCol={{ span: 8 }}
            //layout="horizontal"
          >
          <Table title={() => {
            
            return (<h1>hhhh
              <Form.Item >
              <Button type="primary" htmlType="submit" className="login-form-button" >
                Submit
              </Button>
             </Form.Item>
            </h1>
            )
            }}columns={columns}  pagination={{ pageSize: 50 , position: ['none','none'] }} dataSource={this.state.data} />
          </Form>
          </Card>
        </div>
          
      </Card>
      </div>
    )
  }
}
export default connect(
	state => ({
		Email:state.userinf.Email,
    Admin:state.userinf.Admin,
    Name:state.userinf.Name,
    url:state.Backurl.url,
	}),
	{}
)(Examine)