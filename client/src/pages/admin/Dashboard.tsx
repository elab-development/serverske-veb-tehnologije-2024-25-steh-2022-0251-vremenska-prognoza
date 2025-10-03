import React from "react";

const AdminDashboard: React.FC = () => {
  return (
    <div className="container mx-auto mb-20 mt-40 overflow-y-auto">
      <div className="flex w-full items-end justify-between border-b pb-4">
        <div className="flex flex-col gap-3">
          <h1 className="text-5xl font-semibold">Admin Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            Manage news efficiently with a streamlined dashboard.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
