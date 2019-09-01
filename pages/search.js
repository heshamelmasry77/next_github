import { useEffect, memo, isValidElement } from 'react'
import { Row, Col, List, Pagination } from 'antd'
import Repo from '../components/Repo'
import Router, { withRouter } from 'next/router'
import Link from 'next/link'
import api from '../lib/api'
import {getCache,setCacheArray } from '../lib/repo-cache'
/**
 * 搜索仓库页面
 * q: 关键字
 * sort: best match(default)、stars、forks
 * order: desc(default)、asc
 * page: 分页
 */
const LANGUAGE = ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'Java', 'Python'];
const SORT_LIST = [{
    name: 'Best match',
    value: 'best match',
    order: 'desc',
}, {
    name: 'Most stars',
    value: 'stars',
    order: 'desc',
},
{
    name: 'Fewest stars',
    value: 'stars',
    order: 'asc',
},
{
    name: 'Most Forks',
    value: 'forks',
    order: 'desc',
},
{
    name: 'Fewest Forks',
    value: 'forks',
    order: 'asc',
}]
const selectItemStyle = {
    borderRight: '2px solid #1890ff',
    color: '#ccc'
}
const isServer=typeof window === 'undefined'

const ItemLink = memo(({ name, search, lang, sort, order, page }) => {
    let queryString = `?search=${search}`;
    if (lang) queryString += `&lang=${lang}`
    if (sort) queryString += `&sort=${sort}&order=${order || 'desc'}`
    if (page) queryString += `&page=${page}`

    return (<Link href={`/search${queryString}`}>
        {isValidElement(name)
            ?
            name
            : <a>{name}</a>
        }
    </Link>)
})

const SearchPage = ({ router, repos = [] ,total=0}) => {
    const { ...querys } = router.query
    useEffect(()=>{
        if(!isServer){
            setCacheArray(repos)
        }
    },[repos])
    
    return (
        <div className="root">
            <Row gutter={24}>
                <Col span={6}>
                    <List
                        bordered
                        header={<span className='list-header'>语言</span>}
                        style={{ marginBottom: 20 }}
                        dataSource={LANGUAGE}
                        renderItem={(item) => (
                            <List.Item style={item === querys.lang ? selectItemStyle : null}>
                                {
                                    item === querys.lang ?
                                        <span>{item}</span>
                                        :
                                        <ItemLink
                                            {...querys}
                                            name={item}
                                            lang={item} />
                                }
                            </List.Item>)} />
                    <List
                        bordered
                        header={<span className='list-header'>排序</span>}
                        dataSource={SORT_LIST}
                        renderItem={(item) => {
                            const { name, value, order } = item;
                            let selected = false;
                            if (name === 'Best Match' && !querys.sort) {
                                selected = true;
                            }
                            if (value === querys.sort && order === querys.order) {
                                selected = true;
                            }
                            return <List.Item style={selected ? selectItemStyle : null}>
                                {
                                    selected ?
                                        <span >{name}</span>
                                        :
                                        <ItemLink
                                            {...querys}
                                            name={name}
                                            sort={value}
                                            order={order}
                                        />
                                }
                            </List.Item>
                        }}
                    />
                </Col>
                <Col span={16}>
                    <h3 className='repo-title'>Showing {total} available repository results</h3>
                    {
                        repos.map(repo => <Repo key={repo.id} {...repo} />)
                    }
                    <Pagination
                        pageSize={20}
                        current={Number(querys.page) || 1}
                        total={1000}
                        onChange={() => { }}
                        className="pagination"
                        itemRender={(page, type, ol) => {
                            const p = type === 'page' ? page : type === 'prev' ? page - 1 : page + 1;
                            const name = type === 'page' ? page : ol;
                            return <ItemLink {...querys} page={p} name={name} />
                        }}
                    />
                </Col>
            </Row>
            <style jsx>{`
            .root{
                padding: 20px 0;
            }
            .list-header{
                font-size: 16px;
                font-weight: 800;
            }
            .repo-title{
                font-size:20px;
                font-weight:600;
                line-height:50px;
            }
            .pagination{
                text-align: center;
                 padding: 20px 0;
            }
            `}</style>
        </div>
    )
}
SearchPage.getInitialProps = async ({ res, req, query }) => {
    const { search, lang, sort, order, page } = query;
    let queryString = `?q=${search}`;
    if (lang) queryString += `+language:${lang}`
    if (sort) queryString += `&sort=${sort}&order=${order || 'desc'}`
    if (page) queryString += `&page=${page}`
    const result = await api.request({
        url: `/search/repositories${queryString}`
    }, req, res);
    return { repos: result.items,total:result.total_count}
}
export default withRouter(SearchPage)