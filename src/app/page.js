"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Modal from "./components/Modal";
import RefugeeForm from "./components/RefugeeForm";
import RefugeeTable from "./components/RefugeeTable";
import { Search } from "lucide-react"; 
export default function Home() {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refugees, setRefugees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRefugees, setFilteredRefugees] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    tiktokUsername: "",
    instagramUsername: "",
    redNoteUsername: "",
    snapchatUsername: "",
    flipUsername: "",
    linkedinBio: "",
    knownFor: "",
  });

  useEffect(() => {
    fetchRefugees();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchTerm, refugees]);

  const fetchRefugees = async () => {
    try {
      const response = await fetch('/api/refugees');
      const data = await response.json();
      setRefugees(data);
      setFilteredRefugees(data);
    } catch (error) {
      console.error('Error fetching refugees:', error);
    }
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredRefugees(refugees);
      return;
    }

    const searchValue = searchTerm.toLowerCase();
    const filtered = refugees.filter(refugee => 
      refugee.firstName?.toLowerCase().includes(searchValue) ||
      refugee.lastName?.toLowerCase().includes(searchValue) ||
      refugee.tiktokUsername?.toLowerCase().includes(searchValue) ||
      refugee.instagramUsername?.toLowerCase().includes(searchValue) ||
      refugee.redNoteUsername?.toLowerCase().includes(searchValue) ||
      refugee.snapchatUsername?.toLowerCase().includes(searchValue) ||
      refugee.flipUsername?.toLowerCase().includes(searchValue) ||
      refugee.linkedinBio?.toLowerCase().includes(searchValue) ||
      refugee.knownFor?.toLowerCase().includes(searchValue)
    );
    setFilteredRefugees(filtered);
  };

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
          knownFor: "",
        });
        fetchRefugees();
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
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Find TikTok Refugees Here
          </h1>
          
          <div className="flex justify-between items-center space-x-4">
            {/* Search Section */}
            <div className="flex-1 max-w-2xl">
              <div className="flex space-x-2">
                <div className="relative flex-1">
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
                  onClick={handleSearch}
                  className="px-6 py-2 bg-[#17616f] text-white rounded-md hover:bg-[#124c57] transition"
                >
                  Search Now
                </button>
              </div>
            </div>

            {/* Add Refugee Button */}
            <button
              onClick={() => session ? setIsModalOpen(true) : window.location.href = '/auth/signin'}
              className="bg-[#17616f] text-white px-6 py-2 rounded-md hover:bg-[#124c57] transition whitespace-nowrap"
            >
              Add Your Refugee Address
            </button>
          </div>
        </div>

        <RefugeeTable refugees={filteredRefugees} />

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