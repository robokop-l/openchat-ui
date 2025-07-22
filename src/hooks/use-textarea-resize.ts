"use client";

import { useEffect, useRef } from 'react';

/**
 * Custom hook to automatically resize a textarea based on its content.
 * @param value The current value of the textarea.
 * @param initialRows The initial number of rows for the textarea.
 * @returns A ref to be attached to the textarea element.
 */
export function useTextareaResize(
  value: string,
  initialRows: number = 1
): React.RefObject<HTMLTextAreaElement> {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to shrink if text is deleted
      textareaRef.current.style.height = 'auto'; 
      // Set the height to the scroll height to fit the content
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value, initialRows]);

  // Set initial rows
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.rows = initialRows;
    }
  }, [initialRows]);

  return textareaRef;
}