'use client';

import React from 'react';
import { FOUR_COLORS } from '@/types';

interface ColorPickerProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
  isEraserActive: boolean;
  onEraserToggle: () => void;
}

export default function ColorPicker({
  selectedColor,
  onColorSelect,
  isEraserActive,
  onEraserToggle,
}: ColorPickerProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <span className="text-sm font-medium text-gray-700">选择颜色：</span>
      
      {FOUR_COLORS.map((color) => (
        <button
          key={color.id}
          onClick={() => {
            onColorSelect(color.value);
            if (isEraserActive) onEraserToggle();
          }}
          className={`w-12 h-12 rounded-lg shadow-md transition-all duration-200 ${
            color.tailwindClass
          } ${
            selectedColor === color.value && !isEraserActive
              ? 'ring-4 ring-offset-2 ring-blue-500 scale-110'
              : 'hover:scale-105'
          }`}
          title={color.name}
          aria-label={`选择${color.name}`}
        />
      ))}

      <div className="w-px h-10 bg-gray-300 mx-2" />

      <button
        onClick={onEraserToggle}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
          isEraserActive
            ? 'bg-gray-800 text-white ring-4 ring-offset-2 ring-gray-500'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        title="橡皮擦"
        aria-label="橡皮擦"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        <span className="text-sm font-medium">橡皮擦</span>
      </button>
    </div>
  );
}
