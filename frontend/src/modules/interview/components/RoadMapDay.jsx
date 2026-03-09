import Badge from "./Badge";

export default function RoadMapDay({ day }) {
  return (
    <div>
      <h3 className="flex items-center gap-2 tracking-tight font-semibold">
        <Badge>Day {day.day}</Badge>
        {day.focus}
      </h3>
      <ul className="ml-4 list-disc mt-2 flex flex-col gap-1">
        {day.tasks.map((t, i) => (
          <li className="text-gray-400 text-sm" key={i}>
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}
