import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// component to pass markdown which it will then render
const RenderMarkdown = (props: {md: string}): JSX.Element => (
    <ReactMarkdown
        remarkPlugins={[remarkGfm]}
    >
        {props.md}
    </ReactMarkdown>
);

export default RenderMarkdown;
