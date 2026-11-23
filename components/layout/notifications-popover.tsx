"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, Check, Sparkles, BookOpen } from "lucide-react";
import Link from "next/link";
import { coursesHref, searchHref } from "@/lib/routes";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  href?: string;
  unread: boolean;
  type: "welcome" | "feature" | "course";
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "1",
    title: "Welcome to Vertex",
    message: "Search any topic in plain English to jump straight to exact lesson video timestamps.",
    time: "Just now",
    href: searchHref(""),
    unread: true,
    type: "welcome",
  },
  {
    id: "2",
    title: "Explore All Courses",
    message: "Browse 10 production-grade courses filtered by category and level.",
    time: "1 hour ago",
    href: coursesHref,
    unread: true,
    type: "course",
  },
  {
    id: "3",
    title: "Interactive Video Chapters",
    message: "Lessons now feature dedicated chapter markers and real-time dialogue transcripts.",
    time: "2 hours ago",
    unread: false,
    type: "feature",
  },
];

export function NotificationsPopover() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const containerRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-label="Notifications"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="relative rounded-xs text-neutral-900 transition-colors hover:text-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
      >
        <Bell className="size-6" strokeWidth={2} aria-hidden />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-primary-500 text-[10px] font-bold text-white shadow-xs">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-3 w-80 sm:w-96 rounded-none border border-neutral-900 bg-surface shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="text-[14px] font-semibold text-neutral-900">Notifications</span>
              {unreadCount > 0 && (
                <span className="rounded-full bg-primary-100 px-2 py-0.5 text-[11px] font-semibold text-primary-700">
                  {unreadCount} new
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="inline-flex items-center gap-1 text-[12px] font-medium text-neutral-500 hover:text-neutral-900"
              >
                <Check className="size-3.5" />
                <span>Mark all read</span>
              </button>
            )}
          </div>

          {/* Notifications List */}
          <ul className="max-h-80 divide-y divide-neutral-100 overflow-y-auto">
            {notifications.map((item) => {
              const content = (
                <div
                  className={`flex items-start gap-3 p-4 transition-colors hover:bg-neutral-50 ${
                    item.unread ? "bg-primary-50/30" : ""
                  }`}
                >
                  <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-neutral-100 text-neutral-700">
                    {item.type === "welcome" && <Sparkles className="size-4 text-primary-500" />}
                    {item.type === "course" && <BookOpen className="size-4 text-neutral-700" />}
                    {item.type === "feature" && <Bell className="size-4 text-neutral-500" />}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[13px] font-semibold text-neutral-900">{item.title}</p>
                      <span className="text-[11px] text-neutral-400 whitespace-nowrap">{item.time}</span>
                    </div>
                    <p className="mt-1 text-[12px] leading-4 text-neutral-600">{item.message}</p>
                  </div>

                  {item.unread && (
                    <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary-500" />
                  )}
                </div>
              );

              return (
                <li key={item.id}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block focus-visible:outline-none focus-visible:bg-neutral-100"
                    >
                      {content}
                    </Link>
                  ) : (
                    content
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
