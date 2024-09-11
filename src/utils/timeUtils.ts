export function formatTime(seconds: number) {
  // Calculate hours, minutes, and seconds
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  // Format hours, minutes, and seconds with leading zeros if needed
  const hh = hours > 0 ? `${String(hours).padStart(2, '0')}:` : '';
  const mm = String(minutes).padStart(2, '0');
  const ss = String(secs).padStart(2, '0');

  // Return the formatted time string
  return hours > 0 ? `${hh}${mm}:${ss}` : `${mm}:${ss}`;
}

export function formatTimeWithSuffix(seconds: number) {
  // Calculate hours, minutes, and seconds
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  // Format hours and minutes with leading zeros if needed
  const hh = String(hours).padStart(2, '0');
  const mm = String(minutes).padStart(2, '0');

  // Determine the format based on hours
  if (hours > 0) {
    return `${hh}:${mm}h`;
  }
  return `00:${mm}m`;
}
