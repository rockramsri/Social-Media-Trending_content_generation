import React, { useState } from 'react';
import { Mail, Send, X, Check } from 'lucide-react';
import { ChatMessage } from '../types';
import { cn } from '../lib/utils';
import * as api from '../lib/api';

interface ChatProps {
  currentContentId: string | null;
  onContentUpdate: (content: any) => void;
}

export function Chat({ currentContentId, onContentUpdate }: ChatProps) {
  const [isOpen, setIsOpen] = useState(false);

  // 1. Load the chat with an initial bot message.
  //    This message will show up as soon as the chat is opened.
const contactInfo = "Here is the contact information for the specified companies, including LinkedIn profiles of their marketing team members:\n\n1. Hootsuite • Contact Page: https://www.hootsuite.com/about/contact-us • LinkedIn Profiles: • Trish Riswick: https://ca.linkedin.com/in/trish-riswick-779428108 • Eileen Kwok: https://ca.linkedin.com/in/eileen-kwok • Flavia Caroppo: https://www.linkedin.com/in/flavia-caroppo • Stacy Combest: https://www.linkedin.com/in/stacycombest • William R. Jones: https://www.linkedin.com/in/williamrjones13\n\n2. Buffer • Contact Page: https://buffer.com/contact • LinkedIn Profiles: • Michael Keckstein: https://au.linkedin.com/in/michaelkeckstein • Hailley Griffis: https://www.linkedin.com/in/hailleygriffis • Simon Heaton: https://ca.linkedin.com/in/heatonsimon • Courtney Seiter: https://www.linkedin.com/in/courtneyseiter • Carolyn Kopprasch: https://www.linkedin.com/in/carolynkopprasch\n\n3. Sprout Social • Contact Page: https://sproutsocial.com/contact-us/ • LinkedIn Profiles: • Stephan Hovnanian: https://www.linkedin.com/in/stephanhov • Scott Michael Morris: https://www.linkedin.com/in/scottmichaelmorris • Cari Ludietrich: https://www.linkedin.com/in/cariludietrich • Jessie O’Donnell: https://www.linkedin.com/in/jessieodonnell • Rachael Samuels: https://www.linkedin.com/in/rachaelsamuels\n\n4. SocialBee • Contact Page: https://socialbee.com/contact • LinkedIn Profiles: • Julia Bosio: https://www.linkedin.com/in/julia-bosio-247b1b85 • Anca Pop: https://ro.linkedin.com/in/anca-pop-9713b094 • Roxana Motoc: https://ro.linkedin.com/in/motocroxana • Ovidiu Negrean: https://de.linkedin.com/in/ovidiunegrean • Marie-Elisa Scheidt: https://de.linkedin.com/in/marie-elisa-scheidt-023307139\n\n5. Adobe (Adobe Analytics) • Contact Page: https://www.adobe.com/about-adobe/contact.html • LinkedIn Profiles: • Prashant Chillara: https://se.linkedin.com/in/prashant-chillara-a62a3913 • Nina Sringam: https://www.linkedin.com/in/ninasringam • Charmaine Sim: https://sg.linkedin.com/in/charmaine-sim-000037227 • Diane Guenot-Rebière: https://ca.linkedin.com/in/diane-guenot-rebi%C3%A8re-m-sc-b28382105 • Mohini Aggarwal: https://in.linkedin.com/in/mohini-aggarwal-5a131b134\n\n6. HubSpot • Contact Page: https://www.hubspot.com/company/contact • LinkedIn Profiles: • Devyn Bellamy: https://www.linkedin.com/in/devynbellamy • Kyle Jepson: https://www.linkedin.com/in/kyleanthonyjepson • Kieran Flanagan: https://ie.linkedin.com/in/kieranjflanagan • Champion Jr.: https://www.linkedin.com/in/championjr • Nash Holland: https://www.linkedin.com/in/nashvilleholland\n\n7. Mailchimp • Contact Page: https://mailchimp.com/contact • LinkedIn Profiles: • Greg Shum: https://www.linkedin.com/in/gshum • Troy Harris II: https://www.linkedin.com/in/troy-harris-ii-0a218b72 • Javier Molinos: https://www.linkedin.com/in/javiermolinos • LaShanda Jackson: https://www.linkedin.com/in/lashanda-jackson-a169667 • Mark DiCristina: https://www.linkedin.com/in/markdicristina\n\n8. Salesforce (Marketing Cloud) • Contact Page: https://www.salesforce.com/company/contact";


  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'initial-bot',
      message: contactInfo,
      isUser: false,
      timestamp: new Date(),
    },
  ]);

  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      message: input,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInput('');

    // Simulate API call
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    }).then((res) => res.json());

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        message: response.reply,
        isUser: false,
        timestamp: new Date(),
      },
    ]);
  };

  const handleConfirm = async () => {
    if (!currentContentId) return;

    try {
      const updatedContent = await api.confirmChatChanges({
        contentId: currentContentId,
        context: messages.map((m) => m.message).join('\n'),
      });

      onContentUpdate(updatedContent);
      setMessages([]);
      setIsOpen(false);
    } catch (error) {
      console.error('Error confirming chat changes:', error);
    }
  };

  return (
    <>
      {/* 2. Change the chat button icon to an email icon (Mail) */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-spotify-green text-white rounded-full flex items-center justify-center hover:bg-opacity-80 transition-colors shadow-lg hover:shadow-xl"
      >
        <Mail size={24} />
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-spotify-darkgray rounded-xl shadow-xl flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-spotify-black/20">
            <h3 className="text-white font-semibold">Promotion Content Support</h3>
            <div className="flex gap-2">
              <button
                onClick={handleConfirm}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-spotify-green text-white hover:bg-opacity-80 transition-colors"
                title="Confirm changes"
              >
                <Check size={18} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-spotify-black/20 text-spotify-lightgray hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-spotify-black/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  'max-w-[80%] p-3 rounded-lg shadow-md',
                  msg.isUser
                    ? 'bg-spotify-green ml-auto'
                    : 'bg-spotify-darkgray'
                )}
              >
                <p className="text-white">{msg.message}</p>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-spotify-black/20 bg-spotify-darkgray">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 bg-spotify-black text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-spotify-green shadow-inner"
              />
              <button
                onClick={sendMessage}
                className="w-10 h-10 bg-spotify-green text-white rounded-full flex items-center justify-center hover:bg-opacity-80 transition-colors shadow-md hover:shadow-lg"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}