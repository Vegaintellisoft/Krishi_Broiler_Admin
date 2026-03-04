import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RiArrowUpSFill,  RiSearchLine } from 'react-icons/ri';
import axios from 'axios';
import { useAuth } from '../../auth/AuthContext';
import { formatDateTime } from '../../utils/helper';

const ActivityBroilerUsers = () => {
    const { getPermissions } = useAuth();
    const { broilerUsers: userMaster } = getPermissions();
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const [isLoading, setIsLoading] = useState(false)

    const fetchUserData = async () => {
        setIsLoading(true)
        try {
            const category = "Broiler";

            const { data } = await axios.get(`/driver/activity-log/${category}`);  
            setData(data.data);
        }
        catch (err) {
            console.log("Error fetching user:", err)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchUserData();
    }, []);


    const filteredData = data.filter((item) => {
        return (
            item?.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item?.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item?.latitude.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
            item?.longitude.toString().toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    // Pagination logic
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    // Handle pagination
    const goToFirstPage = () => setCurrentPage(1);
    const goToLastPage = () => setCurrentPage(totalPages);
    const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));


    return (
        <div className={` rounded-lg shadow flex-1 `}>

            <div className={` bg-[#F9F9FC] h-screen relative`}>

                <div className=" space-y-4 pt-3 px-6 font-poppins">
                    <h1 className="text-xl font-bold text-gray-900">Activity Log</h1>
                    <div className="flex items-center gap-x-2 text-sm text-gray-500 ">
                        <Link to="/" className='text-orange-500'>Users</Link>
                        <span>
                            <RiArrowUpSFill className='rotate-90 ' size={20} />
                        </span>
                        <span>Activity Log</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className=" space-x-4  flex">
                            <div>
                                <span className='absolute'>
                                    <RiSearchLine className='ms-2 mt-2 opacity-45' />
                                </span>
                                <input
                                    type="search"
                                    placeholder="Search User..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className=" py-2 px-2 ps-10 border rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                        </div>
                    </div>

                </div>

                <div className={`overflow px-6 mx-4 mt-5 bg-white `}>
                    <table className="w-full">
                        <thead className='font-poppins font-semibold'>
                            <tr className="border-b">
                                <th className="p-4 text-center text-sm text-black">S.No</th>
                                <th className="p-4 text-center text-sm text-black">User Name</th>
                                <th className="p-4 text-center text-sm text-black">Mobile</th>
                                <th className="p-4 text-center text-sm text-black">Category</th>
                                <th className="p-4 text-center text-sm text-black">Last Login</th>
                                <th className="p-4 text-center text-sm text-black">Latitude</th>
                                <th className="p-4 text-center text-sm text-black">Longitude</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y font-poppins">
                            {paginatedData.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50 text-center">
                                    <td className="p-4 text-sm opacity-65">{index + 1}</td>
                                    <td className="p-4 text-sm opacity-65">{item.username}</td>
                                    <td className="p-4 text-sm opacity-65">{item.mobile}</td>
                                    <td className="p-4 text-sm opacity-65">{item.category}</td>
                                    <td className="p-4 text-sm opacity-65">{formatDateTime(item?.created_at)}</td>
                                    <td className="p-4 text-sm opacity-65">{item.latitude}</td>
                                    <td className="p-4 text-sm opacity-65">{item.longitude || "-"}</td>
                                    




                                </tr>
                            ))}

                            {
                                (paginatedData?.length <= 0 && !isLoading) &&
                                <tr>
                                    <td colSpan="8" className="py-10 text-center text-gray-500 text-sm">
                                        No Data Available
                                    </td>
                                </tr>
                            }

                            {isLoading && (
                                <tr>
                                    <td colSpan="8" className="py-10 text-center">
                                        <div className="flex justify-center items-center">
                                            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                                        </div>
                                    </td>
                                </tr>
                            )}

                        </tbody>
                    </table>

                    {/* Pagination Controls */}
                    <div className="flex justify-end font-dm items-center gap-2 mt-4">
                        <button
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}
                            className={`px-3 py-1 border  rounded ${currentPage === 1 ? 'text-gray-400 bg-gray-200' : 'text-white bg-[#F3890A]'}`}
                        >
                            &lt;
                        </button>
                        <button
                            onClick={goToFirstPage}
                            disabled={currentPage === 1}
                            className={`px-3 py-1 text-sm border rounded ${currentPage === 1 ? 'text-gray-400' : 'text-black'}`}
                        >
                            {currentPage === 1 ? "0" : "1"}
                        </button>
                        <span className="px-3 py-1 border font-medium rounded bg-gray-200">{currentPage}</span>
                        <button
                            onClick={goToLastPage}
                            disabled={currentPage === totalPages}
                            className={`px-3 py-1 border text-sm rounded ${currentPage === totalPages ? 'text-gray-400' : 'text-black'}`}
                        >
                            {totalPages}
                        </button>
                        <button
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                            className={`px-3 py-1 border rounded ${currentPage === totalPages ? 'text-gray-400 bg-gray-200' : 'text-white bg-[#F3890A]'}`}
                        >
                            &gt;
                        </button>
                    </div>



                </div>
            </div>
        </div>
    )
}

export default ActivityBroilerUsers