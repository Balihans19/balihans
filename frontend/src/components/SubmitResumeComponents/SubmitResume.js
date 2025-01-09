import ReCAPTCHA from "react-google-recaptcha";
import React, { useState } from "react";
import { Check, X } from 'lucide-react';


/**
 * SubmitResume component handles:
 * - Collecting user information (name, email, key skills)
 * - Resume file upload with validation
 * - Google reCAPTCHA verification
 * - Form submission to a backend API
 */

const SubmitResume = () => {

  // State for managing form input values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    keySkills: "",
  });
  
  // State for storing the uploaded resume file and its name
  const [resumeFile, setResumeFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");

    // State for storing the Google reCAPTCHA response
  const [captchaValue, setCaptchaValue] = useState(null);

    // State for displaying notifications (e.g., errors or success messages)
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

   // State for managing form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);


  // Handles input changes for both text inputs and file uploads
  const handleChange = (e) => {
    const { name, value, files } = e.target;
 
     // Handling file upload input
    if (name === "uploadResume") {
      const file = files[0];
      if (file) {
        // File type validation
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        
        if (!allowedTypes.includes(file.type)) {
          showNotification("Please upload only PDF, DOC, or DOCX files", "error");
          return;
        }
           // File size validation (max: 5MB)
        if (file.size > 5 * 1024 * 1024) {
          showNotification("File size should be less than 5MB", "error");
          return;
        }
      // Storing the valid file and its name in the state
        setResumeFile(file);
        setSelectedFileName(file.name);
      }
    } else {
       // Updating state for text inputs
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
   // Captures the Google reCAPTCHA response
  const handleCaptcha = (value) => {
    setCaptchaValue(value);
  };
// Displays notifications for success or error messages
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 5000);
  };
  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); //Prevents the default form submission behavior
 // Validation checks
    if (!resumeFile) {
      showNotification("Please upload your resume", "error");
      return;
    }

    if (!captchaValue) {
      showNotification("Please complete the reCAPTCHA", "error");
      return;
    }

    setIsSubmitting(true);// Sets the submission state to true

    try {
      // Preparing form data for submission
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
      formDataToSend.append("uploadResume", resumeFile);
      formDataToSend.append("captchaValue", captchaValue);

    // Sending data to the backend API
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/resume/email`,
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit resume');
      }

      await response.json();
 // Display success notification and reset the form
      showNotification(
        "Thank you for submitting your resume. We'll review it and get back to you shortly.",
        "success"
      );
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        keySkills: "",
      });
      setResumeFile(null);
      setSelectedFileName("");
      setCaptchaValue(null);

      // Resets reCAPTCHA if available
      if (window.grecaptcha) {
        window.grecaptcha.reset();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      showNotification(
        error.message || "An error occurred while submitting your resume. Please try again later.",
        "error"
      );
    } finally {
      setIsSubmitting(false);// Ends the submission state
    }
  };

  return (
    <div className="relative min-h-screen lg:min-h-[850px] text-white w-full pb-24 mt-12 lg:mt-0">
      <div 
        className="absolute inset-0 w-full h-full bg-center bg-cover"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dnijlfi48/image/upload/v1735884634/Untitled_design_35_ixony5.webp')`,
          filter: 'brightness(0.7)',
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
        <div className="flex justify-end ">
           <div className="max-w-xl 2xl:max-w-3xl w-full pl-6">
             <div className="flex gap-8 text-left font-bold text-base sm:text-lg lg:text-2xl">
               <h1>APPLY NOW</h1>
               <h1>JOIN US</h1>
             </div>
           </div>
         </div>

        {/* Decorative horizontal rule */}
        <div className="flex justify-end ">
          <hr className="w-full my-6" />
        </div>

        {/* Form container */}
        <div className="flex justify-end ">
          <div className="flex flex-col w-full max-w-xl 2xl:max-w-3xl p-6 rounded-md relative">
           

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
                     name="uploadResume"
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
             {/* Decorative horizontal rule */}
        <div className="flex justify-end items-start">
          <hr className="w-full my-4" />
        </div>

       
                  {/* Left Section - Quotation Icon */}
                  <div className="text-5xl lg:text-7xl font-bold flex-shrink-0 mb-2">
                     <img src="https://res.cloudinary.com/dnijlfi48/image/upload/v1736424167/Untitled10_hezv8w.webp" alt="Quotation mark" className="inline-block" />
                   </div>

                {/* Right Section - Text Content */}
                <div className="flex flex-col items-start text-left max-w-3xl">
                  <p className="text-sm sm:text-base lg:text-lg">
                    We believe in fostering a culture of innovation, collaboration, and
                    continuous learning. We are passionate about helping our clients
                    achieve their business goals and are committed to providing our
                    employees with the resources and support they need to succeed.
                  </p>
                  <p className="mt-4 text-base sm:text-lg lg:text-2xl font-bold uppercase">
                    ISHA ARORA, HEAD OF HUMAN RESOURCES
                  </p>
                </div>
              </div>
          </div>
        </div>
      </div>
    
  );
};

export default SubmitResume;




