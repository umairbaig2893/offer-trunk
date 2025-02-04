const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-start items-center gap-4 bg-gray-100 p-4 shadow-md mt-5">
      {" "}
      {[
        { key: "offers", label: "OFFERS" },
        { key: "networks", label: "AFFILIATE NETWORKS" },
        { key: "traffic", label: "TRAFFIC SOURCES" },
      ].map((tab) => (
        <button
          key={tab.key}
          className={`px-4 py-2 rounded-md text-sm font-semibold ${
            activeTab === tab.key
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
