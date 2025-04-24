// pages/AssignedComplaints.jsx
import React, { useEffect, useState } from "react";
import { getAssignedComplaints } from "../../api/complaint/complaintConfig";
import ComplaintCardGrid from "../../components/ComplaintCardGrid";
import { Button } from "@/components/ui/button";
import ChatDrawer from "../../components/ChatDrawer";
import { useUser } from "../../hooks/useUser";
const AssignedComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeComplaint, setActiveComplaint] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAssignedComplaints();
        setComplaints(data.data || []);
      } catch (err) {
        console.error("Error fetching assigned complaints:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  console.log("Assigned complaints:", complaints);
  if (loading) return <div className="p-6">Loading assigned complaints...</div>;

  return (
    <>
      <ComplaintCardGrid
        title="🛠 Assigned Complaints"
        complaints={complaints}
        showCount={true}
        actionComponent={(complaint) => (
          <Button
            onClick={() => {
              setActiveComplaint(complaint);
              setDrawerOpen(true);
            }}
          >
            Query
          </Button>
        )}
      />

      {user && activeComplaint && (
        <ChatDrawer
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          complaintId={activeComplaint._id}
          complaintUserId={activeComplaint.userId}
          complaintOfficerId={activeComplaint.officerId}
        />
      )}
    </>
  );
};

export default AssignedComplaints;
