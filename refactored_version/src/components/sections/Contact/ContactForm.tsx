import React from 'react';

const ContactForm: React.FC = () => {
  return (
    <form>
      {/* Your form fields go here */}
      <input type="text" placeholder="Your Name" />
      <input type="email" placeholder="Your Email" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ContactForm;