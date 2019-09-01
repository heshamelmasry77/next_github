import { useState, useCallback,useRef } from 'react'
import { Select, Spin } from 'antd'
import _ from 'lodash'
import api from '../lib/api'

const { Option } = Select;

const SearchUser = ({onChange,value}) => {
    const [fetching, setFetching] = useState(false)
    const [options, setOptions] = useState([])
    const lastFetchIdRef=useRef(0);
    const fetchUser =useCallback( _.debounce(value => {
        //记录 当前输入值, 
        lastFetchIdRef.current+=1;
        const fetchId=lastFetchIdRef.current;

        setFetching(true);
        setOptions([])

        api.request({
            url: `/search/users?q=${value}`
        }).then(resp => {
            const users=resp.items || [];
            
            //当 last 与 fetchId 不想等时则 说明用户输入多次,所以抛弃上一次结果
            if(fetchId!==lastFetchIdRef.current){
                return
            }
            const data = users.map(user => ({
                text: user.login,
                value: user.login,
                id:user.id
            }))
            setFetching(false);
            setOptions(data)
        })
    },500),[])
    const handleChange=useCallback(value=>{
        setOptions([]);
        setFetching(false);
        onChange(value)
    },[])
    return (
        <Select
            showSearch={true}
            notFoundContent={fetching ? <Spin size="small" /> : <span>Empty</span>}
            filterOption={false}
            placeholder="输入关键字"
            onChange={handleChange}
            value={value}
            onSearch={fetchUser}
            allowClear={true}
            style={{ width: 200 }}
        >
            {
                options.map(({ value, text,id }) => (
                    <Option value={value} key={id}>{text}</Option>
                ))
            }
        </Select>
    )
}
export default SearchUser;