//选择报告
import React, { Component } from 'react'
import { Card,notification ,Table,Space,Button,Input,Tag} from 'antd'
import Highlighter from 'react-highlight-words';
import { SearchOutlined} from '@ant-design/icons';
import axios from 'axios'

import {connect} from 'react-redux'

import './index.css'
import Action from './Action';


class Creport extends Component {
  state={
    data:'',
    searchText: '',
    searchedColumn: '',
  }
  componentDidMount(){
    axios.get(this.props.url+'/IEEEbackend/searchdata.php?!='+('5|'+this.props.Email)).then(
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

      },
      
      {
        title: 'Project Title',
        dataIndex: 'ProjectTitle',
        key: 'ProjectTitle',
        width: 500 ,
        ...this.getColumnSearchProps('ProjectTitle'),
          
      },
      {
        title: 'Report Year',
        dataIndex: 'AmountYear',
        key: 'AmountYear',
        width: 150,
        ...this.getColumnSearchProps('ProjectTitle'),
          
      },
      {
        title: 'Status',
        dataIndex: 'State',
        key: 'State',
        render: (text, record) =>{
          let color = record.State==='0'?'blue':record.State==='1'?'green':'orange'
          let ctext = record.State==='0'?'Need to Submit':record.State==='1'?'Submitted':'Need to write'
          return(
            <Tag color={color} key={record.key}>
              {ctext}
            </Tag>
          )
        },
      },
      {
        title: 'Report Overdue Date',
        
        render: (text, record) =>{
          let color = 'blue'
          let ctext =  record.AmountYear==='2021'?'05/22/2022':record.AmountYear==='2022'?"05/22/2023":null;
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

          return(//{record.Name}
            <Space size="small">
              <Action code={record.ProjectID} name={record.ProjectTitle} id={record.key} year={record.AmountYear}  ayear={record.AYear} state={record.State} reportID={record.reportID}  email={record.ReporterEmail} ProjectID={record.ProjectID} ProjectTitle={record.ProjectTitle}/>
            </Space>
          )
         }
         
      },
      
    ];
    
    return (
      <div className="site-card-border-less-wrapper">
      <Card className='ncenter' title="Select porject to write report" bordered={false}>
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
)(Creport)