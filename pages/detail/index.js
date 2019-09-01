import dynamic from 'next/dynamic'
import {Spin} from 'antd'
import WithRepoBasic from '../../components/WithRepoBasic'
import api from '../../lib/api'

const MdRenderer=dynamic(()=>import('../../components/MarkdownRender'),{
  loading:<Spin/>
})

const ReadMe = ({ readme }) => {
  return (<MdRenderer content={readme.content} isBase64 />)
}
ReadMe.getInitialProps = async ({ req, res, query }) => {
  const { owner, name } = query;
  const result = await api.request({ url: `/repos/${owner}/${name}/readme` }, req, res)
  return {
    readme: result
  }
}
export default WithRepoBasic(ReadMe, 'index')