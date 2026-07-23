export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
        <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 font-medium">Loading</p>
      </div>
    </div>
  );
}
