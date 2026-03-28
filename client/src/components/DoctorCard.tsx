import { Link } from "react-router-dom";
import { User, Shield, GraduationCap, Video, Eye } from "lucide-react";

interface DoctorCardProps {
  id: string;
  name: string;
  specialty: string;
  degrees: string;
  experience: number;
  fee: number;
  pmdc: string;
  online: boolean;
  image?: string;
}

const DoctorCard = ({ id, name, specialty, degrees, experience, fee, online }: DoctorCardProps) => {
  return (
    <div className="bg-card rounded-xl border border-border p-5 card-hover w-full">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Doctor Image */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-muted flex items-center justify-center shrink-0">
          <User className="w-10 h-10 text-muted-foreground" />
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-heading font-semibold text-lg text-foreground">{name}</h3>
              <div className="flex items-center gap-1.5 mt-1">
                <Shield className="w-3.5 h-3.5 text-success" />
                <span className="text-xs font-medium text-success">PMC Verified</span>
                {online && (
                  <span className="ml-2 inline-flex items-center gap-1 text-xs font-medium text-success">
                    <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                    Online
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 mt-2 text-sm text-muted-foreground">
            <GraduationCap className="w-3.5 h-3.5" />
            <span className="truncate">{degrees}</span>
          </div>
          <p className="text-sm font-medium text-primary mt-1">{specialty}</p>

          <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
            <span className="font-medium">{experience} Years Experience</span>
            <span>•</span>
            <span className="font-semibold text-foreground">Rs. {fee}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex sm:flex-col gap-2 shrink-0">
          <Link
            to={`/doctor/${id}/book-online`}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold hero-gradient text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <Video className="w-4 h-4" /> Video Call
          </Link>
          <Link
            to={`/doctor/${id}`}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <Eye className="w-4 h-4" /> View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
