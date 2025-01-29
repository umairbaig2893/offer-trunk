const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-center mt-4 space-x-2 shadow-lg p-5 bg-gradient-to-r from-[#295F98] to-[#E1D7C6]">
      {["offers", "networks", "traffic"].map((tab) => (
        <button
          key={tab}
          className={`px-4 py-2 mx-2 shadow-lg rounded ${
            activeTab === tab
              ? "bg-gradient-to-r from-[#295F98] to-[#E1D7C6] text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setActiveTab(tab)}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
