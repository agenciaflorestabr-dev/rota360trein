import { Play } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  youtubeId: string;
}

const videos: Video[] = [
  {
    id: '1',
    title: 'Palestra de Direção defensiva',
    youtubeId: '3SBmENQ1OXI',
  },
];

export const VideoShowcase = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Play className="w-4 h-4" />
            Nossas Palestras
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Assista Nossas Palestras
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Confira os registros das palestras já realizadas pela Rota 360. Conteúdo de qualidade sobre segurança, trânsito e capacitação profissional.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {videos.map((video) => (
            <div key={video.id} className="group">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-border">
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                    loading="lazy"
                  />
                </div>
              </div>
              <p className="text-center text-foreground font-semibold mt-4 text-lg">
                {video.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
