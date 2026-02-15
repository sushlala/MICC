export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-dark-border border-t-gold rounded-full animate-spin" />
        <p className="text-dark-muted text-sm">Loading...</p>
      </div>
    </div>
  );
}
