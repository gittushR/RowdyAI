import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Typography } from "@mui/material";

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <ReactMarkdown
      components={{
        h1: ({ children }) => (
          <Typography variant="h4" gutterBottom>
            {children}
          </Typography>
        ),
        h2: ({ children }) => (
          <Typography variant="h5" gutterBottom>
            {children}
          </Typography>
        ),
        h3: ({ children }) => (
          <Typography variant="h6" gutterBottom>
            {children}
          </Typography>
        ),
        p: ({ children }) => (
          <Typography variant="body1" paragraph>
            {children}
          </Typography>
        ),
        strong: ({ children }) => <strong>{children}</strong>,
        em: ({ children }) => <em>{children}</em>,
        ul: ({ children }) => (
          <ul style={{ paddingLeft: "1.5rem" }}>{children}</ul>
        ),
        li: ({ children }) => (
          <li>
            <Typography variant="body1" component="span">
              {children}
            </Typography>
          </li>
        ),
        //@ts-expect-error:'it working fine just chill'
        code({ inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              //@ts-expect-error : 'its a third party styling tool not CSS'
              style={coldarkDark}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code
              style={{
                backgroundColor: "#51538f",
                padding: "2px 4px",
                borderRadius: 4,
              }}
            >
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
