import { Routes, Route } from "react-router-dom"
import Header from "../components/Layouts/Header";
import BroilerSidebar from "../components/Layouts/BroilerSidebar";
import { useAuth } from "../auth/AuthContext";
import Moderator from "../pages/Admin/Moderators";
import Roles from "../pages/Admin/Roles";
import BroilerStockLocation from "../pages/Broiler/masters/BroilerStockLocation";
import HetcheryMachine from "../pages/Broiler/masters/HetcheryMachine";
import LineMaster from "../pages/Broiler/masters/LineMaster";
import RejectionReason from "../pages/Broiler/masters/RejectionReason";
import ShedCapacity from "../pages/Broiler/masters/ShedCapacity";
import MortalityReason from "../pages/Broiler/masters/MortalityReason";
import StandardBody from "../pages/Broiler/masters/StandardBody";
import MortalityIncentive from "../pages/Broiler/masters/MortalityIncentive";
import MortalityDeduction from "../pages/Broiler/masters/MortalityDeduction";
import MedicineMaintain from "../pages/Broiler/masters/MedicineMaintain";
import EarnedRcMaster from "../pages/Broiler/masters/EarnedRcMaster";
import EarnedRcMaster1 from "../pages/Broiler/masters/EarnedRcMaster1";
import EarnedRcMaster3 from "../pages/Broiler/masters/EarnedRcMaster3";
import EarnedRcMaster2 from "../pages/Broiler/masters/EarnedRcMaster2";
import VehicleTypeCost from "../pages/Broiler/masters/VehicleTypeCost";
import FcrGrade from "../pages/Broiler/masters/FcrGrade";
import MortalityDeducPlant from "../pages/Broiler/masters/MortalityDeducPlant";
import MortalityDeducMainPlant from "../pages/Broiler/masters/MortalityDeducMainPlant";
import MortalityDeducPlant1 from "../pages/Broiler/masters/MortalityDeducPlant1";
import MortalityIncenPlant from "../pages/Broiler/masters/MortalityIncenPlant";
import BroilerShedIncentive from "../pages/Broiler/masters/BroilerShedIncentive";
import FcrGradeMaster1 from "../pages/Broiler/masters/FcrGradeMaster1";
import EggCodeList from "../pages/Broiler/masters/EggCodeList";
import BroilerSalesRate from "../pages/Broiler/masters/BroilerSalesRate";
import BroilerSalesEmpDefault from "../pages/Broiler/masters/BroilerSalesEmpDefault";
import BroilerUsers from "../pages/Broiler/BroilerUsers";
import ActivityLog from "../pages/Broiler/ActivityLog";
import FarmActivities from "../pages/Broiler/DataEntry/FarmActivity/FarmActivities";
import ShedReady from "../pages/Broiler/DataEntry/ShedReady";
import IssuedMedicine from "../pages/Broiler/DataEntry/IssuedMedicine";
import FeedTransfer from "../pages/Broiler/Feeds/FeedTransfer";
import FeedReturn from "../pages/Broiler/Feeds/FeedReturn";
import FeedRequest from "../pages/Broiler/Feeds/FeedRequest";
import FeedApproval from "../pages/Broiler/Feeds/FeedApproval";
import BroilerSupply from "../pages/Broiler/Feeds/BroilerSupply/BroilerSupply";

const BroilerLayout = () => {
  const { user, getPermissions } = useAuth();
  const { adminPage, broilerUsers } = getPermissions();

  return (
    <div className='relative'>
      <Header />
      <div className="flex">
        <BroilerSidebar />
        <div className='h-[86vh] flex-1 overflow-y-scroll'>
          <Routes>

            <Route path='/' element={<div>Broiler Dashboard</div>} />
            <Route path='/StockLocation' element={<BroilerStockLocation />} />
            <Route path='/HetcheryMachine' element={<HetcheryMachine />} />
            <Route path='/LineMaster' element={<LineMaster />} />
            <Route path='/RejectionReason' element={<RejectionReason />} />
            <Route path='/ShedCapacity' element={<ShedCapacity />} />
            <Route path='/MortalityReason' element={<MortalityReason />} />
            <Route path='/MortalityIncentive' element={<MortalityIncentive />} />
            <Route path='/mortalityDeduction' element={<MortalityDeduction />} />
            <Route path='/medicineMaintain' element={<MedicineMaintain />} />
            <Route path='/StandardBody' element={<StandardBody />} />
            <Route path='/earnedRcMaster' element={<EarnedRcMaster />} />
            <Route path='/earnedRcMaster1' element={<EarnedRcMaster1 />} />
            <Route path='/vehicleTypeCost' element={<VehicleTypeCost />} />
            <Route path='/FcrGrade' element={<FcrGrade />} />
            <Route path='/broilerSalesEmpDefault' element={<BroilerSalesEmpDefault />} />
            <Route path='/broilerSalesRate' element={<BroilerSalesRate />} />
            <Route path='/eggCodeList' element={<EggCodeList />} />
            <Route path='/fcrGradeMaster1' element={<FcrGradeMaster1 />} />
            <Route path='/broilerShedIncentive' element={<BroilerShedIncentive />} />
            <Route path='/mortalityIncenPlant' element={<MortalityIncenPlant />} />
            <Route path='/mortalityDeducPlant' element={<MortalityDeducPlant />} />
            <Route path='/mortalityDeducPlant1' element={<MortalityDeducPlant1 />} />
            <Route path='/mortalityDeducMainPlant' element={<MortalityDeducMainPlant />} />
            <Route path='/earnedRcMaster2' element={<EarnedRcMaster2 />} />
            <Route path='/earnedRcMaster3' element={<EarnedRcMaster3 />} />


            <Route path='/broilerUser' element={<BroilerUsers />} />
            <Route path='/broilerActivity' element={<ActivityLog />} />
            {/* Data Entry */}
            <Route path='/FarmActivity' element={<FarmActivities />} />
            <Route path='/ShedReadiness' element={<ShedReady />} />
            <Route path='/IssueMedicine' element={<IssuedMedicine />} />

            {/* Feed */}
            <Route path='/FeedTransfer' element={<FeedTransfer />} />
            <Route path='/FeedReturn' element={<FeedReturn />} />
            <Route path='/FeedRequest' element={<FeedRequest />} />
            <Route path='/FeedApproval' element={<FeedApproval />} />
            <Route path='/BroilerSupply' element={<BroilerSupply />} />




            {(adminPage.show) && (
              <Route path='/admin'>
                {adminPage.showModerators && (
                  <Route path='moderators' element={<Moderator />} />
                )}
                {adminPage.showModerators && (
                  <Route path='roles' element={<Roles />} />
                )}
              </Route>
            )}

          </Routes>
        </div>
      </div>
    </div>
  );
};

export default BroilerLayout;