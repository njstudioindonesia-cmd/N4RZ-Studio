"use client";

import { useState, useEffect } from "react";
import { BlogPost } from "@prisma/client";
import { Plus, Trash, Edit } from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";
import RichTextEditor from "@/components/admin/RichTextEditor";

export default function BlogEditor() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    coverImage: "",
    published: false,
  });

  const fetchPosts = () => {
    fetch("/api/blog")
      .then(res => res.json())
      .then(d => {
        setPosts(d);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleEdit = (post: BlogPost) => {
    setEditingId(post.id);
    setFormData({
      title: post.title,
      slug: post.slug,
      content: post.content,
      coverImage: post.coverImage || "",
      published: post.published,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ title: "", slug: "", content: "", coverImage: "", published: false });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const url = editingId ? `/api/blog/${editingId}` : "/api/blog";
      const method = editingId ? "PUT" : "POST";
      
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      handleCancelEdit();
      fetchPosts();
    } catch (error) {
      alert("Failed to save post");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    
    try {
      await fetch(`/api/blog/${id}`, { method: "DELETE" });
      fetchPosts();
    } catch (error) {
      alert("Failed to delete post");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
          <p className="text-gray-500">Manage your articles and news.</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
        <h2 className="text-lg font-semibold mb-4">{editingId ? "Edit Post" : "Add New Post"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input 
                type="text" 
                required
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-charcoal outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
              <input 
                type="text" 
                value={formData.slug}
                onChange={e => setFormData({...formData, slug: e.target.value})}
                placeholder="Leave empty to auto-generate"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-charcoal outline-none" 
              />
            </div>
          </div>
          
          <div>
            <ImageUploader 
              label="Cover Image"
              value={formData.coverImage}
              onChange={(url) => setFormData({...formData, coverImage: url})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <RichTextEditor 
              value={formData.content}
              onChange={(html) => setFormData({...formData, content: html})}
            />
          </div>

          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="published"
              checked={formData.published}
              onChange={e => setFormData({...formData, published: e.target.checked})}
              className="w-4 h-4 text-charcoal border-gray-300 rounded focus:ring-charcoal"
            />
            <label htmlFor="published" className="text-sm font-medium text-gray-700">Published (visible to public)</label>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
            <button 
              type="submit" 
              disabled={saving}
              className="flex items-center gap-2 bg-charcoal text-white px-4 py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50"
            >
              {saving ? "Saving..." : editingId ? "Update Post" : "Publish Post"}
            </button>
            {editingId && (
              <button 
                type="button" 
                onClick={handleCancelEdit}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {post.coverImage && (
                      <img src={post.coverImage} alt="" className="w-10 h-10 rounded-md object-cover mr-3" />
                    )}
                    <div>
                      <div className="text-sm font-medium text-gray-900">{post.title}</div>
                      <div className="text-sm text-gray-500">/{post.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${post.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleEdit(post)} className="text-charcoal hover:text-deep-amber mr-4">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(post.id)} className="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
