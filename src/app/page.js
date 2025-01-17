"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect, useCallback } from "react";
import Modal from "./components/Modal";
import RefugeeForm from "./components/RefugeeForm";
import RefugeeTable from "./components/RefugeeTable";
import Loader from "./components/Loader";
import { Search } from "lucide-react";
import RefugeeDetailsModal from './components/RefugeeDetailsModal';
import Header from './components/Header';
import { toast } from "react-hot-toast";

export default function Home() {
  const { data: session } = useSession();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [refugees, setRefugees] = useState([]);
  const [searchTerms, setSearchTerms] = useState({
    nameSearch: "",
    socialSearch: "",
    categorySearch: ""
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedRefugee, setSelectedRefugee] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    tiktokUsername: "",
    youtubeUsername: "",
    knownFor_1: "",
    knownFor_2: "",
    knownFor_3: "",
  });

  const fetchUserProfile = async () => {
    try {
      const response = await fetch("/api/refugees/profile");
      const data = await response.json();
      if (data && !data.error) {
        setUserProfile(data);
        setFormData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          tiktokUsername: data.tiktokUsername || "",
          youtubeUsername: data.youtubeUsername || "",
          knownFor_1: data.knownFor_1 || "",
          knownFor_2: data.knownFor_2 || "",
          knownFor_3: data.knownFor_3 || "",
        });
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast.error("Failed to fetch profile");
    }
  };

  const fetchRefugees = useCallback(async (pageNum = 1, isLoadMore = false) => {
    try {
      if (!isLoadMore) {
        setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }

      const queryParams = new URLSearchParams({
        page: pageNum,
        limit: 10,
        ...(searchTerms.nameSearch && { nameSearch: searchTerms.nameSearch }),
        ...(searchTerms.socialSearch && { socialSearch: searchTerms.socialSearch }),
        ...(searchTerms.categorySearch && { categorySearch: searchTerms.categorySearch })
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
      toast.error("Failed to fetch data");
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [searchTerms]);

  useEffect(() => {
    fetchRefugees(1, false);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setPage(1);
      fetchRefugees(1, false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerms, fetchRefugees]);

  useEffect(() => {
    if (session && isAddModalOpen) {
      fetchUserProfile();
    }
  }, [session, isAddModalOpen]);

  const handleScroll = useCallback(() => {
    const scrollPosition = window.innerHeight + document.documentElement.scrollTop;
    const scrollThreshold = document.documentElement.offsetHeight - 100;

    if (scrollPosition > scrollThreshold) {
      if (hasMore && !isLoadingMore) {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchRefugees(nextPage, true);
      }
    }
  }, [hasMore, isLoadingMore, page, fetchRefugees]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = userProfile ? "PUT" : "POST";
      const endpoint = userProfile ? "/api/refugees/profile" : "/api/refugees";
      
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(userProfile ? "Profile updated successfully" : "Profile created successfully");
        setIsAddModalOpen(false);
        setFormData({
          firstName: "",
          lastName: "",
          tiktokUsername: "",
          youtubeUsername: "",
          knownFor_1: "",
          knownFor_2: "",
          knownFor_3: "",
        });
        setPage(1);
        fetchRefugees(1, false);
      } else {
        const error = await response.json();
        toast.error(error.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to save profile");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleModalOpen = (refugee) => {
    setSelectedRefugee(refugee);
    setIsDetailsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsAddModalOpen(false);
    setIsDetailsModalOpen(false);
    setSelectedRefugee(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onOpenMyProfile={() => setIsAddModalOpen(true)}
        isModalOpen={isAddModalOpen}
      />
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="mb-8">
          <div className="w-full space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by Creator's Name"
                  value={searchTerms.nameSearch}
                  onChange={(e) => setSearchTerms(prev => ({ ...prev, nameSearch: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#17616f] focus:border-[#17616f]"
                />
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by TT or YT Username"
                  value={searchTerms.socialSearch}
                  onChange={(e) => setSearchTerms(prev => ({ ...prev, socialSearch: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#17616f] focus:border-[#17616f]"
                />
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by Known For..."
                  value={searchTerms.categorySearch}
                  onChange={(e) => setSearchTerms(prev => ({ ...prev, categorySearch: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#17616f] focus:border-[#17616f]"
                />
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <>
            <RefugeeTable
              refugees={refugees}
              onModalOpen={handleModalOpen}
              searchTerms={searchTerms}
            />
            {isLoadingMore && (
              <div className="mt-4">
                <Loader />
              </div>
            )}
          </>
        )}

        <Modal isOpen={isAddModalOpen} onClose={handleModalClose}>
          <h2 className="text-2xl font-bold mb-4 p-4">
            {userProfile ? "Update Your Profile" : "Add Your Profile"}
          </h2>
          <RefugeeForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            onCancel={handleModalClose}
            isUpdate={!!userProfile}
          />
        </Modal>

        <Modal isOpen={isDetailsModalOpen} onClose={handleModalClose}>
          {selectedRefugee && (
            <RefugeeDetailsModal 
              selectedRefugee={selectedRefugee} 
              onClose={handleModalClose} 
            />
          )}
        </Modal>
      </div>
    </div>
  );
}