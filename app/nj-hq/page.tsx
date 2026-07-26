import prisma from "@/lib/prisma";
import Link from "next/link";
import { ArrowRight, LayoutTemplate, Briefcase, Image, BookOpen } from "lucide-react";

export default async function AdminDashboard() {
  const stats = [
    { name: "Services", count: await prisma.service.count(), href: "/nj-hq/services", icon: Briefcase, color: "bg-blue-50 text-blue-600" },
    { name: "Gallery Items", count: await prisma.galleryItem.count(), href: "/nj-hq/gallery", icon: Image, color: "bg-purple-50 text-purple-600" },
    { name: "Portfolio Projects", count: await prisma.portfolioItem.count(), href: "/nj-hq/portfolio", icon: BookOpen, color: "bg-emerald-50 text-emerald-600" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
        <p className="text-gray-500">Here's a quick overview of your website content.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
              </div>
            </div>
            <Link 
              href={stat.href}
              className="flex items-center text-sm font-medium text-gray-600 hover:text-charcoal group"
            >
              Manage {stat.name}
              <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        ))}
      </div>
      
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/nj-hq/settings" className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors">
            <div className="p-2 bg-gray-100 rounded-md text-gray-600">
              <LayoutTemplate className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Update Global Settings</p>
              <p className="text-sm text-gray-500">Change site name, colors, and SEO meta.</p>
            </div>
          </Link>
          <Link href="/nj-hq/hero" className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors">
            <div className="p-2 bg-gray-100 rounded-md text-gray-600">
              <LayoutTemplate className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Edit Hero Section</p>
              <p className="text-sm text-gray-500">Update the main headline and CTA.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
