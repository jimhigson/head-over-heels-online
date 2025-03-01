// a small gap in the menu

export const MenuItemSeparator = (className: { className?: string }) => {
  return <div className={`col-span-3 h-1 ${className}`} />;
};
