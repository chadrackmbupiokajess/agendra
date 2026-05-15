"use client";

import { useState } from "react";
import Calendar from "@/components/Calendar";
import EventModal from "@/components/EventModal";
import EventList from "@/components/EventList";
import { Event } from "@/types";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleSaveEvent = (event: Event) => {
    // Convertir la date au fuseau horaire RDC (Kinshasa)
    const rdcDate = new Date(
      event.date.toLocaleString("en-US", { timeZone: "Africa/Kinshasa" })
    );
    const eventWithRDCTimezone = { ...event, date: rdcDate };
    setEvents([...events, eventWithRDCTimezone]);
    setIsModalOpen(false);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(e => e.id !== eventId));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Header Mobile */}
        <div className="lg:hidden bg-white dark:bg-gray-800 shadow-md p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            Mon Agenda
          </h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            {isSidebarOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Sidebar - Mobile Menu */}
        <div className={`
          fixed inset-y-0 left-0 z-50 w-80 bg-white dark:bg-gray-800 shadow-2xl transform transition-transform duration-300 ease-in-out lg:relative lg:transform-none lg:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:block lg:w-80 lg:min-h-screen lg:border-r lg:border-gray-200 dark:lg:border-gray-700
        `}>
          <div className="p-4 lg:p-6">
            <h1 className="hidden lg:block text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Mon Agenda
            </h1>
            <EventList
              events={events}
              onDeleteEvent={handleDeleteEvent}
              onCloseMobile={() => setIsSidebarOpen(false)}
            />
          </div>
        </div>

        {/* Overlay pour mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 md:p-6">
            <Calendar
              onDateClick={handleDateClick}
              events={events}
              onDeleteEvent={handleDeleteEvent}
            />
          </div>
        </div>
      </div>

      {isModalOpen && selectedDate && (
        <EventModal
          date={selectedDate}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveEvent}
        />
      )}
    </main>
  );
}
