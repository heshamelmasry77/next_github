import { useCallback, useState } from 'react';
import { Avatar, Button } from 'antd'
import MdRenderer from '../components/MarkdownRender'
import { getLastUpdated } from '../lib/utils'

const IssuesItem = ({ user, title, updated_at, ...issue }) => {
    const [showDetail, setShowDetail] = useState(false);
    const toggleShowDetail = useCallback(() => setShowDetail(!showDetail), [showDetail])
    return (
        <>
            <div className="issue">
                <Button
                    type="primary"
                    size={'small'}
                    onClick={toggleShowDetail}
                    style={{ position: 'absolute', right: 10, top: 10 }}>
                    {showDetail ? (<text>hidden issue</text>) : (<text>view issue</text>)}
                </Button>
                <div className="avatar">
                    <Avatar src={user.avatar_url} shape="square" size={50} />
                </div>
                <div className="main-info">
                    <h6>
                        <span>{title}</span>
                        {issue.labels.map(label=><Label {...label} key={label.id}/>)}
                    </h6>
                    
                    <p className="sub-info">
                        <span>Upadted at {getLastUpdated(updated_at)}</span>
                    </p>
                </div>

                <style jsx>{`
                .issue{
                    display:flex;
                    position:relative;
                    padding:10px;
                }
                 .issue:hover{
                    background:#fafafa;
                 }
                 .issue + .issue{
                     border-top:1px solid #eee;
                 }
                 .main-info > h6{
                    max-width:600px;
                    font-size:16px;
                 }
                 .avatar{
                     margin-right:20px;
                 }
                 .sub-info{
                     margin-bottom:0;
                 }
                 .sub-info > span + span{
                     display:inline-block;
                     margin-left:20px;
                     font-size:12px;
                 }
            `}</style>
            </div>
            {
                showDetail ? <IssueDetail {...issue} /> : null
            }
        </>
    )
}
export default IssuesItem

function IssueDetail({ body, html_url }) {
    return (<div className="root">
        <MdRenderer content={body} />
        <div className="actions">
            <Button href={html_url} target="_blank">
                打开Issue讨论页面
            </Button>
        </div>
        <style jsx>{`
         .root{
             background:#fafafa;
             padding:20px;
         }
         .actions{
             text-align: right;
         }    
        `}</style>
    </div>)
}


function Label({color,name}){
    return(
        <>
        <span className="label" style={{background:`#${color}`}}>
            {name}
        </span>
        <style jsx>{`
            .label{
                display:inline-block;
                line-height:20px;
            }  
            .label{
                margin-left:10px;
            }  
        `}</style>
        </>
    )
}