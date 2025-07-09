
import { MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-foreground mb-6 leading-tight">
            Don't worry, I'm here to help you with your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80">
              legal rights
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Whether you need to file an RTI, register an FIR, or understand your consumer rights — 
            let's solve this together, step by step. You're not alone in this journey.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              onClick={() => navigate("/chat")}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Get Free Legal Help Now
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-primary text-primary hover:bg-primary/10 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
            >
              Learn Your Rights
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
          
          <div className="bg-card/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-primary/20 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span>Free to Use</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary/80 rounded-full"></div>
                <span>Available 24/7</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary/60 rounded-full"></div>
                <span>Expert Guidance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
