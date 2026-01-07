import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "en" | "gu";

interface Translations {
  [key: string]: {
    en: string;
    gu: string;
  };
}

const translations: Translations = {
  // Common
  save: { en: "Save", gu: "સાચવો" },
  cancel: { en: "Cancel", gu: "રદ કરો" },
  confirm: { en: "Confirm", gu: "પુષ્ટિ કરો" },
  back: { en: "Back", gu: "પાછળ" },
  
  // Navigation
  home: { en: "Home", gu: "હોમ" },
  search: { en: "Search", gu: "શોધ" },
  chats: { en: "Chats", gu: "ચેટ્સ" },
  shortlisted: { en: "Shortlisted", gu: "શોર્ટલિસ્ટેડ" },
  settings: { en: "Settings", gu: "સેટિંગ્સ" },
  
  // Settings
  account: { en: "ACCOUNT", gu: "એકાઉન્ટ" },
  editProfile: { en: "Edit Profile", gu: "પ્રોફાઇલ એડિટ કરો" },
  profileVisibility: { en: "Profile Visibility", gu: "પ્રોફાઇલ દૃશ્યતા" },
  privacySettings: { en: "Privacy Settings", gu: "ગોપનીયતા સેટિંગ્સ" },
  preferences: { en: "PREFERENCES", gu: "પસંદગીઓ" },
  notifications: { en: "Notifications", gu: "સૂચનાઓ" },
  language: { en: "Language", gu: "ભાષા" },
  support: { en: "SUPPORT", gu: "સપોર્ટ" },
  helpSupport: { en: "Help & Support", gu: "સહાય અને સપોર્ટ" },
  safetyTips: { en: "Safety Tips", gu: "સુરક્ષા ટિપ્સ" },
  accountActions: { en: "ACCOUNT ACTIONS", gu: "એકાઉન્ટ ક્રિયાઓ" },
  deactivateAccount: { en: "Deactivate Account", gu: "એકાઉન્ટ નિષ્ક્રિય કરો" },
  logout: { en: "Logout", gu: "લૉગઆઉટ" },
  
  // Profile Visibility
  visibleToAll: { en: "Visible to All", gu: "બધાને દેખાય" },
  visibleToMatches: { en: "Visible to Matches Only", gu: "માત્ર મેચેસને દેખાય" },
  hiddenProfile: { en: "Hidden Profile", gu: "છુપાયેલ પ્રોફાઇલ" },
  profileVisibilityDesc: { en: "Control who can see your profile", gu: "તમારી પ્રોફાઇલ કોણ જોઈ શકે તે નિયંત્રિત કરો" },
  
  // Privacy
  showPhoneNumber: { en: "Show Phone Number", gu: "ફોન નંબર બતાવો" },
  showEmail: { en: "Show Email Address", gu: "ઇમેઇલ એડ્રેસ બતાવો" },
  allowMessageRequests: { en: "Allow Message Requests", gu: "સંદેશ વિનંતીઓને મંજૂરી આપો" },
  blockList: { en: "Block List", gu: "બ્લોક લિસ્ટ" },
  
  // Notifications
  matchNotifications: { en: "Match Notifications", gu: "મેચ સૂચનાઓ" },
  messageNotifications: { en: "Message Notifications", gu: "સંદેશ સૂચનાઓ" },
  profileVisitNotifications: { en: "Profile Visit Notifications", gu: "પ્રોફાઇલ વિઝિટ સૂચનાઓ" },
  emailNotifications: { en: "Email Notifications", gu: "ઇમેઇલ સૂચનાઓ" },
  
  // Logout
  logoutTitle: { en: "Logout", gu: "લૉગઆઉટ" },
  logoutMessage: { en: "Are you sure you want to logout?", gu: "શું તમે ખરેખર લૉગઆઉટ કરવા માંગો છો?" },
  
  // Deactivate
  deactivateTitle: { en: "Deactivate Account", gu: "એકાઉન્ટ નિષ્ક્રિય કરો" },
  deactivateMessage: { en: "Are you sure you want to deactivate your account? Your profile will be hidden from all users.", gu: "શું તમે ખરેખર તમારું એકાઉન્ટ નિષ્ક્રિય કરવા માંગો છો? તમારી પ્રોફાઇલ તમામ વપરાશકર્તાઓથી છુપાવવામાં આવશે." },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
