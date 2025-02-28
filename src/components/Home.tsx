import React from 'react';
import { MessageCircle, Calendar, ArrowRight, Phone, Mail, MapPin, Clock, Shield, Activity, Users, Award, BookOpen } from 'lucide-react';

interface HomeProps {
  setCurrentPage: (page: 'home' | 'chat' | 'appointments') => void;
}

export const Home: React.FC<HomeProps> = ({ setCurrentPage }) => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl overflow-hidden shadow-xl">
        <div className="px-6 py-12 md:px-12 md:py-16 text-center md:text-left md:flex md:items-center">
          <div className="md:w-1/2 md:pr-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Your Health Assistant, Powered by AI
            </h1>
            <p className="text-blue-100 text-lg mb-8">
              Get instant health advice and book appointments with local doctors, all in one place.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
              <button
                onClick={() => setCurrentPage('chat')}
                className="px-6 py-3 bg-white text-blue-700 font-medium rounded-lg shadow hover:bg-blue-50 transition-colors flex items-center justify-center"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Chat with AI
              </button>
              <button
                onClick={() => setCurrentPage('appointments')}
                className="px-6 py-3 bg-blue-800 text-white font-medium rounded-lg shadow hover:bg-blue-900 transition-colors flex items-center justify-center"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book Appointment
              </button>
            </div>
          </div>
          <div className="hidden md:block md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Doctor with digital tablet" 
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">How HealthAssist AI Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <MessageCircle className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Health Chat</h3>
            <p className="text-gray-600 mb-4">
              Get instant answers to your health questions from our AI assistant trained on medical knowledge.
            </p>
            <button
              onClick={() => setCurrentPage('chat')}
              className="text-blue-600 font-medium flex items-center hover:text-blue-800"
            >
              Try it now <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Appointment Booking</h3>
            <p className="text-gray-600 mb-4">
              Find and book appointments with local healthcare providers in just a few clicks.
            </p>
            <button
              onClick={() => setCurrentPage('appointments')}
              className="text-blue-600 font-medium flex items-center hover:text-blue-800"
            >
              Book now <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Privacy Focused</h3>
            <p className="text-gray-600 mb-4">
              Your health data is private and secure. We use state-of-the-art encryption to protect your information.
            </p>
            <button className="text-blue-600 font-medium flex items-center hover:text-blue-800">
              Learn more <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Additional Services Section */}
      <section>
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Our Healthcare Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Beyond AI chat and appointment booking, we offer a comprehensive range of healthcare services to meet all your needs.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Telemedicine",
              description: "Virtual consultations with healthcare professionals from the comfort of your home.",
              icon: <Activity className="h-6 w-6 text-blue-600" />
            },
            {
              title: "Health Records",
              description: "Securely store and access your medical history, prescriptions, and test results.",
              icon: <BookOpen className="h-6 w-6 text-blue-600" />
            },
            {
              title: "Medication Reminders",
              description: "Never miss a dose with personalized medication reminders and refill alerts.",
              icon: <Clock className="h-6 w-6 text-blue-600" />
            },
            {
              title: "Wellness Programs",
              description: "Join specialized programs for chronic disease management, weight loss, and mental health.",
              icon: <Activity className="h-6 w-6 text-blue-600" />
            }
          ].map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">
                {service.description}
              </p>
              <button className="text-blue-600 font-medium flex items-center hover:text-blue-800">
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-blue-50 rounded-2xl p-8 md:p-12">
        <div className="md:flex items-center">
          <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About HealthAssist AI</h2>
            <p className="text-gray-700 mb-4">
              Founded in 2023, HealthAssist AI was created with a simple mission: to make healthcare more accessible, 
              efficient, and personalized for everyone.
            </p>
            <p className="text-gray-700 mb-4">
              Our team of healthcare professionals, AI specialists, and patient advocates work together to create 
              a platform that bridges the gap between technology and healthcare.
            </p>
            <p className="text-gray-700 mb-6">
              We believe that by combining artificial intelligence with human expertise, we can transform the healthcare 
              experience and improve outcomes for patients worldwide.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">50+</p>
                  <p className="text-sm text-gray-600">Healthcare Providers</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <Award className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">98%</p>
                  <p className="text-sm text-gray-600">Patient Satisfaction</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">10,000+</p>
                  <p className="text-sm text-gray-600">Appointments Booked</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Medical team meeting" 
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">What Our Users Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Sarah Johnson",
              text: "The AI chat helped me understand my symptoms before my doctor's appointment. Saved me a lot of worry!",
              image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
            },
            {
              name: "Michael Chen",
              text: "Booking an appointment was so easy. I found a specialist near me and got seen within 2 days.",
              image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
            },
            {
              name: "Emily Rodriguez",
              text: "I use the health chat weekly to track my chronic condition. It's like having a medical assistant on call 24/7.",
              image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
            }
          ].map((testimonial, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <img 
                src={testimonial.image} 
                alt={testimonial.name} 
                className="w-16 h-16 rounded-full mb-4 object-cover"
              />
              <p className="text-gray-600 italic mb-4">"{testimonial.text}"</p>
              <p className="font-medium text-gray-900">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 bg-blue-600 p-8 md:p-12 text-white">
            <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
            <p className="mb-8">
              Have questions about our services or need assistance? Our team is here to help you.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="h-6 w-6 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-1">Our Location</h3>
                  <p className="text-blue-100">123 Healthcare Avenue, Medical District, CA 90210</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="h-6 w-6 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-1">Email Us</h3>
                  <p className="text-blue-100">contact@healthassist.ai</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="h-6 w-6 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-1">Call Us</h3>
                  <p className="text-blue-100">+1 (800) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="h-6 w-6 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-1">Hours</h3>
                  <p className="text-blue-100">Monday - Friday: 8am - 8pm</p>
                  <p className="text-blue-100">Saturday: 9am - 5pm</p>
                  <p className="text-blue-100">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="How can we help you?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Type your message here..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section>
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our services and platform.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <div className="space-y-6">
            {[
              {
                question: "Is the AI health assistant a replacement for seeing a doctor?",
                answer: "No, our AI health assistant is designed to provide general health information and guidance, but it is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for medical concerns."
              },
              {
                question: "How do I cancel or reschedule an appointment?",
                answer: "You can cancel or reschedule an appointment up to 24 hours before the scheduled time. Simply log into your account, go to 'My Appointments', and select the appointment you wish to modify."
              },
              {
                question: "Is my health information secure?",
                answer: "Yes, we take data security and privacy very seriously. All your health information is encrypted and stored securely in compliance with HIPAA regulations. We never share your personal health information without your explicit consent."
              },
              {
                question: "Can I use HealthAssist AI with my insurance?",
                answer: "Yes, we work with most major insurance providers. When booking an appointment, you can enter your insurance information, and we'll verify coverage before your visit."
              },
              {
                question: "Are there any fees for using the AI chat service?",
                answer: "No, the basic AI chat service is completely free to use. However, specialized consultations with healthcare professionals may incur charges based on your insurance coverage."
              }
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};