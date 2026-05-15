"use client";

import { Event } from "@/types";

interface EventListProps {
  events: Event[];
  onDeleteEvent: (eventId: string) => void;
  onCloseMobile?: () => void;
}

export default function EventList({ events, onDeleteEvent, onCloseMobile }: EventListProps) {
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (dateA.getTime() !== dateB.getTime()) {
      return dateA.getTime() - dateB.getTime();
    }
    return a.time.localeCompare(b.time);
  });

  const groupedEvents = sortedEvents.reduce((acc, event) => {
    const dateKey = event.date.toDateString();
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(event);
    return acc;
  }, {} as Record<string, Event[]>);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Événements ({events.length})
        </h2>
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      {events.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p className="text-lg">Aucun événement</p>
          <p className="text-sm mt-2">Cliquez sur une date pour en ajouter un</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
          {Object.entries(groupedEvents).map(([dateKey, dayEvents]) => (
            <div key={dateKey} className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 pb-1">
                {new Date(dateKey).toLocaleDateString("fr-FR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  timeZone: "Africa/Kinshasa"
                })}
              </h3>
              <div className="space-y-2">
                {dayEvents.map((event) => (
                  <div
                    key={event.id}
                    className="p-3 rounded-lg border-l-4 shadow-sm hover:shadow-md transition-shadow"
                    style={{ borderLeftColor: event.color, backgroundColor: `${event.color}10` }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 dark:text-white text-sm">
                          {event.title}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                          🕐 {event.time}
                        </p>
                        {event.description && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                            {event.description}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => onDeleteEvent(event.id)}
                        className="ml-2 p-1 text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900 rounded transition-colors"
                        title="Supprimer"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
