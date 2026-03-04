import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RiArrowUpSFill } from "react-icons/ri";
import Swal from "sweetalert2";
import { IoGrid, IoLogOut } from "react-icons/io5";
import { FaShoppingCart, FaEdit } from "react-icons/fa";
import { BiSolidUserPin } from "react-icons/bi";
import { useAuth } from '../../auth/AuthContext';
import { TbReportMoney } from 'react-icons/tb';
import { FaUsers } from "react-icons/fa";
import { PiFarmFill } from "react-icons/pi";

const BroilerSidebar = () => {
    const { getPermissions, logout } = useAuth();

    // Added farmActivity and shedReadiness to permissions
    const { adminPage, broilerUsers,
        StockLocation, HetcheryMachine, LineMaster, RejectionReason,
        ShedCapacity, MortalityReason, StandardBody, MortalityIncentive, MortalityDeduction,
        medicineMaintain, earnedRcMaster, earnedRcMaster1, vehicleTypeCost, fcrGrade,
        eggCodelist, fcrGradeMaster1, broilerSalesRate, broilerSalesEmpDefault, broilerShedIncentive,
        mortalityIncenPlant, mortalityDeducPlant, mortalityDeducPlant1, earnedRcMaster2, earnedRcMaster3, mortalityDeducMainPlant,
        farmActivity, shedReadiness, medicineIssued, feedTransfer, feedReturn, feedApproval, feedRequest, broilerSupply
    } = getPermissions();

    const location = useLocation();
    const [menuExpanded, setMenuExpanded] = useState(false);
    const [dataEntryExpanded, setDataEntryExpanded] = useState(false);
    const [feedExpanded, setFeedExpanded] = useState(false);
    const [adminExpanded, setAdminExpanded] = useState(false);
    const [usersExpanded, setUsersExpanded] = useState(false);
    const [onSelect, setOnSelect] = useState(location.pathname);

    // Masters Menu Items
    const mastersMenuItems = [
        { path: "/StockLocation", label: "Stock Location", show: StockLocation?.show },
        { path: "/HetcheryMachine", label: "Hetchery Machine", show: HetcheryMachine?.show },
        { path: "/LineMaster", label: "Line Master", show: LineMaster?.show },
        { path: "/RejectionReason", label: "Rejection Reason", show: RejectionReason?.show },
        { path: "/ShedCapacity", label: "Shed Capacity", show: ShedCapacity?.show },
        { path: "/MortalityReason", label: "Mortality Reason", show: MortalityReason?.show },
        { path: "/StandardBody", label: "Standard Body", show: StandardBody?.show },
        { path: "/MortalityIncentive", label: "Mortality Incentive", show: MortalityIncentive?.show },
        { path: "/MortalityDeduction", label: "Mortality Deduction", show: MortalityDeduction?.show },
        { path: "/medicineMaintain", label: "Medicine Deduction Maintain", show: medicineMaintain?.show },
        { path: "/earnedRcMaster", label: "Earned RC Master", show: earnedRcMaster?.show },
        { path: "/earnedRcMaster1", label: "Earned RC Master-1", show: earnedRcMaster1?.show },
        { path: "/vehicleTypeCost", label: "Vehicle Type Cost", show: vehicleTypeCost?.show },
        { path: "/fcrGrade", label: "FCR Grade Master", show: fcrGrade?.show },
        { path: "/broilerSalesEmpDefault", label: "Broiler Sales Emp Default", show: broilerSalesEmpDefault?.show },
        { path: "/broilerSalesRate", label: "Broiler Sales Rate", show: broilerSalesRate?.show },
        { path: "/eggCodelist", label: "Egg Code List", show: eggCodelist?.show },
        { path: "/fcrGradeMaster1", label: "FCR Grade Master-1", show: fcrGradeMaster1?.show },
        { path: "/broilerShedIncentive", label: "Broiler Shed Incentive Details", show: broilerShedIncentive?.show },
        { path: "/mortalityIncenPlant", label: "Mortality Incentive Plant", show: mortalityIncenPlant?.show },
        { path: "/mortalityDeducPlant", label: "Mortality Deduction Plant", show: mortalityDeducPlant?.show },
        //{ path: "/mortalityDeducPlant1", label: "Mortality Deduction Plant-1", show: mortalityDeducPlant1?.show },
        { path: "/mortalityDeducMainPlant", label: "Mortality Deduction Maintain Plant", show: mortalityDeducMainPlant?.show },
        { path: "/earnedRcMaster2", label: "Earned RC Master-2", show: earnedRcMaster2?.show },
        { path: "/earnedRcMaster3", label: "Earned RC Master-3", show: earnedRcMaster3?.show },
    ];

    // New Data Entry Menu Items
    const dataEntryMenuItems = [
        { path: "/FarmActivity", label: "Farm Activity", show: farmActivity?.show },
        { path: "/ShedReadiness", label: "Shed Readiness", show: shedReadiness?.show },
        { path: "/IssueMedicine", label: "Issue Medicine", show: medicineIssued?.show },
    ];

    const feedMenuItems = [
        { path: "/FeedTransfer", label: "Feed Transfer", show: feedTransfer?.show },
        { path: "/FeedReturn", label: "Feed Return", show: feedReturn?.show },
        { path: "/BroilerSupply", label: "Broiler Supply", show: broilerSupply?.show },
        { path: "/FeedRequest", label: "Feed Request", show: feedRequest?.show },
        { path: "/FeedApproval", label: "Feed Approval", show: feedApproval?.show },
    ];

    const BroilerUserItems = [
        { path: "/broilerUser", label: "User", show: broilerUsers?.show },
        { path: "/broilerActivity", label: "Activity Log", show: broilerUsers?.show }
    ];



    const mastersVisibleItems = mastersMenuItems.filter(item => item.show);
    const dataEntryVisibleItems = dataEntryMenuItems.filter(item => item.show);
    const feedVisibleItems = feedMenuItems.filter(item => item.show);
    const BroilerVisibleItems = BroilerUserItems.filter(item => item.show);

    useEffect(() => {
        setOnSelect(location.pathname);

        // Optional: Auto-expand menu if current path is inside it
        if (mastersMenuItems.some(item => item.path === location.pathname)) setMenuExpanded(true);
        if (dataEntryMenuItems.some(item => item.path === location.pathname)) setDataEntryExpanded(true);
        if (feedVisibleItems.some(item => item.path === location.pathname)) setFeedExpanded(true);
        if (BroilerVisibleItems.some(item => item.path === location.pathname)) setUsersExpanded(true);

    }, [location.pathname]);

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You will be logged out!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#f86624',
            cancelButtonColor: '#808080',
            confirmButtonText: 'Yes, logout!'
        }).then((result) => {
            if (result.isConfirmed) {
                logout();
            }
        });
    };

    return (
        <aside className="w-60 bg-white border-r font-poppins font-semibold">
            <nav className="space-y-2">

                {/* Dashboard */}
                <Link
                    to="/"
                    className={`flex items-center justify-start text-sm gap-2 px-5 py-3    
            ${onSelect === '/' ? 'text-[#F3890A] bg-[#F9E6D3] border-l-4 border-[#F3890A]' : 'text-[#4A4C56]'}`}
                >
                    <IoGrid size={18} />
                    <span className='text-sm'>Dashboard</span>
                </Link>

                {/* Masters Dropdown */}
                {mastersVisibleItems.length > 0 && (
                    <div className={`${mastersMenuItems.some(item => item.path === onSelect) ? 'text-[#F3890A] bg-[#F9E6D3] border-l-4 border-[#F3890A]' : 'text-[#4A4C56]'}`}>
                        <button
                            onClick={() => {
                                setMenuExpanded(!menuExpanded);
                                setDataEntryExpanded(false);
                                setFeedExpanded(false);
                                setAdminExpanded(false);
                            }}
                            className={`w-full flex items-center justify-between px-2 ${mastersMenuItems.some(item => item.path === onSelect) ? 'text-[#F3890A] bg-[#F9E6D3]' : 'text-[#4A4C56]'}`}
                        >
                            <span className="flex justify-between w-full h-10 items-center gap-2 px-3 py-3">
                                <div className='flex gap-2 items-center justify-start'>
                                    <FaShoppingCart size={18} />
                                    <span className='text-sm'>Masters</span>
                                </div>
                                <RiArrowUpSFill className={`${menuExpanded ? "" : "rotate-180"}`} size={20} />
                            </span>
                        </button>

                        {menuExpanded && (
                            <div className="ml-10 space-y-1 max-h-80 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-white">
                                {mastersVisibleItems.map(({ path, label }) => (
                                    <div key={path} className="flex items-center">
                                        <span className={`min-w-2.5 min-h-2.5 rounded-full ${onSelect === path ? 'bg-orange-500' : 'bg-white border border-slate-400'}`}></span>
                                        <Link to={path} className={`block p-2 rounded-lg text-sm ${onSelect === path ? 'text-[#F3890A] bg-[#F9E6D3]' : 'text-[#4A4C56]'}`}>
                                            {label}
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* --- NEW DATA ENTRY SECTION START --- */}
                {dataEntryVisibleItems.length > 0 && (
                    <div className={`${dataEntryMenuItems.some(item => item.path === onSelect) ? 'text-[#F3890A] bg-[#F9E6D3] border-l-4 border-[#F3890A]' : 'text-[#4A4C56]'}`}>
                        <button
                            onClick={() => {
                                setDataEntryExpanded(!dataEntryExpanded);
                                setMenuExpanded(false);
                                setFeedExpanded(false);
                                setAdminExpanded(false);
                            }}
                            className={`w-full flex items-center justify-between px-2 ${dataEntryMenuItems.some(item => item.path === onSelect) ? 'text-[#F3890A] bg-[#F9E6D3]' : 'text-[#4A4C56]'}`}
                        >
                            <span className="flex justify-between w-full h-10 items-center gap-2 px-3 py-3">
                                <div className='flex gap-2 items-center justify-start'>
                                    <FaEdit size={18} />
                                    <span className='text-sm'>Data Entry</span>
                                </div>
                                <RiArrowUpSFill className={`${dataEntryExpanded ? "" : "rotate-180"}`} size={20} />
                            </span>
                        </button>

                        {dataEntryExpanded && (
                            <div className="ml-10 space-y-1">
                                {dataEntryVisibleItems.map(({ path, label }) => (
                                    <div key={path} className="flex items-center">
                                        <span className={`min-w-2.5 min-h-2.5 rounded-full ${onSelect === path ? 'bg-orange-500' : 'bg-white border border-slate-400'}`}></span>
                                        <Link to={path} className={`block p-2 rounded-lg text-sm ${onSelect === path ? 'text-[#F3890A] bg-[#F9E6D3]' : 'text-[#4A4C56]'}`}>
                                            {label}
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
                {/* --- NEW DATA ENTRY SECTION END --- */}

                {feedVisibleItems.length > 0 && (
                    <div className={`${feedMenuItems.some(item => item.path === onSelect) ? 'text-[#F3890A] bg-[#F9E6D3] border-l-4 border-[#F3890A]' : 'text-[#4A4C56]'}`}>
                        <button
                            onClick={() => {
                                setFeedExpanded(!feedExpanded);
                                setMenuExpanded(false);
                                setDataEntryExpanded(false);
                                setAdminExpanded(false);
                            }}
                            className={`w-full flex items-center justify-between px-2 ${feedMenuItems.some(item => item.path === onSelect) ? 'text-[#F3890A] bg-[#F9E6D3]' : 'text-[#4A4C56]'}`}
                        >
                            <span className="flex justify-between w-full h-10 items-center gap-2 px-3 py-3">
                                <div className='flex gap-2 items-center justify-start'>
                                    <PiFarmFill size={18} />
                                    <span className='text-sm'>Feeds</span>
                                </div>
                                <RiArrowUpSFill className={`${feedExpanded ? "" : "rotate-180"}`} size={20} />
                            </span>
                        </button>

                        {feedExpanded && (
                            <div className="ml-10 space-y-1">
                                {feedVisibleItems.map(({ path, label }) => (
                                    <div key={path} className="flex items-center">
                                        <span className={`min-w-2.5 min-h-2.5 rounded-full ${onSelect === path ? 'bg-orange-500' : 'bg-white border border-slate-400'}`}></span>
                                        <Link to={path} className={`block p-2 rounded-lg text-sm ${onSelect === path ? 'text-[#F3890A] bg-[#F9E6D3]' : 'text-[#4A4C56]'}`}>
                                            {label}
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Broiler Dropdown */}
                {BroilerVisibleItems.length > 0 && (
                    <div className={`${BroilerUserItems.some(item => item.path === onSelect) ? 'text-[#F3890A] bg-[#F9E6D3] border-l-4 border-[#F3890A]' : 'text-[#4A4C56]'}`}>
                        <button
                            onClick={() => {
                                setUsersExpanded(!usersExpanded);
                                setMenuExpanded(false);
                                setDataEntryExpanded(false);
                                setFeedExpanded(false);
                                setAdminExpanded(false);
                            }}
                            className={`w-full flex items-center justify-between px-2 ${BroilerUserItems.some(item => item.path === onSelect) ? 'text-[#F3890A] bg-[#F9E6D3]' : 'text-[#4A4C56]'}`}
                        >
                            <span className="flex justify-between w-full h-10 items-center gap-2 px-3 py-3">
                                <div className='flex gap-2 items-center justify-start'>
                                    <FaUsers size={18} />
                                    <span className='text-sm'>Users</span>
                                </div>
                                <RiArrowUpSFill className={`${usersExpanded ? "" : "rotate-180"}`} size={20} />
                            </span>
                        </button>

                        {usersExpanded && (
                            <div className="ml-10 space-y-1">
                                {BroilerVisibleItems.map(({ path, label }) => (
                                    <div key={path} className="flex items-center">
                                        <span className={`min-w-2.5 min-h-2.5 rounded-full ${onSelect === path ? 'bg-orange-500' : 'bg-white border border-slate-400'}`}></span>
                                        <Link to={path} className={`block p-2 rounded-lg text-sm ${onSelect === path ? 'text-[#F3890A] bg-[#F9E6D3]' : 'text-[#4A4C56]'}`}>
                                            {label}
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Admin Dropdown */}
                {adminPage?.show && (adminPage.showModerators || adminPage.showRoles) && (
                    <div
                        className={`${['/admin/moderators', '/admin/roles'].includes(onSelect)
                            ? 'text-[#F3890A] bg-[#F9E6D3] border-l-4 border-[#F3890A]'
                            : 'text-[#4A4C56]'
                            }`}
                    >
                        <button
                            onClick={() => {
                                setAdminExpanded(!adminExpanded);
                                setMenuExpanded(false);
                                setDataEntryExpanded(false);
                                setFeedExpanded(false);
                            }}
                            className={`w-full flex items-center justify-between px-2 
                            ${['/admin/moderators', '/admin/roles'].includes(onSelect)
                                    ? 'text-[#F3890A] bg-[#F9E6D3]'
                                    : 'text-[#4A4C56]'
                                }`}
                        >
                            <span className="flex justify-between w-full h-10 items-center gap-2 px-3 py-3">
                                <div className='flex gap-2 items-center justify-start'>
                                    <BiSolidUserPin size={18} />
                                    <span className='text-sm'>Admin</span>
                                </div>
                                <RiArrowUpSFill
                                    className={`${adminExpanded ? "" : "rotate-180"}`}
                                    size={20}
                                />
                            </span>
                        </button>

                        {adminExpanded && (
                            <div className="ml-10 space-y-1">
                                {adminPage.showModerators && (
                                    <div className="flex items-center">
                                        <span className={`w-2.5 h-2.5 rounded-full ${onSelect === "/admin/moderators" ? 'bg-orange-500' : 'bg-white border border-slate-400'}`}></span>
                                        <Link to="/admin/moderators" className={`block p-2 rounded-lg text-sm ${onSelect === "/admin/moderators" ? 'text-[#F3890A] bg-[#F9E6D3]' : 'text-[#4A4C56]'}`}>
                                            Moderators
                                        </Link>
                                    </div>
                                )}
                                {adminPage.showRoles && (
                                    <div className="flex items-center">
                                        <span className={`w-2.5 h-2.5 rounded-full ${onSelect === "/admin/roles" ? 'bg-orange-500' : 'bg-white border border-slate-400'}`}></span>
                                        <Link to="/admin/roles" className={`block p-2 rounded-lg text-sm ${onSelect === "/admin/roles" ? 'text-[#F3890A] bg-[#F9E6D3]' : 'text-[#4A4C56]'}`}>
                                            Roles
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="flex px-5 py-3 gap-2 items-center justify-start text-sm text-[#4A4C56] hover:text-[#F3890A] hover:bg-[#F9E6D3] hover:border-l-4 w-full transition-all hover:border-[#F3890A]"
                >
                    <IoLogOut size={19} />
                    <span>Logout</span>
                </button>

            </nav>
        </aside>
    );
};

export default BroilerSidebar;