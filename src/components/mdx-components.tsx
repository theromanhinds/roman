export const mdxComponents = {
  h1: ({ children }: any) => (
    <h1 className="text-[30px] leading-tight font-medium text-foreground mb-4">
      {children}
    </h1>
  ),
  h2: ({ children, id }: any) => {
    const actualId =
      id ||
      (typeof children === 'string'
        ? children.toLowerCase().replace(/\s+/g, '-')
        : undefined);
    return (
      <h2
        id={actualId}
        className="text-2xl font-medium text-foreground mt-10 mb-3 scroll-mt-24"
      >
        {actualId ? (
          <a
            href={`#${actualId}`}
            className="no-underline hover:underline decoration-1 underline-offset-4"
          >
            {children}
          </a>
        ) : (
          children
        )}
      </h2>
    );
  },
  h3: ({ children }: any) => (
    <h3 className="text-lg font-medium text-foreground mt-6 mb-2">{children}</h3>
  ),
  p: ({ children }: any) => (
    <p className="text-lg leading-relaxed text-foreground/90 mb-4">{children}</p>
  ),
  a: ({ href, children }: any) => {
    const isAnchor = href?.startsWith('#');
    return (
      <a
        href={href}
        target={isAnchor ? undefined : '_blank'}
        rel={isAnchor ? undefined : 'noopener noreferrer'}
        className="font-medium text-foreground no-underline decoration-1 underline-offset-4 hover:underline transition-all duration-200"
      >
        {children}
      </a>
    );
  },
  // Solid CTA button (delba "Let's talk") — <Cta href="mailto:...">Let's talk</Cta>
  Cta: ({ href, children }: any) => (
    <a
      href={href}
      target={href?.startsWith('mailto:') ? undefined : '_blank'}
      rel={href?.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
      className="group inline-flex items-center gap-1.5 rounded-md bg-foreground px-4 py-2 text-base font-medium text-background no-underline transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
    >
      {children}
      <span
        aria-hidden
        className="transition-transform duration-200 group-hover:translate-x-0.5"
      >
        →
      </span>
    </a>
  ),
  ul: ({ children }: any) => (
    <ul className="prose-list space-y-1.5 my-4 pl-0 list-none">{children}</ul>
  ),
  li: ({ children }: any) => (
    <li className="text-lg leading-relaxed text-foreground/90 before:content-['—'] before:mr-2 before:text-subtle">
      {children}
    </li>
  ),
  code: ({ children }: any) => (
    <code className="font-mono text-sm bg-code-bg text-code-text px-1.5 py-0.5 rounded">
      {children}
    </code>
  ),
  hr: () => <hr className="my-8 border-border" />,
  strong: ({ children }: any) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
};
