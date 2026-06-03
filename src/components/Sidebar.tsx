export default function Sidebar() {
  const links = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/romanhinds/' },
    { name: 'GitHub', url: 'https://github.com/theromanhinds' },
    { name: 'Instagram', url: 'https://www.instagram.com/roman.hinds/' },
  ];

  return (
    <aside className="w-full">
      <hr className="border-border mb-6" />
      <div className="overflow-hidden">
        <img
          src="/avatar.jpg"
          alt="Roman Hinds"
          className="float-left w-[4.5lh] h-[4.5lh] rounded-full object-cover object-top mr-5 mb-2"
        />
        <p className="text-base leading-relaxed text-foreground/80 mb-2">
          Disciple. Entrepreneur. Builder.
        </p>
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
      </div>
    </aside>
  );
}
