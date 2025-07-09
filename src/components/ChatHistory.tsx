
import { useState } from "react";
import { MessageSquare, Plus, MoreHorizontal, Trash2, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ChatSession {
  id: string;
  title: string;
  timestamp: Date;
  preview: string;
}

interface ChatHistoryProps {
  onNewChat: () => void;
  onSelectChat: (chatId: string) => void;
  currentChatId?: string;
}

const ChatHistory = ({ onNewChat, onSelectChat, currentChatId }: ChatHistoryProps) => {
  const [chatSessions] = useState<ChatSession[]>([
    {
      id: '1',
      title: 'RTI Application Help',
      timestamp: new Date('2024-01-15'),
      preview: 'I need help filing an RTI application for property tax information...'
    },
    {
      id: '2',
      title: 'Consumer Rights Query',
      timestamp: new Date('2024-01-14'),
      preview: 'I bought a defective product and need a refund...'
    },
    {
      id: '3',
      title: 'FIR Registration',
      timestamp: new Date('2024-01-13'),
      preview: 'How do I register an FIR for online fraud?'
    },
    {
      id: '4',
      title: 'Property Dispute',
      timestamp: new Date('2024-01-12'),
      preview: 'My neighbor is encroaching on my property...'
    },
    {
      id: '5',
      title: 'Employment Rights',
      timestamp: new Date('2024-01-11'),
      preview: 'My employer is not paying overtime...'
    }
  ]);

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const groupedChats = chatSessions.reduce((groups, chat) => {
    const period = formatDate(chat.timestamp);
    if (!groups[period]) {
      groups[period] = [];
    }
    groups[period].push(chat);
    return groups;
  }, {} as Record<string, ChatSession[]>);

  return (
    <div className="w-80 h-full bg-background border-r border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <Button 
          onClick={onNewChat}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Chat
        </Button>
      </div>

      <Tabs defaultValue="recent" className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-2 mx-4 mt-4 bg-muted">
          <TabsTrigger value="recent" className="text-foreground">Recent</TabsTrigger>
          <TabsTrigger value="starred" className="text-foreground">Starred</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="flex-1 mt-4">
          <ScrollArea className="h-full px-4">
            <div className="space-y-4">
              {Object.entries(groupedChats).map(([period, chats]) => (
                <div key={period}>
                  <h3 className="text-xs font-medium text-muted-foreground mb-2 px-2">
                    {period}
                  </h3>
                  <div className="space-y-1">
                    {chats.map((chat) => (
                      <div
                        key={chat.id}
                        onClick={() => onSelectChat(chat.id)}
                        className={`group relative p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                          currentChatId === chat.id ? 'bg-muted text-primary' : 'text-foreground'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <MessageSquare className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {chat.title}
                            </p>
                            <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                              {chat.preview}
                            </p>
                          </div>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle more options
                              }}
                            >
                              <MoreHorizontal className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="starred" className="flex-1 mt-4">
          <div className="flex items-center justify-center h-32 text-muted-foreground">
            <p className="text-sm">No starred chats yet</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChatHistory;
