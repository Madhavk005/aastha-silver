export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        {/* Animated logo mark */}
        <div className="relative">
          <div className="w-12 h-12 rounded-full border border-foreground/10 flex items-center justify-center">
            <svg className="w-6 h-6 text-foreground/30 animate-pulse-subtle" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <div className="absolute inset-0 -m-1">
            <div className="w-14 h-14 rounded-full border-2 border-foreground/20 border-t-champagne animate-spin" />
          </div>
        </div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/30 font-medium" >
          Loading
        </p>
      </div>
    </div>
  );
}