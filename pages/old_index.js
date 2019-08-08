import React from 'react'
import Link from 'next/link'
import { Button } from 'antd'
import { addClick, decClick } from '../store/store'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import githubConfig from '../github.config'

const Home = ({ count, addClick, decClick }) => (
  <div>
    <Button onClick={addClick}>addclick</Button>
    <Button onClick={decClick}>decclick</Button>
    current count:{count}
    <br />
    <Link href='/a?id=12' as="/a/12"><a>go Page A</a></Link>
    <div>
      <a href={githubConfig.OAUTH_URL}>Login with github</a>
    </div>
  </div>
)
const mapStateToProps = state => {
  return {
    ...state
  }
}
Home.getInitialProps = async ({ reduxStore }) => {
  reduxStore.dispatch(addClick())
  return {}
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({ addClick, decClick }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Home)
