import partnerPrefeitura from '@/assets/partner-prefeitura.png';
import partnerJango from '@/assets/partner-jango.png';
import partnerBronzo from '@/assets/partner-bronzo.png';
import partnerMfries from '@/assets/partner-mfries.png';
import partnerMotocampo from '@/assets/partner-motocampo.png';
import partnerMahle from '@/assets/partner-mahle.png';
import partnerComber from '@/assets/partner-comber.png';

const partners = [
  { name: 'Prefeitura de Alto Araguaia', logo: partnerPrefeitura },
  { name: 'Agência Jango', logo: partnerJango },
  { name: 'Bronzo Uniformes', logo: partnerBronzo },
  { name: 'Agro M Fries', logo: partnerMfries },
  { name: 'Moto Campo', logo: partnerMotocampo },
  { name: 'Mahle Rede de Postos', logo: partnerMahle },
  { name: 'Comber', logo: partnerComber },
];

// Duplicate for seamless infinite scroll
const allPartners = [...partners, ...partners];

export const PartnersSection = () => {
  return (
    <section className="py-16 bg-background overflow-hidden">
      <div className="container-custom mx-auto mb-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-8 h-1 bg-primary" />
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Parceiros
            </span>
            <div className="w-8 h-1 bg-primary" />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl text-foreground font-bold mb-3">
            Empresas que Confiam em Nós
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Orgulho de trabalhar com grandes parceiros que acreditam na qualidade dos nossos serviços.
          </p>
        </div>
      </div>

      {/* Infinite scroll container */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="flex animate-scroll-partners gap-6 md:gap-12 w-max">
          {allPartners.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex-shrink-0 w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-card shadow-card flex items-center justify-center p-3 md:p-4 hover:shadow-card-hover hover:scale-105 transition-all duration-500"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
