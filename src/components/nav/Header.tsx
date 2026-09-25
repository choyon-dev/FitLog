"use client";

import { useState } from "react";
import { DeskHeader } from "./DeskHeader";
import { TabHeader } from "./TabHeader";
import { MobileHeader } from "./MobileHeader";
import MobileDrawer from "./MobileDrawer";
import type { HeaderProps } from "@/types/Types";

export function Header({ planCount = 0, savedCount = 0 }: HeaderProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#090a0f] border-b border-[#1c202a]">
      <div className="hidden lg:block">
        <DeskHeader planCount={planCount} savedCount={savedCount} />
      </div>

      <div className="hidden md:block lg:hidden">
        <TabHeader
          onOpenDrawer={() => setIsDrawerOpen(true)}
          planCount={planCount}
          savedCount={savedCount}
        />
      </div>

      <div className="md:hidden block">
        <MobileHeader
          onOpenDrawer={() => setIsDrawerOpen(true)}
          planCount={planCount}
          savedCount={savedCount}
        />
      </div>

      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        planCount={planCount}
        savedCount={savedCount}
      />
    </header>
  );
}

export default Header;
