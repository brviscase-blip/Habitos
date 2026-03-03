import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { User, Book, GitBranch } from 'lucide-react';
import { DashboardNavbar } from '@/components/DashboardNavbar';
import { BackgroundGlow } from '@/components/BackgroundGlow';

export function HomePage() {
  const navigate = useNavigate();
  const user = localStorage.getItem('user') || 'User';

  return (
    <div className="min-h-screen bg-gh-bg text-gh-text-primary font-sans relative overflow-hidden">
      <BackgroundGlow />
      <DashboardNavbar activeTab="home" />
      <div className="relative z-10">
        <div className="container mx-auto px-4 md:px-6 py-8 grid md:grid-cols-12 gap-8">
          {/* Sidebar */}
          <aside className="md:col-span-3 space-y-6">
           <div className="bg-gh-card border border-gh-border rounded-md p-4">
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-10 h-10 rounded-full bg-gh-blue flex items-center justify-center text-lg text-white font-bold">
                    {user.charAt(0).toUpperCase()}
                 </div>
                 <div>
                    <h2 className="font-bold text-white">{user}</h2>
                    <p className="text-xs text-gray-400">Pro Plan</p>
                 </div>
              </div>
              <Button size="sm" variant="outline" className="w-full justify-start gap-2">
                 <User size={14} /> Edit profile
              </Button>
           </div>

           <div>
              <div className="flex items-center justify-between mb-2">
                 <h3 className="font-semibold text-sm">Recent Repositories</h3>
                 <Button size="sm" variant="ghost" className="h-6 px-2 text-xs bg-gh-green text-white">New</Button>
              </div>
              <div className="space-y-1">
                 {['dev-platform-landing', 'react-three-fiber-test', 'nextjs-dashboard', 'awesome-ui-kit'].map(repo => (
                    <div key={repo} className="flex items-center gap-2 p-2 hover:bg-gh-card rounded-md cursor-pointer group">
                       <Book size={14} className="text-gray-400 group-hover:text-gh-text-secondary" />
                       <span className="text-sm font-medium text-white group-hover:text-gh-blue group-hover:underline">{user}/{repo}</span>
                    </div>
                 ))}
              </div>
           </div>
        </aside>

        {/* Main Feed */}
        <main className="md:col-span-9">
           <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-4">Home</h2>
              <div className="bg-gh-card border border-gh-border rounded-md p-8 text-center">
                 <h3 className="text-2xl font-bold text-white mb-2">Welcome to your new dashboard</h3>
                 <p className="text-gray-400 mb-6">Get started by creating a new repository or exploring existing projects.</p>
                 <Button className="bg-gh-green text-white font-bold">Create a new repository</Button>
              </div>
           </div>

           <div>
              <h3 className="font-semibold text-white mb-3">Latest Activity</h3>
              <div className="space-y-4">
                 {[1, 2, 3].map(i => (
                    <div key={i} className="bg-gh-card border border-gh-border rounded-md p-4">
                       <div className="flex items-start gap-3">
                          <div className="mt-1">
                             <GitBranch size={16} className="text-purple-400" />
                          </div>
                          <div>
                             <p className="text-sm text-gray-300">
                                <span className="font-bold text-white">{user}</span> pushed to <span className="font-bold text-white">main</span> in <span className="text-gh-blue hover:underline cursor-pointer">dev-platform-landing</span>
                             </p>
                             <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                             <div className="mt-3 bg-gh-bg border border-gh-border rounded p-3 text-sm font-mono text-gray-400">
                                <p>feat: update landing page hero section</p>
                             </div>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </main>
      </div>
      </div>
    </div>
  );
}
