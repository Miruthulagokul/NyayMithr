
import { MessageCircle, Send, User, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ChatPreview = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <h3 className="text-3xl font-bold text-center text-foreground mb-12">
          See How NyaySathi Can Help You
        </h3>
        
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl border-border/50">
            <CardHeader className="bg-primary/5 border-b border-border/50">
              <CardTitle className="flex items-center gap-2 text-foreground">
                <MessageCircle className="w-5 h-5 text-primary" />
                Chat with NyaySathi
                <Badge className="ml-auto bg-primary text-primary-foreground">Live</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-96 overflow-hidden">
                {/* Sample chat messages */}
                <div className="p-4 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3 max-w-xs">
                      <p className="text-sm text-foreground">I need help filing an RTI application</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div className="bg-primary/10 rounded-lg p-3 max-w-md">
                      <p className="text-sm text-foreground">
                        Don't worry, I'm here to help you with your RTI application! 
                        Let's solve this together, step by step. Can you tell me which 
                        department or information you need access to?
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3 max-w-xs">
                      <p className="text-sm text-foreground">I want information about my property tax from municipal corporation</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div className="bg-primary/10 rounded-lg p-3 max-w-md">
                      <p className="text-sm text-foreground">
                        Perfect! I can help you draft an RTI application for property tax 
                        information. You have every right to access this information. 
                        Let me know your city/state so I can provide specific guidance...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-border/50 p-4 bg-card/30">
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-background border border-border/50 rounded-lg px-3 py-2">
                    <span className="text-sm text-muted-foreground">Type your legal question here...</span>
                  </div>
                  <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ChatPreview;
