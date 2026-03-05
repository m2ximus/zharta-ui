"use client";

import * as React from "react";
import { AppNav } from "@/components/layout/app-nav";
import { PageTransition } from "@/components/shared/page-transition";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Key, Copy, Eye, EyeOff, RefreshCw, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed: string;
  permissions: string[];
}

const mockKeys: ApiKey[] = [
  {
    id: "1",
    name: "Production",
    key: "zh_live_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
    created: "2026-01-15",
    lastUsed: "2026-03-05",
    permissions: ["read", "write", "admin"],
  },
  {
    id: "2",
    name: "Staging",
    key: "zh_test_q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2",
    created: "2026-02-20",
    lastUsed: "2026-03-04",
    permissions: ["read", "write"],
  },
];

function ApiKeyRow({ apiKey }: { apiKey: ApiKey }) {
  const [visible, setVisible] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const maskedKey = apiKey.key.slice(0, 10) + "..." + apiKey.key.slice(-6);

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey.key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-between py-4 border-b border-[var(--border)] last:border-b-0">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-[var(--foreground)]">
            {apiKey.name}
          </span>
          <div className="flex gap-1">
            {apiKey.permissions.map((p) => (
              <span
                key={p}
                className="text-[10px] font-[family-name:var(--font-mono)] px-1.5 py-0.5 rounded bg-[var(--muted)] text-[var(--foreground-muted)]"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <code className="text-xs font-[family-name:var(--font-mono)] text-[var(--foreground-muted)]">
            {visible ? apiKey.key : maskedKey}
          </code>
          <button
            onClick={() => setVisible(!visible)}
            className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
          >
            {visible ? (
              <EyeOff className="w-3.5 h-3.5" />
            ) : (
              <Eye className="w-3.5 h-3.5" />
            )}
          </button>
          <button
            onClick={handleCopy}
            className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
          {copied && (
            <span className="text-[10px] text-[var(--color-primary)]">
              Copied!
            </span>
          )}
        </div>
        <div className="flex gap-4 mt-1.5">
          <span className="text-[11px] text-[var(--foreground-muted)]">
            Created {apiKey.created}
          </span>
          <span className="text-[11px] text-[var(--foreground-muted)]">
            Last used {apiKey.lastUsed}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 ml-4">
        <button className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors p-1.5">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default function ApiSettingsPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <AppNav />

      <main className="mx-auto max-w-[1440px] px-6 lg:px-8 py-6">
        <PageTransition>
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-[var(--foreground)]">
                  API Settings
                </h1>
                <p className="text-sm text-[var(--foreground-muted)] mt-2">
                  Manage API keys for programmatic access to Zharta&apos;s
                  lending infrastructure.
                </p>
              </div>
            </div>

            {/* API Keys */}
            <Card className="p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-[var(--foreground-muted)]" />
                  <h2 className="text-sm font-semibold text-[var(--foreground)]">
                    API Keys
                  </h2>
                </div>
                <Button size="sm" className="rounded-full gap-1.5 text-xs">
                  <Plus className="w-3.5 h-3.5" />
                  Generate Key
                </Button>
              </div>

              <div>
                {mockKeys.map((key) => (
                  <ApiKeyRow key={key.id} apiKey={key} />
                ))}
              </div>
            </Card>

            {/* Endpoints */}
            <Card className="p-6 mb-6">
              <h2 className="text-sm font-semibold text-[var(--foreground)] mb-4">
                Endpoints
              </h2>
              <div className="space-y-3">
                {[
                  {
                    method: "GET",
                    path: "/api/v1/markets",
                    desc: "List all markets",
                  },
                  {
                    method: "GET",
                    path: "/api/v1/loans",
                    desc: "List active loans",
                  },
                  {
                    method: "POST",
                    path: "/api/v1/offers",
                    desc: "Create lending offer",
                  },
                  {
                    method: "GET",
                    path: "/api/v1/portfolio",
                    desc: "Portfolio summary",
                  },
                  {
                    method: "POST",
                    path: "/api/v1/parameters",
                    desc: "Update deal parameters",
                  },
                ].map((endpoint) => (
                  <div
                    key={endpoint.path}
                    className="flex items-center gap-3 py-2"
                  >
                    <span
                      className={cn(
                        "text-[10px] font-[family-name:var(--font-mono)] font-bold px-2 py-0.5 rounded",
                        endpoint.method === "GET"
                          ? "text-emerald-400 bg-emerald-500/10"
                          : "text-amber-400 bg-amber-500/10"
                      )}
                    >
                      {endpoint.method}
                    </span>
                    <code className="text-xs font-[family-name:var(--font-mono)] text-[var(--foreground)]">
                      {endpoint.path}
                    </code>
                    <span className="text-xs text-[var(--foreground-muted)]">
                      {endpoint.desc}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Webhooks */}
            <Card className="p-6">
              <h2 className="text-sm font-semibold text-[var(--foreground)] mb-2">
                Webhooks
              </h2>
              <p className="text-xs text-[var(--foreground-muted)] mb-4">
                Receive real-time notifications when loan events occur.
              </p>
              <div className="flex items-center gap-3">
                <input
                  type="url"
                  placeholder="https://your-server.com/webhook"
                  className="flex-1 bg-[var(--background)] border border-[var(--border)] rounded-[var(--radius-card)] px-3 py-2 text-sm font-[family-name:var(--font-mono)] text-[var(--foreground)] placeholder:text-[var(--foreground-muted)]/40 outline-none focus:border-[var(--color-primary)] transition-colors"
                />
                <Button size="sm" variant="outline" className="rounded-full">
                  Save
                </Button>
              </div>
            </Card>
          </div>
        </PageTransition>
      </main>
    </div>
  );
}
