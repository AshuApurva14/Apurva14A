import React from "react";
import { eachDayOfInterval, startOfYear, endOfYear, format, getDay, addDays } from "date-fns";
import "./Heatmap.css";

const generateContributionData = () => {
  const start = startOfYear(new Date());
  const end = endOfYear(new Date());
  const days = eachDayOfInterval({ start, end });

  return days.map(date => ({
    date,
    count: Math.floor(Math.random() * 5), // mock data 0-4
  }));
};

const getColor = (count) => {
  if (count === 0) return "#ebedf0";
  if (count === 1) return "#9be9a8";
  if (count === 2) return "#40c463";
  if (count === 3) return "#30a14e";
  return "#216e39";
};

const Heatmap = () => {
  const data = generateContributionData();

  const weeks = [];
  for (let i = 0; i < 53; i++) {
    weeks.push([]);
  }

  data.forEach(day => {
    const week = Math.floor((day.date - startOfYear(new Date())) / (7 * 24 * 60 * 60 * 1000));
    const dayIndex = getDay(day.date);
    weeks[week].push({ ...day, dayIndex });
  });

  return (
    <div className="heatmap">
      {weeks.map((week, i) => (
        <div key={i} className="week">
          {[...Array(7)].map((_, dayIdx) => {
            const day = week.find(d => d.dayIndex === dayIdx);
            const color = day ? getColor(day.count) : "#fff";
            return (
              <div
                key={dayIdx}
                title={day ? `${format(day.date, "yyyy-MM-dd")}: ${day.count} commits` : ""}
                className="day"
                style={{ backgroundColor: color }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Heatmap;
