export const setDocumentOpacity = (value: string) => {
  document.documentElement.style.setProperty('--opacity', value);
};

export const setDocumentDrag = (isDrag: boolean) => {
  const element = document.getElementById('draggableWrapper');
  if (element) {
    const visibility = isDrag ? 'visible' : 'hidden';
    element.style.visibility = visibility;
  }
};
