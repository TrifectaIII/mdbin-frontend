import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// wrapper component to pass markdown which it will then render
const RenderMarkdown = (props: {
    md: string,
    className?: string,
}): JSX.Element => (
    <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        className={props.className}
    >
        {props.md}
    </ReactMarkdown>
);

export default RenderMarkdown;
