"use client";

import { useState } from "react";
import { Check, UserPlus, X } from "lucide-react";

interface FriendRequestsProps {
  incomingFriendRequests: IncomingFriendRequest[];
  sessionId: string;
}

const FriendRequests: React.FC<FriendRequestsProps> = ({
  incomingFriendRequests,
  sessionId,
}) => {
  const [friendRequests, setFriendRequests] = useState<IncomingFriendRequest[]>(
    incomingFriendRequests
  );
  return (
    <>
      {friendRequests.length === 0 ? (
        <p className="text-sm text-zinc-500">Nothing to show here...</p>
      ) : (
        friendRequests.map((request) => (
          <div key={request.senderId} className="flex items-center gap-4">
            <UserPlus className="text-black" />
            <p className="text-lg font-medium">{request.senderEmail}</p>
            <button
              aria-label="accept friend"
              className="grid w-8 h-8 transition bg-indigo-600 rounded-full hover:bg-indigo-700 place-items-center hover:shadow-md"
            >
              <Check className="w-3/4 font-semibold text-white h-3/4" />
            </button>

            <button
              aria-label="deny friend"
              className="grid w-8 h-8 transition bg-red-600 rounded-full hover:bg-red-700 place-items-center hover:shadow-md"
            >
              <X className="w-3/4 font-semibold text-white h-3/4" />
            </button>
          </div>
        ))
      )}
    </>
  );
};

export default FriendRequests;
