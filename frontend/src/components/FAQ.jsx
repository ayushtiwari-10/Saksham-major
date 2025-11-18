import React, { useState } from "react";
import "./FAQ.css";

const faqs = [
  {
    question: "What is Saksham?",
    answer:
      "Saksham is a digital platform designed to empower Indian homemakers by helping them learn, teach, and monetize their skills. It bridges the gap between talent and opportunity through an easy-to-use interface and AI-driven features.",
  },
  {
    question: "Who can join Saksham?",
    answer:
      "Anyone! Whether you’re a homemaker, student, or professional looking to share or learn new skills — Saksham welcomes all learners and educators.",
  },
  {
    question: "How can I teach on Saksham?",
    answer:
      "Once you create your profile as an instructor, you can list your courses, schedule classes (online or offline), and manage your students with our built-in scheduling and payment tools.",
  },
  {
    question: "Is Saksham available in regional languages?",
    answer:
      "Yes, Saksham supports multiple Indian languages and provides AI-assisted translations to make learning more inclusive and accessible.",
  },
  {
    question: "Are payments secure?",
    answer:
      "Absolutely. All transactions on Saksham are processed via secure, verified Indian gateways such as Razorpay and Cashfree.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              <span>{faq.question}</span>
              <span className="faq-icon">{activeIndex === index ? "−" : "+"}</span>
            </div>
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
