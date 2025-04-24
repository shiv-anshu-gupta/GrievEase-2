// pages/MyComplaints.jsx
import React, { useEffect, useState } from "react";
import { getMyComplaints } from "../../api/complaint/complaintConfig";
import ComplaintCardGrid from "../../components/ComplaintCardGrid";
import { Button } from "@/components/ui/button";
import ChatDrawer from "../../components/ChatDrawer";
import { useUser } from "../../hooks/useUser";
const MyComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeComplaint, setActiveComplaint] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMyComplaints();
        setComplaints(data || []);
      } catch (err) {
        console.error("Error fetching complaints:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  console.log("My complaints:", complaints);
  if (loading) return <div className="p-6">Loading your complaints...</div>;

  return (
    <>
      <ComplaintCardGrid
        title="📋 My Complaints"
        complaints={complaints}
        showCount={true}
        actionComponent={(complaint) =>
          complaint.officerId ? (
            <Button
              onClick={() => {
                setActiveComplaint(complaint);
                setDrawerOpen(true);
              }}
            >
              Chat
            </Button>
          ) : (
            <span className="text-sm text-gray-500 italic">Not Assigned</span>
          )
        }
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

export default MyComplaints;
