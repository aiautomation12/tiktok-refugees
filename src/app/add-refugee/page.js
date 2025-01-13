"use client";
import { useSession } from "next-auth/react";

export default function AddRefugee() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold mb-6">Add Your Refugee Address</h1>
        <form className="space-y-4">
          <div>
            <label className="block mb-1">TikTok Username</label>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Instagram Username</label>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block mb-1">RedNote Username</label>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block mb-1">SnapChat Username</label>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block mb-1">I am known for</label>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#17616f] text-white px-6 py-2 rounded-md hover:bg-[#124c57] transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}