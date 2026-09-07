import React from "react";

const TechnicalSkills: React.FC = () => {
  return (
    <div className="component-section component-content">
      <div className="container">
        <div className="component-title">
          <h2>Technical Skills</h2>
        </div>

        <div className="multi-lists">
          <div className="multi-lists-section card">
            <h4>Sitecore</h4>
            <ul>
              <li>Sitecore XP 9.x &amp; 10.x</li>
              <li>Sitecore XM Cloud</li>
              <li>Sitecore SXA</li>
              <li>JSS / Headless</li>
              <li>Helix architecture</li>
              <li>Content Hub / DAM Connector</li>
              <li>Sitecore Search</li>
            </ul>
          </div>
          <div className="multi-lists-section card">
            <h4>Sitecore Modules &amp; Tools</h4>
            <ul>
              <li>Sitecore Forms &amp; Webhooks</li>
              <li>Sitecore Connect</li>
              <li>Content Serialization (SCS)</li>
              <li>PowerShell Extensions (SPE)</li>
              <li>Experience Edge / GraphQL</li>
              <li>Sitecore Stream</li>
            </ul>
          </div>
          <div className="multi-lists-section card">
            <h4>Cloud &amp; DevOps</h4>
            <ul>
              <li>Microsoft Azure (AZ-204)</li>
              <li>Docker</li>
              <li>Azure DevOps pipelines</li>
              <li>XM Cloud Deploy</li>
              <li>Git</li>
            </ul>
          </div>
        </div>

        <div className="multi-lists">
          <div className="multi-lists-section card">
            <h4>Backend</h4>
            <ul>
              <li>.NET / C#</li>
              <li>ASP.NET MVC</li>
              <li>Web API</li>
              <li>MSSQL Server</li>
            </ul>
          </div>
          <div className="multi-lists-section card">
            <h4>Frontend</h4>
            <ul>
              <li>JavaScript</li>
              <li>jQuery</li>
              <li>Next.js / React (headless)</li>
              <li>SCSS / CSS</li>
            </ul>
          </div>
          <div className="multi-lists-section card">
            <h4>Search</h4>
            <ul>
              <li>Sitecore Search (API / Feed crawlers)</li>
              <li>Solr (SXA)</li>
              <li>Coveo for Sitecore</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalSkills;
