const Loading = ({ className }: { className?: string }) => {
  return (
    <div
      className={`mx-auto grid h-full min-h-[65vh] max-w-7xl place-items-center px-5 py-16 italic ${className}`}
    >
      Loading...
    </div>
  );
};
export default Loading;
