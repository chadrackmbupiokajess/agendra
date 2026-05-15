"use client";

import { useState, useEffect } from "react";
import { Event } from "@/types";

interface EventModalProps {
  date: Date;
  onClose: () => void;
  onSave: (event: Event) => void;
}

export default function EventModal({ date, onClose, onSave }: EventModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("09:00");
  const [color, setColor] = useState("#3b82f6");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const event: Event = {
      id: Date.now().toString(),
      title,
      description,
      date,
      time,
      color,
    };
    onSave(event);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 sm:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          Nouvel Événement
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
          {date.toLocaleDateString("fr-FR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "Africa/Kinshasa"
          })}
        </p>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Titre
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm sm:text-base"
              placeholder="Titre de l'événement"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm sm:text-base"
              rows={3}
              placeholder="Description de l'événement"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Heure
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Couleur
            </label>
            <div className="flex gap-2 flex-wrap">
              {["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"].map(
                (c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 ${
                      color === c ? "border-gray-900 dark:border-white" : "border-transparent"
                    }`}
                    style={{ backgroundColor: c }}
                  />
                )
              )}
            </div>
          </div>

          <div className="flex gap-2 sm:gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-3 sm:px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition-colors text-sm sm:text-base"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 px-3 sm:px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm sm:text-base"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
