import React, { useState, useRef } from "react";
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

const ContactUsMainDiv = () => {
  // Form state management using useState hook
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    industry: "",
    message: "",
  });

  // State for managing reCAPTCHA verification
  const [captchaValue, setCaptchaValue] = useState(null);
  // State for managing notification display and content
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });
  // State for tracking form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Handles form input changes and updates the form state
   * @param {Object} e - The event object from the input change
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /**
   * Handles reCAPTCHA verification
   * @param {string} value - The verification token from reCAPTCHA
   */
  const handleCaptcha = (value) => {
    setCaptchaValue(value);
  };

  /**
   * Displays a notification toast message
   * @param {string} message - The message to display
   * @param {string} type - The type of notification ('success' or 'error')
   */
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    // Auto-hide notification after 5 seconds
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 5000);
  };

  /**
   * Handles form submission
   * @param {Object} e - The form submission event
   */
  const recaptchaRef = useRef(null); // Add ref for reCAPTCHA reset

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
        recaptchaRef.current?.reset(); // Reset reCAPTCHA after successful submission
      } else {
        const data = await response.json();
        showNotification(data.message || "Failed to send message. Please try again later.", "error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      showNotification("An error occurred. Please try again later.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen lg:min-h-[850px] text-white w-full">
    {/* Grayscale background container */}
    <div 
      className="absolute inset-0 w-full h-full"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/dnijlfi48/image/upload/v1734518437/Untitled_design_34_xjrkwz.webp')`,
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
          <div className="max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl w-full pl-6">
            <div className="flex gap-4 text-left font-bold text-base sm:text-lg lg:text-2xl">
              <h1>TALK TO AN EXPERT</h1>
            </div>
          </div>
        </div>

        {/* Decorative horizontal rule */}
        <div className="flex justify-end items-start">
          <hr className="w-full my-6" />
        </div>

        {/* Form container */}
        <div className="flex justify-end items-start">
          <div className="flex flex-col w-full max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl p-6 rounded-md relative">
            {/* Form description */}
            <div>
              <p className="mb-4 text-sm">
                Before connecting you with the right expert, we'll need a few details
                to understand your specific needs better. *Mandatory fields
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

              {/* Industry dropdown */}
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
                  {/* Industry options with consistent styling */}
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

              {/* Message textarea */}
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

              {/* reCAPTCHA integration */}
              <div>
                 <ReCAPTCHA
                   ref={recaptchaRef}
                   sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                   onChange={handleCaptcha}
                  />
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
                  I consent to processing of my personal data entered above.
                </label>
              </div>

              {/* Privacy policy link */}
              <div className="flex items-center space-x-2">
                <label className="text-sm">
                  For further details on how your personal data will be processed and how your consent can be managed, refer to the{" "}
                  <a href="/privacy-policy" className="underline hover:text-gray-300">
                    Balihans Privacy policy
                  </a>
                </label>
              </div>
            
              {/* Submit button with loading state */}
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





// import React, { useState } from "react";
// import ReCAPTCHA from "react-google-recaptcha";
// import { Check, X} from 'lucide-react';

// /*
//  * This component renders a full-page contact form with the following features:
//  * - Form validation for required fields
//  * - Google reCAPTCHA integration for spam prevention
//  * - Responsive design with mobile-first approach
//  * - Real-time form state management
//  * - Error handling and success notifications
//  * - Custom styling with Tailwind CSS
//  * 
//  * @returns {JSX.Element} A contact form component with background image and gradient overlay
//  */

// const ContactUsMainDiv = () => {
//   // Form state management using useState hook
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     industry: "",
//     message: "",
//   });

//   // State for managing reCAPTCHA verification
//   const [captchaValue, setCaptchaValue] = useState(null);
//   // State for managing notification display and content
//   const [notification, setNotification] = useState({ show: false, message: "", type: "" });
//   // State for tracking form submission status
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   /**
//    * Handles form input changes and updates the form state
//    * @param {Object} e - The event object from the input change
//    */
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   /**
//    * Handles reCAPTCHA verification
//    * @param {string} value - The verification token from reCAPTCHA
//    */
//   const handleCaptcha = (value) => {
//     setCaptchaValue(value);
//   };

//   /**
//    * Displays a notification toast message
//    * @param {string} message - The message to display
//    * @param {string} type - The type of notification ('success' or 'error')
//    */
//   const showNotification = (message, type) => {
//     setNotification({ show: true, message, type });
//     // Auto-hide notification after 5 seconds
//     setTimeout(() => {
//       setNotification({ show: false, message: "", type: "" });
//     }, 5000);
//   };

//   /**
//    * Handles form submission
//    * @param {Object} e - The form submission event
//    */
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validate reCAPTCHA
//     if (!captchaValue) {
//         showNotification("Please complete the reCAPTCHA", "error");
//         return;
//     }

//     setIsSubmitting(true);

//     try {
//         // Send form data to the API endpoint
//         const response = await fetch(`${process.env.REACT_APP_API_URL}/api/contact`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ ...formData, captchaValue }),
//         });

//         if (response.ok) {
//             // Handle successful submission
//             showNotification("Thank you for contacting us. We'll get back to you shortly over email", "success");
//             // Reset form state
//             setFormData({
//                 name: "",
//                 email: "",
//                 industry: "",
//                 message: "",
//             });
//             setCaptchaValue(null);
//         } else {
//             // Handle API error response
//             showNotification("Failed to send message. Please try again later.", "error");
//         }
//     } catch (error) {
//         console.error("Error submitting form:", error);
//         showNotification("An error occurred. Please try again later.", "error");
//     } finally {
//         setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="relative min-h-screen lg:min-h-[850px] text-white w-full">
//     {/* Grayscale background container */}
//     <div 
//       className="absolute inset-0 w-full h-full"
//       style={{
//         backgroundImage: `url('https://res.cloudinary.com/dnijlfi48/image/upload/v1734518437/Untitled_design_34_xjrkwz.webp')`,
//         filter: 'grayscale(100%)',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         zIndex: 0
//       }}
//     />    
//       {/* Notification Toast - Displays success/error messages */}
//       {notification.show && (
//         <div
//           className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg ${
//             notification.type === 'success' 
//               ? 'bg-green-100 text-green-800 border border-green-200' 
//               : 'bg-red-100 text-red-800 border border-red-200'
//           }`}
//         >
//           <div className="flex items-center">
//             {/* Success/Error icons */}
//             <span className="mr-2">
//               {notification.type === 'success' ? (
//                 <Check className="w-6 h-6 text-white" />
//               ) : (
//                 <X className="w-6 h-6 text-white" />
//               )}
//             </span>
//             {notification.message}
//           </div>
//         </div>
//       )}

//       {/* Background gradient overlay for better text visibility */}       
//       <div className="absolute inset-0 bg-gradient-to-l from-black to-transparent"></div>        
      
//       {/* Main content container */}
//       <div className="relative z-10 max-w-full mt-12 md:mt-0 px-4 py-16 sm:px-6 lg:px-20 xl:px-36">
//         {/* Section header */}
//         <div className="flex justify-end items-start">
//           <div className="max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl w-full pl-6">
//             <div className="flex gap-4 text-left font-bold text-base sm:text-lg lg:text-2xl">
//               <h1>TALK TO AN EXPERT</h1>
//             </div>
//           </div>
//         </div>

//         {/* Decorative horizontal rule */}
//         <div className="flex justify-end items-start">
//           <hr className="w-full my-6" />
//         </div>

//         {/* Form container */}
//         <div className="flex justify-end items-start">
//           <div className="flex flex-col w-full max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl p-6 rounded-md relative">
//             {/* Form description */}
//             <div>
//               <p className="mb-4 text-sm">
//                 Before connecting you with the right expert, we'll need a few details
//                 to understand your specific needs better. *Mandatory fields
//               </p>
//             </div>

//             {/* Contact form */}
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {/* Name and Email fields row */}
//               <div className="flex space-x-4">
//                 {/* Name input */}
//                 <div className="flex-1">
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     placeholder="Name*"
//                     required
//                     className="w-full p-2 rounded border border-white bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white/50"
//                     disabled={isSubmitting}
//                   />
//                 </div>

//                 {/* Email input */}
//                 <div className="flex-1">
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="Email*"
//                     required
//                     className="w-full p-2 rounded border border-white bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white/50"
//                     disabled={isSubmitting}
//                   />
//                 </div>
//               </div>

//               {/* Industry dropdown */}
//               <div>
//                 <select
//                   id="industry"
//                   name="industry"
//                   value={formData.industry}
//                   onChange={handleChange}
//                   required
//                   className="w-full p-2 rounded border border-white bg-transparent text-white placeholder-white appearance-none focus:outline-none focus:ring-2 focus:ring-white/50"
//                   disabled={isSubmitting}
//                 >
//                   <option value="" disabled className="bg-transparent text-white">Industry*</option>
//                   {/* Industry options with consistent styling */}
//                   <option value="banking-and-financial-services" className="bg-black text-white">Banking & Financial Services</option>
//                   <option value="communications-and-information-services" className="bg-black text-white">Communications & Information Services</option>
//                   <option value="energy-resources-utilities" className="bg-black text-white">Energy, Resources & Utilities</option>
//                   <option value="healthcare-and-lifesciences" className="bg-black text-white">Healthcare & Life Sciences</option>
//                   <option value="high-tech" className="bg-black text-white">High-Tech</option>
//                   <option value="hospitality" className="bg-black text-white">Hospitality</option>
//                   <option value="insurance" className="bg-black text-white">Insurance</option>
//                   <option value="manufacturing" className="bg-black text-white">Manufacturing</option>
//                   <option value="media-and-entertainment" className="bg-black text-white">Media & Entertainment</option>
//                   <option value="professional-services" className="bg-black text-white">Professional Services</option>
//                   <option value="Retail-and-consumer-goods" className="bg-black text-white">Retail & Consumer Goods</option>
//                   <option value="travel-and-logistics" className="bg-black text-white">Travel & Logistics</option>
//                   <option value="transportation" className="bg-black text-white">Transportation</option>
//                   <option value="other" className="bg-black text-white">Other</option>
//                 </select>
//               </div>

//               {/* Message textarea */}
//               <div>
//                 <textarea
//                   id="message"
//                   name="message"
//                   rows="4"
//                   value={formData.message}
//                   onChange={handleChange}
//                   placeholder="How can we help you?*"
//                   required
//                   className="w-full p-2 rounded border border-white bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white/50"
//                   disabled={isSubmitting}
//                 ></textarea>
//               </div>

//               {/* reCAPTCHA integration */}
//               <div>
//                 <ReCAPTCHA
//                   sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
//                   onChange={handleCaptcha}
//                 />
//               </div>

//               {/* Consent checkbox */}
//               <div className="flex items-center space-x-2">
//                 <input 
//                   type="checkbox" 
//                   id="consent" 
//                   className="h-5 w-5" 
//                   required
//                   disabled={isSubmitting}
//                 />
//                 <label htmlFor="consent" className="text-sm">
//                   I consent to processing of my personal data entered above.
//                 </label>
//               </div>

//               {/* Privacy policy link */}
//               <div className="flex items-center space-x-2">
//                 <label className="text-sm">
//                   For further details on how your personal data will be processed and how your consent can be managed, refer to the{" "}
//                   <a href="/privacy-policy" className="underline hover:text-gray-300">
//                     Balihans Privacy policy
//                   </a>
//                 </label>
//               </div>
            
//               {/* Submit button with loading state */}
//               <div>
//                 <button
//                   type="submit"
//                   className={`w-full py-2 px-4 bg-transparent border border-white rounded text-white font-semibold max-w-44 
//                     ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white hover:text-black transition-colors duration-300'}`}
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? 'Sending...' : 'Send'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactUsMainDiv;

