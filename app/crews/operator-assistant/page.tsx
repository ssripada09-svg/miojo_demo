"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Send, User, Bot, History, Bookmark, Shield } from "lucide-react"

const suggestedCommands = [
  "Show me all AI tools we're paying for",
  "Who has access to OpenAI Enterprise?",
  "List tools missing FedRAMP authorization",
  "Generate compliance report for Q1",
  "Show unused licenses over $10K/month",
]

const commandCategories = [
  { name: "Inventory", count: 12 },
  { name: "Cost Analysis", count: 8 },
  { name: "User Management", count: 10 },
  { name: "Compliance", count: 15 },
  { name: "Integrations", count: 5 },
]

const sampleConversation = [
  {
    role: "user",
    content: "Show me all AI tools we're paying for",
  },
  {
    role: "assistant",
    content: `You have **12 AI/ML tools** totaling **$480K/year**:

| Tool | Monthly Cost | Users | Utilization |
|------|-------------|-------|-------------|
| OpenAI Enterprise | $30,000 | 487 | 93% |
| Claude Team | $7,500 | 250 | 78% |
| AWS Bedrock | $12,000 | 45 | 67% |
| Azure AI Services | $8,500 | 120 | 54% |

*4 of 8 more tools not shown. Would you like the full list?*`,
  },
  {
    role: "user", 
    content: "Which AI tools aren't FedRAMP authorized?",
  },
  {
    role: "assistant",
    content: `**3 AI tools** lack FedRAMP authorization:

⚠️ **OpenAI Enterprise** - FedRAMP In Process (expected Q2 2026)
⚠️ **Hugging Face Hub** - Not Authorized
⚠️ **Replicate** - Not Authorized

These tools are handling **non-CUI workloads only** per current policy.

*Recommend: Review data classification for these tools. See [Aegis Policy #AI-003]*`,
  },
]

export default function OperatorAssistantPage() {
  const [inputValue, setInputValue] = useState("")

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="p-2 rounded-lg bg-pharos-purple/10">
              <MessageSquare className="h-6 w-6 text-pharos-purple" />
            </div>
            Operator Assistant
          </h1>
          <p className="text-muted-foreground mt-1">
            Natural language interface for tool management operations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-pass/10 text-pass border-pass/20">
            <Shield className="w-3 h-3 mr-1" />
            Aegis Audit Enabled
          </Badge>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Area */}
        <Card className="lg:col-span-3 bg-pharos-card border-pharos-border flex flex-col h-[600px]">
          <CardHeader className="border-b border-pharos-border">
            <CardTitle className="text-white text-sm">Conversation</CardTitle>
          </CardHeader>
          
          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {sampleConversation.map((msg, i) => (
              <div 
                key={i} 
                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === "user" 
                    ? "bg-pharos-purple" 
                    : "bg-pharos-teal"
                }`}>
                  {msg.role === "user" ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  msg.role === "user"
                    ? "bg-pharos-purple/20 text-white"
                    : "bg-pharos-bg border border-pharos-border text-white"
                }`}>
                  <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
                </div>
              </div>
            ))}
            
            {/* Typing indicator placeholder */}
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-pharos-teal flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-pharos-bg border border-pharos-border p-3 rounded-lg">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" />
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-100" />
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-200" />
                </div>
              </div>
            </div>
          </CardContent>

          {/* Input Area */}
          <div className="p-4 border-t border-pharos-border">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about tools, costs, users, or compliance..."
                className="flex-1 px-4 py-2 bg-pharos-bg border border-pharos-border rounded-lg text-white placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-pharos-purple"
              />
              <button className="px-4 py-2 bg-pharos-purple text-white rounded-lg hover:bg-pharos-purple/80 transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              All queries are logged to Aegis audit trail • Actions require confirmation
            </p>
          </div>
        </Card>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Suggested Commands */}
          <Card className="bg-pharos-card border-pharos-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-sm flex items-center gap-2">
                <Bookmark className="w-4 h-4" />
                Quick Commands
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {suggestedCommands.map((cmd, i) => (
                <button
                  key={i}
                  onClick={() => setInputValue(cmd)}
                  className="w-full text-left p-2 text-xs text-muted-foreground hover:text-white hover:bg-pharos-bg rounded transition-colors"
                >
                  {cmd}
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Command Categories */}
          <Card className="bg-pharos-card border-pharos-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-sm flex items-center gap-2">
                <History className="w-4 h-4" />
                Command Library
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {commandCategories.map((cat) => (
                <div 
                  key={cat.name}
                  className="flex items-center justify-between p-2 hover:bg-pharos-bg rounded cursor-pointer transition-colors"
                >
                  <span className="text-sm text-muted-foreground">{cat.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {cat.count}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Audit Status */}
          <Card className="bg-pharos-card border-pharos-border">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 rounded-full bg-pass animate-pulse" />
                <span className="text-muted-foreground">
                  Session audit active • 
                  <span className="text-white ml-1">3 queries logged</span>
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
