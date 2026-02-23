import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { RiArrowUpSFill, RiSearchLine, RiDeleteBin6Line } from 'react-icons/ri'
import { LuImport, LuPlus } from 'react-icons/lu'
import { FiEdit2 } from 'react-icons/fi'
import Swal from "sweetalert2";
import SupplyModal from './SupplyModal'
import { useAuth } from '../../../../auth/AuthContext'
import ExcelExport from '../../../../utils/ExcelExport'

const BroilerSupply = () => {
    // --- Permissions ---
    const { getPermissions } = useAuth();
    // Assuming permission key is 'broilerSupply'
    const { broilerSupply } = getPermissions();

    // --- State Management ---
    const [data, setData] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    // --- Fetch Data ---
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        // Simulate API Fetch
        setTimeout(() => {
            setData([
                { 
                    id: 1, 
                    date: '2025-10-24', 
                    dcNo: 'DC-1001', 
                    customer: 'Chicken Center A', 
                    farmer: 'FARM-001 | Krishnan', 
                    birdQty: 200, 
                    weight: 450, 
                    billValue: 45000, 
                    status: 'Dispatched' 
                },
                { 
                    id: 2, 
                    date: '2025-10-25', 
                    dcNo: 'DC-1002', 
                    customer: 'Hotel B', 
                    farmer: 'FARM-002 | Balaji', 
                    birdQty: 150, 
                    weight: 340, 
                    billValue: 34000, 
                    status: 'Dispatched' 
                },
            ]);
            setIsLoading(false);
        }, 500);
    };

    // --- Handlers ---

    const openModal = (item = null) => {
        setSelectedItem(item);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedItem(null);
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                setData(prev => prev.filter(item => item.id !== id));
                Swal.fire({ title: "Deleted!", text: "Record has been deleted.", icon: "success", timer: 1500, showConfirmButton: false });
            }
        });
    };

    const handleExport = () => {
        ExcelExport(data, "Broiler_Supply.xlsx");
    };

    // --- Filter & Pagination ---
    const filteredData = data.filter(item =>
        item.dcNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.farmer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    // Pagination Handlers
    const goToFirstPage = () => setCurrentPage(1);
    const goToLastPage = () => setCurrentPage(totalPages);
    const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    return (
        <div className="rounded-lg shadow flex-1">
            
            <SupplyModal 
                isOpen={modalIsOpen} 
                closeModal={closeModal} 
                refreshData={fetchData} 
                editData={selectedItem} 
            />

            {/* --- PAGE CONTENT --- */}
            <div className="bg-[#F9F9FC] h-screen relative">

                {/* Header */}
                <div className="space-y-4 pt-3 px-6 font-poppins">
                    <h1 className="text-xl font-bold text-gray-900">Broiler Supply</h1>
                    <div className="flex items-center gap-x-2 text-sm text-gray-500">
                        <Link to="/" className='text-orange-500'>Sales</Link>
                        <span><RiArrowUpSFill className='rotate-90' size={20} /></span>
                        <span>Broiler Supply</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="relative">
                            <span className='absolute top-2.5 left-2 opacity-45'><RiSearchLine /></span>
                            <input
                                type="search"
                                placeholder="Search DC No/Customer..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="py-2 px-2 ps-8 border rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-orange-500 w-64"
                            />
                        </div>

                        <div className='space-x-4 flex'>
                            <button onClick={handleExport} className="px-4 py-2 bg-[#EFE8E0] text-[#F3890A] border rounded-lg hover:bg-orange-500 hover:text-white transition text-xs flex items-center gap-2">
                                <LuImport size={16} /> Export
                            </button>
                            {broilerSupply?.add && (
                                <button onClick={() => openModal()} className="px-4 py-2 bg-orange-500 text-white border rounded-lg hover:bg-orange-600 transition text-xs flex items-center gap-2">
                                    <LuPlus size={16} /> Add Supply
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto px-6 mx-4 mt-5 bg-white rounded-lg shadow-sm">
                    <table className="w-full text-sm text-left">
                        <thead className="text-black font-poppins font-semibold border-b">
                            <tr>
                                <th className="p-4 text-center">S.No</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">DC No</th>
                                <th className="p-4">Customer</th>
                                <th className="p-4">Farmer</th>
                                <th className="p-4 text-center">Bird Qty</th>
                                <th className="p-4 text-center">Weight</th>
                                <th className="p-4 text-right">Bill Value</th>
                                {(broilerSupply?.edit || broilerSupply?.delete) && <th className="p-4 text-center">Actions</th>}
                            </tr>
                        </thead>
                        <tbody className="divide-y font-poppins">
                            {paginatedData.length > 0 ? paginatedData.map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="p-4 text-center opacity-65">{startIndex + index + 1}</td>
                                    <td className="p-4 opacity-65">{item.date}</td>
                                    <td className="p-4 opacity-65">{item.dcNo}</td>
                                    <td className="p-4 opacity-65">{item.customer}</td>
                                    <td className="p-4 opacity-65">{item.farmer}</td>
                                    <td className="p-4 text-center opacity-65">{item.birdQty}</td>
                                    <td className="p-4 text-center opacity-65">{item.weight} kg</td>
                                    <td className="p-4 text-right opacity-65">₹{item.billValue}</td>
                                    {(broilerSupply?.edit || broilerSupply?.delete) && (
                                        <td className="p-4 flex justify-center gap-4">
                                            {broilerSupply?.edit && <button onClick={() => openModal(item)} className="hover:text-orange-500"><FiEdit2 size={18} /></button>}
                                            {broilerSupply?.delete && <button onClick={() => handleDelete(item.id)} className="hover:text-red-500"><RiDeleteBin6Line size={18} /></button>}
                                        </td>
                                    )}
                                </tr>
                            )) : (
                                <tr><td colSpan="9" className="p-8 text-center text-gray-500">No Data Available</td></tr>
                            )}
                        </tbody>
                    </table>

                    {/* Pagination Controls */}
                    <div className="flex justify-end font-dm items-center gap-2 mt-4 mb-4 pt-4 border-t">
                        <button
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}
                            className={`px-3 py-1 border rounded ${currentPage === 1 ? 'text-gray-400 bg-gray-200' : 'text-white bg-[#F3890A]'}`}
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
                            disabled={currentPage === totalPages || totalPages === 0}
                            className={`px-3 py-1 border text-sm rounded ${currentPage === totalPages || totalPages === 0 ? 'text-gray-400' : 'text-black'}`}
                        >
                            {totalPages || 1}
                        </button>
                        <button
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages || totalPages === 0}
                            className={`px-3 py-1 border rounded ${currentPage === totalPages || totalPages === 0 ? 'text-gray-400 bg-gray-200' : 'text-white bg-[#F3890A]'}`}
                        >
                            &gt;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BroilerSupply