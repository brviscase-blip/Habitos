import { Github, Twitter, Facebook, Linkedin, Youtube, Twitch } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gh-bg py-16 border-t border-gh-border text-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2 lg:col-span-1">
            <a href="#" className="inline-block mb-6 text-gray-500 hover:text-white transition-colors">
              <Github size={32} />
            </a>
            <p className="text-gh-text-secondary mb-4">Subscribe to our newsletter</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Get the latest news and articles from GitHub delivered to your inbox.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-3 text-gh-text-secondary">
              <li><a href="#" className="hover:text-gh-blue transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-gh-blue transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-gh-blue transition-colors">Team</a></li>
              <li><a href="#" className="hover:text-gh-blue transition-colors">Enterprise</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-3 text-gh-text-secondary">
              <li><a href="#" className="hover:text-gh-blue transition-colors">Developer API</a></li>
              <li><a href="#" className="hover:text-gh-blue transition-colors">Partners</a></li>
              <li><a href="#" className="hover:text-gh-blue transition-colors">Electron</a></li>
              <li><a href="#" className="hover:text-gh-blue transition-colors">GitHub Desktop</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-3 text-gh-text-secondary">
              <li><a href="#" className="hover:text-gh-blue transition-colors">Docs</a></li>
              <li><a href="#" className="hover:text-gh-blue transition-colors">Community Forum</a></li>
              <li><a href="#" className="hover:text-gh-blue transition-colors">Professional Services</a></li>
              <li><a href="#" className="hover:text-gh-blue transition-colors">Skills</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-gh-text-secondary">
              <li><a href="#" className="hover:text-gh-blue transition-colors">About</a></li>
              <li><a href="#" className="hover:text-gh-blue transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-gh-blue transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-gh-blue transition-colors">News</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gh-border flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-500">
          <div className="flex gap-4">
            <span>© 2024 GitHub, Inc.</span>
            <a href="#" className="hover:text-gh-blue transition-colors">Terms</a>
            <a href="#" className="hover:text-gh-blue transition-colors">Privacy</a>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors"><Twitter size={18} /></a>
            <a href="#" className="hover:text-white transition-colors"><Facebook size={18} /></a>
            <a href="#" className="hover:text-white transition-colors"><Linkedin size={18} /></a>
            <a href="#" className="hover:text-white transition-colors"><Youtube size={18} /></a>
            <a href="#" className="hover:text-white transition-colors"><Twitch size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
