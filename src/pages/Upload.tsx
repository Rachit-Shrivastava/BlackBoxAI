import { useState } from "react";
import { Upload as UploadIcon, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const Upload = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);

  const handleUpload = () => {
    setUploading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setAnalyzing(true);
          toast.success("Upload complete! Starting analysis...");
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-orbitron font-bold mb-2">Firmware Upload & Analysis</h1>
        <p className="text-muted-foreground">Upload firmware binaries for cryptographic analysis</p>
      </div>

      {/* Upload Area */}
      <div className="cyber-card p-12 text-center border-dashed border-2">
        <div className="flex flex-col items-center gap-6">
          <div className="p-8 rounded-full bg-primary/10 border-2 border-primary/30">
            <UploadIcon className="h-16 w-16 text-primary" />
          </div>
          <div>
            <h3 className="text-2xl font-orbitron font-bold mb-2">Drop Firmware Here</h3>
            <p className="text-muted-foreground mb-6">
              or click to browse your files
            </p>
            <Button 
              onClick={handleUpload} 
              disabled={uploading || analyzing}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
            >
              {uploading ? "Uploading..." : "Select Firmware"}
            </Button>
          </div>
        </div>

        {uploading && (
          <div className="mt-8 space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground">Uploading: {progress}%</p>
          </div>
        )}
      </div>

      {/* Analysis Steps */}
      {analyzing && (
        <div className="space-y-4">
          <h3 className="text-xl font-orbitron font-bold">Analysis Pipeline</h3>
          
          {[
            { label: "Architecture Detection", status: "complete" },
            { label: "Binary Disassembly", status: "complete" },
            { label: "Control Flow Graph Extraction", status: "processing" },
            { label: "Feature Extraction", status: "pending" },
            { label: "AI Model Inference", status: "pending" },
            { label: "Cryptographic Classification", status: "pending" },
          ].map((step, i) => (
            <div key={i} className="cyber-card p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                {step.status === "complete" ? (
                  <CheckCircle className="h-6 w-6 text-success" />
                ) : step.status === "processing" ? (
                  <Loader2 className="h-6 w-6 text-primary animate-spin" />
                ) : (
                  <div className="h-6 w-6 rounded-full border-2 border-muted" />
                )}
                <span className="font-medium">{step.label}</span>
              </div>
              <span className={`text-sm font-bold ${
                step.status === "complete" ? "text-success" :
                step.status === "processing" ? "text-primary" :
                "text-muted-foreground"
              }`}>
                {step.status === "complete" ? "DONE" :
                 step.status === "processing" ? "PROCESSING" :
                 "QUEUED"}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Terminal Output */}
      {analyzing && (
        <div className="cyber-card p-6 bg-black/40">
          <div className="terminal-text font-mono text-sm space-y-1">
            <p>&gt; Loading binary: iot_device_v3.2.bin</p>
            <p>&gt; Detected architecture: ARM Cortex-M4</p>
            <p>&gt; Extracting opcodes...</p>
            <p>&gt; Building control flow graph...</p>
            <p className="animate-pulse">&gt; Running entropy analysis...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;
