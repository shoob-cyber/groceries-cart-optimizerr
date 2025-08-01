import React from 'react';
import { 
  ShoppingCart, 
  Zap, 
  Brain, 
  TrendingUp, 
  Shield, 
  Award, 
  DollarSign, 
  Scale, 
  Package, 
  Users, 
  CreditCard, 
  History,
  Target,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Calculator,
  Gift,
  Truck
} from 'lucide-react';

export function ProjectOverview() {
  const features = [
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Secure Authentication",
      description: "JWT-based login system with encrypted passwords and session management",
      details: ["User registration & login", "Password encryption", "Session persistence", "Protected routes"]
    },
    {
      icon: <ShoppingCart className="w-8 h-8 text-green-600" />,
      title: "Smart Shopping Cart",
      description: "Interactive cart with real-time calculations and quantity management",
      details: ["Add/remove items", "Quantity controls", "Real-time totals", "Weight tracking"]
    },
    {
      icon: <Brain className="w-8 h-8 text-purple-600" />,
      title: "AI-Powered Optimization",
      description: "Advanced algorithms that maximize value within your constraints",
      details: ["0/1 Knapsack algorithm", "Dynamic programming", "Multi-constraint optimization", "Value maximization"]
    },
    {
      icon: <Gift className="w-8 h-8 text-orange-600" />,
      title: "Intelligent Coupon System",
      description: "Greedy algorithm automatically finds the best discount for your cart",
      details: ["Multiple coupon types", "Automatic selection", "Maximum savings", "Smart application"]
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-red-600" />,
      title: "Savings Analytics",
      description: "Detailed breakdown of how much money and value you're gaining",
      details: ["Before/after comparison", "Savings calculation", "Value optimization", "Budget efficiency"]
    },
    {
      icon: <CreditCard className="w-8 h-8 text-indigo-600" />,
      title: "Seamless Checkout",
      description: "Professional payment processing with multiple payment methods",
      details: ["Credit card support", "PayPal integration", "Order confirmation", "Receipt generation"]
    }
  ];

  const algorithms = [
    {
      name: "0/1 Knapsack Algorithm",
      description: "Solves the classic optimization problem: given a budget and weight limit, select items that maximize value",
      complexity: "O(n × W × B)",
      useCase: "Cart optimization within budget and weight constraints",
      icon: <Calculator className="w-6 h-6 text-blue-600" />
    },
    {
      name: "Greedy Coupon Selection",
      description: "Evaluates all available coupons and selects the one providing maximum discount",
      complexity: "O(n)",
      useCase: "Automatic coupon application for maximum savings",
      icon: <Target className="w-6 h-6 text-green-600" />
    }
  ];

  const stats = [
    { label: "Products Available", value: "8+", icon: <Package className="w-5 h-5" /> },
    { label: "Optimization Algorithms", value: "2", icon: <Brain className="w-5 h-5" /> },
    { label: "Coupon Types", value: "5", icon: <Gift className="w-5 h-5" /> },
    { label: "User Features", value: "15+", icon: <Users className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary-700 via-secondary-600 to-primary-800 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center animate-fadeInUp">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 animate-bounce-custom">
                <Sparkles className="w-12 h-12 text-accent-300 animate-pulse-custom" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fadeInUp stagger-1">
              E-Commerce Cart Optimizer
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-cream-100 animate-fadeInUp stagger-2">
              Maximize your shopping value with AI-powered optimization algorithms
            </p>
            <div className="flex flex-wrap justify-center gap-4 animate-fadeInUp stagger-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-sm font-medium">🧠 Smart Algorithms</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-sm font-medium">💰 Maximum Savings</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-sm font-medium">⚡ Real-time Optimization</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className={`text-center animate-fadeInUp stagger-${index + 1} hover-lift transition-all duration-300`}>
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 hover-scale">
                  <div className="text-white animate-bounce-custom">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2 animate-countUp">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Core Features */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600">Everything you need for intelligent e-commerce optimization</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className={`bg-white rounded-xl shadow-lg p-8 hover-lift hover-glow transition-all duration-500 animate-fadeInUp stagger-${index + 1} group`}>
                <div className="flex items-center mb-6">
                  <div className="bg-gray-50 rounded-lg p-3 group-hover:bg-blue-50 transition-colors duration-300 animate-bounce-custom">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 ml-4 group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-6 group-hover:text-gray-700 transition-colors duration-300">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 animate-pulse-custom" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Algorithms Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Advanced Algorithms</h2>
            <p className="text-xl text-gray-600">Cutting-edge optimization techniques for maximum value</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {algorithms.map((algorithm, index) => (
              <div key={index} className={`bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-8 hover-lift hover-glow transition-all duration-500 animate-fadeInUp stagger-${index + 1} group border border-gray-200`}>
                <div className="flex items-center mb-6">
                  <div className="bg-white rounded-lg p-3 shadow-md group-hover:shadow-lg transition-all duration-300 animate-bounce-custom">
                    {algorithm.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 ml-4 group-hover:text-blue-600 transition-colors duration-300">
                    {algorithm.name}
                  </h3>
                </div>
                <p className="text-gray-700 mb-6 text-lg group-hover:text-gray-800 transition-colors duration-300">
                  {algorithm.description}
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm">
                    <span className="text-sm font-medium text-gray-600">Time Complexity:</span>
                    <code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-mono animate-pulse-custom">
                      {algorithm.complexity}
                    </code>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <span className="text-sm font-medium text-gray-600 block mb-2">Use Case:</span>
                    <p className="text-sm text-gray-700">{algorithm.useCase}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-blue-100">Simple steps to optimize your shopping experience</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Browse Products", desc: "Explore our curated product catalog", icon: <Package className="w-8 h-8" /> },
              { step: "2", title: "Add to Cart", desc: "Select items you're interested in", icon: <ShoppingCart className="w-8 h-8" /> },
              { step: "3", title: "Set Constraints", desc: "Define your budget and weight limits", icon: <Scale className="w-8 h-8" /> },
              { step: "4", title: "Optimize & Save", desc: "Let AI find the best combination", icon: <Zap className="w-8 h-8" /> }
            ].map((step, index) => (
              <div key={index} className={`text-center animate-fadeInUp stagger-${index + 1} group`}>
                <div className="bg-white/20 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-white/30 transition-all duration-300 hover-scale animate-bounce-custom">
                  <div className="text-white animate-pulse-custom">
                    {step.icon}
                  </div>
                </div>
                <div className="bg-white text-primary-600 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 font-bold text-lg animate-bounce-custom">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-accent-300 transition-colors duration-300">{step.title}</h3>
                <p className="text-cream-100 group-hover:text-white transition-colors duration-300">{step.desc}</p>
                {index < 3 && (
                  <ArrowRight className="w-6 h-6 mx-auto mt-6 text-cream-300 animate-bounce hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technical Capabilities */}
      <div className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold mb-4">Technical Capabilities</h2>
            <p className="text-xl text-gray-300">Built with modern technologies and best practices</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "React + TypeScript", desc: "Modern frontend with type safety", icon: "⚛️" },
              { title: "Advanced Algorithms", desc: "Dynamic programming & greedy algorithms", icon: "🧠" },
              { title: "Real-time Updates", desc: "Instant cart calculations and optimization", icon: "⚡" },
              { title: "Responsive Design", desc: "Works perfectly on all devices", icon: "📱" },
              { title: "Secure Authentication", desc: "JWT-based user management", icon: "🔐" },
              { title: "Premium Animations", desc: "Smooth micro-interactions throughout", icon: "✨" }
            ].map((tech, index) => (
              <div key={index} className={`bg-gray-800 rounded-lg p-6 hover-lift hover-glow transition-all duration-300 animate-fadeInUp stagger-${index + 1} group border border-gray-700`}>
                <div className="text-4xl mb-4 animate-bounce-custom">{tech.icon}</div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors duration-300">{tech.title}</h3>
                <p className="text-gray-300 group-hover:text-white transition-colors duration-300">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 animate-fadeInUp">
          <h2 className="text-4xl font-bold mb-6">Ready to Optimize Your Shopping?</h2>
          <p className="text-xl mb-8 text-green-100">
            Experience the power of AI-driven cart optimization and start saving money today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-cream-50 transition-all duration-300 hover:scale-105 hover:shadow-lg transform active:scale-95 animate-bounce-custom">
              Try Demo Login
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-primary-600 transition-all duration-300 hover:scale-105 hover:shadow-lg transform active:scale-95 animate-bounce-custom">
              View Source Code
            </button>
          </div>
          <p className="mt-6 text-sm text-cream-100 animate-pulse-custom">
            Demo: john@example.com / password123
          </p>
        </div>
      </div>
    </div>
  );
}