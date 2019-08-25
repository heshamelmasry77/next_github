import { withRouter } from 'next/router'
 function search({ router}){
    return <div>search {router.query.search}</div>
}
export default withRouter(search)