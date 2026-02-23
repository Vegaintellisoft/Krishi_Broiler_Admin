import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiArrowUpSFill, RiSearchLine } from "react-icons/ri";
import { LuImport } from "react-icons/lu";
import { FaSpinner } from "react-icons/fa";
import ExcelExport from "../../../utils/ExcelExport";
import axios from "axios";

const EarnedRcMaster2 = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 5;

    useEffect(() => {
        fetchMaster();
    }, []);

    const fetchMaster = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get("broiler/master/getAll/earned_rc_master2");
            setData(data.data || []);
        } catch (error) {
            console.error("Error fetching Earned RC Master-2:", error);
        } finally {
            setIsLoading(false);
        }
    };



    const handleExport = () => {
        ExcelExport(data, "earned_rc_master2.xlsx");
    };

    const filteredData = data.filter((item) => {
        const q = searchQuery.toLowerCase();
        return (
            (item.mandt || "").toString().toLowerCase().includes(q) ||
            (item.werks || "").toString().toLowerCase().includes(q) ||
            (item.zsel || "").toString().toLowerCase().includes(q) ||
            (item.zerc || "").toString().toLowerCase().includes(q) ||
            (item.znew_Gc || "").toString().toLowerCase().includes(q)
        );
    });

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    const goToFirstPage = () => setCurrentPage(1);
    const goToLastPage = () => setCurrentPage(totalPages);
    const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    return (
        <div className="rounded-lg shadow flex-1">
            <div className="bg-[#F9F9FC] h-screen relative">
                <div className="space-y-4 pt-3 px-6 font-poppins">
                    <h1 className="text-xl font-bold text-gray-900">Earned RC Master-2</h1>
                    <div className="flex items-center gap-x-2 text-sm text-gray-500">
                        <Link to="/" className="text-orange-500">
                            Masters
                        </Link>
                        <RiArrowUpSFill className="rotate-90" size={20} />
                        <span>Earned RC Master-2</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex space-x-4">
                            <div className="relative">
                                <RiSearchLine className="absolute left-2 top-2.5 text-gray-400" />
                                <input
                                    type="search"
                                    placeholder="Search Earned RC-2..."
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="py-2 px-8 border rounded-lg text-xs focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                        </div>

                        <div className="space-x-3 flex items-center">
                            {/* Export Button */}
                            <button onClick={handleExport} className="px-4 py-2 bg-[#EFE8E0] text-[#F3890A] border rounded-lg hover:bg-orange-500 hover:text-white">
                                <div className="flex gap-2 items-center text-xs">
                                    <LuImport size={16} className="opacity-50" />
                                    <span>Export</span>
                                </div>
                            </button>
                        </div>
                    </div>


                </div>

                {/* Table */}
                <div className="overflow-x-auto py-4 px-6 mx-4 mt-5 bg-white relative">
                    {isLoading && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-80">
                            <FaSpinner className="animate-spin text-orange-500 text-3xl" />
                            <span className="ml-3 text-lg text-gray-700">Loading data...</span>
                        </div>
                    )}

                    <table className="min-w-full">
                        <thead className="font-poppins font-semibold">
                            <tr className="border-b">
                                <th className="p-4 text-center text-sm text-black">S.No</th>
                                <th className="p-4 text-center text-sm text-black">Client</th>
                                <th className="p-4 text-center text-sm text-black">Plant</th>
                                <th className="p-4 text-center text-sm text-black">DB Field Name</th>
                                <th className="p-4 text-center text-sm text-black">Amount in document currency</th>
                                <th className="p-4 text-center text-sm text-black">Amount in document currency</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y font-poppins capitalize">
                            {paginatedData.length > 0 ? (
                                paginatedData.map((item, index) => (
                                    <tr key={item.id || index} className="hover:bg-gray-50 text-center">
                                        <td className="p-4 text-sm opacity-65">{index + startIndex + 1}</td>
                                        <td className="p-4 text-sm opacity-65">{item.mandt}</td>
                                        <td className="p-4 text-sm opacity-65">{item.werks}</td>
                                        <td className="p-4 text-sm opacity-65">{item.zsel}</td>
                                        <td className="p-4 text-sm opacity-65">{item.zerc}</td>
                                        <td className="p-4 text-sm opacity-65">{item.znew_Gc}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="py-10 text-center text-gray-500 text-sm"
                                    >
                                        No Data Available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="flex justify-end font-dm items-center gap-2 mt-4">
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
                            disabled={currentPage === totalPages}
                            className={`px-3 py-1 text-sm border rounded ${currentPage === totalPages ? 'text-gray-400' : 'text-black'}`}
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
    );
};

export default EarnedRcMaster2;