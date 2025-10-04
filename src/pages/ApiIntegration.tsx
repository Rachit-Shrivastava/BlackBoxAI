import { useState } from "react";
import { 
  Key, 
  Copy, 
  Eye, 
  EyeOff, 
  Plus, 
  Trash2, 
  Download,
  Code,
  Terminal,
  ExternalLink,
  Clock,
  Shield,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Sample API keys data
const apiKeys = [
  {
    id: 1,
    name: "Production Key",
    key: "bb_live_sk_1234567890abcdef",
    scope: ["read_reports", "submit_jobs"],
    lastUsed: "2024-01-15 14:30:22",
    status: "active"
  },
  {
    id: 2,
    name: "Development Key",
    key: "bb_test_sk_abcdef1234567890",
    scope: ["read_reports"],
    lastUsed: "2024-01-14 09:15:33",
    status: "active"
  },
  {
    id: 3,
    name: "Legacy Key",
    key: "bb_legacy_sk_9876543210fedcba",
    scope: ["read_reports", "submit_jobs"],
    lastUsed: "2024-01-10 16:45:11",
    status: "revoked"
  }
];

const endpoints = {
  analyze: {
    method: "POST",
    path: "/analyze",
    description: "Submit firmware for cryptographic analysis",
    example: {
      curl: `curl -X POST https://api.blackbox.ai/analyze \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "file=@firmware.bin"`,
      python: `import requests

url = "https://api.blackbox.ai/analyze"
headers = {"Authorization": "Bearer YOUR_API_KEY"}
files = {"file": open("firmware.bin", "rb")}

response = requests.post(url, headers=headers, files=files)
print(response.json())`,
      node: `const FormData = require('form-data');
const fs = require('fs');

const form = new FormData();
form.append('file', fs.createReadStream('firmware.bin'));

fetch('https://api.blackbox.ai/analyze', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: form
})
.then(response => response.json())
.then(data => console.log(data));`
    }
  },
  results: {
    method: "GET",
    path: "/results",
    description: "Retrieve analysis results for a specific file",
    example: {
      curl: `curl -X GET "https://api.blackbox.ai/results?file=firmware.bin" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
      python: `import requests

url = "https://api.blackbox.ai/results"
params = {"file": "firmware.bin"}
headers = {"Authorization": "Bearer YOUR_API_KEY"}

response = requests.get(url, params=params, headers=headers)
print(response.json())`,
      node: `fetch('https://api.blackbox.ai/results?file=firmware.bin', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
})
.then(response => response.json())
.then(data => console.log(data));`
    }
  },
  protocol: {
    method: "GET",
    path: "/protocol",
    description: "Get protocol mapping for a specific file",
    example: {
      curl: `curl -X GET "https://api.blackbox.ai/protocol/firmware.bin" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
      python: `import requests

url = "https://api.blackbox.ai/protocol/firmware.bin"
headers = {"Authorization": "Bearer YOUR_API_KEY"}

response = requests.get(url, headers=headers)
print(response.json())`,
      node: `fetch('https://api.blackbox.ai/protocol/firmware.bin', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
})
.then(response => response.json())
.then(data => console.log(data));`
    }
  },
  compliance: {
    method: "GET",
    path: "/compliance",
    description: "Get compliance analysis for a specific file",
    example: {
      curl: `curl -X GET "https://api.blackbox.ai/compliance/firmware.bin" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
      python: `import requests

url = "https://api.blackbox.ai/compliance/firmware.bin"
headers = {"Authorization": "Bearer YOUR_API_KEY"}

response = requests.get(url, headers=headers)
print(response.json())`,
      node: `fetch('https://api.blackbox.ai/compliance/firmware.bin', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
})
.then(response => response.json())
.then(data => console.log(data));`
    }
  }
};

const sampleResponses = {
  analyze: {
    file: "firmware.bin",
    arch: "ARM",
    size: 1342177,
    summary: {
      aes: { present: true, confidence: 0.92 },
      rsa: { present: false, confidence: 0.34 },
      sha: { present: true, variant: "SHA-256", confidence: 0.88 },
      ecc: { present: true, curve: "P-256", confidence: 0.81 },
      prng: { present: true, type: "CSPRNG", confidence: 0.76 },
      proprietary: { present: true, notes: "non-standard S-Box pattern" }
    },
    risk_score: 72
  },
  protocol: {
    nodes: [
      { id: "keygen", label: "KeyGen", offsets: [".text+0x14A0"], confidence: 0.83 },
      { id: "kex", label: "Key Exchange", primitive: "ECDH P-256", confidence: 0.86 },
      { id: "enc", label: "Encrypt", primitive: "AES-256-GCM", confidence: 0.91 },
      { id: "mac", label: "Authenticate", primitive: "Poly1305", confidence: 0.88 },
      { id: "ver", label: "Verify", primitive: "ECDSA P-256", confidence: 0.84 }
    ],
    edges: [
      { from: "keygen", to: "kex" },
      { from: "kex", to: "enc" },
      { from: "enc", to: "mac" },
      { from: "mac", to: "ver" }
    ],
    anomaly_score: 0.14
  }
};

const ApiKeyCard = ({ keyData, onRevoke, onCopy }: { keyData: any; onRevoke: () => void; onCopy: () => void }) => {
  const [showKey, setShowKey] = useState(false);
  const maskedKey = keyData.key.replace(/(.{8}).*(.{8})/, "$1" + "•".repeat(16) + "$2");

  return (
    <Card className="enterprise-card">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-medium">{keyData.name}</h3>
            <p className="text-sm text-muted-foreground">Last used: {keyData.lastUsed}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={keyData.status === "active" ? "enterprise-badge-success" : "enterprise-badge-danger"}>
              {keyData.status}
            </Badge>
            <Button variant="ghost" size="sm" onClick={() => setShowKey(!showKey)}>
              {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        
        <div className="space-y-3">
          <div>
            <Label className="text-sm text-muted-foreground">API Key</Label>
            <div className="flex items-center gap-2 mt-1">
              <Input 
                value={showKey ? keyData.key : maskedKey} 
                readOnly 
                className="font-mono text-sm"
              />
              <Button variant="outline" size="sm" onClick={onCopy}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div>
            <Label className="text-sm text-muted-foreground">Scope</Label>
            <div className="flex gap-2 mt-1">
              {keyData.scope.map((scope: string) => (
                <Badge key={scope} variant="outline" className="text-xs">
                  {scope}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="flex gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={onRevoke}>
              <Trash2 className="h-4 w-4 mr-2" />
              Revoke
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ApiIntegration = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState("analyze");
  const [selectedLanguage, setSelectedLanguage] = useState("curl");

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    // You could add a toast notification here
  };

  const handleRevokeKey = (keyId: number) => {
    // Handle key revocation logic
    console.log(`Revoking key ${keyId}`);
  };

  const handleGenerateKey = () => {
    // Handle new key generation
    console.log("Generating new API key");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="enterprise-card p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-inter font-semibold">API Integration</h1>
          <Button onClick={handleGenerateKey}>
            <Plus className="h-4 w-4 mr-2" />
            Generate New Key
          </Button>
        </div>
      </div>

      {/* API Keys Management */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">API Keys Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apiKeys.map((keyData) => (
            <ApiKeyCard
              key={keyData.id}
              keyData={keyData}
              onCopy={() => handleCopyKey(keyData.key)}
              onRevoke={() => handleRevokeKey(keyData.id)}
            />
          ))}
        </div>
      </div>

      {/* Quickstart */}
      <Card className="enterprise-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Quickstart Guide
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="curl">cURL</TabsTrigger>
              <TabsTrigger value="python">Python</TabsTrigger>
              <TabsTrigger value="node">Node.js</TabsTrigger>
            </TabsList>
            
            <TabsContent value="curl" className="mt-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Installation</h3>
                  <div className="bg-muted/30 p-4 rounded-lg font-mono text-sm">
                    # No installation required - cURL is built into most systems
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Basic Usage</h3>
                  <div className="bg-muted/30 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    {endpoints.analyze.example.curl}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="python" className="mt-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Installation</h3>
                  <div className="bg-muted/30 p-4 rounded-lg font-mono text-sm">
                    pip install requests
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Basic Usage</h3>
                  <div className="bg-muted/30 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{endpoints.analyze.example.python}</pre>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="node" className="mt-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Installation</h3>
                  <div className="bg-muted/30 p-4 rounded-lg font-mono text-sm">
                    npm install form-data
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Basic Usage</h3>
                  <div className="bg-muted/30 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{endpoints.analyze.example.node}</pre>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* API Endpoints */}
      <Card className="enterprise-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Terminal className="h-5 w-5" />
            API Endpoints
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedEndpoint} onValueChange={setSelectedEndpoint}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="analyze">POST /analyze</TabsTrigger>
              <TabsTrigger value="results">GET /results</TabsTrigger>
              <TabsTrigger value="protocol">GET /protocol</TabsTrigger>
              <TabsTrigger value="compliance">GET /compliance</TabsTrigger>
            </TabsList>
            
            {Object.entries(endpoints).map(([key, endpoint]) => (
              <TabsContent key={key} value={key} className="mt-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">{endpoint.description}</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <Badge className="enterprise-badge-primary">{endpoint.method}</Badge>
                      <code className="text-sm bg-muted/30 px-2 py-1 rounded">{endpoint.path}</code>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Example Request</h4>
                    <div className="bg-muted/30 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{endpoint.example[selectedLanguage as keyof typeof endpoint.example]}</pre>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Example Response</h4>
                    <div className="bg-muted/30 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{JSON.stringify(sampleResponses[key as keyof typeof sampleResponses], null, 2)}</pre>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Webhooks */}
      <Card className="enterprise-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Webhook Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Slack Webhook URL</Label>
              <Input 
                placeholder="https://hooks.slack.com/services/..." 
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-sm font-medium">Teams Webhook URL</Label>
              <Input 
                placeholder="https://outlook.office.com/webhook/..." 
                className="mt-1"
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch id="risk-alerts" />
              <Label htmlFor="risk-alerts" className="text-sm">
                  Send alerts when risk_score &gt; 80
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="weak-crypto" />
              <Label htmlFor="weak-crypto" className="text-sm">
                Send alerts when weak crypto detected
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SDK Packages */}
      <Card className="enterprise-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            SDK Packages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Python SDK</h3>
              <div className="bg-muted/30 p-4 rounded-lg font-mono text-sm">
                pip install blackbox-ai
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2">Node.js SDK</h3>
              <div className="bg-muted/30 p-4 rounded-lg font-mono text-sm">
                npm install @blackbox-ai/sdk
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiIntegration;
