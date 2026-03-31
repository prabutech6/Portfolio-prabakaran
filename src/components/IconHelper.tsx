import React, { Component } from 'react';
import * as LucideIcons from 'lucide-react';
interface IconHelperProps extends LucideIcons.LucideProps {
  name: string;
}
export function DynamicIcon({ name, ...props }: IconHelperProps) {
  // @ts-ignore - Dynamic access to Lucide icons
  const IconComponent = LucideIcons[name] as React.ElementType;
  if (!IconComponent) {
    return <LucideIcons.HelpCircle {...props} />;
  }
  return <IconComponent {...props} />;
}