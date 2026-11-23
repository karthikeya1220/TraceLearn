import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { PostHogUserIdentifier } from "@/components/posthog/posthog-user-identifier";
import { ProgressProvider } from "@/components/progress/progress-provider";
import "./globals.css";

/**
 * One family for the whole site. The width axis (62–125) is what gives Poster Studio
 * its voice: display utilities run it to 118–125% at weight 800, body text sits at
 * normal width/400. Weight is included by default by next/font.
 */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

export const metadata: Metadata = {
  title: "TraceLearn",
  description:
    "TraceLearn is a learning platform with search built in. Ask a question in plain English and land on the exact lesson — and the exact second — that answers it.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ClerkProvider>
          <PostHogUserIdentifier />
          <ProgressProvider>{children}</ProgressProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
