import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Check, X} from 'lucide-react';

/*
 * This component renders a full-page contact form with the following features:
 * - Form validation for required fields
 * - Google reCAPTCHA integration for spam prevention
 * - Responsive design with mobile-first approach
 * - Real-time form state management
 * - Error handling and success notifications
 * - Custom styling with Tailwind CSS
 * 
 * @returns {JSX.Element} A contact form component with background image and gradient overlay
 */

const ResumeUploader = () => {
 // Form state management using useState hook
 const [formData, setFormData] = useState({
  name: "",
  email: "",
  keySkills: "",
  uploadResume: null,
});

// Add a state to track the selected file name
const [selectedFileName, setSelectedFileName] = useState("");
const [captchaValue, setCaptchaValue] = useState(null);
const [notification, setNotification] = useState({
  show: false,
  message: "",
  type: "",
});
const [isSubmitting, setIsSubmitting] = useState(false);

const handleChange = (e) => {
  const { name, value, files } = e.target;

  if (name === "resume") {  // Changed from uploadResume to resume to match backend
    const file = files[0];
    // Add file type validation
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (file && !allowedTypes.includes(file.type)) {
      showNotification("Please upload only PDF, DOC, or DOCX files", "error");
      return;
    }

    // Add file size validation (5MB limit)
    if (file && file.size > 5 * 1024 * 1024) {
      showNotification("File size should be less than 5MB", "error");
      return;
    }

    setFormData({ ...formData, uploadResume: file });
    setSelectedFileName(file.name);
  } else {
    setFormData({ ...formData, [name]: value });
  }
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

  if (!formData.uploadResume) {
    showNotification("Please upload your resume", "error");
    return;
  }

  setIsSubmitting(true);

  try {
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("keySkills", formData.keySkills);
    formDataToSend.append("uploadResume", formData.uploadResume);
    formDataToSend.append("captchaValue", captchaValue);
    formDataToSend.append("formType", "with-skills");

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/resume`,  // Updated endpoint
      {
        method: "POST",
        body: formDataToSend,
      }
    );

    const data = await response.json();

    if (response.ok) {
      showNotification(
        "Thank you for submitting your resume. We'll review it and get back to you shortly.",
        "success"
      );
      // Reset form state
      setFormData({
        name: "",
        email: "",
        keySkills: "",
        uploadResume: null,
      });
      setSelectedFileName("");
      setCaptchaValue(null);
      // Reset reCAPTCHA
      if (window.grecaptcha) {
        window.grecaptcha.reset();
      }
    } else {
      showNotification(data.message || "Failed to submit resume. Please try again later.", "error");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    showNotification("An error occurred. Please try again later.", "error");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="relative min-h-screen lg:min-h-[850px] text-white w-full pb-24">
      {/* Grayscale background container */}
      <div 
        className="absolute inset-0 w-full h-full "
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dnijlfi48/image/upload/v1735884607/Untitled_design_34_r0ms9c.webp')`,
          filter: 'grayscale(100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0
        }}
      />    
      {/* Notification Toast - Displays success/error messages */}
      {notification.show && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg ${
            notification.type === 'success' 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}
        >
          <div className="flex items-center">
            {/* Success/Error icons */}
            <span className="mr-2">
              {notification.type === 'success' ? (
                <Check className="w-6 h-6 text-white" />
              ) : (
                <X className="w-6 h-6 text-white" />
              )}
            </span>
            {notification.message}
          </div>
        </div>
      )}

      {/* Background gradient overlay for better text visibility */}       
      <div className="absolute inset-0 bg-gradient-to-l from-black to-transparent"></div>        
      
      {/* Main content container */}
      <div className="relative z-10 max-w-full mt-12 md:mt-0 px-4 py-16 sm:px-6 lg:px-20 xl:px-36">
        {/* Section header */}
        <div className="flex justify-end items-start">
          <div className="max-w-3xl w-full pl-6">
            <div className="flex gap-4 text-left font-bold text-base sm:text-lg lg:text-2xl">
              <h1>SEND YOUR RESUME</h1>
            </div>
          </div>
        </div>

        {/* Decorative horizontal rule */}
        <div className="flex justify-end items-start">
          <hr className="w-full my-6" />
        </div>

        {/* Form container */}
        <div className="flex justify-end items-start">
          <div className="flex flex-col w-full max-w-3xl p-6 rounded-md relative">
            {/* Form description */}
            <div>
              <p className="mb-4 text-sm">
              Did not find a right position to apply for? Fill out the form below and let us review your resume. We will get back when we have a relevant position for you
              </p>
            </div>

            {/* Contact form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name and Email fields row */}
              <div className="flex space-x-4">
                {/* Name input */}
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

                {/* Email input */}
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
              <div className="flex space-x-4">
                  {/* Key Skills input */}
                  <div className="flex-1">
                    <input
                      type="text"
                      id="keySkills"
                      name="keySkills"
                      value={formData.keySkills}
                      onChange={handleChange}
                      placeholder="Key Skills*"
                      required
                      className="w-full p-2 rounded border border-white bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white/50"
                      disabled={isSubmitting}
                    />
                  </div>
              </div>

              {/* Resume upload input */}
              <div className="flex max-w-64 space-x-4">
                 <label className="relative cursor-pointer w-full p-2 rounded border border-white bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white/50">
                   <input
                     type="file"
                     id="resume"
                     name="resume"
                     onChange={handleChange}
                     accept=".pdf,.doc,.docx"
                     className="hidden"
                     disabled={isSubmitting}
                   />
                   <span className="text-base">
                     {selectedFileName || "Upload Resume*"}
                   </span>
                 </label>
               </div>

             
              {/* Consent checkbox */}
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="consent" 
                  className="h-5 w-5" 
                  required
                  disabled={isSubmitting}
                />
                <label htmlFor="consent" className="text-sm">
                I consent to processing of my personal data entered above for Balihans to contact me.
                </label>
              </div>

              {/* Privacy policy link */}
              <div className="flex items-center space-x-2">
                <label className="text-sm">
                For further details on how your personal data will be processed and how your consent can be managed, refer to the{"  "}
                  <a href="/privacy-policy" className="underline hover:text-gray-300 font-semibold">
                  Balihans Privacy policy
                  </a>
                </label>
              </div>
             {/* reCAPTCHA integration */}
             <div>
                <ReCAPTCHA
                  sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                  onChange={handleCaptcha}
                />
              </div>

              {/* Submit button with loading state */}
              <div>
                <button
                  type="submit"
                  className={`w-full py-2 px-4 bg-transparent border border-white rounded text-white font-semibold max-w-44 
                    ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white hover:text-black transition-colors duration-300'}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeUploader;





