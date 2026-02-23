import { Routes, Route } from "react-router-dom"
import Header from "../components/Layouts/Header";
import { useAuth } from "../auth/AuthContext";
import BreederSidebar from "../components/Layouts/BreederSidebar";
import UnitName from "../pages/Breeder/Masters/UnitName";
import Feed from "../pages/Breeder/Feeding/Feed";
import Medicine from "../pages/Breeder/Feeding/Medicine";
import EggCollection from "../pages/Breeder/EggCollection";

const BreederLayout = () => {
  const { user } = useAuth();

  return (
    <div className='relative'>
      <Header />
      <div className="flex">
        <BreederSidebar />
        <div className='h-[86vh] flex-1 overflow-y-scroll'>
          <Routes>

            <Route path='/' element={<div>Breeder Dashboard</div>} />
            <Route path='/unitname' element={<UnitName />} />

            {/* Feed */}
            <Route path='/feeding' element={<Feed />} />
            <Route path='/medicine' element={<Medicine />} />


            <Route path='/eggcollection' element={<EggCollection />} />



          </Routes>
        </div>
      </div>
    </div>
  );
};

export default BreederLayout;