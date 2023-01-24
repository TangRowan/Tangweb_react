//打分表
import React, { Component } from 'react'
import { Card,notification ,Table,Space,Button,Tag,Input,Rate,Drawer} from 'antd'
import Highlighter from 'react-highlight-words';
import { SearchOutlined} from '@ant-design/icons';
import axios from 'axios'

import {connect} from 'react-redux'
import './index.css'

import Action from './Action';



class Examine extends Component {
  state={
    data:'',
    searchText: '',
    searchedColumn: '',
    visible:false,
  }
  componentDidMount(){
    axios.get(this.props.url+'/IEEEbackend/searchdata.php?!='+"11|"+this.props.Email).then(
      response => {
          
          if(response.data.state['success']===1)
          this.setState({
           data : response.data.datas
          })
         
          },
      error => {
          this.openmsg('error','','Can not find server');
          
      }
    )
  }
  showDrawer = () => {
    this.setState({
      visible:true,
     })
  };
  onClose = () => {
    this.setState({
      visible:false,
     })
  };
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
        title: 'Project ID',
        dataIndex: 'ProjectID',
        key: 'ProjectID',
        ...this.getColumnSearchProps('ProjectID'),
      },
      
      {
        title: 'Proposer',
        dataIndex: 'Applicant',
        key: 'Applicant',
        ...this.getColumnSearchProps('Applicant'),
        
      },
      {
        title: 'Project Title',
        dataIndex: 'ProjectTitle',
        key: 'ProjectTitle',

        ...this.getColumnSearchProps('ProjectTitle'),
          
      },
      {
        title: 'To Fund',
        dataIndex: 'ToFund',
        key: 'ToFund',
        render: (text, record) =>{
          let color = record.ToFund==='-1'?'blue':record.ToFund==='0'?'green':'yellow'
          let ctext = record.ToFund==='-1'?'N/A':record.ToFund==='0'?'YES':'NO'
          return(
            <Tag color={color} key={record.key}>
              {ctext}
            </Tag>
          )
        },
      },
      {
        title: 'Rank',
        dataIndex: 'RankScore',
        key: 'RankScore',
        width: 170,
        sorter: (a,b)=>a.RankScore-b.RankScore,
        render: (text, record) =>{

          return(
            <>
            <Rate  disabled allowHalf value={record.RankScore*1.0}/>
            </>
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
              <Action name={ record.ToFund==='-1'?'0':'1'} id={record.key}/>
              
            </Space>
          )
         }
         
      },
      
    ];
    
    return (
      <div className="site-card-border-less-wrapper">
      <Card className='ncenter' title="Evaluate Proposals" bordered={false}>
        <div className='container'>
        <Card style={{ width:'100%' }}>
          <Table  columns={columns}  dataSource={this.state.data} />
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