
import { MessageCircle, FileText, Shield, Users, Phone, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import Hero from "@/components/Hero";
import ServicesGrid from "@/components/ServicesGrid";
import ChatPreview from "@/components/ChatPreview";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">NyayaMithr</h1>
                <p className="text-sm text-gray-600">Your Legal Companion</p>
              </div>
            </div>
            <Button
              onClick={() => navigate("/chat")}
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Get Help Now
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <Hero />

        {/* Services Grid */}
        <ServicesGrid />

        {/* Chat Preview */}
        <ChatPreview />

        {/* Trust Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Trust NyayaMithr?</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We're here to make legal help accessible, understandable, and stress-free for every Indian citizen.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Trusted & Secure</h3>
                <p className="text-gray-600">Your information is safe with us. We follow strict privacy protocols.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Guidance</h3>
                <p className="text-gray-600">Backed by legal experts and updated with the latest Indian laws.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Available</h3>
                <p className="text-gray-600">Get help whenever you need it. Legal emergencies don't wait.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Get the Legal Help You Deserve?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Don't let legal confusion stress you out. Let's solve this together, step by step.
            </p>
            <Button
              onClick={() => navigate("/chat")}
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105"
            >
              Start Your Legal Journey
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">NyayaMithr</span>
              </div>
              <p className="text-gray-400">
                Making legal help accessible to every Indian citizen, one step at a time.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Help</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">File RTI</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Register FIR</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Consumer Complaint</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cybercrime Help</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Know Your Rights</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Legal Forms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Court Procedures</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Legal Dictionary</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>help@nyaysathi.com</li>
                <li>Emergency: 24/7 Chat</li>
                <li>Legal Helpline: Available</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 NyaySathi. Made with ❤️ for Indian citizens seeking justice.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
