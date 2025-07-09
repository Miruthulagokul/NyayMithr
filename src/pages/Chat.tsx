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

  try {
    const response = await fetch(
      "https://webhooks.workato.com/webhooks/rest/a8ecdae0-cb16-4328-8d26-ab2770e7fe79/user_query",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_query: inputMessage // ✅ this key must match what your Workato webhook expects
        })
      }
    );

    const result = await response.json();

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: "bot",
      content:
        result?.choices?.[0]?.message?.content ||
        "Sorry, I couldn’t understand that. Please try again.",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
  } catch (error) {
    console.error("Failed to get response from Workato webhook:", error);

    const errorMessage: Message = {
      id: (Date.now() + 2).toString(),
      type: "bot",
      content: "Oops! Something went wrong. Please try again later.",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, errorMessage]);
  }
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
