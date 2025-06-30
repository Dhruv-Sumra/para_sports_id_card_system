// Fake data generator for Para Sports Player Registration
const fakePlayers = [
  {
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1-555-0123",
    dateOfBirth: "1995-03-15",
    gender: "Female",
    address: "123 Oak Street, Springfield, IL 62701",
    emergencyContact: {
      name: "Michael Johnson",
      relationship: "Father",
      phone: "+1-555-0124"
    },
    primarySport: "Wheelchair Basketball",
    experienceLevel: "Intermediate",
    disabilityType: "Spinal Cord Injury",
    medicalConditions: "None",
    previousExperience: "High school basketball team",
    goals: "Compete at national level",
    profileImage: null
  },
  {
    firstName: "David",
    lastName: "Chen",
    email: "david.chen@email.com",
    phone: "+1-555-0125",
    dateOfBirth: "1992-07-22",
    gender: "Male",
    address: "456 Pine Avenue, Portland, OR 97201",
    emergencyContact: {
      name: "Lisa Chen",
      relationship: "Sister",
      phone: "+1-555-0126"
    },
    primarySport: "Swimming",
    experienceLevel: "Advanced",
    disabilityType: "Amputation",
    medicalConditions: "Prosthetic leg",
    previousExperience: "College swimming team",
    goals: "Qualify for Paralympics",
    profileImage: null
  },
  {
    firstName: "Maria",
    lastName: "Garcia",
    email: "maria.garcia@email.com",
    phone: "+1-555-0127",
    dateOfBirth: "1988-11-08",
    gender: "Female",
    address: "789 Elm Road, Miami, FL 33101",
    emergencyContact: {
      name: "Carlos Garcia",
      relationship: "Husband",
      phone: "+1-555-0128"
    },
    primarySport: "Track and Field",
    experienceLevel: "Beginner",
    disabilityType: "Visual Impairment",
    medicalConditions: "Legally blind",
    previousExperience: "Recreational running",
    goals: "Learn proper techniques",
    profileImage: null
  },
  {
    firstName: "James",
    lastName: "Wilson",
    email: "james.wilson@email.com",
    phone: "+1-555-0129",
    dateOfBirth: "1990-04-12",
    gender: "Male",
    address: "321 Maple Drive, Seattle, WA 98101",
    emergencyContact: {
      name: "Emily Wilson",
      relationship: "Mother",
      phone: "+1-555-0130"
    },
    primarySport: "Powerlifting",
    experienceLevel: "Intermediate",
    disabilityType: "Cerebral Palsy",
    medicalConditions: "Mild CP affecting left side",
    previousExperience: "Gym training for 2 years",
    goals: "Increase strength and compete locally",
    profileImage: null
  },
  {
    firstName: "Aisha",
    lastName: "Patel",
    email: "aisha.patel@email.com",
    phone: "+1-555-0131",
    dateOfBirth: "1997-09-30",
    gender: "Female",
    address: "654 Cedar Lane, Austin, TX 73301",
    emergencyContact: {
      name: "Raj Patel",
      relationship: "Brother",
      phone: "+1-555-0132"
    },
    primarySport: "Table Tennis",
    experienceLevel: "Advanced",
    disabilityType: "Hearing Impairment",
    medicalConditions: "Profound hearing loss",
    previousExperience: "School table tennis champion",
    goals: "Represent country internationally",
    profileImage: null
  },
  {
    firstName: "Robert",
    lastName: "Thompson",
    email: "robert.thompson@email.com",
    phone: "+1-555-0133",
    dateOfBirth: "1985-12-03",
    gender: "Male",
    address: "987 Birch Street, Denver, CO 80201",
    emergencyContact: {
      name: "Jennifer Thompson",
      relationship: "Wife",
      phone: "+1-555-0134"
    },
    primarySport: "Cycling",
    experienceLevel: "Beginner",
    disabilityType: "Multiple Sclerosis",
    medicalConditions: "MS affecting balance",
    previousExperience: "None",
    goals: "Stay active and healthy",
    profileImage: null
  },
  {
    firstName: "Lisa",
    lastName: "Anderson",
    email: "lisa.anderson@email.com",
    phone: "+1-555-0135",
    dateOfBirth: "1993-06-18",
    gender: "Female",
    address: "147 Willow Way, Nashville, TN 37201",
    emergencyContact: {
      name: "Tom Anderson",
      relationship: "Father",
      phone: "+1-555-0136"
    },
    primarySport: "Archery",
    experienceLevel: "Intermediate",
    disabilityType: "Limb Difference",
    medicalConditions: "Missing right hand",
    previousExperience: "Recreational archery",
    goals: "Compete in adaptive archery tournaments",
    profileImage: null
  },
  {
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.brown@email.com",
    phone: "+1-555-0137",
    dateOfBirth: "1991-01-25",
    gender: "Male",
    address: "258 Spruce Court, Phoenix, AZ 85001",
    emergencyContact: {
      name: "Rachel Brown",
      relationship: "Sister",
      phone: "+1-555-0138"
    },
    primarySport: "Wheelchair Tennis",
    experienceLevel: "Advanced",
    disabilityType: "Spinal Cord Injury",
    medicalConditions: "T6 complete injury",
    previousExperience: "College tennis player",
    goals: "Win national championship",
    profileImage: null
  },
  {
    firstName: "Jennifer",
    lastName: "Davis",
    email: "jennifer.davis@email.com",
    phone: "+1-555-0139",
    dateOfBirth: "1989-08-14",
    gender: "Female",
    address: "369 Ash Boulevard, Las Vegas, NV 89101",
    emergencyContact: {
      name: "Mark Davis",
      relationship: "Husband",
      phone: "+1-555-0140"
    },
    primarySport: "Swimming",
    experienceLevel: "Beginner",
    disabilityType: "Autism Spectrum",
    medicalConditions: "Sensory processing disorder",
    previousExperience: "None",
    goals: "Learn water safety and basic swimming",
    profileImage: null
  },
  {
    firstName: "Christopher",
    lastName: "Miller",
    email: "christopher.miller@email.com",
    phone: "+1-555-0141",
    dateOfBirth: "1994-02-28",
    gender: "Male",
    address: "741 Poplar Place, San Diego, CA 92101",
    emergencyContact: {
      name: "Susan Miller",
      relationship: "Mother",
      phone: "+1-555-0142"
    },
    primarySport: "Boccia",
    experienceLevel: "Intermediate",
    disabilityType: "Cerebral Palsy",
    medicalConditions: "Severe CP affecting all limbs",
    previousExperience: "Recreational boccia",
    goals: "Improve accuracy and strategy",
    profileImage: null
  }
];

// Function to get a random player
export const getRandomPlayer = () => {
  return fakePlayers[Math.floor(Math.random() * fakePlayers.length)];
};

// Function to get all fake players
export const getAllFakePlayers = () => {
  return fakePlayers;
};

// Function to get a specific player by index
export const getFakePlayer = (index) => {
  return fakePlayers[index] || fakePlayers[0];
};

// Function to generate a custom player
export const generateCustomPlayer = (overrides = {}) => {
  const basePlayer = getRandomPlayer();
  return { ...basePlayer, ...overrides };
};

console.log('Fake data generator loaded!');
console.log('Available functions:');
console.log('- getRandomPlayer()');
console.log('- getAllFakePlayers()');
console.log('- getFakePlayer(index)');
console.log('- generateCustomPlayer(overrides)');

// Example usage:
// const player = getRandomPlayer();
// console.log(player); 