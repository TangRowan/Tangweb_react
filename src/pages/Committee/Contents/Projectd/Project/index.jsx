import React, { Component } from 'react'
import { Form,Card,notification ,Table,Space,Button,Input} from 'antd'
import Highlighter from 'react-highlight-words';
import { SearchOutlined} from '@ant-design/icons';
import axios from 'axios'
import Report from '../report';

import {connect} from 'react-redux'

import './index.css'
import Action from './Action';


class Project extends Component {
  state={
    data:'',
    searchText: '',
    searchedColumn: '',
    Code:'',
    Name:'',
    Title:'',
    Email:'',
    Budget:'',
    Actual:'',
  }
  componentDidMount(){
    axios.get(this.props.url+'/IEEEbackend/searchdata.php?!='+('8|'+(this.props.PID))).then(
      response => {
          console.log('成功了123',response.data);
          if(response.data.state['error']===0)
          
          this.setState({
           data : response.data.data,
           Title : response.data.information['ProjectTitle'],
           Code : response.data.information['Projectcode'],
           Name : response.data.information['Cname'],
           Email : response.data.information['Cemail'],
           Budget:response.data.information['TotalBudget'],
           Actual:response.data.information['TotalActual'],
          })
          },
      error => {
          this.openmsg('error','','Can not find server');
          
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

    const columns = [
      {
        title: 'Year',
        dataIndex: 'key',
        key: 'key',
        width: 188 ,

      },
      {
        title: 'Requested Budget',
        dataIndex: 'Budget',
        key: 'Budget',
        width: 188 ,

      },
      {
        title: 'Approved Budget',
        dataIndex: 'AB',
        key: 'AB',
        width: 188 ,

      },
      {
        title: 'Actual',
        dataIndex: 'Actual',
        key: 'Actual',
        width: 188 ,
          
      },
      
      
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => {
          
          ////在这开始写
          return(//{record.Name}
            <Space size="small">
              <Action id={record.Propose}/>
            </Space>
          )
         }
         
      }
      
    ];
    
    return (
      <div className="site-card-border-less-wrapper">
      <Card className='ncenter' title="Project Proposals" bordered={false}>
        <div className='container'>
        <Card style={{ width:'100%' }}>
          <Form
          name="inf"
          labelCol={{ span: 5 }}
          //wrapperCol={{ span: 8 }}
          layout="horizontal"

        >
        <Form.Item label="Project Code:"  >
        {this.state.Code}
        </Form.Item>
        <Form.Item label="Project Title:"  >
        {this.state.Title}
        </Form.Item>
        <Form.Item label="Coordinators Name:"  >
        {this.state.Name}
        </Form.Item>
        <Form.Item label="Coordinators Email"  >
        {this.state.Email}
        </Form.Item>
        <Form.Item label="Total Budget"  >
        {this.state.Budget}
        </Form.Item>
        <Form.Item label="Total Actual:"  >
        {this.state.Actual}
        </Form.Item>
        </Form>
  
          <Table columns={columns} dataSource={this.state.data} pagination={false}/>
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
)(Project)