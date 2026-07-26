import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LogOut, Settings, LayoutTemplate, Briefcase, Image, BookOpen, FileText, Info, MessageSquare, Store, Users } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const navItems = [
    { name: "Dashboard", href: "/nj-hq", icon: LayoutTemplate },
    { name: "Settings", href: "/nj-hq/settings", icon: Settings },
    { name: "Hero Section", href: "/nj-hq/hero", icon: Image },
    { name: "About Us", href: "/nj-hq/about", icon: Info },
    { name: "Client Logos", href: "/nj-hq/client-logos", icon: Users },
    { name: "Testimonials", href: "/nj-hq/testimonials", icon: MessageSquare },
    { name: "Services", href: "/nj-hq/services", icon: Briefcase },
    { name: "Gallery", href: "/nj-hq/gallery", icon: Image },
    { name: "Portfolio", href: "/nj-hq/portfolio", icon: Briefcase },
    { name: "Blog", href: "/nj-hq/blog", icon: BookOpen },
    { name: "Landing Pages", href: "/nj-hq/landing-pages", icon: FileText },
    { name: "Roblox Market", href: "/nj-hq/roblox", icon: Store },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-3 font-display text-xl font-bold text-charcoal" target="_blank">
            <img src="/icon.png" alt="Logo" className="w-10 h-10 object-contain rounded-md brightness-0" />
            <div>
              NJ Studio
              <span className="block text-xs font-sans font-normal text-gray-500 mt-1">Admin Panel</span>
            </div>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-charcoal transition-colors"
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <p className="font-medium text-charcoal">{session.user?.name}</p>
              <p className="text-xs text-gray-500">{session.user?.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
