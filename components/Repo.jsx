import Link from 'next/link'
import { Icon} from 'antd'
import {getLastUpdated} from '../lib/utils'

export default ({
    name, owner,
    full_name, language,
    description, license,
    updated_at, open_issuess,
    stargazers_count }) => {
    return (
        <div className="root">
            <div className="basic-info">
                <h3 className="repo-title">
                    <Link href={`/detail?owner=${owner.login}&name=${name}`}>
                        <a >{full_name}</a>
                    </Link>
                </h3>
                <p className="repo-desc">{description}</p>
                <p className="other-info">
                    {
                        license
                        ?
                        <span className="license">{getLicense(license)}</span>
                        :null
                    } 
                    <span className="last-updated">{getLastUpdated(updated_at)}</span>
                    <span className="open-issues">{open_issuess} open issuess</span>
                </p>
            </div>
            <div className="lang-star">
                <span className="lang">{language}</span>
                <span className="star">{stargazers_count}
                    <Icon type="star" theme="filled" />
                </span>
            </div>
            <style jsx>{`
                .root{ 
                    display:flex;
                    justify-content:space-between;
                }
                .root + .root{
                    border-top:1px solid #eee;
                    padding-top:20px;
                }
                .repo-title{
                    font-size:20px
                }
                .lang-star{
                    display:flex;
                }
                .lang-star > span{
                    width:120px;
                    text-align:right;
                } 
                .repo-desc{
                    width:400px;
                }
                .other-info >span{
                    margin-right:10px;
                }
            `}</style>
        </div>
    )
}
function getLicense(license) {
    return license ? `${license.spdx_id} License` : ''
}
