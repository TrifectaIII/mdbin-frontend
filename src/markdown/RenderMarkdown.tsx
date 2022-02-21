import React from 'react';

import {marked} from 'marked';
import DOMPurify from 'dompurify';

// component to pass markdown which it will then render
const RenderMarkdown = (props: {
    md: string,
    className?: string,
}): JSX.Element => (
    <div
        className={props.className}
        dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(marked(props.md))}}
    />
);

export default RenderMarkdown;

// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';

// // component to pass markdown which it will then render
// const RenderMarkdown = (props: {
//     md: string,
//     className?: string,
// }): JSX.Element => (
//     <ReactMarkdown
//         remarkPlugins={[remarkGfm]}
//         className={props.className}
//     >
//         {props.md}
//     </ReactMarkdown>
// );
