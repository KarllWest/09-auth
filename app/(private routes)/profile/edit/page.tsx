"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getMe, updateMe } from "@/lib/api/clientApi";
import { User } from "@/types/user";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./page.module.css";

export default function EditProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState("");
  const router = useRouter();
  const { setUser: setAuthUser } = useAuthStore();

  useEffect(() => {
    getMe()
      .then((data) => {
        setUser(data);
        setUsername(data.username);
      })
      .catch(() => router.push("/profile"));
  }, [router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updatedUser = await updateMe({ username });
      setAuthUser(updatedUser);
      router.push("/profile");
    } catch {
      // handle silently
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        {user?.avatar && (
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        )}

        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.push("/profile")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}