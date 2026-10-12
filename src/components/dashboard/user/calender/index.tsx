"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CalendarWidget() {
    const today = new Date();
    const [currentDate, setCurrentDate] = useState(today);
    const [selectedDate, setSelectedDate] = useState<{
        year: number;
        month: number;
        day: number;
    }>({
        year: today.getFullYear(),
        month: today.getMonth(),
        day: today.getDate(),
    });

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const currentMonthLabel = `${monthNames[month]} ${year}`;
    const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

    // Total days in the month
    const totalDays = new Date(year, month + 1, 0).getDate();

    // First day index (Monday as starting day: 0=Mo, 1=Tu, ..., 6=Su)
    const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7;

    const handlePrevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    // Sample mock event days
    const eventDays = [15, 22];

    // Build calendar cells dynamically
    const calendarCells: {
        day: number | null;
        isSelected?: boolean;
        isEvent?: boolean;
    }[] = [];

    // Leading blanks before month start
    for (let i = 0; i < firstDayIndex; i++) {
        calendarCells.push({ day: null });
    }

    // Days in current month
    for (let d = 1; d <= totalDays; d++) {
        const isSelected =
            selectedDate.year === year &&
            selectedDate.month === month &&
            selectedDate.day === d;

        const isEvent = eventDays.includes(d) && !isSelected;

        calendarCells.push({
            day: d,
            isSelected,
            isEvent,
        });
    }

    return (
        <div className="rounded-2xl bg-[#121212] border border-[#1E1E1E] p-5 h-full flex flex-col justify-between">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white tracking-wide">
                    {currentMonthLabel}
                </h3>
                <div className="flex items-center gap-1.5 text-gray-500">
                    <button
                        type="button"
                        onClick={handlePrevMonth}
                        className="p-1 hover:text-white transition-colors cursor-pointer"
                        aria-label="Previous Month"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={handleNextMonth}
                        className="p-1 hover:text-white transition-colors cursor-pointer"
                        aria-label="Next Month"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            {/* Days of week */}
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {daysOfWeek.map((day) => (
                    <span
                        key={day}
                        className="text-[11px] font-medium text-gray-500 uppercase"
                    >
                        {day}
                    </span>
                ))}
            </div>

            {/* Date grid */}
            <div className="grid grid-cols-7 gap-y-2 gap-x-1 text-center place-items-center">
                {calendarCells.map((cell, index) => {
                    if (!cell.day) {
                        return <div key={`empty-${index}`} className="w-9 h-9" />;
                    }

                    if (cell.isSelected) {
                        return (
                            <div
                                key={`${year}-${month}-${cell.day}`}
                                onClick={() =>
                                    setSelectedDate({ year, month, day: cell.day! })
                                }
                                className="w-9 h-9 rounded-2xl bg-gradient-to-r from-[#FF2E86] to-[#FF7A1A] text-white font-bold text-xs flex items-center justify-center shadow-lg shadow-[#FF2E86]/35 cursor-pointer transition-all scale-105"
                            >
                                {cell.day}
                            </div>
                        );
                    }

                    if (cell.isEvent) {
                        return (
                            <div
                                key={`${year}-${month}-${cell.day}`}
                                onClick={() =>
                                    setSelectedDate({ year, month, day: cell.day! })
                                }
                                className="w-9 h-9 rounded-2xl bg-[#28131E] border border-primary/40 text-primary font-semibold text-xs flex flex-col items-center justify-center relative cursor-pointer hover:bg-primary/20 transition-colors"
                            >
                                <span>{cell.day}</span>
                                <span className="w-1 h-1 rounded-full bg-primary absolute bottom-1.5" />
                            </div>
                        );
                    }

                    return (
                        <div
                            key={`${year}-${month}-${cell.day}`}
                            onClick={() =>
                                setSelectedDate({ year, month, day: cell.day! })
                            }
                            className="w-9 h-9 rounded-lg text-xs font-medium text-gray-400 flex items-center justify-center hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                        >
                            {cell.day}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}


