"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Invalid credentials.");
      } else {
        router.push("/nj-hq");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-off-white px-6">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-charcoal/5">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display mb-2">Studio Admin</h1>
          <p className="text-charcoal/50 text-sm">Sign in to manage your content</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-charcoal/70 mb-1">Email</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-charcoal/5 border border-transparent rounded-lg focus:bg-white focus:border-deep-amber focus:ring-1 focus:ring-deep-amber outline-none transition-all"
              placeholder="admin@nj.studio"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal/70 mb-1">Password</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-charcoal/5 border border-transparent rounded-lg focus:bg-white focus:border-deep-amber focus:ring-1 focus:ring-deep-amber outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-charcoal text-white py-3 rounded-lg font-medium hover:bg-charcoal/90 transition-colors disabled:opacity-50 mt-4"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
