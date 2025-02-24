export const mockIssues = [
  {
    id: 1,
    title: "Education Support Needed for Slum Children",
    description: "Over 100 children in Indira Nagar slum area lack basic education access. Many have dropped out due to financial constraints. Need volunteers for evening classes and donations for books, uniforms, and basic supplies. Currently, only 30% of children attend school regularly.",
    urgencyLevel: "high",
    status: "in-progress",
    location: "Indira Nagar Slum Area",
    organization: "Shiksha Foundation",
    dateReported: "2024-03-15",
    contactPerson: "Anita Deshmukh",
    contactEmail: "anita.d@shiksha.org",
    contactPhone: "9876543210",
    category: "Education",
    impact: "Community",
    images: [
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=1000",
      "https://images.unsplash.com/photo-1511949860663-92c5c57d48a7?w=1000"
    ],
    updates: [
      {
        date: "2024-03-20",
        content: "Initial survey completed. 25 volunteers registered for teaching program."
      }
    ]
  },
  {
    id: 2,
    title: "Skill Development Center for Women",
    description: "Women in Lakshmi Nagar seeking employment opportunities. Need to establish skill development center for computer training, tailoring, and handicraft making. Already 50 women registered for training. Requires space, equipment, and trainers.",
    urgencyLevel: "medium",
    status: "open",
    location: "Lakshmi Nagar",
    organization: "Mahila Shakti Group",
    dateReported: "2024-03-10",
    contactPerson: "Seema Malhotra",
    contactEmail: "seema.m@mahilashakti.org",
    contactPhone: "9876543211",
    category: "Employment",
    impact: "Neighborhood",
    images: [
      "https://images.unsplash.com/photo-1489386659872-38f38b783d07?w=1000",
      "https://images.unsplash.com/photo-1556742393-f61743a3b1c9?w=1000"
    ],
    updates: []
  },
  {
    id: 3,
    title: "Healthcare Camp in Rural Area",
    description: "Urgent need for medical camp in Rampur village. Many elderly residents unable to travel to city hospitals. Need doctors, medicines, and basic medical equipment for weekly health checkups. Cases of diabetes and hypertension increasing.",
    urgencyLevel: "high",
    status: "in-progress",
    location: "Rampur Village",
    organization: "Rural Health Initiative",
    dateReported: "2024-03-08",
    contactPerson: "Dr. Suresh Yadav",
    contactEmail: "suresh.y@healthinit.org",
    contactPhone: "9876543212",
    category: "Healthcare",
    impact: "Village",
    images: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1000",
      "https://images.unsplash.com/photo-1584515933487-779824d29309?w=1000"
    ],
    updates: [
      {
        date: "2024-03-18",
        content: "5 doctors volunteered. First camp scheduled for next Sunday."
      }
    ]
  },
  {
    id: 4,
    title: "Food Security for Daily Wage Workers",
    description: "200+ daily wage workers in Gandhi Nagar struggling for regular meals. Many families skipping meals due to irregular work. Need support for community kitchen and monthly ration distribution. Children showing signs of malnutrition.",
    urgencyLevel: "high",
    status: "open",
    location: "Gandhi Nagar Labor Colony",
    organization: "Roti Bank Foundation",
    dateReported: "2024-03-05",
    contactPerson: "Kabir Singh",
    contactEmail: "kabir.s@rotibank.org",
    contactPhone: "9876543213",
    category: "Food Security",
    impact: "Community",
    images: [
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1000",
      "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1000"
    ],
    updates: []
  },
  {
    id: 5,
    title: "Senior Citizen Support Program",
    description: "Elderly residents in Shanti Nagar need assistance with daily activities and medical care. Many living alone without family support. Require volunteers for regular visits, medicine delivery, and emotional support. Currently supporting 45 seniors.",
    urgencyLevel: "medium",
    status: "in-progress",
    location: "Shanti Nagar",
    organization: "Elder Care Society",
    dateReported: "2024-03-01",
    contactPerson: "Rekha Menon",
    contactEmail: "rekha.m@eldercare.org",
    contactPhone: "9876543214",
    category: "Elderly Care",
    impact: "Locality",
    images: [
      "https://images.unsplash.com/photo-1516673619317-b535966b11b8?w=1000",
      "https://images.unsplash.com/photo-1590105577767-e21a1067899f?w=1000"
    ],
    updates: []
  },
  {
    id: 6,
    title: "Child Labor Prevention Initiative",
    description: "Increasing cases of child labor in local factories and shops. At least 30 children identified working in hazardous conditions. Need intervention for rehabilitation and school enrollment. Families need alternative income support.",
    urgencyLevel: "high",
    status: "open",
    location: "Industrial Area, Sector 4",
    organization: "Bachpan Bachao Samiti",
    dateReported: "2024-02-28",
    contactPerson: "Vikram Reddy",
    contactEmail: "vikram.r@bachpan.org",
    contactPhone: "9876543215",
    category: "Child Rights",
    impact: "Area",
    images: [
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1000",
      "https://images.unsplash.com/photo-1594708767771-a7502209ff51?w=1000"
    ],
    updates: [
      {
        date: "2024-03-15",
        content: "Survey completed. 15 children rescued and enrolled in bridge school program."
      }
    ]
  }
];

export const categories = [
  'Education',
  'Healthcare',
  'Food Security',
  'Employment',
  'Child Rights',
  'Women Empowerment',
  'Elderly Care',
  'Disability Support',
  'Mental Health',
  'Poverty Alleviation'
];

export const impactLevels = [
  'Village',
  'Neighborhood',
  'Locality',
  'Area',
  'Community'
];