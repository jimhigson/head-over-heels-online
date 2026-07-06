export const LoadingBanner = ({ children }: { children: string }) => (
  <div
    class="animate-flash text-center block bg-white top-4"
    role="status"
    aria-live="polite"
    aria-busy="true"
  >
    <span class="text-double-height text-midRed zx:text-zxRed toppy:text-toppyPink2">
      {children}
    </span>
  </div>
);
