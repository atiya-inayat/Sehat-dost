import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { questions } from "@/data/mockData";
import { Search, MessageSquare, MapPin, Calendar, Filter } from "lucide-react";

const AllQuestionsPage = () => {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");

  const filtered = questions.filter((q) => {
    if (search && !q.question.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterType && q.problemType !== filterType) return false;
    return true;
  });

  const types = [...new Set(questions.map((q) => q.problemType))];

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

        <div className="flex flex-col gap-4">
          {filtered.map((q) => (
            <div key={q.id} className="bg-card rounded-xl border border-border p-5 card-hover">
              <p className="font-medium text-foreground mb-2">{q.question}</p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{q.problemType}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {q.location}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {q.date}</span>
                <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {q.answers} answers</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllQuestionsPage;
