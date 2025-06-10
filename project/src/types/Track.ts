import React from 'react';

export interface Track {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  importance: string;
  features: string[];
  icon: React.ReactNode;
  color: string;
}