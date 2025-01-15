"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect, useCallback } from "react";
import Modal from "./components/Modal";
import RefugeeForm from "./components/RefugeeForm";
import RefugeeTable from "./components/RefugeeTable";
import Loader from "./components/Loader";
import { Search } from "lucide-react"; 

export default function Home() {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refugees, setRefugees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    tiktokUsername: "",
    instagramUsername: "",
    redNoteUsername: "",
    snapchatUsername: "",
    flipUsername: "",
    linkedinBio: "",
    knownFor_1: "",
    knownFor_2: "",
    knownFor_3: "",
  });

  const fetchRefugees = async (pageNum = 1, isLoadMore = false, search = "") => {
    try {
      if (!isLoadMore) {
        setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }

      const queryParams = new URLSearchParams({
        page: pageNum,
        limit: 10,
        ...(search && { search })
      });

      const response = await fetch(`/api/refugees?${queryParams}`);
      const data = await response.json();
      
      if (isLoadMore) {
        setRefugees(prev => [...prev, ...data.refugees]);
      } else {
        setRefugees(data.refugees);
      }
      
      setHasMore(data.hasMore);
    } catch (error) {
      console.error('Error fetching refugees:', error);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchRefugees();
  }, []);

  // Debounce search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm !== "") {
        setPage(1);
        fetchRefugees(1, false, searchTerm);
      } else {
        fetchRefugees(1);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop 
      === document.documentElement.offsetHeight) {
      if (hasMore && !isLoadingMore) {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchRefugees(nextPage, true, searchTerm);
      }
    }
  }, [hasMore, isLoadingMore, page, searchTerm]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/refugees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsModalOpen(false);
        setFormData({
          firstName: "",
          lastName: "",
          tiktokUsername: "",
          instagramUsername: "",
          redNoteUsername: "",
          snapchatUsername: "",
          flipUsername: "",
          linkedinBio: "",
          knownFor_1: "",
          knownFor_2: "",
          knownFor_3: "",
        });
        setPage(1);
        fetchRefugees(1);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
            {/* Search Section */}
            <div className="w-full md:flex-1 md:max-w-2xl">
              <div className="flex items-center">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Find TikTok Refugees Here..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#17616f] focus:border-[#17616f]"
                  />
                </div>
                <button
                  className="hidden md:block px-6 py-2 ml-2 bg-[#17616f] text-white rounded-md hover:bg-[#124c57] transition"
                >
                  Search Now
                </button>
              </div>
            </div>

            {/* Add Refugee Button */}
            <button
              onClick={() => session ? setIsModalOpen(true) : window.location.href = '/auth/signin'}
              className="w-full md:w-auto bg-[#17616f] text-white px-6 py-2 rounded-md hover:bg-[#124c57] transition whitespace-nowrap"
            >
              Add Your Refugee Address
            </button>
          </div>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <>
            <RefugeeTable refugees={refugees} />
            {isLoadingMore && (
              <div className="mt-4">
                <Loader />
              </div>
            )}
          </>
        )}

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className="text-2xl font-bold mb-4 p-4">Add Your Refugee Address</h2>
          <RefugeeForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      </div>
    </div>
  );
}