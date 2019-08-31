import WithRepoBasic from '../../components/WithRepoBasic'

const ReadMe = ({text}) => {
  return <div>readme {text}</div>
}
ReadMe.getInitialProps=async()=>{
    return {
        text:123
    }
}
export default WithRepoBasic(ReadMe,'index')