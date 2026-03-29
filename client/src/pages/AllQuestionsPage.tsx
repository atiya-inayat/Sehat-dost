import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, MessageSquare, MapPin, Calendar, Filter, Loader2, RefreshCw } from "lucide-react";
import { questionsAPI } from "@/lib/api";
import { mockQuestions } from "@/data/mockFallback";

interface Question {
  _id: string;
  question: string;
  problemType: string;
  location: { city?: string };
  createdAt: string;
  answerCount: number;
  isAnonymous: boolean;
}

const defaultTypes = [
  "Cardiology", "Dermatology", "Neurology", "Orthopedics",
  "Gynecology", "Pediatrics", "ENT", "General Physician"
];

const AllQuestionsPage = () => {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [types] = useState<string[]>(defaultTypes);

  useEffect(() => {
    fetchQuestions();
  }, [filterType]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      setError(null);
      const params: Record<string, string> = { limit: "50" };
      if (filterType) params.problemType = filterType;
      
      const response = await questionsAPI.getAll(params);
      
      if (response.data.success) {
        if (response.data.data && response.data.data.length > 0) {
          setQuestions(response.data.data);
        } else {
          setQuestions(mockQuestions);
        }
      }
    } catch {
      // Fallback to mock data
      setQuestions(mockQuestions);
    } finally {
      setLoading(false);
    }
  };

  const filtered = questions.filter((q) => {
    if (search && !q.question.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterType && q.problemType !== filterType) return false;
    return true;
  });

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-PK", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">All Questions</h1>
        <p className="text-muted-foreground mb-6">Browse questions asked by users</p>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-3 rounded-xl border border-border bg-card text-foreground text-sm"
          >
            <option value="">All Categories</option>
            {types.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading questions...</span>
          </div>
        )}

        {error && (
          <div className="text-center py-16">
            <p className="text-destructive text-lg font-medium">Error</p>
            <p className="text-muted-foreground">{error}</p>
            <button
              onClick={fetchQuestions}
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="flex flex-col gap-4">
            {filtered.length > 0 ? (
              filtered.map((q) => (
                <div key={q._id} className="bg-card rounded-xl border border-border p-5 card-hover">
                  <p className="font-medium text-foreground mb-2">{q.question}</p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{q.problemType}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {q.isAnonymous ? "Anonymous" : q.location?.city || "Not specified"}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {formatDate(q.createdAt)}</span>
                    <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {q.answerCount} answers</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 text-muted-foreground">
                <Filter className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="text-lg font-medium">No questions found</p>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AllQuestionsPage;
