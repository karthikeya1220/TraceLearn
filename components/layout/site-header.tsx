import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Navbar } from "@/components/nav/navbar";
import { NotificationsPopover } from "@/components/layout/notifications-popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SiteHeaderProps {
  /** href of the nav link to mark as current. */
  activeHref?: string;
  className?: string;
}

export function SiteHeader({ activeHref, className }: SiteHeaderProps) {
  return (
    <header
      className={cn(
        "flex min-h-24 flex-wrap items-center justify-between gap-4 border-b border-neutral-900 px-6 py-4 sm:px-10 xl:px-15",
        className,
      )}
    >
      <Navbar activeHref={activeHref} />
      <div className="ml-auto flex items-center gap-5">
        <Show when="signed-in">
          <NotificationsPopover />
          <UserButton
            appearance={{ elements: { avatarBox: "size-10 rounded-none", avatarImage: "rounded-none" } }}
          />
        </Show>
        <Show when="signed-out">
          <SignInButton mode="modal">
            <Button variant="text" size="md">
              Sign in
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button size="md">Sign up</Button>
          </SignUpButton>
        </Show>
      </div>
    </header>
  );
}
