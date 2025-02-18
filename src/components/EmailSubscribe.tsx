import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

/**
 * 
 * This Form uses formspree to send the submitted email directly to fenster.js@gmail.com
 * https://formspree.io/forms/xgvorelo/integration 
 */

const EmailSubscribe: React.FC = () => {
  const [state, handleSubmit] = useForm("xgvorelo");

  if (state.succeeded) {
    return <p className="email-success-section">Thank you!  I will be in touch shortly. </p>;
  }

  return (
    <div className="email-subscribe-section">
      <form onSubmit={handleSubmit} className="email-form">
        <input
          id="email"
          type="email" 
          name="email"
          placeholder="Enter your email to join waitlist."
          className="email-input"
          required
        />
        <ValidationError 
          prefix="Email" 
          field="email"
          errors={state.errors}
        />
        <button type="submit" className="email-submit-button" disabled={state.submitting}>
          {state.submitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default EmailSubscribe;
