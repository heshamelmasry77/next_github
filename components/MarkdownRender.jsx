import { memo,useMemo } from "react";
import markdownIt from 'markdown-it'
import 'github-markdown-css'
const md = new markdownIt({
    html: true,
    linkify: true
});

function b64_to_uft8(str) {
    return decodeURIComponent(escape(atob(str)))
}
const MDRenderer = ({ content, isBase64 }) => {
    const markdown=isBase64?b64_to_uft8(content):content
    const html = useMemo(()=>md.render(markdown),[markdown])
    return (
        <div className="markdown-body">
            <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>)
}
export default memo(MDRenderer)