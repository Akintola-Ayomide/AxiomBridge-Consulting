import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const contactItems = [
  {
    label: "Office",
    icon: MapPin,
    content: <address className="not-italic">{siteConfig.contact.address}</address>,
  },
  {
    label: "Email",
    icon: Mail,
    content: (
      <a
        href={`mailto:${siteConfig.contact.email}`}
        className="transition-colors hover:text-navy"
      >
        {siteConfig.contact.email}
      </a>
    ),
  },
  {
    label: "Telephone",
    icon: Phone,
    content: (
      <a
        href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
        className="transition-colors hover:text-navy"
      >
        {siteConfig.contact.phone}
      </a>
    ),
  },
  {
    label: "Office hours",
    icon: Clock,
    content: siteConfig.contact.hours,
  },
];

type ContactDetailsProps = {
  className?: string;
};

function ContactDetails({ className }: ContactDetailsProps) {
  return (
    <Card className={cn("p-6 md:p-8", className)}>
      <ul className="grid gap-6 sm:grid-cols-2">
        {contactItems.map((item) => {
          const Icon = item.icon;

          return (
            <li key={item.label} className="flex gap-3">
              <Icon
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-gold-dark"
              />
              <div>
                <p className="font-sans text-label-sm uppercase text-slate">
                  {item.label}
                </p>
                <div className="mt-1.5 font-sans text-body-md text-charcoal">
                  {item.content}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}

export { ContactDetails };
