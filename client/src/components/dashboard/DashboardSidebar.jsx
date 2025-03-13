
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";

export default function DashboardSidebar() {
  return (
    <div className="bg-red-600 ">

      <Sidebar aria-label="Default sidebar example" className="z-0 border-r-2 bg-[#eee] dark:border-gray-700 ">
        <Sidebar.Items className="z-0 bg-[#eee] ">
          <Sidebar.ItemGroup >
            <Sidebar.Item href="#" icon={HiChartPie}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiViewBoards} label="Pro" labelColor="dark">
              Kanban
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiInbox} label="3">
              Inbox
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiUser}>
              Users
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>

  );
}
