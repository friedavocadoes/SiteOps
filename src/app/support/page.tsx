"use client";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import Footer from "@/components/Footer";

export default function SupportPage() {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <div className="container flex flex-col items-center mx-auto p-4">
        {/* Back Button */}
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="mb-4 w-20 cursor-pointer self-start"
        >
          ← Back
        </Button>

        {/* Support Heading */}
        <Label className="text-2xl font-bold mb-6 mt-6 text-center">
          Support
        </Label>

        {/* Contact Card */}
        <Card className="w-full max-w-2xl p-4 md:p-6">
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm md:text-base">
              If you need assistance or have any queries, feel free to reach out
              to us.
            </p>
            <div className="mb-4 text-sm md:text-base">
              <strong>Email:</strong>{" "}
              <a href="mailto:77gautham@gmail.com" className="text-blue-500">
                77gautham@gmail.com
              </a>
            </div>
            <div className="mb-4 text-sm md:text-base">
              <strong>Phone:</strong> +91 xxxxxxxx
            </div>
            <div className="mb-4 text-sm md:text-base">
              <strong>Working Hours:</strong> Monday - Friday, 5:00 PM - 10:00
              PM (IST)
            </div>
            <p className="text-sm md:text-base">
              We aim to respond to all inquiries within 24 hours. Thank you for
              reaching out!
            </p>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
}
