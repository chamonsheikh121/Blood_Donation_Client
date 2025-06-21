import { useEffect, useRef, useState } from "react";

const faqData = [
  {
    question: "How can I borrow a book?",
    answer:
      "You can borrow a book by registering as a member and visiting the library to check out the books."
  },
  {
    question: "What is the borrowing period?",
    answer:
      "The standard borrowing period is 14 days. You can renew the book online if no one else has reserved it."
  },
  {
    question: "Are digital books available?",
    answer:
      "Yes, our library offers a wide selection of e-books accessible through our online portal."
  },
  {
    question: "Can I request new books?",
    answer:
      "Absolutely! Members can suggest new books via our request form available on the website."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const refs = useRef([]);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // This hook updates maxHeight for smooth height animation
  useEffect(() => {
    if (openIndex !== null) {
      const el = refs.current[openIndex];
      if (el) {
        el.style.maxHeight = el.scrollHeight + "px";
      }
    }
    // Close all others
    refs.current.forEach((el, idx) => {
      if (idx !== openIndex && el) {
        el.style.maxHeight = "0px";
      }
    });
  }, [openIndex]);

  return (
    <section className="max-w-4xl mx-auto my-20 px-4">
      <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
      <div className="space-y-6">
        {faqData.map(({ question, answer }, index) => (
          <div
            key={index}
            className="border rounded-md p-4 cursor-pointer bg-gray-50"
            onClick={() => toggleAnswer(index)}
          >
            <h3 className="text-xl font-semibold flex justify-between items-center">
              {question}
              <span>{openIndex === index ? "−" : "+"}</span>
            </h3>

            <div
              ref={(el) => (refs.current[index] = el)}
              className="overflow-hidden transition-all duration-500 ease-in-out max-h-0 opacity-0"
              style={{
                opacity: openIndex === index ? 1 : 0,
                transition: "opacity 0.3s ease",
              }}
            >
              <p className="mt-3 text-gray-700">{answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;