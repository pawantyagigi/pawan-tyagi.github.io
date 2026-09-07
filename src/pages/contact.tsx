import Breadcrumb from "@/components/Breadcrumb";
import ContactForm from "@/components/ContactForm";
import Layout from "@/components/Layout";
import WebsiteMetaBundle from "@/components/meta/WebsiteMetaBundle";
import TitleBanner from "@/components/TitleBanner";
import BlogTableOfContents from "@/components/blog/BlogTableOfContents";
import type { TocItem } from "@/lib/blogToc";

const CONTACT_TOC: TocItem[] = [
  { id: "send-a-message", text: "Send a message", level: 2 },
  { id: "get-in-touch", text: "Get in Touch", level: 2 },
  { id: "why-connect-with-me", text: "Why Connect with Me?", level: 2 },
  { id: "quick-note", text: "Quick Note", level: 2 },
];

const Contact = () => {
  return (
    <Layout>
      <WebsiteMetaBundle
        path="/contact"
        title="Contact"
        description="Have a question or want to connect? Visit my contact page to reach out to me directly. Whether you have blog-related inquiries or feedback, I’d love to hear from you!"
      />
      <TitleBanner title="Contact Me" />
      <Breadcrumb />
      <div className="container">
        <div className="container-fluid blog-body-layout">
          <div className="blog-container page-content">
            <p>
              Thank you for visiting my blog site! Whether you have a question,
              feedback you&apos;d like to discuss, I&apos;d love to hear from
              you.
            </p>

            <ContactForm />

            <h2 id="get-in-touch">Get in Touch</h2>
            <ul>
              <li>
                <strong>GitHub:</strong>{" "}
                <a
                  href="https://github.com/pawan-tyagi"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://github.com/pawan-tyagi
                </a>
              </li>
              <li>
                <strong>LinkedIn:</strong>{" "}
                <a
                  href="https://www.linkedin.com/in/pawan-tyagi-6bb22357/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.linkedin.com/in/pawan-tyagi-6bb22357/
                </a>
              </li>
            </ul>

            <h2 id="why-connect-with-me">Why Connect with Me?</h2>
            <ul>
              <li>
                <strong>Blog Feedback:</strong> Have suggestions or ideas for my
                blog? I’d love to hear how I can make it better for readers like
                you.
              </li>
              <li>
                <strong>Networking:</strong> Let’s connect to share ideas,
                learn, and grow together in the world of tech and blogging.
              </li>
            </ul>

            <h2 id="quick-note">Quick Note</h2>
            <p>
              To ensure a prompt response, please include a clear subject when
              you write — via the form above or LinkedIn.
            </p>
          </div>

          <aside className="blog-side-container" aria-label="On this page">
            <BlogTableOfContents items={CONTACT_TOC} />
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
