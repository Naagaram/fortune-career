import { PrismaClient, CompanyCategory } from "@prisma/client";

const prisma = new PrismaClient();

type CompanySeed = {
  name: string;
  slug: string;
  industry: string;
  category: CompanyCategory;
  headquarters: string;
  description: string;
  careersUrl: string;
  websiteUrl: string;
};

const companies: CompanySeed[] = [
  { name: "Apple", slug: "apple", industry: "Consumer Electronics", category: "IT", headquarters: "Cupertino, California, USA", description: "Designs consumer hardware, software, and cloud services for global markets.", careersUrl: "https://jobs.apple.com/en-us/search", websiteUrl: "https://www.apple.com" },
  { name: "Microsoft", slug: "microsoft", industry: "Cloud & Software", category: "IT", headquarters: "Redmond, Washington, USA", description: "Builds enterprise software, developer tools, and cloud platforms.", careersUrl: "https://jobs.careers.microsoft.com/global/en/search", websiteUrl: "https://www.microsoft.com" },
  { name: "Alphabet", slug: "alphabet", industry: "Internet Services", category: "IT", headquarters: "Mountain View, California, USA", description: "Parent company of Google with products in search, cloud, and AI.", careersUrl: "https://www.google.com/about/careers/applications/jobs/results", websiteUrl: "https://abc.xyz" },
  { name: "Amazon", slug: "amazon", industry: "E-Commerce & Cloud", category: "IT", headquarters: "Seattle, Washington, USA", description: "Operates global e-commerce and cloud computing services.", careersUrl: "https://www.amazon.jobs/en/search", websiteUrl: "https://www.amazon.com" },
  { name: "Meta", slug: "meta", industry: "Social Platforms", category: "IT", headquarters: "Menlo Park, California, USA", description: "Develops social media products and immersive technologies.", careersUrl: "https://www.metacareers.com/jobs", websiteUrl: "https://about.meta.com" },
  { name: "IBM", slug: "ibm", industry: "Enterprise IT", category: "IT", headquarters: "Armonk, New York, USA", description: "Provides consulting, hybrid cloud, and enterprise software.", careersUrl: "https://www.ibm.com/careers/search", websiteUrl: "https://www.ibm.com" },
  { name: "Intel", slug: "intel", industry: "Semiconductors", category: "IT", headquarters: "Santa Clara, California, USA", description: "Designs and manufactures semiconductor and computing technologies.", careersUrl: "https://jobs.intel.com/en/search-jobs", websiteUrl: "https://www.intel.com" },
  { name: "Cisco", slug: "cisco", industry: "Networking", category: "IT", headquarters: "San Jose, California, USA", description: "Builds networking, security, and collaboration infrastructure.", careersUrl: "https://jobs.cisco.com/jobs/SearchJobs", websiteUrl: "https://www.cisco.com" },
  { name: "Oracle", slug: "oracle", industry: "Enterprise Software", category: "IT", headquarters: "Austin, Texas, USA", description: "Delivers enterprise applications, databases, and cloud services.", careersUrl: "https://careers.oracle.com/jobs", websiteUrl: "https://www.oracle.com" },
  { name: "Salesforce", slug: "salesforce", industry: "CRM Software", category: "IT", headquarters: "San Francisco, California, USA", description: "Provides customer relationship and cloud platform solutions.", careersUrl: "https://careers.salesforce.com/en/jobs", websiteUrl: "https://www.salesforce.com" },
  { name: "Adobe", slug: "adobe", industry: "Creative Software", category: "IT", headquarters: "San Jose, California, USA", description: "Creates digital media and marketing software products.", careersUrl: "https://careers.adobe.com/us/en/search-results", websiteUrl: "https://www.adobe.com" },
  { name: "NVIDIA", slug: "nvidia", industry: "AI & GPUs", category: "IT", headquarters: "Santa Clara, California, USA", description: "Builds accelerated computing platforms for AI and graphics.", careersUrl: "https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite", websiteUrl: "https://www.nvidia.com" },
  { name: "AMD", slug: "amd", industry: "Semiconductors", category: "IT", headquarters: "Santa Clara, California, USA", description: "Designs high-performance CPUs and GPUs for computing workloads.", careersUrl: "https://careers.amd.com/careers-home/jobs", websiteUrl: "https://www.amd.com" },
  { name: "HP", slug: "hp", industry: "Computing Hardware", category: "IT", headquarters: "Palo Alto, California, USA", description: "Develops personal systems, printers, and enterprise devices.", careersUrl: "https://jobs.hp.com/search-jobs", websiteUrl: "https://www.hp.com" },
  { name: "Dell Technologies", slug: "dell-technologies", industry: "IT Infrastructure", category: "IT", headquarters: "Round Rock, Texas, USA", description: "Offers servers, storage, PCs, and cloud solutions.", careersUrl: "https://jobs.dell.com/search-jobs", websiteUrl: "https://www.dell.com" },
  { name: "SAP", slug: "sap", industry: "Enterprise Applications", category: "IT", headquarters: "Walldorf, Germany", description: "Builds enterprise software for finance and operations.", careersUrl: "https://jobs.sap.com/search", websiteUrl: "https://www.sap.com" },
  { name: "Accenture", slug: "accenture", industry: "IT Services", category: "IT", headquarters: "Dublin, Ireland", description: "Provides consulting and technology implementation services.", careersUrl: "https://www.accenture.com/us-en/careers/jobsearch", websiteUrl: "https://www.accenture.com" },
  { name: "TCS", slug: "tcs", industry: "IT Services", category: "IT", headquarters: "Mumbai, India", description: "Global provider of IT services and digital transformation.", careersUrl: "https://www.tcs.com/careers", websiteUrl: "https://www.tcs.com" },
  { name: "Infosys", slug: "infosys", industry: "IT Services", category: "IT", headquarters: "Bengaluru, India", description: "Provides next-generation digital consulting and services.", careersUrl: "https://career.infosys.com", websiteUrl: "https://www.infosys.com" },
  { name: "Wipro", slug: "wipro", industry: "IT Services", category: "IT", headquarters: "Bengaluru, India", description: "Offers IT consulting, engineering, and operations services.", careersUrl: "https://careers.wipro.com/careers-home", websiteUrl: "https://www.wipro.com" },
  { name: "HCLTech", slug: "hcltech", industry: "IT Services", category: "IT", headquarters: "Noida, India", description: "Provides digital, engineering, and cloud services globally.", careersUrl: "https://www.hcltech.com/careers", websiteUrl: "https://www.hcltech.com" },
  { name: "Capgemini", slug: "capgemini", industry: "Consulting & IT", category: "IT", headquarters: "Paris, France", description: "Delivers transformation through strategy, technology, and engineering.", careersUrl: "https://www.capgemini.com/careers/join-capgemini/search-jobs", websiteUrl: "https://www.capgemini.com" },
  { name: "Cognizant", slug: "cognizant", industry: "IT Services", category: "IT", headquarters: "Teaneck, New Jersey, USA", description: "Provides digital engineering and enterprise modernization services.", careersUrl: "https://careers.cognizant.com/global/en/search-results", websiteUrl: "https://www.cognizant.com" },
  { name: "DXC Technology", slug: "dxc-technology", industry: "IT Services", category: "IT", headquarters: "Ashburn, Virginia, USA", description: "Offers enterprise technology services and modernization.", careersUrl: "https://careers.dxc.com/global/en/search-results", websiteUrl: "https://dxc.com" },
  { name: "ServiceNow", slug: "servicenow", industry: "Workflow Software", category: "IT", headquarters: "Santa Clara, California, USA", description: "Builds cloud workflow automation platforms for enterprises.", careersUrl: "https://careers.servicenow.com/jobs", websiteUrl: "https://www.servicenow.com" },
  { name: "Siemens", slug: "siemens", industry: "Industrial Technology", category: "Manufacturing", headquarters: "Munich, Germany", description: "Develops industrial automation, mobility, and smart infrastructure.", careersUrl: "https://jobs.siemens.com/careers", websiteUrl: "https://www.siemens.com" },
  { name: "General Electric", slug: "general-electric", industry: "Industrial Manufacturing", category: "Manufacturing", headquarters: "Boston, Massachusetts, USA", description: "Builds technologies across aerospace, energy, and healthcare.", careersUrl: "https://jobs.gecareers.com/global/en", websiteUrl: "https://www.ge.com" },
  { name: "3M", slug: "3m", industry: "Diversified Manufacturing", category: "Manufacturing", headquarters: "Saint Paul, Minnesota, USA", description: "Manufactures products for safety, transportation, and healthcare.", careersUrl: "https://www.3m.com/3M/en_US/careers-us/", websiteUrl: "https://www.3m.com" },
  { name: "Caterpillar", slug: "caterpillar", industry: "Heavy Equipment", category: "Manufacturing", headquarters: "Irving, Texas, USA", description: "Manufactures construction and mining equipment worldwide.", careersUrl: "https://www.caterpillar.com/en/careers.html", websiteUrl: "https://www.caterpillar.com" },
  { name: "Boeing", slug: "boeing", industry: "Aerospace", category: "Manufacturing", headquarters: "Arlington, Virginia, USA", description: "Designs and manufactures commercial and defense aircraft.", careersUrl: "https://jobs.boeing.com", websiteUrl: "https://www.boeing.com" },
  { name: "Lockheed Martin", slug: "lockheed-martin", industry: "Defense Manufacturing", category: "Manufacturing", headquarters: "Bethesda, Maryland, USA", description: "Develops aerospace and defense systems for government clients.", careersUrl: "https://www.lockheedmartinjobs.com", websiteUrl: "https://www.lockheedmartin.com" },
  { name: "Northrop Grumman", slug: "northrop-grumman", industry: "Defense Manufacturing", category: "Manufacturing", headquarters: "Falls Church, Virginia, USA", description: "Builds autonomous systems, space, and defense technologies.", careersUrl: "https://www.northropgrumman.com/careers", websiteUrl: "https://www.northropgrumman.com" },
  { name: "Honeywell", slug: "honeywell", industry: "Industrial Engineering", category: "Manufacturing", headquarters: "Charlotte, North Carolina, USA", description: "Creates aerospace, automation, and building technologies.", careersUrl: "https://careers.honeywell.com/us/en", websiteUrl: "https://www.honeywell.com" },
  { name: "John Deere", slug: "john-deere", industry: "Agricultural Equipment", category: "Manufacturing", headquarters: "Moline, Illinois, USA", description: "Manufactures machinery for agriculture, construction, and forestry.", careersUrl: "https://jobs.deere.com/global/en", websiteUrl: "https://www.deere.com" },
  { name: "Ford Motor Company", slug: "ford-motor-company", industry: "Automotive", category: "Manufacturing", headquarters: "Dearborn, Michigan, USA", description: "Designs, manufactures, and sells automobiles and mobility services.", careersUrl: "https://corporate.ford.com/careers.html", websiteUrl: "https://www.ford.com" },
  { name: "General Motors", slug: "general-motors", industry: "Automotive", category: "Manufacturing", headquarters: "Detroit, Michigan, USA", description: "Builds vehicles and mobility solutions with global operations.", careersUrl: "https://search-careers.gm.com/en/jobs", websiteUrl: "https://www.gm.com" },
  { name: "Tesla", slug: "tesla", industry: "Automotive & Energy", category: "Manufacturing", headquarters: "Austin, Texas, USA", description: "Designs electric vehicles and sustainable energy systems.", careersUrl: "https://www.tesla.com/careers/search", websiteUrl: "https://www.tesla.com" },
  { name: "Toyota", slug: "toyota", industry: "Automotive", category: "Manufacturing", headquarters: "Toyota City, Japan", description: "Global automotive manufacturer focused on mobility and innovation.", careersUrl: "https://careers.toyota.com/us/en", websiteUrl: "https://www.toyota.com" },
  { name: "Volkswagen", slug: "volkswagen", industry: "Automotive", category: "Manufacturing", headquarters: "Wolfsburg, Germany", description: "Automotive group producing passenger and commercial vehicles.", careersUrl: "https://www.volkswagen-group.com/en/careers-15767", websiteUrl: "https://www.volkswagen-group.com" },
  { name: "BMW Group", slug: "bmw-group", industry: "Automotive", category: "Manufacturing", headquarters: "Munich, Germany", description: "Manufactures premium automobiles and motorcycles.", careersUrl: "https://www.bmwgroup.jobs", websiteUrl: "https://www.bmwgroup.com" },
  { name: "Mercedes-Benz Group", slug: "mercedes-benz-group", industry: "Automotive", category: "Manufacturing", headquarters: "Stuttgart, Germany", description: "Produces luxury vehicles, vans, and mobility technologies.", careersUrl: "https://group.mercedes-benz.com/careers", websiteUrl: "https://group.mercedes-benz.com" },
  { name: "Hyundai Motor Company", slug: "hyundai-motor-company", industry: "Automotive", category: "Manufacturing", headquarters: "Seoul, South Korea", description: "Designs and manufactures passenger vehicles and mobility services.", careersUrl: "https://talent.hyundai.com", websiteUrl: "https://www.hyundai.com" },
  { name: "ABB", slug: "abb", industry: "Industrial Automation", category: "Manufacturing", headquarters: "Zurich, Switzerland", description: "Supplies electrification and automation technologies.", careersUrl: "https://careers.abb/global/en", websiteUrl: "https://global.abb" },
  { name: "Schneider Electric", slug: "schneider-electric", industry: "Energy Management", category: "Manufacturing", headquarters: "Rueil-Malmaison, France", description: "Provides energy management and automation solutions.", careersUrl: "https://careers.se.com/global/jobs", websiteUrl: "https://www.se.com" },
  { name: "Emerson", slug: "emerson", industry: "Industrial Automation", category: "Manufacturing", headquarters: "St. Louis, Missouri, USA", description: "Delivers industrial software and automation systems.", careersUrl: "https://hdjq.fa.us2.oraclecloud.com/hcmUI/CandidateExperience/en/sites/emersonrecruiting", websiteUrl: "https://www.emerson.com" },
  { name: "Eaton", slug: "eaton", industry: "Power Management", category: "Manufacturing", headquarters: "Dublin, Ireland", description: "Manufactures power management technologies for industrial use.", careersUrl: "https://jobs.eaton.com/jobs", websiteUrl: "https://www.eaton.com" },
  { name: "Whirlpool", slug: "whirlpool", industry: "Home Appliances", category: "Manufacturing", headquarters: "Benton Harbor, Michigan, USA", description: "Produces consumer home appliances for global markets.", careersUrl: "https://careers.whirlpool.com", websiteUrl: "https://www.whirlpoolcorp.com" },
  { name: "LG Electronics", slug: "lg-electronics", industry: "Electronics Manufacturing", category: "Manufacturing", headquarters: "Seoul, South Korea", description: "Builds consumer electronics, appliances, and mobility components.", careersUrl: "https://www.lg.com/global/careers", websiteUrl: "https://www.lg.com" },
  { name: "Panasonic", slug: "panasonic", industry: "Electronics Manufacturing", category: "Manufacturing", headquarters: "Osaka, Japan", description: "Manufactures electronics, battery, and industrial solutions.", careersUrl: "https://careers.na.panasonic.com", websiteUrl: "https://www.panasonic.com" },
  { name: "Bosch", slug: "bosch", industry: "Engineering & Manufacturing", category: "Manufacturing", headquarters: "Gerlingen, Germany", description: "Produces mobility, industrial, and consumer technology solutions.", careersUrl: "https://jobs.bosch.com", websiteUrl: "https://www.bosch.com" }
];

async function main() {
  await prisma.company.createMany({
    data: companies,
    skipDuplicates: true
  });

  console.log(`Seeded ${companies.length} companies`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
