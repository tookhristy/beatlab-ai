import { Youtube } from "lucide-react";

export function LessonVideo({ youtubeId, title }: { youtubeId: string; title: string }) {
  return (
    <div className="rounded-2xl border border-border bg-black overflow-hidden">
      <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <div className="flex items-center gap-2 px-4 py-2 text-xs text-muted-foreground border-t border-border">
        <Youtube className="w-3.5 h-3.5" />
        Official video by Image-Line, embedded via YouTube.
      </div>
    </div>
  );
}
