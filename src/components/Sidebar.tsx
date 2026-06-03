export default function Sidebar() {
  const links = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/romanhinds/' },
    { name: 'GitHub', url: 'https://github.com/theromanhinds' },
    { name: 'Instagram', url: 'https://www.instagram.com/roman.hinds/' },
  ];

  return (
    <aside className="self-start md:sticky md:top-12">
      <h2 className="text-2xl font-medium text-foreground mb-6">About me</h2>
      <img
        src="/avatar.jpg"
        alt="Roman Hinds"
        className="w-40 h-40 rounded-full object-cover object-top mb-6"
      />
      <p className="text-base leading-relaxed text-foreground/80 mb-6">
        Hey, I'm Roman. I build agentic software — applications where AI does the heavy lifting. My focus is turning ideas into clean, fast, genuinely useful products, and I'm usually building several at once. I care about craft: type-driven interfaces, sharp details, and experiences that feel effortless.
      </p>
      <hr className="border-border mb-6" />
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-subtle hover:text-foreground transition-colors duration-200 text-sm"
          >
            {link.name}
          </a>
        ))}
      </div>
    </aside>
  );
}
