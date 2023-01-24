import React, { Component } from 'react'
import { Card,notification ,Table,Space,Button,Tag,Input} from 'antd'
import Highlighter from 'react-highlight-words';
import { SearchOutlined} from '@ant-design/icons';
import axios from 'axios'

import {connect} from 'react-redux'

import './index.css'
import Action from './Action';
import Del from './Del';


class Myrequest extends Component {
  state={
    data:'',
    searchText: '',
    searchedColumn: '',
  }
  componentDidMount(){
    axios.get(this.props.url+'/IEEEbackend/searchdata.php?!='+('2|'+this.props.Email)).then(
      response => {
          
          if(response.data.state['error']===0)
          
          this.setState({
           data : response.data.data
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
        title: 'Proposal Code',
        dataIndex: 'Proposalcode',
        key: 'Proposalcode',
        width: 150 ,
        ...this.getColumnSearchProps('Proposalcode'),
      },
      {
        title: 'Project Title',
        dataIndex: 'ProjectTitle',
        key: 'ProjectTitle',
        width: 500 ,
        ...this.getColumnSearchProps('ProjectTitle'),
          
      },
      
      {
        title: 'Apply Time',
        dataIndex: 'ApplyTime',
        key: 'ApplyTime',
        width: 120 ,
        sorter: (a,b)=>a.key-b.key,
  
      },
      {
        title: 'Approval Status',
        dataIndex: 'ApprovalState',
        key: 'ApprovalState',
        width: 100 ,
        sorter: (a,b)=>a.ApprovalState-b.ApprovalState,
        filters: [
          { text: 'Need Approval', value: '0' },
          { text: 'Approved', value: '1' },
          { text: 'Denied', value: '2' },
        ],
        onFilter: (value, record) => record.ApprovalState.includes(value),

        render: (text, record) =>{
          let color = record.ApprovalState==='0'?'blue':record.ApprovalState==='1'?'green':record.ApprovalState==='2'?'red':'gold'
          let ctext = record.ApprovalState==='0'?'Need Approval':record.ApprovalState==='1'?'Approved':record.ApprovalState==='2'?'Denied':'Returned'
          return(
            <Tag color={color} key={record.key}>
              {ctext}
            </Tag>
          )
        },
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
        title: 'Delete',
        key: 'action',
        render: (text, record) => {
            return(
              <Del delstate={record.ApprovalState==='1'?true:false} id={record.key}/>
            )
        }
      },
    ];
    
    return (
      <div className="site-card-border-less-wrapper">
      <Card className='ncenter' title="View My Proposal" bordered={false}>
        <div className='container'>
        <Card style={{ width:'100%' }}>
          <Table columns={columns} dataSource={this.state.data} />
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
)(Myrequest)