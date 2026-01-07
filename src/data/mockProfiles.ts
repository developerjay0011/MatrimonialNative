export interface Profile {
  id: string;
  name: string;
  age: number;
  height: string;
  location: string;
  city: string;
  education: string;
  occupation: string;
  income: string;
  maritalStatus: string;
  diet: string;
  profilePhoto: string;
  galleryPhotos: string[];
  verified: boolean;
  online: boolean;
  matchPercentage: number;
  bio: string;
  familyType: string;
  fatherOccupation: string;
  motherOccupation: string;
  siblings: string;
  smoking: string;
  drinking: string;
  horoscope?: string;
  subCaste?: string;
}

export const mockProfiles: Profile[] = [
  {
    id: '1',
    name: 'Priya Patel',
    age: 26,
    height: '5\'4"',
    location: 'Ahmedabad, Gujarat',
    city: 'Ahmedabad',
    education: "Master's Degree",
    occupation: 'Software Engineer',
    income: '₹10-20 Lakhs',
    maritalStatus: 'Never Married',
    diet: 'Vegetarian',
    profilePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    galleryPhotos: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    ],
    verified: true,
    online: true,
    matchPercentage: 92,
    bio: 'Looking for a caring and understanding life partner. Love traveling and exploring new places.',
    familyType: 'Nuclear',
    fatherOccupation: 'Business Owner',
    motherOccupation: 'Homemaker',
    siblings: '1 Brother',
    smoking: 'No',
    drinking: 'No',
    horoscope: 'Leo',
    subCaste: 'Patel',
  },
  {
    id: '2',
    name: 'Raj Shah',
    age: 29,
    height: '5\'10"',
    location: 'Surat, Gujarat',
    city: 'Surat',
    education: "Bachelor's Degree",
    occupation: 'Business Analyst',
    income: '₹10-20 Lakhs',
    maritalStatus: 'Never Married',
    diet: 'Vegetarian',
    profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    galleryPhotos: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    ],
    verified: true,
    online: false,
    matchPercentage: 88,
    bio: 'Family-oriented person with traditional values. Looking for a life partner who shares similar values.',
    familyType: 'Joint',
    fatherOccupation: 'Retired Teacher',
    motherOccupation: 'Homemaker',
    siblings: '1 Sister (Married)',
    smoking: 'No',
    drinking: 'Occasionally',
    horoscope: 'Aries',
  },
  {
    id: '3',
    name: 'Ananya Desai',
    age: 24,
    height: '5\'5"',
    location: 'Rajkot, Gujarat',
    city: 'Rajkot',
    education: "Bachelor's Degree",
    occupation: 'Teacher',
    income: '₹5-10 Lakhs',
    maritalStatus: 'Never Married',
    diet: 'Vegetarian',
    profilePhoto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    galleryPhotos: [
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    ],
    verified: true,
    online: true,
    matchPercentage: 85,
    bio: 'Simple and down-to-earth person. Love reading and spending time with family.',
    familyType: 'Nuclear',
    fatherOccupation: 'Engineer',
    motherOccupation: 'Doctor',
    siblings: 'No siblings',
    smoking: 'No',
    drinking: 'No',
    horoscope: 'Virgo',
  },
  {
    id: '4',
    name: 'Karan Mehta',
    age: 31,
    height: '5\'11"',
    location: 'Vadodara, Gujarat',
    city: 'Vadodara',
    education: "Master's Degree",
    occupation: 'Marketing Manager',
    income: '₹20-50 Lakhs',
    maritalStatus: 'Never Married',
    diet: 'Non-Vegetarian',
    profilePhoto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
    galleryPhotos: [
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
    ],
    verified: true,
    online: false,
    matchPercentage: 78,
    bio: 'Ambitious professional seeking a partner who values career and family equally.',
    familyType: 'Nuclear',
    fatherOccupation: 'Chartered Accountant',
    motherOccupation: 'Teacher',
    siblings: '2 Sisters',
    smoking: 'No',
    drinking: 'Socially',
  },
  {
    id: '5',
    name: 'Diya Sharma',
    age: 27,
    height: '5\'3"',
    location: 'Ahmedabad, Gujarat',
    city: 'Ahmedabad',
    education: "Bachelor's Degree",
    occupation: 'Graphic Designer',
    income: '₹5-10 Lakhs',
    maritalStatus: 'Never Married',
    diet: 'Vegetarian',
    profilePhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
    galleryPhotos: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
    ],
    verified: true,
    online: true,
    matchPercentage: 90,
    bio: 'Creative soul with a love for art and design. Looking for someone who appreciates creativity.',
    familyType: 'Joint',
    fatherOccupation: 'Business Owner',
    motherOccupation: 'Homemaker',
    siblings: '1 Brother',
    smoking: 'No',
    drinking: 'No',
  },
  {
    id: '6',
    name: 'Arjun Patel',
    age: 28,
    height: '6\'0"',
    location: 'Gandhinagar, Gujarat',
    city: 'Gandhinagar',
    education: "Bachelor's Degree",
    occupation: 'Civil Engineer',
    income: '₹10-20 Lakhs',
    maritalStatus: 'Never Married',
    diet: 'Vegetarian',
    profilePhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    galleryPhotos: [
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    ],
    verified: true,
    online: false,
    matchPercentage: 82,
    bio: 'Calm and composed individual. Believe in strong family bonds and traditional values.',
    familyType: 'Joint',
    fatherOccupation: 'Government Officer',
    motherOccupation: 'Teacher',
    siblings: '1 Sister (Married)',
    smoking: 'No',
    drinking: 'No',
  },
  {
    id: '7',
    name: 'Nisha Joshi',
    age: 25,
    height: '5\'2"',
    location: 'Surat, Gujarat',
    city: 'Surat',
    education: "Master's Degree",
    occupation: 'Data Analyst',
    income: '₹10-20 Lakhs',
    maritalStatus: 'Never Married',
    diet: 'Vegetarian',
    profilePhoto: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400',
    galleryPhotos: [
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400',
    ],
    verified: true,
    online: true,
    matchPercentage: 87,
    bio: 'Tech-savvy and ambitious. Looking for an educated and understanding partner.',
    familyType: 'Nuclear',
    fatherOccupation: 'Doctor',
    motherOccupation: 'Professor',
    siblings: 'No siblings',
    smoking: 'No',
    drinking: 'No',
  },
  {
    id: '8',
    name: 'Rohan Trivedi',
    age: 30,
    height: '5\'9"',
    location: 'Ahmedabad, Gujarat',
    city: 'Ahmedabad',
    education: "Bachelor's Degree",
    occupation: 'Financial Advisor',
    income: '₹10-20 Lakhs',
    maritalStatus: 'Divorced',
    diet: 'Vegetarian',
    profilePhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    galleryPhotos: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    ],
    verified: true,
    online: false,
    matchPercentage: 75,
    bio: 'Believe in second chances. Looking for a mature and understanding life partner.',
    familyType: 'Nuclear',
    fatherOccupation: 'Retired Bank Manager',
    motherOccupation: 'Homemaker',
    siblings: '1 Brother',
    smoking: 'No',
    drinking: 'Occasionally',
  },
];

export const getProfileById = (id: string): Profile | undefined => {
  return mockProfiles.find(profile => profile.id === id);
};

export const getShortlistedProfiles = (): Profile[] => {
  return mockProfiles.slice(0, 3);
};
