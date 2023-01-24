import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { Component } from 'react'
import axios from 'axios';

export default class index extends Component {
    state = {
        fileList: [],
        uploading: false,
      };
    
      handleUpload = () => {
        const { fileList } = this.state;
        const formData = new FormData();
        fileList.forEach(file => {
          formData.append('files[]', file);
        });
        this.setState({
          uploading: true,
        });
        // You can use any AJAX library you like
        axios.post(`http://localhost:82/CS-518/index.php`, formData).then(
            res => {
            if(res && res.status === 200){
                console.log(res)
                message.success('upload successfully.');
            }else{
                // 失败时的回调
            }
            this.setState({
                uploading: false,
              });
        })
        /*
        fetch('http://localhost:82/CS-518/index.php', {
          method: 'POST',
          body: formData,
        })
          .then(res => res.json())
          .then(() => {
            this.setState({
              fileList: [],
            });
            message.success('upload successfully.');
          })
          .catch(() => {
            message.error('upload failed.');
          })
          .finally(() => {
            this.setState({
              uploading: false,
            });
          });*/
      };
    
      render() {
        const { uploading, fileList } = this.state;
        const props = {
          onRemove: file => {
            this.setState(state => {
              const index = state.fileList.indexOf(file);
              const newFileList = state.fileList.slice();
              newFileList.splice(index, 1);
              return {
                fileList: newFileList,
              };
            });
          },
          beforeUpload: file => {
            this.setState(state => ({
              fileList: [...state.fileList, file],
            }));
            return false;
          },
          fileList,
        };
    
        return (
          <>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
            <Button
              type="primary"
              onClick={this.handleUpload}
              disabled={fileList.length === 0}
              loading={uploading}
              style={{ marginTop: 16 }}
            >
              {uploading ? 'Uploading' : 'Start Upload'}
            </Button>
          </>
        );
      }
}
