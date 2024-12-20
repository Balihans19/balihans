
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const ContactUsMainDiv = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    industry: "",
    message: "",
  });

  const [captchaValue, setCaptchaValue] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCaptcha = (value) => {
    setCaptchaValue(value);
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaValue) {
        showNotification("Please complete the reCAPTCHA", "error");
        return;
    }

    setIsSubmitting(true);

    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/contact`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...formData, captchaValue }),
        });

        if (response.ok) {
            showNotification("Thank you for contacting us. We'll get back to you shortly over email", "success");
            setFormData({
                name: "",
                email: "",
                industry: "",
                message: "",
            });
            setCaptchaValue(null);
        } else {
            showNotification("Failed to send message. Please try again later.", "error");
        }
    } catch (error) {
        console.error("Error submitting form:", error);
        showNotification("An error occurred. Please try again later.", "error");
    } finally {
        setIsSubmitting(false);
    }
};

  return (
    <div       
      className="relative min-h-screen lg:min-h-[850px] text-white w-full bg-cover bg-center mt-16 lg:mt-0"       
      style={{ 
        backgroundImage: `url('https://res.cloudinary.com/dnijlfi48/image/upload/v1734518437/Untitled_design_34_xjrkwz.webp')`,
        filter: 'grayscale(100%)'
      }}     
    >     
      {/* Notification Toast */}
      {notification.show && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg ${
            notification.type === 'success' 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}
        >
          <div className="flex items-center">
            <span className="mr-2">
              {notification.type === 'success' ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                </svg>
              )}
            </span>
            {notification.message}
          </div>
        </div>
      )}

      {/* Overlay for gradient effect */}       
      <div className="absolute inset-0 bg-gradient-to-l from-black to-transparent"></div>        
      
      <div className="relative z-10 max-w-full mt-12 md:mt-0 px-4 py-16 sm:px-6 lg:px-20 xl:px-36">
        {/* Section Title and Categories */}
        <div className="flex justify-end items-start">
          <div className="max-w-3xl w-full pl-6">
            <div className="flex gap-4 text-left font-bold text-base sm:text-lg lg:text-2xl">
              <h1>TALK TO AN EXPERT</h1>
            </div>
          </div>
        </div>

        {/* Horizontal Rule */}
        <div className="flex justify-end items-start">
          <hr className="w-full my-6" />
        </div>

        {/* Description */}
        <div className="flex justify-end items-start">
          <div className="flex flex-col w-full max-w-3xl p-6 rounded-md relative">
            {/* Heading Section */}
            <div>
              <p className="mb-4 text-sm">
                Before connecting you with the right expert, we'll need a few details
                to understand your specific needs better. *Mandatory fields
              </p>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name and Email in One Line */}
              <div className="flex space-x-4">
                <div className="flex-1">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name*"
                    required
                    className="w-full p-2 rounded border border-white bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white/50"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="flex-1">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email*"
                    required
                    className="w-full p-2 rounded border border-white bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white/50"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Industry */}
              <div>
                <select
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  required
                  className="w-full p-2 rounded border border-white bg-transparent text-white placeholder-white appearance-none focus:outline-none focus:ring-2 focus:ring-white/50"
                  disabled={isSubmitting}
                >
                  <option value="" disabled className="bg-transparent text-white">Industry*</option>
                  <option value="banking-and-financial-services" className="bg-black text-white">Banking & Financial Services</option>
                  <option value="communications-and-information-services" className="bg-black text-white">Communications & Information Services</option>
                  <option value="energy-resources-utilities" className="bg-black text-white">Energy, Resources & Utilities</option>
                  <option value="healthcare-and-lifesciences" className="bg-black text-white">Healthcare & Life Sciences</option>
                  <option value="high-tech" className="bg-black text-white">High-Tech</option>
                  <option value="hospitality" className="bg-black text-white">Hospitality</option>
                  <option value="insurance" className="bg-black text-white">Insurance</option>
                  <option value="manufacturing" className="bg-black text-white">Manufacturing</option>
                  <option value="media-and-entertainment" className="bg-black text-white">Media & Entertainment</option>
                  <option value="professional-services" className="bg-black text-white">Professional Services</option>
                  <option value="Retail-and-consumer-goods" className="bg-black text-white">Retail & Consumer Goods</option>
                  <option value="travel-and-logistics" className="bg-black text-white">Travel & Logistics</option>
                  <option value="transportation" className="bg-black text-white">Transportation</option>
                  <option value="other" className="bg-black text-white">Other</option>
                  
                </select>
              </div>

              {/* Message */}
              <div>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?*"
                  required
                  className="w-full p-2 rounded border border-white bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  disabled={isSubmitting}
                ></textarea>
              </div>

              {/* reCAPTCHA */}
              <div>
                <ReCAPTCHA
                  sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                  onChange={handleCaptcha}
                />
              </div>

              {/* Consent */}
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="consent" 
                  className="h-5 w-5" 
                  required
                  disabled={isSubmitting}
                />
                <label htmlFor="consent" className="text-sm">
                  I consent to processing of my personal data entered above.
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-sm">
                  For further details on how your personal data will be processed and how your consent can be managed, refer to the{" "}
                  <a href="/privacy-policy" className="underline hover:text-gray-300">
                    Balihans Privacy policy
                  </a>
                </label>
              </div>
            
              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className={`w-full py-2 px-4 bg-transparent border border-white rounded text-white font-semibold max-w-44 
                    ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white hover:text-black transition-colors duration-300'}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsMainDiv;
