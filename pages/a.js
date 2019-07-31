import {useRouter} from 'next/router'

const PageA=(props)=>{
    const router=useRouter();
    console.log(router,'page A');
    return <span>page A,{props.userAgent}</span>
}
PageA.getInitialProps=async ({req})=>{
    const userAgent=req?req.headers['user-agent']:navigator.userAgent;
    return {userAgent}
}
export default PageA;