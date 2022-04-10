import { Container } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./custom-markdown.css";
import "./github-markdown.css";

// component to pass markdown which it will then render
const RenderMarkdown = (props: {
    md: string;
    darkMode: boolean;
    className?: string;
}): JSX.Element => (
    <Container
        className={clsx(
            props.className,
            "markdown-body",
            props.darkMode ? "markdown-dark" : "markdown-light",
        )}
    >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{props.md}</ReactMarkdown>
    </Container>
);

export default React.memo(RenderMarkdown);
