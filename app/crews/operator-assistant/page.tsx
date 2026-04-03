"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  MessageSquare, 
  Send, 
  User, 
  Bot, 
  Bookmark, 
  Shield,
  ChevronRight,
  ChevronDown,
  X,
  AlertTriangle,
  CheckCircle,
  Package,
  DollarSign,
  Users,
  ShieldCheck,
  Plug,
  Zap
} from "lucide-react"
import commandsData from "@/data/commands.json"

// Types
interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface Command {
  id: string
  category: string
  naturalLanguage: string
  intent: string
  expectedResponse: string
  permissions: string[]
}

interface ConfirmationModal {
  isOpen: boolean
  action: string
  impact: string
  onConfirm: () => void
}

// Quick action buttons
const quickActions = [
  { label: "Show AI tools", command: "What's our total spend on AI tools per month?" },
  { label: "Find unused licenses", command: "How many unused OpenAI licenses do we have?" },
  { label: "Compliance status", command: "Show me our overall compliance posture" },
  { label: "Recent activity", command: "Show me tool adoption trends over the past year" },
]

// Command library categories with their commands
const commandLibrary = [
  {
    name: "Inventory",
    icon: Package,
    commands: [
      "List all tools owned by the Engineering department",
      "Who is the business owner for Tableau?",
      "Show me all licenses expiring in the next 90 days",
    ]
  },
  {
    name: "Cost Analysis",
    icon: DollarSign,
    commands: [
      "What's our total spend on AI tools per month?",
      "Which tools have the highest cost per user?",
      "Find opportunities to reduce software spending by 10%",
    ]
  },
  {
    name: "User Management",
    icon: Users,
    commands: [
      "How many unused OpenAI licenses do we have?",
      "Provision 5 new Jira licenses for the Security team",
      "Onboard a new contractor with standard developer tools",
    ]
  },
  {
    name: "Compliance",
    icon: ShieldCheck,
    commands: [
      "Which tools are not FedRAMP authorized?",
      "Show me our overall compliance posture",
      "Check if we're ready for CMMC Level 2 certification",
    ]
  },
  {
    name: "Integrations",
    icon: Plug,
    commands: [
      "Are all our integrations healthy?",
      "What data flows between Splunk and CrowdStrike?",
      "Which tools integrate with our identity provider?",
    ]
  },
]

// Destructive action patterns
const destructivePatterns = [
  /revoke\s+access/i,
  /delete\s+/i,
  /remove\s+/i,
  /deprovision/i,
  /terminate/i,
  /disable\s+/i,
]

// Pattern matching function
function findMatchingCommand(input: string): Command | null {
  const normalizedInput = input.toLowerCase().trim()
  
  // Try to find exact or close match
  let bestMatch: Command | null = null
  let bestScore = 0
  
  for (const cmd of commandsData as Command[]) {
    const cmdText = cmd.naturalLanguage.toLowerCase()
    
    // Exact match
    if (normalizedInput === cmdText) {
      return cmd
    }
    
    // Check for keyword overlap
    const inputWords = normalizedInput.split(/\s+/)
    const cmdWords = cmdText.split(/\s+/)
    
    let matchCount = 0
    for (const word of inputWords) {
      if (word.length > 3 && cmdWords.some(w => w.includes(word) || word.includes(w))) {
        matchCount++
      }
    }
    
    // Check for key phrases
    const keyPhrases = [
      { phrase: "ai tool", score: 5 },
      { phrase: "openai", score: 5 },
      { phrase: "spend", score: 4 },
      { phrase: "cost", score: 4 },
      { phrase: "license", score: 4 },
      { phrase: "unused", score: 4 },
      { phrase: "fedramp", score: 5 },
      { phrase: "compliance", score: 4 },
      { phrase: "integration", score: 4 },
      { phrase: "adoption", score: 3 },
      { phrase: "trend", score: 3 },
      { phrase: "health", score: 3 },
      { phrase: "owner", score: 3 },
      { phrase: "provision", score: 4 },
      { phrase: "onboard", score: 4 },
      { phrase: "cmmc", score: 5 },
      { phrase: "sso", score: 4 },
      { phrase: "identity", score: 3 },
    ]
    
    for (const { phrase, score } of keyPhrases) {
      if (normalizedInput.includes(phrase) && cmdText.includes(phrase)) {
        matchCount += score
      }
    }
    
    if (matchCount > bestScore) {
      bestScore = matchCount
      bestMatch = cmd
    }
  }
  
  // Return match if score is good enough
  if (bestScore >= 3) {
    return bestMatch
  }
  
  return null
}

// Check if action is destructive
function isDestructiveAction(input: string): boolean {
  return destructivePatterns.some(pattern => pattern.test(input))
}

// Generate destructive action response
function generateDestructiveResponse(input: string): { action: string; impact: string; response: string } {
  const emailMatch = input.match(/[\w.-]+@[\w.-]+\.\w+/)
  const email = emailMatch ? emailMatch[0] : "specified user"
  
  if (/revoke.*access/i.test(input)) {
    return {
      action: `Revoke access for ${email}`,
      impact: `This will immediately remove all tool access for ${email}. The user will lose access to: GitHub Enterprise, Slack Business+, Jira Premium, and 4 other tools.`,
      response: `✅ Access revoked for **${email}**\n\n**Actions taken:**\n- Deactivated 7 tool licenses\n- Removed from 12 Slack channels\n- Revoked GitHub repository access\n- Added to offboarding audit log\n\n*Recovery possible within 30 days via admin restore.*`
    }
  }
  
  if (/delete/i.test(input)) {
    return {
      action: "Delete resource",
      impact: "This action cannot be undone. All associated data will be permanently removed.",
      response: "✅ Resource deleted successfully.\n\n*Action logged to Aegis audit trail.*"
    }
  }
  
  return {
    action: "Destructive action",
    impact: "This action may have significant consequences.",
    response: "✅ Action completed successfully.\n\n*Action logged to Aegis audit trail.*"
  }
}

// Generate fallback response
function generateFallbackResponse(input: string): string {
  return `I couldn't find a specific command matching your query: "${input}"

**Try one of these related commands:**
• "What's our total spend on AI tools per month?"
• "Show me our overall compliance posture"
• "How many unused OpenAI licenses do we have?"

Or browse the **Command Library** on the right for more options.`
}

export default function OperatorAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["Inventory"])
  const [confirmModal, setConfirmModal] = useState<ConfirmationModal>({
    isOpen: false,
    action: "",
    impact: "",
    onConfirm: () => {},
  })
  const [auditCount, setAuditCount] = useState(0)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  // Toggle category expansion
  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryName)
        ? prev.filter(c => c !== categoryName)
        : [...prev, categoryName]
    )
  }

  // Insert command into input
  const insertCommand = (command: string) => {
    setInputValue(command)
    inputRef.current?.focus()
  }

  // Process user message
  const processMessage = useCallback((userInput: string, skipConfirmation = false) => {
    const trimmedInput = userInput.trim()
    if (!trimmedInput) return

    // Check for destructive actions
    if (isDestructiveAction(trimmedInput) && !skipConfirmation) {
      const { action, impact, response } = generateDestructiveResponse(trimmedInput)
      setConfirmModal({
        isOpen: true,
        action,
        impact,
        onConfirm: () => {
          // Add user message
          const userMsg: Message = {
            id: `msg-${Date.now()}`,
            role: "user",
            content: trimmedInput,
            timestamp: new Date(),
          }
          setMessages(prev => [...prev, userMsg])
          setAuditCount(prev => prev + 1)
          
          // Show typing indicator and then response
          setIsTyping(true)
          setTimeout(() => {
            setIsTyping(false)
            const assistantMsg: Message = {
              id: `msg-${Date.now() + 1}`,
              role: "assistant",
              content: response,
              timestamp: new Date(),
            }
            setMessages(prev => [...prev, assistantMsg])
            setAuditCount(prev => prev + 1)
          }, 1500)
          
          setConfirmModal(prev => ({ ...prev, isOpen: false }))
        },
      })
      return
    }

    // Add user message
    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: trimmedInput,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMsg])
    setInputValue("")
    setAuditCount(prev => prev + 1)

    // Show typing indicator
    setIsTyping(true)

    // Simulate processing time
    const delay = 1000 + Math.random() * 1000 // 1-2 seconds
    setTimeout(() => {
      setIsTyping(false)
      
      // Find matching command
      const matchedCommand = findMatchingCommand(trimmedInput)
      const responseContent = matchedCommand 
        ? matchedCommand.expectedResponse 
        : generateFallbackResponse(trimmedInput)
      
      const assistantMsg: Message = {
        id: `msg-${Date.now() + 1}`,
        role: "assistant",
        content: responseContent,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, assistantMsg])
      setAuditCount(prev => prev + 1)
    }, delay)
  }, [])

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    processMessage(inputValue)
  }

  // Handle quick action click
  const handleQuickAction = (command: string) => {
    setInputValue(command)
    // Auto-submit after a brief delay
    setTimeout(() => {
      processMessage(command)
    }, 100)
  }

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

      {/* Quick Action Buttons */}
      <div className="flex flex-wrap gap-2">
        {quickActions.map((action) => (
          <Button
            key={action.label}
            variant="outline"
            size="sm"
            onClick={() => handleQuickAction(action.command)}
            className="bg-pharos-card border-pharos-border text-muted-foreground hover:text-white hover:border-pharos-purple/50 transition-colors"
          >
            <Zap className="w-3 h-3 mr-1 text-pharos-gold" />
            {action.label}
          </Button>
        ))}
      </div>

      {/* Main Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Area */}
        <Card className={`${sidebarCollapsed ? 'lg:col-span-4' : 'lg:col-span-3'} bg-pharos-card border-pharos-border flex flex-col h-[600px]`}>
          <CardHeader className="border-b border-pharos-border py-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white text-sm">Conversation</CardTitle>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{messages.length} messages</span>
                {messages.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs"
                    onClick={() => setMessages([])}
                  >
                    Clear
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          
          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && !isTyping && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="p-4 rounded-full bg-pharos-purple/10 mb-4">
                  <Bot className="w-8 h-8 text-pharos-purple" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">How can I help you today?</h3>
                <p className="text-muted-foreground text-sm max-w-md">
                  Ask me about tool inventory, costs, compliance, or user management. 
                  Try clicking a quick action button above or browse the command library.
                </p>
              </div>
            )}
            
            {messages.map((msg) => (
              <div 
                key={msg.id} 
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
                  <div className="text-xs text-muted-foreground mt-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-pharos-teal flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-pharos-bg border border-pharos-border p-3 rounded-lg">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </CardContent>

          {/* Input Area */}
          <div className="p-4 border-t border-pharos-border">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about tools, costs, users, or compliance..."
                className="flex-1 px-4 py-2 bg-pharos-bg border border-pharos-border rounded-lg text-white placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-pharos-purple"
                disabled={isTyping}
              />
              <Button 
                type="submit" 
                className="px-4 py-2 bg-pharos-purple text-white hover:bg-pharos-purple/80"
                disabled={isTyping || !inputValue.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-2">
              All queries are logged to Aegis audit trail • Destructive actions require confirmation
            </p>
          </div>
        </Card>

        {/* Sidebar */}
        {!sidebarCollapsed && (
          <div className="space-y-4">
            {/* Collapse button */}
            <div className="flex justify-end lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarCollapsed(true)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Command Library */}
            <Card className="bg-pharos-card border-pharos-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-sm flex items-center gap-2">
                  <Bookmark className="w-4 h-4" />
                  Command Library
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 max-h-[400px] overflow-y-auto">
                {commandLibrary.map((category) => {
                  const Icon = category.icon
                  const isExpanded = expandedCategories.includes(category.name)
                  
                  return (
                    <div key={category.name}>
                      <button
                        onClick={() => toggleCategory(category.name)}
                        className="w-full flex items-center justify-between p-2 hover:bg-pharos-bg rounded cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-pharos-teal" />
                          <span className="text-sm text-white">{category.name}</span>
                        </div>
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        )}
                      </button>
                      
                      {isExpanded && (
                        <div className="ml-6 space-y-1 mt-1">
                          {category.commands.map((cmd, i) => (
                            <button
                              key={i}
                              onClick={() => insertCommand(cmd)}
                              className="w-full text-left p-2 text-xs text-muted-foreground hover:text-white hover:bg-pharos-bg rounded transition-colors"
                            >
                              {cmd}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Audit Status */}
            <Card className="bg-pharos-card border-pharos-border">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 rounded-full bg-pass animate-pulse" />
                  <span className="text-muted-foreground">
                    Session audit active • 
                    <span className="text-white ml-1">{auditCount} {auditCount === 1 ? 'entry' : 'entries'} logged</span>
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Collapsed sidebar toggle */}
        {sidebarCollapsed && (
          <div className="fixed right-4 top-1/2 -translate-y-1/2 lg:relative lg:right-auto lg:top-auto lg:translate-y-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSidebarCollapsed(false)}
              className="bg-pharos-card border-pharos-border"
            >
              <ChevronRight className="w-4 h-4 mr-1" />
              Commands
            </Button>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <Card className="bg-pharos-card border-pharos-border w-full max-w-md mx-4">
            <CardHeader className="border-b border-pharos-border">
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                Confirm Action
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div>
                <h4 className="text-sm font-medium text-white mb-1">Action</h4>
                <p className="text-sm text-muted-foreground">{confirmModal.action}</p>
              </div>
              
              <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                <h4 className="text-sm font-medium text-warning mb-1">Impact</h4>
                <p className="text-sm text-muted-foreground">{confirmModal.impact}</p>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Shield className="w-3 h-3" />
                This action will be logged to the Aegis audit trail
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  className="flex-1 border-pharos-border"
                  onClick={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-fail hover:bg-fail/80 text-white"
                  onClick={confirmModal.onConfirm}
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Confirm
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
