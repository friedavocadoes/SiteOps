"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";

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

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-100 p-6 border-r">
          <h2 className="text-xl font-bold mb-4">Documentation</h2>
          <nav className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                className={`block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-200 transition ${
                  activeSection === section.id ? "bg-gray-300 font-bold" : ""
                }`}
                onClick={() => setActiveSection(section.id)}
              >
                {section.title}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-10">
          {activeSection === "introduction" && (
            <section>
              <h1 className="text-2xl font-bold">Introduction</h1>
              <p className="mt-4">
                Welcome to the documentation for the Site Management System.
                This guide will walk you through all the features of the
                platform.
              </p>
            </section>
          )}

          {activeSection === "getting-started" && (
            <section>
              <h1 className="text-2xl font-bold">Getting Started</h1>
              <p className="mt-4">
                To begin using the system, create an account and log in. Once
                authenticated, you can manage construction sites, track
                inventory, and collaborate on projects.
              </p>
            </section>
          )}

          {activeSection === "site-management" && (
            <section>
              <h1 className="text-2xl font-bold">Site Management</h1>
              <p className="mt-4">
                Create, update, and delete construction sites. Each site has
                associated material tracking and project details.
              </p>
            </section>
          )}

          {activeSection === "inventory" && (
            <section>
              <h1 className="text-2xl font-bold">Inventory</h1>
              <p className="mt-4">
                Keep track of materials stored in your warehouse. Easily add
                these materials to sites when needed.
              </p>
            </section>
          )}

          {activeSection === "material-tracking" && (
            <section>
              <h1 className="text-2xl font-bold">Material Tracking</h1>
              <p className="mt-4">
                Log materials delivered to each site and track their usage over
                time.
              </p>
            </section>
          )}

          {activeSection === "project-collaboration" && (
            <section>
              <h1 className="text-2xl font-bold">Project Collaboration</h1>
              <p className="mt-4">
                Invite team members to your site projects using their email.
                They will have access to the site on their dashboard.
              </p>
            </section>
          )}

          {activeSection === "authentication" && (
            <section>
              <h1 className="text-2xl font-bold">Authentication</h1>
              <p className="mt-4">
                Secure login and authentication system using Firebase.
              </p>
            </section>
          )}
        </main>
      </div>
    </>
  );
}
