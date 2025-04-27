import { SidebarTrigger } from "@/components/ui/sidebar";
import ThemeSwitch from "./theme-switch";
import UserMenu from "./user-menu";

export default function Header() {
  return (
    <div className="sticky top-0 z-10 flex flex-col">
      <header className="flex h-14 items-center gap-2 border-b bg-background justify-between px-4 lg:h-[60px]">
        <div>
          <SidebarTrigger className="*:size-5" />
        </div>
        <div className="flex items-center">
          <ThemeSwitch />
          <UserMenu />
        </div>
      </header>
    </div>
  );
}