"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Menu } from "lucide-react";

const sections = [
  { id: "introduction", title: "Introduction" },
  { id: "getting-started", title: "Getting Started" },
  { id: "site-management", title: "Site Management" },
  { id: "inventory", title: "Inventory" },
  { id: "material-tracking", title: "Material Tracking" },
  { id: "project-collaboration", title: "Project Collaboration" },
  { id: "authentication", title: "Authentication" },
];

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("introduction");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen">
        {/* Sidebar (Collapsible on Mobile) */}
        <aside
          className={`fixed inset-y-0 left-0 z-20 w-64 bg-gray-100 p-6 border-r transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-64"
          } md:translate-x-0 transition-transform ease-in-out duration-300 md:relative md:w-64`}
        >
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute mt-21 top-4 right-4 translate-x-15 md:hidden"
          >
            <Menu size={24} />
          </button>

          <h2 className="text-lg font-bold mb-4">Documentation</h2>
          <nav className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                className={`block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-200 transition ${
                  activeSection === section.id ? "bg-gray-300 font-bold" : ""
                }`}
                onClick={() => {
                  setActiveSection(section.id);
                  setSidebarOpen(false); // Close sidebar on mobile when a section is selected
                }}
              >
                {section.title}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10 ml-10 md:ml-64">
          {sections.map(({ id, title }) => (
            <section
              key={id}
              className={`${activeSection === id ? "block" : "hidden"}`}
            >
              <h1 className="text-2xl font-bold">{title}</h1>
              <p className="mt-4">{getSectionContent(id)}</p>
            </section>
          ))}
        </main>
      </div>
    </>
  );
}

// Function to return section content dynamically
function getSectionContent(id: string) {
  const content: Record<string, string> = {
    introduction:
      "Welcome to the documentation for the Site Management System. This guide will walk you through all the features of the platform.",
    "getting-started":
      "To begin using the system, create an account and log in. Once authenticated, you can manage construction sites, track inventory, and collaborate on projects.",
    "site-management":
      "Create, update, and delete construction sites. Each site has associated material tracking and project details.",
    inventory:
      "Keep track of materials stored in your warehouse. Easily add these materials to sites when needed.",
    "material-tracking":
      "Log materials delivered to each site and track their usage over time.",
    "project-collaboration":
      "Invite team members to your site projects using their email. They will have access to the site on their dashboard.",
    authentication: "Secure login and authentication system using Firebase.",
  };
  return content[id] || "No content available.";
}
