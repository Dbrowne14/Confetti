import CalendarMain from "@/components/calendar/CalendarMain";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-280 px-4 py-6 sm:px-6 lg:py-8">
      {/* Two-column grid on desktop: the second column is intentionally left
          empty to reserve space for the upcoming sidebar (Next up / Pick a day). */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <CalendarMain />
      </div>
    </main>
  );
}
