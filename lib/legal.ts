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
      "Clients may request access to, correction of, or deletion of their personal data by contacting legal@roborns.com. Roborns handles personal data with the Digital Personal Data Protection Act, 2023 in view. A named data protection officer is still to be appointed.",
      "This site stores a theme preference in your browser. It does not set advertising cookies.",
    ],
  },
  {
    id: "sla",
    title: "Service Level Agreement",
    paragraphs: [
      "Service levels, including any uptime target, are set in the individual contract. Roborns does not publish a site-wide uptime guarantee. Scheduled maintenance windows will be communicated with a minimum of 72 hours notice.",
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
  {
    id: "law",
    title: "Governing Law",
    paragraphs: [
      "These terms are governed by the laws of India. Subject to applicable law, the courts at Mangaluru, Karnataka, where the registered office is, have jurisdiction.",
    ],
  },
  {
    id: "directors",
    title: "Directors",
    paragraphs: [
      "TODO: director names and DINs are not published yet. Do not infer them from the registered office or from any other page.",
    ],
  },
  {
    id: "disclaimer",
    title: "Investment Disclaimer",
    paragraphs: [
      "Forward-looking figures on this website are design targets or plans and may change. Nothing on this website is an offer or solicitation of securities. Investor materials are available on request to eligible investors, by private placement only.",
    ],
  },
];
