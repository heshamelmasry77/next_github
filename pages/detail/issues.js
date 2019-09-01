import WithRepoBasic from '../../components/WithRepoBasic'
import IssuesItem from '../../components/IssuesItem'
import SeachUser from '../../components/SearchUser'
import api from '../../lib/api'
import { useState, useEffect, useCallback } from 'react';
const Issues=({issues})=>{
    const [value,setValue]=useState('');
    const handleChange=useCallback((value)=>{
        setValue(value)
    },[])
    return(<div className="root">
        <SeachUser onChange={handleChange} value={value}/>
      <div className="issues">
        {
            issues.map(issue=><IssuesItem {...issue}/>)
        }
      </div>          
      <style jsx>{`
        .issues{
            border:1px solid #eee;
            border-radius:5px;
            margin-bottom:20px;
            margin-top:20px;
        }     
     `}</style>
    </div>)
}
Issues.getInitialProps=async ({req,res,query})=>{
    const {owner,name}=query
    const issuesResp=await api.request({
        url:`/repos/${owner}/${name}/issues`
    },req,res)
    return{
        issues:issuesResp
    }
}
export default WithRepoBasic(Issues,'issues')