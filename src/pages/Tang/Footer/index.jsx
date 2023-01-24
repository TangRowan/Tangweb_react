//admin footer 检测权限在这。
import React ,{ useEffect } from 'react'
import { Footer } from 'antd/lib/layout/layout';
import { Image} from 'antd';
export default function AFooter() {

  return (
    <div><Footer style={{ textAlign: 'center' }}>
      <Image
      preview={false}
          width={200}
          src={require('../img/RowanLogo.png')}
        /><p/>
      Department of Electrical & Computer Engineering, Rowan University
    201 Mullica Hill Road, Glassboro, NJ 08028-1701</Footer></div>
  )
}
