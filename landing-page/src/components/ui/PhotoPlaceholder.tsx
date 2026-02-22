interface PhotoPlaceholderProps {
  description: string;
  aspectRatio?: string;
  className?: string;
}

// Local photos (downloaded from Google Drive to public/photos/)
const PHOTO_MAP: Record<string, string> = {
  // Drone/Aerial
  "drone-aerial": "/photos/drone-aerial.jpg",
  "drone-pool": "/photos/drone-pool.jpg",
  "drone-backyard": "/photos/drone-backyard.jpg",
  "drone-neighborhood": "/photos/drone-neighborhood.jpg",
  // Interior
  "game-room": "/photos/game-room.jpg",
  "game-room-2": "/photos/game-room-2.jpg",
  "entryway": "/photos/entryway.jpg",
  "living-room-pool": "/photos/living-room-pool.jpg",
  "living-fireplace": "/photos/living-fireplace.jpg",
  "kitchen": "/photos/kitchen.jpg",
  "kitchen-dining": "/photos/kitchen-dining.jpg",
  "bedroom-blue": "/photos/bedroom-blue.jpg",
  "bedroom-green": "/photos/bedroom-green.jpg",
  "bedroom-tropical": "/photos/bedroom-tropical.jpg",
  "bedroom-full": "/photos/bedroom-full.jpg",
  "bathroom": "/photos/bathroom.jpg",
};

// Match description keywords to photos
function findPhoto(description: string): string | null {
  const d = description.toLowerCase();
  if (d.includes("chi ta") && d.includes("professional")) return PHOTO_MAP["drone-pool"];
  if (d.includes("split image") || d.includes("tax")) return null; // keep placeholder for conceptual images
  if (d.includes("game room") || d.includes("glow") || d.includes("arcade")) return PHOTO_MAP["game-room"];
  if (d.includes("exterior") || d.includes("curb")) return PHOTO_MAP["drone-backyard"];
  if (d.includes("pool") || d.includes("resort")) return PHOTO_MAP["drone-pool"];
  if (d.includes("master bedroom") || d.includes("premium bedding")) return PHOTO_MAP["bedroom-blue"];
  if (d.includes("kitchen") || d.includes("dining")) return PHOTO_MAP["kitchen-dining"];
  if (d.includes("outdoor") || d.includes("deck") || d.includes("bbq") || d.includes("fire pit")) return PHOTO_MAP["living-room-pool"];
  if (d.includes("themed") || d.includes("kids") || d.includes("instagram")) return PHOTO_MAP["bedroom-tropical"];
  if (d.includes("hot tub") || d.includes("cinema")) return PHOTO_MAP["living-fireplace"];
  if (d.includes("aerial") || d.includes("collage") || d.includes("multiple")) return PHOTO_MAP["drone-neighborhood"];
  if (d.includes("screenshot") || d.includes("app") || d.includes("dashboard")) return null; // keep placeholder
  if (d.includes("testimonial") || d.includes("headshot") || d.includes("social proof")) return null;
  if (d.includes("chi ta") && d.includes("standing")) return PHOTO_MAP["drone-aerial"];
  if (d.includes("luxury") && d.includes("interior")) return PHOTO_MAP["entryway"];
  return PHOTO_MAP["drone-pool"]; // fallback to best shot
}

export function PhotoPlaceholder({ description, aspectRatio = "16/9", className = "" }: PhotoPlaceholderProps) {
  const photoUrl = findPhoto(description);
  
  if (photoUrl) {
    return (
      <div
        className={`relative overflow-hidden rounded-lg ${className}`}
        style={{ aspectRatio }}
      >
        <img
          src={photoUrl}
          alt={description}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }

  // Fallback placeholder for photos we don't have yet
  return (
    <>
      <div
        className={`relative overflow-hidden rounded-lg border border-gold/20 bg-gradient-to-br from-navy-800 via-navy-700 to-navy-800 flex items-center justify-center ${className}`}
        style={{ aspectRatio }}
      >
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold/40" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold/40" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold/40" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold/40" />
        
        <div className="text-center px-6 py-4">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gold/10 flex items-center justify-center">
            <svg className="w-6 h-6 text-gold/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
            </svg>
          </div>
          <p className="text-gold/50 text-sm font-body font-medium tracking-wide uppercase">
            [PHOTO: {description}]
          </p>
        </div>
      </div>
    </>
  );
}
