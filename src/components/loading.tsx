const Loading = ({ height }: { height?: string }) => {
  return (
    <div
      className={`grid h-full min-h-[${height || '65vh'}] place-items-center italic`}
    >
      Loading...
    </div>
  );
};
export default Loading;
