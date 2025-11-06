'use client';

import React, { useState } from 'react';

interface ToggleSwitchProps {
  initialState?: boolean;
  itemId: string;
  onToggle: (itemId: string, isOn: boolean) => void;
}

export default function ToggleSwitch({
  initialState = false,
  itemId,
  onToggle,
}: ToggleSwitchProps) {
  const [isOn, setIsOn] = useState(initialState);

  const handleToggle = () => {
    const newState = !isOn;
    setIsOn(newState);
    onToggle(itemId, newState);
  };

  return (
    <button
      onClick={handleToggle}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out 
        ${isOn ? 'bg-indigo-600' : 'bg-gray-200'}
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600
      `}
      aria-checked={isOn}
      role="switch"
    >
      <span className="sr-only">Toggle Status</span>

      <span
        aria-hidden="true"
        className={`
          inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out
          ${isOn ? 'translate-x-5' : 'translate-x-0.5'}
        `}
      />
    </button>
  );
}
