import ThemeToggle from './ThemeToggle';

export default function Nav() {
  return (
    <nav className="flex items-center justify-between mb-8">
      <a
        href="#"
        className="text-foreground font-medium hover:opacity-70 transition-opacity duration-200"
      >
        Roman Hinds
      </a>
      <ThemeToggle />
    </nav>
  );
}

