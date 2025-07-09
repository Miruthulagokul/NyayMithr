import { useState } from "react";
import { Send, Bot, User, Menu, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ChatHistory from "@/components/ChatHistory";
import LoginModal from "@/components/LoginModal";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hello! I'm NyaySathi, your friendly legal assistant. Don't worry, I'm here to help you with your legal rights and questions. Whether you need to file an RTI, register an FIR, or understand your consumer rights - let's solve this together, step by step. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [currentChatId, setCurrentChatId] = useState<string>('current');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");

    // 🔁 Workato Webhook Trigger
    try {
      await fetch('https://webhooks.workato.com/webhooks/rest/a8ecdae0-cb16-4328-8d26-ab2770e7fe79/user_query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: inputMessage,
          timestamp: new Date().toISOString()
        })
      });
    } catch (error) {
      console.error("Failed to trigger Workato webhook:", error);
    }

    // 🤖 Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(inputMessage);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('rti') || input.includes('right to information')) {
      return "I can help you file an RTI application! This is a powerful tool to access government information. Let me guide you through this step by step. Could you tell me which department or specific information you need? Also, if you can share your state or city, I can provide more targeted guidance.";
    }
    
    if (input.includes('fir') || input.includes('police') || input.includes('complaint')) {
      return "Don't worry, I'm here to help you with registering an FIR. You have the right to file a complaint, and I'll guide you through the process. Can you tell me briefly what happened? Is it related to theft, fraud, harassment, or something else? This will help me provide specific guidance.";
    }
    
    if (input.includes('consumer') || input.includes('refund') || input.includes('defective') || input.includes('warranty')) {
      return "I can definitely help you with consumer rights! You have strong protection under consumer laws. Let me know - are you dealing with a defective product, service issue, or billing problem? Also, do you have any purchase receipts or documentation? Let's get your issue resolved.";
    }
    
    if (input.includes('cyber') || input.includes('online') || input.includes('fraud') || input.includes('scam')) {
      return "You're not alone in this - I'll help you handle this cybercrime issue. Online fraud is unfortunately common, but there are clear steps we can take. Can you tell me what type of online issue you're facing? Is it related to payments, identity theft, or something else? Have you lost any money?";
    }
    
    return "I understand you need legal help, and I'm here to support you through this. Could you provide a bit more detail about your specific situation? Are you dealing with a government service, consumer issue, police matter, or something else? The more context you give me, the better I can guide you with the right legal steps.";
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: '1',
        type: 'bot',
        content: "Hello! I'm NyaySathi, your friendly legal assistant. How can I help you today?",
        timestamp: new Date()
      }
    ]);
    setCurrentChatId('new-' + Date.now());
    setIsHistoryOpen(false);
  };

  const handleSelectChat = (chatId: string) => {
    setCurrentChatId(chatId);
    // Load chat messages for the selected chat
    setIsHistoryOpen(false);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <ChatHistory 
          onNewChat={handleNewChat}
          onSelectChat={handleSelectChat}
          currentChatId={currentChatId}
        />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
        <SheetContent side="left" className="p-0 w-80">
          <ChatHistory 
            onNewChat={handleNewChat}
            onSelectChat={handleSelectChat}
            currentChatId={currentChatId}
          />
        </SheetContent>
      </Sheet>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Sheet>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="lg:hidden"
                    onClick={() => setIsHistoryOpen(true)}
                  >
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
              </Sheet>
              
              <div className="flex items-center gap-2">
                <Bot className="w-6 h-6 text-primary" />
                <h1 className="text-lg font-semibold text-foreground">NyaySathi</h1>
                <Badge className="bg-primary text-primary-foreground">Online</Badge>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsLoginModalOpen(true)}
              className="border-border text-foreground hover:bg-muted"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </Button>
          </div>
        </div>

        {/* Chat Content */}
        <Card className="flex-1 flex flex-col m-4 shadow-xl border-border/50">
          <CardContent className="flex-1 flex flex-col p-0">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.type === 'bot' && (
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted/50 text-foreground'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                  
                  {message.type === 'user' && (
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="border-t border-border/50 p-4 bg-card/30 flex-shrink-0">
              <div className="flex items-center gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your legal question here..."
                  className="flex-1 border-border/50 focus:border-primary bg-background text-foreground"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage();
                    }
                  }}
                />
                <Button 
                  onClick={handleSendMessage}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={!inputMessage.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
};

export default Chat;
