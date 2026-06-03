import { ThemeProvider } from 'next-themes';
import { MDXProvider } from '@mdx-js/react';
import Sidebar from './components/Sidebar';
import ThemeToggle from './components/ThemeToggle';
import { mdxComponents } from './components/mdx-components';
import Home from './pages/Home.mdx';

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="min-h-screen bg-background text-foreground antialiased">
        <ThemeToggle className="fixed top-4 right-4 z-50" />
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-24">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[2fr_1fr] animate-fade-in-up">
            <MDXProvider components={mdxComponents}>
              <div className="min-w-0">
                <Home />
              </div>
            </MDXProvider>
            <Sidebar />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

