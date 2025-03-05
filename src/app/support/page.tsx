"use client";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";

export default function SupportPage() {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <div className="container flex flex-col mx-auto p-4">
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="mb-4 w-20 cursor-pointer"
        >
          ← Back
        </Button>
        <Label className="text-2xl font-bold mx-auto mb-4 mt-10">Support</Label>
        <Card className="mx-40">
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              If you need assistance or have any queries, feel free to reach out
              to us.
            </p>
            <div className="mb-4">
              <strong>Email:</strong>{" "}
              <a href="mailto:77gautham@gmail.com" className="text-blue-500">
                77gautham@gmail.com
              </a>
            </div>
            <div className="mb-4">
              <strong>Phone:</strong> +91 9207757005
            </div>
            <div className="mb-4">
              <strong>Working Hours:</strong> Monday - Friday, 5:00 PM - 10:00
              PM (IST)
            </div>
            <p>
              We aim to respond to all inquiries within 24 hours. Thank you for
              reaching out!
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
