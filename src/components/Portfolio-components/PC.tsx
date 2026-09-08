import React from "react";
import Link from "next/link";
import { withBasePath } from "@/lib/withBasePath";

const PC: React.FC = () => {
  return (
    <div className="component-section component-content">
      <div className="container">
        <div className="component-title">
          <h2>Publications & Contributions</h2>
        </div>
        <div className="component-content">
          <div className="promo icon-promo-card col-6">
            <div className="icon-image">
              <a
                href="https://insightswithpawantyagi.blogspot.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={withBasePath("/images/ds-blog-logo.png")}
                  alt="Insights With Me"
                />
              </a>
            </div>
            <div className="title">
              <h4>Insights With Me</h4>
            </div>
            <div className="promo-link-cta button">
              <a
                href="https://insightswithpawantyagi.blogspot.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Blog
              </a>
            </div>
          </div>
          <div className="promo icon-promo-card col-6">
            <div className="icon-image">
              <Link href="/blogs">
                <img src={withBasePath("/images/github-images.jpeg")} alt="Blog" />
              </Link>
            </div>
            <div className="title">
              <h4>Technical Blog</h4>
            </div>
            <div className="promo-link-cta button">
              <Link href="/blogs">View Posts</Link>
            </div>
          </div>
          <div className="promo icon-promo-card col-6">
            <div className="icon-image">
              <a
                href="https://www.linkedin.com/in/pawan-tyagi-6bb22357/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={withBasePath("/images/altudo-icon.png")} alt="Altudo" />
              </a>
            </div>
            <div className="title">
              <h4>LinkedIn</h4>
            </div>
            <div className="promo-link-cta button">
              <a
                href="https://www.linkedin.com/in/pawan-tyagi-6bb22357/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Profile
              </a>
            </div>
          </div>
          <div className="promo icon-promo-card col-6">
            <div className="icon-image">
              <a
                href="https://sitecore.stackexchange.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={withBasePath("/images/stack-exchange-sitecore.png")}
                  alt="Stack Exchange"
                />
              </a>
            </div>
            <div className="title">
              <h4>Sitecore Stack Exchange</h4>
            </div>
            <div className="promo-link-cta button">
              <a
                href="https://sitecore.stackexchange.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PC;
