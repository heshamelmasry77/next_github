import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router'
import WithRepoBasic from '../../components/WithRepoBasic'
import IssuesItem from '../../components/IssuesItem'
import SeachUser from '../../components/SearchUser'
import api from '../../lib/api'
import { Select, Button, Spin, Empty } from 'antd';

const { Option } = Select;
const CACHE = [];
const isServer = typeof window === 'undefined'

const Issues = ({ InitIssues, labels, owner, name }) => {
    const [userValue, setUserValue] = useState();
    const [state, setState] = useState();
    const [label, setLabels] = useState();
    const [issues, setIssues] = useState(InitIssues);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        if (!isServer) {
            CACHE[`${owner}/${name}`] = labels;
        }
    }, [owner, name, labels])
    const handleChange = useCallback((value) => {
        setUserValue(value)
    }, []);
    const handleStateChange = useCallback(value => {
        setState(value)
    }, [])
    const handleLabelChange = useCallback(value => {
        setLabels(value)
    }, []);

    const handleSearch = useCallback(() => {
        //search
        setFetching(true);
        // const {owner,name}=useRouter()
        api.request({ url: `/repos/${owner}/${name}/issues${makeQuery(state, label, userValue)}` })
            .then(resp => {
                setIssues(resp);
                setFetching(false);

            })
    }, [state, label, userValue, owner, name])

    return (<div className="root">
        <div className="search">
            <SeachUser onChange={handleChange} value={userValue} />
            <Select
                placeholder='状态'
                onChange={handleStateChange}
                style={{ width: 200, marginLeft: 20, marginRight: 20 }}
                value={state}
            >
                <Option value="all">all</Option>
                <Option value="open">open</Option>
                <Option value="closed">closed</Option>
            </Select>
            <Select
                mode="multiple"
                placeholder='label'
                onChange={handleLabelChange}
                style={{ flexGrow: 1, marginRight: 20 }}
                value={label}
            >
                {
                    labels.map(({ name, id }) => <Option value={name} key={id}>{name}</Option>)
                }
            </Select>
            <Button onClick={handleSearch} disabled={fetching}>搜索</Button>
        </div>
        {
            fetching ? <div className="loading"><Spin /></div>
                :
                <div className="issues">
                    {
                        issues.length ?
                            issues.map(issue => <IssuesItem {...issue} key={issue.id} />)
                            :
                            <Empty />
                    }
                </div>
        }
        <style jsx>{`
        .issues{
            border:1px solid #eee;
            border-radius:5px;
            margin-bottom:20px;
            margin-top:20px;
        }
        .search{
            display:flex;
        }
        .loading{
            height: 400px;
            display:flex;
            align-items:center;
            justify-content:center;
        }     
     `}</style>
    </div>)
}
Issues.getInitialProps = async ({ req, res, query }) => {
    const { owner, name } = query
    const full_name=`${owner}/${name}`
   
    const fetchAll = await Promise.all([
        await api.request({
            url: `/repos/${full_name}/issues`
        }, req, res),
         CACHE[full_name]?
         Promise.resolve(CACHE[full_name])
         :
         await api.request({
            url: `/repos/${full_name}/labels`
        }, req, res)
    ])
    return {
        InitIssues: fetchAll[0],
        labels: fetchAll[1],
        owner,
        name
    }
}
export default WithRepoBasic(Issues, 'issues')


function makeQuery(state, labels, user) {
    let userStr = user ? `creator=${user}` : '';
    let stateStr = state ? `state=${state}` : '';
    let labelStr = '';
    if (labels && labels.length > 0) {
        labelStr = `label=${labels.join(',')}`
    }
    const arr = [];
    if (userStr) arr.push(userStr)
    if (stateStr) arr.push(stateStr)
    if (labelStr) arr.push(labelStr)

    return `?${arr.join('&')}`;
}