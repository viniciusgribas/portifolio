# 02/13/2025
# Portfolio Project Refactoring Guide

## 1. Proposed File Structure
```
src/
├── api/                    # API and service layer
│   ├── email.service.ts    # Email service abstraction
│   └── i18n.service.ts     # i18n service abstraction
├── components/            
│   ├── common/            # Shared/reusable components
│   │   ├── Button/
│   │   ├── Card/
│   │   └── Modal/
│   ├── layout/            # Layout components
│   │   ├── Header/
│   │   └── Footer/
│   └── sections/          # Page sections
│       ├── Hero/
│       ├── About/
│       └── Projects/
├── config/                # Configuration files
│   ├── animation.config.ts
│   └── theme.config.ts
├── constants/             # Constants and enums
│   ├── routes.ts
│   └── types.ts
├── context/              # React contexts
│   ├── ThemeContext/
│   └── LanguageContext/
├── hooks/                # Custom hooks
│   ├── useScroll.ts
│   └── useAnimation.ts
├── locales/              # Translation files
│   ├── en/
│   └── pt/
├── styles/               # Global styles
│   ├── tailwind/
│   └── globals.css
├── types/                # TypeScript types/interfaces
│   └── index.ts
└── utils/                # Utility functions
    ├── animations.ts
    └── validation.ts
```

## 2. Key Improvements

### 2.1 Component Organization
- Break down large components into smaller, focused ones
- Implement prop types and TypeScript interfaces
- Add comprehensive documentation
- Use custom hooks for logic separation

Example component structure:
```tsx
// components/sections/Hero/Hero.tsx
import { FC } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAnimation } from '@/hooks/useAnimation';
import { HeroProps } from './Hero.types';
import { heroVariants } from './Hero.animations';
import styles from './Hero.styles';

export const Hero: FC<HeroProps> = ({ title, description }) => {
  const { t } = useTranslation();
  const { animateOnScroll } = useAnimation();

  return (
    <motion.section
      variants={heroVariants}
      className={styles.container}
    >
      {/* Component content */}
    </motion.section>
  );
};
```

### 2.2 State Management
- Move state logic to dedicated contexts
- Implement proper state updates
- Add error boundaries

Example context:
```tsx
// context/LanguageContext/LanguageContext.tsx
import { createContext, useContext, useState } from 'react';
import { LanguageContextType, LanguageProviderProps } from './types';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const value = {
    language,
    setLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
```

### 2.3 API Layer
- Implement service abstractions
- Add proper error handling
- Use TypeScript for type safety

Example service:
```tsx
// api/email.service.ts
import { EmailPayload, EmailResponse } from '@/types';

export class EmailService {
  private static instance: EmailService;
  private readonly apiKey: string;

  private constructor() {
    this.apiKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
  }

  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  public async sendEmail(payload: EmailPayload): Promise<EmailResponse> {
    try {
      // Email sending logic
    } catch (error) {
      throw new Error('Failed to send email');
    }
  }
}
```

### 2.4 Custom Hooks
- Extract reusable logic into hooks
- Implement proper cleanup
- Add comprehensive documentation

Example hook:
```tsx
// hooks/useScroll.ts
import { useState, useEffect } from 'react';

interface ScrollOptions {
  threshold?: number;
}

export const useScroll = ({ threshold = 0 }: ScrollOptions = {}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isScrolled;
};
```

### 2.5 Animation Configuration
- Centralize animation variants
- Implement consistent animation patterns
- Add performance optimizations

Example config:
```tsx
// config/animation.config.ts
export const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};
```

### 2.6 Type Safety
- Implement TypeScript throughout
- Add proper type definitions
- Use strict type checking

Example types:
```tsx
// types/index.ts
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface SectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}
```

## 3. Performance Optimizations

### 3.1 Code Splitting
```tsx
// App.tsx
import { lazy, Suspense } from 'react';

const Projects = lazy(() => import('./components/sections/Projects'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Projects />
    </Suspense>
  );
}
```

### 3.2 Image Optimization
```tsx
// components/common/Image/Image.tsx
import { FC, useState } from 'react';
import { ImageProps } from './Image.types';

export const Image: FC<ImageProps> = ({ src, alt, ...props }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative ${isLoading ? 'animate-pulse' : ''}`}>
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoading(false)}
        {...props}
      />
    </div>
  );
};
```

## 4. Testing Strategy

### 4.1 Component Testing
```tsx
// components/sections/Hero/Hero.test.tsx
import { render, screen } from '@testing-library/react';
import { Hero } from './Hero';

describe('Hero', () => {
  it('renders hero section with correct content', () => {
    render(<Hero title="Test Title" description="Test Description" />);
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });
});
```

## 5. Documentation Standards

### 5.1 Component Documentation
```tsx
/**
 * Hero section component
 * @component
 * @example
 * ```tsx
 * <Hero
 *   title="Welcome"
 *   description="Portfolio description"
 * />
 * ```
 */
export const Hero: FC<HeroProps> = ({ title, description }) => {
  // Component implementation
};
```

## 6. Next Steps

1. Start by implementing the new file structure
2. Convert existing components to TypeScript
3. Implement proper testing setup
4. Add documentation
5. Optimize performance
6. Implement proper error handling
7. Add proper logging
8. Set up CI/CD pipeline