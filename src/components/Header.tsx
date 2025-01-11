import React, { ReactNode } from 'react';

interface HeaderProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
}

export function Header({ icon, title, subtitle }: HeaderProps) {
  return (
    <div className="text-center mb-8">
      {icon}
      <h1 className="mt-4 text-3xl font-bold text-gray-900">
        {title}
      </h1>
      <p className="mt-2 text-gray-600">
        {subtitle}
      </p>
    </div>
  );
}