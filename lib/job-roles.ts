// Comprehensive job roles database with keywords for matching
export const JOB_ROLES = [
  // Engineering
  "Software Engineer",
  "Senior Software Engineer",
  "Staff Software Engineer",
  "Principal Software Engineer",
  "Frontend Engineer",
  "Backend Engineer",
  "Full Stack Engineer",
  "Mobile Engineer",
  "iOS Engineer",
  "Android Engineer",
  "Embedded Systems Engineer",
  "Firmware Engineer",
  "Hardware Engineer",
  "VLSI Engineer",
  "FPGA Engineer",
  // DevOps / Platform / SRE
  "DevOps Engineer",
  "Senior DevOps Engineer",
  "Lead DevOps Engineer",
  "Platform Engineer",
  "Site Reliability Engineer",
  "SRE",
  "Cloud Engineer",
  "Cloud Architect",
  "Infrastructure Engineer",
  "MLOps Engineer",
  "Release Engineer",
  "Build Engineer",
  "Automation Engineer",
  // Data
  "Data Engineer",
  "Senior Data Engineer",
  "Data Scientist",
  "Senior Data Scientist",
  "Data Analyst",
  "Business Analyst",
  "ML Engineer",
  "Machine Learning Engineer",
  "AI Engineer",
  "Research Scientist",
  "Applied Scientist",
  "NLP Engineer",
  "Computer Vision Engineer",
  "BI Engineer",
  "Analytics Engineer",
  // Security
  "Security Engineer",
  "Application Security Engineer",
  "Cloud Security Engineer",
  "Cybersecurity Analyst",
  "Penetration Tester",
  "SOC Analyst",
  "Security Architect",
  // Architecture / Leadership
  "Solutions Architect",
  "Enterprise Architect",
  "Technical Architect",
  "Engineering Manager",
  "VP of Engineering",
  "CTO",
  "Director of Engineering",
  "Principal Architect",
  // Product / Design
  "Product Manager",
  "Senior Product Manager",
  "Product Designer",
  "UX Designer",
  "UI Designer",
  "UX Researcher",
  "Design Lead",
  // QA
  "QA Engineer",
  "SDET",
  "Test Engineer",
  "Automation Test Engineer",
  // Network
  "Network Engineer",
  "Network Architect",
  "Network Administrator",
  // Database
  "Database Administrator",
  "DBA",
  "Database Engineer",
  // Sales / Marketing / Business
  "Sales Engineer",
  "Technical Account Manager",
  "Customer Success Manager",
  "Solutions Engineer",
  "Pre-Sales Engineer",
  // Manufacturing-specific
  "Manufacturing Engineer",
  "Process Engineer",
  "Quality Engineer",
  "Industrial Engineer",
  "Mechanical Engineer",
  "Electrical Engineer",
  "Controls Engineer",
  "Robotics Engineer",
  "Supply Chain Analyst",
  "Operations Manager",
  "Plant Manager",
  "Lean Engineer",
  "Six Sigma Engineer",
  "Systems Engineer",
  "Test & Validation Engineer",
  "Reliability Engineer",
  "Aerospace Engineer",
  "Avionics Engineer",
  "Propulsion Engineer",
  "Structural Engineer",
  "Materials Scientist",
  "Chemical Engineer",
  "Environmental Engineer",
  "Safety Engineer",
  // IT General
  "IT Administrator",
  "System Administrator",
  "Help Desk Analyst",
  "Technical Support Engineer",
  "IT Manager",
  "ERP Consultant",
  "SAP Consultant",
  "Salesforce Developer",
  // Finance / HR
  "Financial Analyst",
  "HR Manager",
  "Talent Acquisition Specialist",
  "Recruiter",
  "Program Manager",
  "Project Manager",
  "Scrum Master",
  "Agile Coach",
] as const;

export type JobRole = (typeof JOB_ROLES)[number];

// Map job role keywords to company career page search URLs
export function buildJobSearchUrl(
  company: { name: string; slug: string; careersUrl: string },
  jobTitle: string
): string {
  const encoded = encodeURIComponent(jobTitle);
  const careersUrl = company.careersUrl;

  const patterns: Record<string, (q: string) => string> = {
    apple: (q) => `https://jobs.apple.com/en-us/search?search=${q}`,
    microsoft: (q) => `https://jobs.careers.microsoft.com/global/en/search?q=${q}`,
    alphabet: (q) => `https://www.google.com/about/careers/applications/jobs/results/?q=${q}`,
    amazon: (q) => `https://www.amazon.jobs/en/search?base_query=${q}`,
    meta: (q) => `https://www.metacareers.com/jobs?q=${q}`,
    ibm: (q) => `https://www.ibm.com/careers/search?keywords=${q}`,
    intel: (q) => `https://jobs.intel.com/en/search-jobs/${q}`,
    cisco: (q) => `https://jobs.cisco.com/jobs/SearchJobs/${q}`,
    oracle: (q) => `https://careers.oracle.com/jobs/#en/sites/jobsearch/requisitions?keyword=${q}`,
    salesforce: (q) => `https://careers.salesforce.com/en/jobs/?search=${q}`,
    adobe: (q) => `https://careers.adobe.com/us/en/search-results?keywords=${q}`,
    nvidia: (q) => `https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite?q=${q}`,
    amd: (q) => `https://careers.amd.com/careers-home/jobs?keywords=${q}`,
    hp: (q) => `https://jobs.hp.com/search-jobs/${q}`,
    "dell-technologies": (q) => `https://jobs.dell.com/search-jobs/${q}`,
    sap: (q) => `https://jobs.sap.com/search/?q=${q}`,
    accenture: (q) => `https://www.accenture.com/us-en/careers/jobsearch?jkwd=${q}`,
    tcs: (q) => `https://ibegin.tcs.com/iBegin/jobs/search?jobTitle=${q}`,
    infosys: (q) => `https://career.infosys.com/joblist?technology=${q}`,
    wipro: (q) => `https://careers.wipro.com/careers-home/jobs?keywords=${q}`,
    hcltech: (q) => `https://www.hcltech.com/careers/search-jobs?keyword=${q}`,
    capgemini: (q) => `https://www.capgemini.com/careers/join-capgemini/search-jobs/?q=${q}`,
    cognizant: (q) => `https://careers.cognizant.com/global/en/search-results?keywords=${q}`,
    "dxc-technology": (q) => `https://careers.dxc.com/global/en/search-results?keywords=${q}`,
    servicenow: (q) => `https://careers.servicenow.com/jobs?keywords=${q}`,
    siemens: (q) => `https://jobs.siemens.com/careers?search=${q}`,
    "general-electric": (q) => `https://jobs.gecareers.com/global/en/search-results?keywords=${q}`,
    "3m": (q) => `https://www.3m.com/3M/en_US/careers-us/all-us-jobs/?q=${q}`,
    caterpillar: (q) => `https://careers.caterpillar.com/en/jobs/?q=${q}`,
    boeing: (q) => `https://jobs.boeing.com/search-jobs/${q}`,
    "lockheed-martin": (q) => `https://www.lockheedmartinjobs.com/search-jobs/${q}`,
    "northrop-grumman": (q) => `https://www.northropgrumman.com/careers/search-jobs/?q=${q}`,
    honeywell: (q) => `https://careers.honeywell.com/us/en/search-results?keywords=${q}`,
    "john-deere": (q) => `https://jobs.deere.com/global/en/search-results?keywords=${q}`,
    "ford-motor-company": (q) => `https://www.ford.com/careers/jobs/?q=${q}`,
    "general-motors": (q) => `https://search-careers.gm.com/en/jobs/?q=${q}`,
    tesla: (q) => `https://www.tesla.com/careers/search?query=${q}`,
    toyota: (q) => `https://careers.toyota.com/us/en/search-results?keywords=${q}`,
    volkswagen: (q) => `https://www.volkswagenag.com/en/group/careers.html?q=${q}`,
    "bmw-group": (q) => `https://www.bmwgroup.jobs/global/en/search-results.html?q=${q}`,
    "mercedes-benz-group": (q) => `https://group.mercedes-benz.com/careers/job-search/?q=${q}`,
    "hyundai-motor-company": (q) => `https://talent.hyundai.com/jobs/search?keyword=${q}`,
    abb: (q) => `https://careers.abb/global/en/search-results?keywords=${q}`,
    "schneider-electric": (q) => `https://careers.se.com/global/jobs?q=${q}`,
    emerson: (q) => `https://hdjq.fa.us2.oraclecloud.com/hcmUI/CandidateExperience/en/sites/emersonrecruiting/requisitions?keyword=${q}`,
    eaton: (q) => `https://jobs.eaton.com/jobs?keywords=${q}`,
    whirlpool: (q) => `https://careers.whirlpool.com/jobs?keywords=${q}`,
    "lg-electronics": (q) => `https://www.lg.com/global/careers/search?keyword=${q}`,
    panasonic: (q) => `https://careers.na.panasonic.com/jobs?keywords=${q}`,
    bosch: (q) => `https://jobs.bosch.com/jobs?q=${q}`,
  };

  const pattern = patterns[company.slug];
  if (pattern) return pattern(encoded);
  if (careersUrl.includes("?")) return `${careersUrl}&q=${encoded}`;
  return `${careersUrl}?q=${encoded}`;
}

// ─── Logo resolution with multiple fallbacks ───────────────────────────────

// Manual overrides for companies where auto-detection fails
const LOGO_OVERRIDES: Record<string, string> = {
  apple:                "https://www.apple.com/favicon.ico",
  microsoft:            "https://img.icons8.com/color/96/microsoft.png",
  alphabet:             "https://img.icons8.com/color/96/google-logo.png",
  amazon:               "https://img.icons8.com/color/96/amazon.png",
  meta:                 "https://img.icons8.com/color/96/meta.png",
  ibm:                  "https://img.icons8.com/color/96/ibm.png",
  intel:                "https://img.icons8.com/color/96/intel.png",
  cisco:                "https://img.icons8.com/color/96/cisco.png",
  oracle:               "https://img.icons8.com/color/96/oracle-logo.png",
  salesforce:           "https://img.icons8.com/color/96/salesforce.png",
  adobe:                "https://img.icons8.com/color/96/adobe.png",
  nvidia:               "https://img.icons8.com/color/96/nvidia.png",
  amd:                  "https://img.icons8.com/color/96/amd.png",
  hp:                   "https://img.icons8.com/color/96/hp.png",
  "dell-technologies":  "https://img.icons8.com/color/96/dell.png",
  sap:                  "https://img.icons8.com/color/96/sap.png",
  accenture:            "https://img.icons8.com/color/96/accenture.png",
  tesla:                "https://img.icons8.com/color/96/tesla-logo.png",
  toyota:               "https://img.icons8.com/color/96/toyota.png",
  boeing:               "https://img.icons8.com/color/96/boeing.png",
  siemens:              "https://img.icons8.com/color/96/siemens.png",
  "general-electric":   "https://img.icons8.com/color/96/general-electric.png",
  bosch:                "https://img.icons8.com/color/96/bosch.png",
  "bmw-group":          "https://img.icons8.com/color/96/bmw.png",
  "mercedes-benz-group":"https://img.icons8.com/color/96/mercedes-benz.png",
  volkswagen:           "https://img.icons8.com/color/96/volkswagen.png",
  samsung:              "https://img.icons8.com/color/96/samsung.png",
  "lg-electronics":     "https://img.icons8.com/color/96/lg-electronics.png",
  panasonic:            "https://img.icons8.com/color/96/panasonic.png",
  honeywell:            "https://img.icons8.com/color/96/honeywell.png",
};

// Returns ordered list of URLs to try for a given company
export function getLogoUrls(slug: string, websiteUrl: string): string[] {
  const urls: string[] = [];

  // 1. Manual override first (most reliable)
  if (LOGO_OVERRIDES[slug]) {
    urls.push(LOGO_OVERRIDES[slug]);
  }

  // 2. Google's favicon service (very reliable, works for all domains)
  try {
    const domain = new URL(websiteUrl).hostname.replace("www.", "");
    urls.push(`https://www.google.com/s2/favicons?domain=${domain}&sz=64`);
    // 3. Clearbit as additional fallback
    urls.push(`https://logo.clearbit.com/${domain}`);
    // 4. DuckDuckGo favicon
    urls.push(`https://icons.duckduckgo.com/ip3/${domain}.ico`);
  } catch {
    // ignore bad URLs
  }

  return urls;
}

// Fuzzy match job roles for autocomplete
export function matchJobRoles(query: string): string[] {
  if (!query || query.length < 2) return [];
  const q = query.toLowerCase();
  return JOB_ROLES.filter(
    (role) =>
      role.toLowerCase().includes(q) ||
      role.toLowerCase().startsWith(q)
  ).slice(0, 8);
}
