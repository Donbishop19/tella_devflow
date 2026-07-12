"use client";

import { SheetClose } from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLinks = ({ isMobileNav = false, userId }: { isMobileNav?: boolean, userId?: string }) => {
  const pathname = usePathname();
  const normalizedPathname = pathname ? pathname.replace(/\/$/, "") || "/" : "/";

  return (
    <>
      {sidebarLinks.map((item) => {
        let linkRoute = item.route;

        if (item.route === "/profile") {
          if (userId) {
            linkRoute = `${item.route}/${userId}`;
          } else {
            return null;
          }
        }

        const normalizedRoute = linkRoute !== "/" ? linkRoute.replace(/\/$/, "") || "/" : "/";
        const isActive =
          normalizedPathname === normalizedRoute ||
          normalizedPathname.startsWith(`${normalizedRoute}/`);

        const LinkComponent = (
          <Link
            href={linkRoute}
            key={item.label}
            className={cn(
              isActive
                ? "primary-gradient rounded-lg text-light-900"
                : "text-dark300_light900",
              "flex items-center justify-start gap-4 bg-transparent p-4"
            )}
          >
            <Image
              src={item.imgURL}
              alt={item.label}
              width={20}
              height={20}
              className={cn({ "invert-colors": !isActive })}
            />
            <p
              className={cn(
                isActive ? "base-bold" : "base-medium",
                !isMobileNav && "max-lg:hidden"
              )}
            >
              {item.label}
            </p>
          </Link>
        );

        return isMobileNav ? (
          <SheetClose asChild key={linkRoute}>
            {LinkComponent}
          </SheetClose>
        ) : (
          <React.Fragment key={linkRoute}>{LinkComponent}</React.Fragment>
        );
      })}
    </>
  );
};

export default NavLinks;