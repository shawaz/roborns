export type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
};

export const LEGAL_UPDATED = "JANUARY 2026";

export const LEGAL_SECTIONS: LegalSection[] = [
  {
    id: "terms",
    title: "Terms of Service",
    paragraphs: [
      "By accessing or using Roborns infrastructure services, you agree to be bound by these terms. Our services encompass server co-location, desalinated water supply, and mineral extraction offtake contracts.",
      "All service agreements are subject to a minimum contract period as specified in individual offtake agreements. Early termination may incur fees as outlined in your service contract.",
      "Roborns reserves the right to modify service parameters with 30 days written notice. Clients may terminate agreements without penalty if modifications materially affect agreed service levels.",
    ],
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    paragraphs: [
      "Roborns collects only the information necessary to provide infrastructure services and maintain regulatory compliance. This includes contact details, usage metrics, and billing information.",
      "We do not sell, rent, or share personal data with third parties except as required by law or as necessary to deliver contracted services. All data is stored in accordance with applicable data protection regulations.",
      "Clients may request access to, correction of, or deletion of their personal data by contacting our data protection officer at legal@roborns.com.",
    ],
  },
  {
    id: "sla",
    title: "Service Level Agreement",
    paragraphs: [
      "Roborns guarantees 99.9% uptime for server infrastructure and continuous water supply as per contracted volumes. Scheduled maintenance windows will be communicated with a minimum of 72 hours notice.",
      "In the event of service disruption, Roborns will issue service credits proportional to the downtime experienced, calculated as a percentage of the monthly service fee.",
      "Force majeure events including natural disasters, government actions, or grid-level failures are excluded from SLA calculations. Roborns will make commercially reasonable efforts to restore services in all circumstances.",
    ],
  },
  {
    id: "ip",
    title: "Intellectual Property",
    paragraphs: [
      "All technology, processes, and systems developed by Roborns remain the exclusive intellectual property of Codelude Software Private Limited. Client use of these systems is limited to the scope defined in service agreements.",
      "Clients retain full ownership of their data and workloads hosted within Roborns facilities. Roborns will not access, analyze, or share client data except for the purpose of delivering contracted services.",
    ],
  },
];
