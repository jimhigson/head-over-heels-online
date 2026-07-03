export const LoadingBanner = ({ children }: { children: string }) => (
  <div className="animate-flash text-center block bg-white top-4">
    <span className="text-double-height text-midRed zx:text-zxRed toppy:text-toppyPink2">
      {children}
    </span>
  </div>
);
