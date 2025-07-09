
import { FileText, Shield, ShoppingCart, Smartphone, HelpCircle, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    icon: FileText,
    title: "RTI Applications",
    description: "File Right to Information requests easily",
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    icon: Shield,
    title: "FIR Registration",
    description: "Guide to register First Information Reports",
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    icon: ShoppingCart,
    title: "Consumer Complaints",
    description: "Protect your consumer rights effectively",
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    icon: Smartphone,
    title: "Cybercrime Help",
    description: "Report and handle online fraud cases",
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    icon: HelpCircle,
    title: "General Legal Doubts",
    description: "Get answers to your legal questions",
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    icon: Scale,
    title: "Legal Rights",
    description: "Understand your fundamental rights",
    color: "text-primary",
    bgColor: "bg-primary/10"
  }
];

const ServicesGrid = () => {
  return (
    <section className="py-16 px-4 bg-secondary/30">
      <div className="container mx-auto">
        <h3 className="text-3xl font-bold text-center text-foreground mb-12">
          How Can I Help You Today?
        </h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-border/50 hover:border-primary/30">
              <CardHeader className="text-center">
                <div className={`w-16 h-16 ${service.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <service.icon className={`w-8 h-8 ${service.color}`} />
                </div>
                <CardTitle className="text-foreground">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground">{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button 
                  variant="outline" 
                  className="w-full border-primary/30 text-primary hover:bg-primary/10"
                >
                  Get Help
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
