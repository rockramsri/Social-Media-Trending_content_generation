import React from 'react';
import { BarChart2 } from 'lucide-react';
import { Recommendation } from '../types';
import { cn } from '../lib/utils';

interface SidebarProps {
  recommendations: Recommendation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function Sidebar({ recommendations, selectedId, onSelect }: SidebarProps) {
  return (
    <div className="w-64 bg-spotify-black h-full p-4">
      <div className="bg-spotify-darkgray rounded-xl shadow-lg p-4 h-full">
        <h2 className="text-spotify-green font-bold text-xl mb-4">Recommendations</h2>
        <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-8rem)]">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              onClick={() => onSelect(rec.id)}
              className={cn(
                "p-4 rounded-lg cursor-pointer transition-all shadow-md",
                "hover:bg-opacity-70 hover:shadow-lg",
                selectedId === rec.id 
                  ? "bg-spotify-green text-white" 
                  : "bg-spotify-black text-white"
              )}
            >
              <h3 className="font-semibold mb-2">{rec.title}</h3>
              <p className={cn(
                "text-sm line-clamp-2 mb-3",
                selectedId === rec.id 
                  ? "text-white/80" 
                  : "text-spotify-lightgray"
              )}>
                {rec.transcript}
              </p>
              
              {/* Analytics Preview */}
              <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                <div className="flex items-center gap-1">
                  <BarChart2 size={12} className="text-spotify-green" />
                  <span className={selectedId === rec.id ? "text-white/80" : "text-spotify-lightgray"}>
                    {rec.analytics.postImpressions} views
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className={selectedId === rec.id ? "text-white/80" : "text-spotify-lightgray"}>
                    +{rec.analytics.followers} followers
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}