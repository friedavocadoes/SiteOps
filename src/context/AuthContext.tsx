"use client";
import { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  UserCredential,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
  sendEmailVerification as firebaseSendEmailVerification, // Import sendEmailVerification
} from "firebase/auth";
import { auth } from "../app/firebase/config";

interface AuthContextType {
  user: User | null;
  loginWithGoogle: () => Promise<UserCredential>;
  loginWithGitHub: () => Promise<UserCredential>;
  loginWithEmail: (email: string, password: string) => Promise<UserCredential>;
  registerWithEmail: (
    email: string,
    password: string
  ) => Promise<UserCredential>;
  sendPasswordResetEmail: (email: string) => Promise<void>;
  sendEmailVerification: () => Promise<void>; // Add sendEmailVerification
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  // Google Login
  const loginWithGoogle = async (): Promise<UserCredential> => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  // GitHub Login
  const loginWithGitHub = async (): Promise<UserCredential> => {
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider);
  };

  // Email/Password Login
  const loginWithEmail = async (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Email/Password Registration
  const registerWithEmail = async (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Send Password Reset Email
  const sendPasswordResetEmail = async (email: string): Promise<void> => {
    return firebaseSendPasswordResetEmail(auth, email);
  };

  // Send Email Verification
  const sendEmailVerification = async (): Promise<void> => {
    if (auth.currentUser) {
      return firebaseSendEmailVerification(auth.currentUser);
    }
    throw new Error("No user is currently signed in.");
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginWithGoogle,
        loginWithGitHub,
        loginWithEmail,
        registerWithEmail,
        sendPasswordResetEmail,
        sendEmailVerification,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
