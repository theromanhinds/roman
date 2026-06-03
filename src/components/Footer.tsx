export default function Footer() {
  const links = [
    { name: 'linkedin', url: 'https://www.linkedin.com/in/romanhinds/' },
    { name: 'github', url: 'https://github.com/theromanhinds' },
    { name: 'instagram', url: 'https://www.instagram.com/roman.hinds/' },
  ];

  return (
    <footer className="mt-2 mb-10">
      <div className="max-w-[60ch] mx-auto flex items-center gap-3">
        <img
          src="/avatar.jpg"
          alt="Roman Hinds"
          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex items-center gap-3">
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
    </footer>
  );
}
