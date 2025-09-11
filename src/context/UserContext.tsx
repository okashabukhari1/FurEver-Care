import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  name: string;
  userType: 'pet-owner' | 'veterinarian' | 'animal-shelter' | '';
  petName?: string;
}

interface UserContextType {
  user: User;
  setUser: (user: User) => void;
  currentTime: string;
  location: string;
  visitorCount: number;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({
    name: '',
    userType: '',
    petName: ''
  });
  const [currentTime, setCurrentTime] = useState('');
  const [location, setLocation] = useState('Loading location...');
  const [visitorCount, setVisitorCount] = useState(1247);

  useEffect(() => {
    // Update time every second
    const timeInterval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleString());
    }, 1000);

    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetch(`https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=demo`)
            .then(response => response.json())
            .then(data => {
              if (data.results && data.results[0]) {
                setLocation(data.results[0].formatted);
              } else {
                setLocation('Location unavailable');
              }
            })
            .catch(() => setLocation('Location unavailable'));
        },
        () => setLocation('Location access denied')
      );
    } else {
      setLocation('Geolocation not supported');
    }

    // Simulate visitor count increment
    const visitorInterval = setInterval(() => {
      setVisitorCount(prev => prev + Math.floor(Math.random() * 3));
    }, 30000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(visitorInterval);
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, currentTime, location, visitorCount }}>
      {children}
    </UserContext.Provider>
  );
};