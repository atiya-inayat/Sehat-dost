import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { 
  Users, UserCog, Calendar, Shield, ShieldX, 
  Droplets, Activity, TrendingUp, Clock, CheckCircle, 
  XCircle, AlertCircle, FileText, Settings
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { doctorsAPI, appointmentsAPI, bloodAPI } from "@/lib/api";
import { toast } from "sonner";

interface DashboardStats {
  totalDoctors: number;
  totalAppointments: number;
  pendingAppointments: number;
  bloodRequests: number;
}

const DashboardPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    totalDoctors: 0,
    totalAppointments: 0,
    pendingAppointments: 0,
    bloodRequests: 0
  });
  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    fetchDashboardData();
  }, [isAuthenticated]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      const [doctorsRes, appointmentsRes, bloodRes] = await Promise.all([
        doctorsAPI.getAll({ limit: 100 }),
        appointmentsAPI.getAll({ limit: 20 }),
        bloodAPI.getRequests({ limit: 50, status: "Pending" })
      ]);

      if (doctorsRes.data.success) {
        setDoctors(doctorsRes.data.data);
        setStats(prev => ({ ...prev, totalDoctors: doctorsRes.data.total || 0 }));
      }

      if (appointmentsRes.data.success) {
        setAppointments(appointmentsRes.data.data);
        setStats(prev => ({ 
          ...prev, 
          totalAppointments: appointmentsRes.data.total || 0,
          pendingAppointments: appointmentsRes.data.data.filter((a: any) => a.status === "Pending").length
        }));
      }

      if (bloodRes.data.success) {
        setStats(prev => ({ ...prev, bloodRequests: bloodRes.data.total || 0 }));
      }
    } catch (err) {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyDoctor = async (doctorId: string, verify: boolean) => {
    try {
      await doctorsAPI.update(doctorId, { isVerified: verify });
      toast.success(verify ? "Doctor verified successfully" : "Doctor verification revoked");
      fetchDashboardData();
    } catch {
      toast.error("Failed to update doctor status");
    }
  };

  const handleCancelAppointment = async (appointmentId: string) => {
    try {
      await appointmentsAPI.cancel(appointmentId, "Cancelled by admin");
      toast.success("Appointment cancelled");
      fetchDashboardData();
    } catch {
      toast.error("Failed to cancel appointment");
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      Pending: "badge-pending",
      Confirmed: "badge-confirmed",
      Cancelled: "badge-cancelled",
      Completed: "badge-completed"
    };
    return styles[status] || "bg-muted text-muted-foreground";
  };

  const renderPatientDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-xl p-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.totalAppointments}</p>
              <p className="text-sm text-muted-foreground">Total Appointments</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-xl p-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.pendingAppointments}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-xl p-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {appointments.filter(a => a.status === "Completed").length}
              </p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="glass-card rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">My Appointments</h3>
        {appointments.length > 0 ? (
          <div className="space-y-3">
            {appointments.slice(0, 5).map((apt) => (
              <div key={apt._id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium">{apt.doctor?.specialty || "Doctor"}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(apt.scheduledDate).toLocaleDateString()} at {apt.scheduledTime}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(apt.status)}`}>
                  {apt.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">No appointments yet</p>
        )}
      </div>
    </div>
  );

  const renderDoctorDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-xl p-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.totalAppointments}</p>
              <p className="text-sm text-muted-foreground">Total Appointments</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-xl p-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.pendingAppointments}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-xl p-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {appointments.filter(a => a.status === "Completed").length}
              </p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="glass-card rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Appointment Requests</h3>
        {appointments.filter(a => a.status === "Pending").length > 0 ? (
          <div className="space-y-3">
            {appointments.filter(a => a.status === "Pending").map((apt) => (
              <div key={apt._id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium">{apt.patient?.name || "Patient"}</p>
                  <p className="text-sm text-muted-foreground">{apt.reason}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(apt.scheduledDate).toLocaleDateString()} at {apt.scheduledTime}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleCancelAppointment(apt._id)}
                    className="px-3 py-1 text-sm bg-red-500/20 text-red-600 rounded-lg hover:bg-red-500/30"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">No pending appointments</p>
        )}
      </div>
    </div>
  );

  const renderAdminDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-xl p-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.totalDoctors}</p>
              <p className="text-sm text-muted-foreground">Total Doctors</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-xl p-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.pendingAppointments}</p>
              <p className="text-sm text-muted-foreground">Pending Appointments</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-xl p-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
              <Droplets className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.bloodRequests}</p>
              <p className="text-sm text-muted-foreground">Blood Requests</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-xl p-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.totalAppointments}</p>
              <p className="text-sm text-muted-foreground">Total Bookings</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="glass-card rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Doctor Verification</h3>
        {doctors.length > 0 ? (
          <div className="space-y-3">
            {doctors.slice(0, 5).map((doctor) => (
              <div key={doctor._id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium">{doctor.user?.name || "Doctor"}</p>
                  <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                  <p className="text-xs text-muted-foreground">PMC: {doctor.pmcId}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    doctor.isVerified ? "bg-green-500/20 text-green-600" : "bg-yellow-500/20 text-yellow-600"
                  }`}>
                    {doctor.isVerified ? "Verified" : "Pending"}
                  </span>
                  {doctor.isVerified ? (
                    <button 
                      onClick={() => handleVerifyDoctor(doctor._id, false)}
                      className="p-2 text-red-500 hover:bg-red-500/20 rounded-lg"
                    >
                      <ShieldX className="w-4 h-4" />
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleVerifyDoctor(doctor._id, true)}
                      className="p-2 text-green-500 hover:bg-green-500/20 rounded-lg"
                    >
                      <Shield className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">No doctors to verify</p>
        )}
      </div>
    </div>
  );

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-foreground">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-muted-foreground mt-1">
            {user?.role === "admin" && "Admin Dashboard - Manage doctors and platform"}
            {user?.role === "doctor" && "Doctor Dashboard - Manage appointments and patients"}
            {user?.role === "patient" && "Patient Dashboard - View your health journey"}
            {(!user?.role || user?.role === "patient") && "Patient Dashboard - View your health journey"}
          </p>
        </div>

        {user?.role === "admin" && renderAdminDashboard()}
        {user?.role === "doctor" && renderDoctorDashboard()}
        {(user?.role === "patient" || !user?.role || user?.role === "patient") && renderPatientDashboard()}
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;
