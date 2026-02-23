import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { RiArrowUpSFill, RiSearchLine, RiDeleteBin6Line } from 'react-icons/ri'
import { LuImport, LuPlus } from 'react-icons/lu'
import { IoCloseSharp } from 'react-icons/io5'
import { FiEdit2 } from 'react-icons/fi'
import Swal from "sweetalert2";
import { useAuth } from '../../../auth/AuthContext'
import ExcelExport from '../../../utils/ExcelExport'

const FeedRequest = () => {
    // --- Permissions ---
    const { getPermissions } = useAuth();
    const { feedRequest } = getPermissions();

    // --- State Management ---
    const [data, setData] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editId, setEditId] = useState(null);

    // --- Form State ---
    const initialFormState = {
        plant: 'Chennai Unit 1',
        farmer: '',
        fg1: '',
        fg2: '',
        fg3: '',
    };

    const [formData, setFormData] = useState(initialFormState);

    // --- Mock Database for Farmers ---
    const farmerDB = {
        "FARM-001": { name: "FARM-001 | Krishnan" },
        "FARM-002": { name: "FARM-002 | Balaji" },
        "FARM-003": { name: "FARM-003 | Kumar" },
    };

    // --- Mock Options for FG ---
    const fgOptions = [
        "Broiler Starter",
        "Broiler Finisher",
        "Layer Mash",
        "Chick Crumble"
    ];

    // --- Fetch Data ---
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        // Simulate API Fetch
        setTimeout(() => {
            setData([
                { id: 1, plant: 'Chennai Unit 1', farmer: 'FARM-001 | Krishnan', fg1: 'Broiler Starter', fg2: '', fg3: '' },
                { id: 2, plant: 'Chennai Unit 1', farmer: 'FARM-002 | Balaji', fg1: 'Broiler Finisher', fg2: 'Chick Crumble', fg3: '' },
            ]);
            setIsLoading(false);
        }, 500);
    };

    // --- Handlers ---

    const openModal = (item = null) => {
        if (item) {
            setFormData(item);
            setEditId(item.id);
        } else {
            setFormData(initialFormState);
            setEditId(null);
        }
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setFormData(initialFormState);
        setEditId(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFarmerChange = (e) => {
        const selectedKey = e.target.value;
        if (farmerDB[selectedKey]) {
            setFormData(prev => ({
                ...prev,
                farmer: farmerDB[selectedKey].name
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                farmer: selectedKey
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API Call
        setTimeout(() => {
            if (editId) {
                setData(prev => prev.map(item => item.id === editId ? { ...formData, id: editId } : item));
                Swal.fire({ icon: "success", title: "Updated!", text: "Feed Request updated successfully.", timer: 1500, showConfirmButton: false });
            } else {
                setData(prev => [...prev, { ...formData, id: Date.now() }]);
                Swal.fire({ icon: "success", title: "Saved!", text: "Feed Request added successfully.", timer: 1500, showConfirmButton: false });
            }
            closeModal();
            setIsSubmitting(false);
        }, 1000);
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
        ExcelExport(data, "Feed_Request.xlsx");
    };

    // --- Filter & Pagination ---
    const filteredData = data.filter(item =>
        item.farmer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.fg1.toLowerCase().includes(searchQuery.toLowerCase())
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

            {/* --- PAGE CONTENT --- */}
            <div className="bg-[#F9F9FC] h-screen relative">

                {/* Header */}
                <div className="space-y-4 pt-3 px-6 font-poppins">
                    <h1 className="text-xl font-bold text-gray-900">Feed Request</h1>
                    <div className="flex items-center gap-x-2 text-sm text-gray-500">
                        <Link to="/" className='text-orange-500'>Feed</Link>
                        <span><RiArrowUpSFill className='rotate-90' size={20} /></span>
                        <span>Feed Request</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="relative">
                            <span className='absolute top-2.5 left-2 opacity-45'><RiSearchLine /></span>
                            <input
                                type="search"
                                placeholder="Search Farmer/Material..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="py-2 px-2 ps-8 border rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-orange-500 w-64"
                            />
                        </div>

                        <div className='space-x-4 flex'>
                            <button onClick={handleExport} className="px-4 py-2 bg-[#EFE8E0] text-[#F3890A] border rounded-lg hover:bg-orange-500 hover:text-white transition text-xs flex items-center gap-2">
                                <LuImport size={16} /> Export
                            </button>
                            {feedRequest?.add && (
                                <button onClick={() => openModal()} className="px-4 py-2 bg-orange-500 text-white border rounded-lg hover:bg-orange-600 transition text-xs flex items-center gap-2">
                                    <LuPlus size={16} /> Add Entry
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
                                <th className="p-4">Plant</th>
                                <th className="p-4">Farmer</th>
                                <th className="p-4">FG 1</th>
                                <th className="p-4">FG 2</th>
                                <th className="p-4">FG 3</th>
                                {(feedRequest?.edit || feedRequest?.delete) && <th className="p-4 text-center">Actions</th>}
                            </tr>
                        </thead>
                        <tbody className="divide-y font-poppins">
                            {paginatedData.length > 0 ? paginatedData.map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="p-4 text-center opacity-65">{startIndex + index + 1}</td>
                                    <td className="p-4 opacity-65">{item.plant}</td>
                                    <td className="p-4 opacity-65">{item.farmer}</td>
                                    <td className="p-4 opacity-65">{item.fg1 || '-'}</td>
                                    <td className="p-4 opacity-65">{item.fg2 || '-'}</td>
                                    <td className="p-4 opacity-65">{item.fg3 || '-'}</td>
                                    {(feedRequest?.edit || feedRequest?.delete) && (
                                        <td className="p-4 flex justify-center gap-4">
                                            {feedRequest?.edit && <button onClick={() => openModal(item)} className="hover:text-orange-500"><FiEdit2 size={18} /></button>}
                                            {feedRequest?.delete && <button onClick={() => handleDelete(item.id)} className="hover:text-red-500"><RiDeleteBin6Line size={18} /></button>}
                                        </td>
                                    )}
                                </tr>
                            )) : (
                                <tr><td colSpan="7" className="p-8 text-center text-gray-500">No Data Available</td></tr>
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

            {/* --- MODAL --- */}
            {modalIsOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl mx-4 overflow-hidden font-poppins animate-in fade-in zoom-in duration-200">

                        {/* Modal Header */}
                        <div className="flex justify-between items-center p-5 border-b bg-gray-50">
                            <h2 className="text-lg font-bold text-gray-800">{editId ? "Edit Feed Request" : "Add Feed Request"}</h2>
                            <button onClick={closeModal} className="text-gray-500 hover:text-red-500 transition">
                                <IoCloseSharp size={24} />
                            </button>
                        </div>

                        {/* Modal Form */}
                        <form onSubmit={handleSubmit} className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">

                                {/* Row 1: Plant, Farmer, FG1 */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">Plant <span className="text-red-500">*</span></label>
                                    <input type="text" name="plant" value={formData.plant} readOnly className="w-full p-2.5 bg-gray-100 border rounded-lg text-sm text-gray-600 focus:outline-none" />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">Farmer <span className="text-red-500">*</span></label>
                                    <select
                                        name="farmer"
                                        onChange={handleFarmerChange}
                                        value={Object.keys(farmerDB).find(key => farmerDB[key].name === formData.farmer) || formData.farmer}
                                        className="w-full p-2.5 bg-white border rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                                        required
                                    >
                                        <option value="">Select Farmer</option>
                                        {Object.keys(farmerDB).map(key => (
                                            <option key={key} value={key}>{farmerDB[key].name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">FG 1</label>
                                    <select name="fg1" value={formData.fg1} onChange={handleInputChange} className="w-full p-2.5 bg-white border rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none">
                                        <option value="">Select Quantity</option>
                                        {fgOptions.map(fg => <option key={fg} value={fg}>{fg}</option>)}
                                    </select>
                                </div>

                                {/* Row 2: FG2, FG3, Spacer */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">FG 2</label>
                                    <select name="fg2" value={formData.fg2} onChange={handleInputChange} className="w-full p-2.5 bg-white border rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none">
                                        <option value="">Select Quantity</option>
                                        {fgOptions.map(fg => <option key={fg} value={fg}>{fg}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">FG 3</label>
                                    <select name="fg3" value={formData.fg3} onChange={handleInputChange} className="w-full p-2.5 bg-white border rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none">
                                        <option value="">Select Quantity</option>
                                        {fgOptions.map(fg => <option key={fg} value={fg}>{fg}</option>)}
                                    </select>
                                </div>

                                {/* Empty Div for 3rd column space in row 2 */}
                                <div></div>

                            </div>

                            <div className="flex justify-end gap-4 mt-8 pt-4 border-t border-gray-100">
                                <button type="button" onClick={closeModal} className="px-6 py-2.5 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition">
                                    Cancel
                                </button>
                                <button type="submit" disabled={isSubmitting} className="px-8 py-2.5 bg-primary text-white rounded-lg font-medium  transition flex items-center gap-2 disabled:opacity-70">
                                    {isSubmitting ? 'Saving...' : 'Submit'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default FeedRequest