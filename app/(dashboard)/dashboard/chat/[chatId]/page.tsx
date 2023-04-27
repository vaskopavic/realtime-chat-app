import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import Image from "next/image";

import { authOptions } from "@/app/lib/auth";
import { fetchRedis } from "@/app/helpers/redis";
import { db } from "@/app/lib/db";
import { messageArraySchema } from "@/app/lib/validations/message";
import Messages from "@/app/components/Messages";
import ChatInput from "@/app/components/ChatInput";

interface ChatPageProps {
  params: {
    chatId: string;
  };
}

async function getChatMessages(chatId: string) {
  try {
    const results: string[] = await fetchRedis(
      "zrange",
      `chat:${chatId}:messages`,
      0,
      -1
    );

    const dbMessages = results.map((message) => JSON.parse(message) as Message);

    const reversedDbMessages = dbMessages.reverse();

    const messages = messageArraySchema.parse(reversedDbMessages);

    return messages;
  } catch (error) {
    notFound();
  }
}

const ChatPage = async ({ params }: ChatPageProps) => {
  const { chatId } = params;
  const session = await getServerSession(authOptions);

  if (!session) {
    notFound();
  }

  const { user } = session;

  const [userId1, userId2] = chatId.split("--");

  if (user.id !== userId1 && user.id !== userId2) {
    notFound();
  }

  const chatPartnerId = user.id === userId1 ? userId2 : userId1;
  const chatPartner = (await db.get(`user:${chatPartnerId}`)) as User;
  const initialMessages = await getChatMessages(chatId);

  return (
    <div className="flex-1 justify-between flex flex-col h-full max-h-[calc(100vh-6rem)]">
      <div className="flex justify-between py-3 border-b-2 border-gray-200 sm:items-center">
        <div className="relative flex items-center space-x-4">
          <div className="relative">
            <div className="relative w-8 h-8 sm:w-12 sm:h-12">
              <Image
                fill
                referrerPolicy="no-referrer"
                src={chatPartner.image}
                alt={`${chatPartner.name} profile picture`}
                className="rounded-full"
              />
            </div>
          </div>
          <div className="flex flex-col leading-tight">
            <div className="flex items-center text-xl">
              <span className="mr-3 font-semibold text-gray-700">
                {chatPartner.name}
              </span>
            </div>
            <span className="text-sm text-gray-600">{chatPartner.email}</span>
          </div>
        </div>
      </div>
      <Messages
        initialMessages={initialMessages}
        chatId={chatId}
        sessionId={session.user.id}
        sessionImg={session.user.image}
        chatPartner={chatPartner}
      />
      <ChatInput chatPartner={chatPartner} chatId={chatId} />
    </div>
  );
};

export default ChatPage;
