import React from "react";
import Chat from "./Chat";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Messages",
};

export default function MessagesPage() {
  return <Chat />;
}
