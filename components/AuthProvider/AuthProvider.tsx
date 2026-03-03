"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { checkSession, logout } from "@/lib/api/clientApi";

const PRIVATE_PATHS = ["/profile", "/notes"];

function isPrivatePath(pathname: string) {
  return PRIVATE_PATHS.some((p) => pathname.startsWith(p));
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const { setUser, clearIsAuthenticated, isAuthenticated } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const verify = async () => {
      setLoading(true);
      try {
        const user = await checkSession();
        if (user) {
          setUser(user);
        } else {
          clearIsAuthenticated();
          if (isPrivatePath(pathname)) {
            try {
              await logout();
            } catch {
              // ignore
            }
            router.push("/sign-in");
          }
        }
      } catch {
        clearIsAuthenticated();
        if (isPrivatePath(pathname)) {
          router.push("/sign-in");
        }
      } finally {
        setLoading(false);
      }
    };

    verify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (loading && isPrivatePath(pathname) && !isAuthenticated) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <p>Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
}