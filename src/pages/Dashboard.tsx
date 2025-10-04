import { Activity, AlertTriangle, CheckCircle, FileSearch } from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { UploadCard } from "@/components/dashboard/UploadCard";
import { ActivityTable } from "@/components/dashboard/ActivityTable";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section with animated gradient */}
      <div className="gradient-card p-8 relative overflow-hidden animated-gradient">
        <div className="absolute inset-0 bg-gradient-hero opacity-60" />
        <div className="relative z-10">
          <h1 className="text-4xl font-inter font-bold mb-2 text-gradient-primary">
            Cryptographic Intelligence Engine
          </h1>
          <p className="text-lg text-text-secondary">
            Advanced firmware analysis and threat detection platform
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-primary opacity-10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-secondary opacity-10 blur-3xl rounded-full" />
      </div>

      {/* Upload Section */}
      <UploadCard />

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Firmware Analyzed"
          value="1,247"
          icon={FileSearch}
          trend="+12% this month"
          trendUp={true}
        />
        <MetricCard
          title="Detection Accuracy"
          value="98.7%"
          icon={CheckCircle}
          trend="+2.3% improvement"
          trendUp={true}
        />
        <MetricCard
          title="Weak Crypto Detected"
          value="34"
          icon={AlertTriangle}
          trend="↑ 8 this week"
          trendUp={false}
        />
        <MetricCard
          title="Active Scans"
          value="12"
          icon={Activity}
          trend="Live monitoring"
        />
      </div>

      {/* Crypto Heatmap with gradient fills */}
      <div className="gradient-card p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="h-8 w-1 bg-gradient-primary rounded-full" />
          <h3 className="text-xl font-inter font-semibold">
            Cryptographic Primitives Detection
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {[
            { name: "AES", count: 423, gradient: "bg-gradient-primary" },
            { name: "RSA", count: 187, gradient: "bg-gradient-secondary" },
            { name: "ECC", count: 156, gradient: "bg-gradient-success" },
            { name: "SHA-256", count: 312, gradient: "bg-gradient-success" },
            { name: "SHA-1", count: 89, gradient: "from-warning to-destructive bg-gradient-to-br" },
            { name: "MD5", count: 45, gradient: "from-destructive to-warning bg-gradient-to-br" },
            { name: "PRNG", count: 234, gradient: "bg-gradient-secondary" },
            { name: "XOR", count: 67, gradient: "from-chart-5 to-chart-1 bg-gradient-to-br" },
          ].map((crypto) => (
            <div
              key={crypto.name}
              className="gradient-card p-4 text-center hover-gradient-glow cursor-pointer group"
            >
              <div className={`w-12 h-12 rounded-xl ${crypto.gradient} mx-auto mb-2 flex items-center justify-center text-lg font-bold text-white shadow-lg group-hover:scale-110 transition-transform`}>
                {crypto.count}
              </div>
              <p className="text-sm font-medium">{crypto.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Table */}
      <ActivityTable />
    </div>
  );
};

export default Dashboard;
