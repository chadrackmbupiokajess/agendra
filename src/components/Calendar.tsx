"use client";

import { useState } from "react";
import { Event } from "@/types";

interface CalendarProps {
  onDateClick: (date: Date) => void;
  events: Event[];
  onDeleteEvent: (eventId: string) => void;
}

export default function Calendar({ onDateClick, events, onDeleteEvent }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(
      (event) =>
        event.date.toDateString() === date.toDateString()
    );
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const days = getDaysInMonth(currentDate);
  const weekDays = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
  const monthNames = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

  const formatDate = (date: Date) => {
    return new Date(date.toLocaleString("en-US", { timeZone: "Africa/Kinshasa" }));
  };

  return (
    <div className="calendar">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevMonth}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
        >
          ←
        </button>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <button
          onClick={nextMonth}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center font-semibold text-gray-600 dark:text-gray-300 py-1 sm:py-2 text-xs sm:text-sm"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {days.map((day, index) => (
          <div
            key={index}
            onClick={() => day && onDateClick(day)}
            className={`
              min-h-16 sm:min-h-20 md:min-h-24 p-1 sm:p-2 rounded-lg border cursor-pointer transition-all
              ${day
                ? "bg-gray-50 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600 border-gray-200 dark:border-gray-600"
                : "bg-transparent border-transparent"
              }
            `}
          >
            {day && (
              <>
                <div className="font-medium text-gray-800 dark:text-white mb-1 text-sm sm:text-base">
                  {day.getDate()}
                </div>
                <div className="space-y-1">
                  {getEventsForDate(day).slice(0, 3).map((event) => (
                    <div
                      key={event.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteEvent(event.id);
                      }}
                      className="text-[10px] sm:text-xs p-0.5 sm:p-1 rounded text-white truncate"
                      style={{ backgroundColor: event.color }}
                      title={`${event.title} - ${event.time} (Cliquer pour supprimer)`}
                    >
                      {event.time} {event.title}
                    </div>
                  ))}
                  {getEventsForDate(day).length > 3 && (
                    <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                      +{getEventsForDate(day).length - 3} autres
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
