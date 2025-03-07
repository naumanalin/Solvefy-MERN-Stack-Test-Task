import React from 'react'
import { CircleDollarSign, Share2, ThumbsUp, Star   } from 'lucide-react';
import Cart from '../components/Cart';
import BarChartComponent from "../components/BarChartComponent";
import LineChartComponent from "../components/LineChartComponent";
import PieChartComponent from "../components/PieChartComponent";
import CalendarComponent from '../components/CalendarComponent';

const Dashboard = () => {
  return (
    <main className="p-6 grid gap-6 grid-cols-1 lg:grid-cols-4">
    {/* Top Stats Cards */}
    <Cart text="Earning" icon={<CircleDollarSign size={34} strokeWidth={3} />} number="$628" style="bg-[#1C3D64] text-white" />
    <Cart text="Shares" icon={<Share2 color='yellow' size={34} strokeWidth={3} />} number="2434" style="bg-white" />
    <Cart text="Likes" icon={<ThumbsUp color='yellow' size={34} strokeWidth={3}  />} number="1259" style="bg-white" />
    <Cart text="Rating" icon={<Star color='yellow' size={34} strokeWidth={3} />} number="8.5" style="bg-white" />

    {/* Charts Section */}
    <div className="bg-white shadow-md rounded-lg p-4 sm:col-span-3">
      <h3 className="text-lg font-semibold">Results</h3>
      <div className="h-64 rounded-lg mt-4">
        <BarChartComponent/>
      </div>
    </div>
    
    <div className="bg-white shadow-md rounded-lg p-4 row-span-2  flex flex-col items-center">
      <h3 className="text-lg font-semibold">Progress</h3>
      <div className="pt-7 flex flex-col items-center">
      <PieChartComponent />
      <ul className="mt-4 space-y-2 text-gray-600 text-center">
        <li>Lorem ipsum</li>
        <li>Lorem ipsum</li>
        <li>Lorem ipsum</li>
        <li>Lorem ipsum</li>
      </ul>
      <button className="bg-orange-500 text-white font-semibold px-4 py-2 rounded-lg mt-4">
        Check Now
      </button>
    </div>
    </div>

    <div className="bg-white shadow-md rounded-lg p-4 sm:col-span-2">
      <h3 className="text-lg font-semibold">Activity</h3>
      <div className="h-64 rounded-lg mt-4">
        <LineChartComponent/>
      </div>
    </div>

    <div className="bg-white shadow-md rounded-lg p-4">
      <CalendarComponent/>
    </div>


  </main>
  )
}

export default Dashboard