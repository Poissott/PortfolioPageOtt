import ZigzagDivider from "./components/ZigzagDivider";

export default function Home() {
  return (
    <div className="min-h-[400vh] bg-zinc-50 dark:bg-black relative">
      <ZigzagDivider />
      
      {/* 12 Column Grid Container */}
      <div className="grid grid-cols-12 gap-0 min-h-screen relative z-20">
        {/* Left 6 Columns */}
        <div className="col-span-6 flex items-center justify-start pl-16">
          <p className="text-9xl text-zinc-800 dark:text-zinc-200 animate-slide-in-text">
            Hello, World!
          </p>
        </div>
        
        {/* Right 6 Columns */}
        <div className="col-span-6 flex items-center justify-center">
          <div className="text-zinc-600 dark:text-zinc-400 text-2xl">
            <p>Right side content</p>
          </div>
        </div>
      </div>

      {/* Additional sections to demonstrate the zigzag */}
      <div className="grid grid-cols-12 gap-0 min-h-screen relative z-20">
        <div className="col-span-6 flex items-center justify-center">
          <div className="text-zinc-800 dark:text-zinc-200 text-4xl p-8">
            <h2 className="font-bold mb-4">Section 2 - Left</h2>
            <p className="text-lg">Content on the left side</p>
          </div>
        </div>
        <div className="col-span-6 flex items-center justify-center">
          <div className="text-zinc-800 dark:text-zinc-200 text-4xl p-8">
            <h2 className="font-bold mb-4">Section 2 - Right</h2>
            <p className="text-lg">Content on the right side</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-0 min-h-screen relative z-20">
        <div className="col-span-6 flex items-center justify-center">
          <div className="text-zinc-800 dark:text-zinc-200 text-4xl p-8">
            <h2 className="font-bold mb-4">Section 3 - Left</h2>
            <p className="text-lg">More content here</p>
          </div>
        </div>
        <div className="col-span-6 flex items-center justify-center">
          <div className="text-zinc-800 dark:text-zinc-200 text-4xl p-8">
            <h2 className="font-bold mb-4">Section 3 - Right</h2>
            <p className="text-lg">And more on this side</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-0 min-h-screen relative z-20">
        <div className="col-span-6 flex items-center justify-center">
          <div className="text-zinc-800 dark:text-zinc-200 text-4xl p-8">
            <h2 className="font-bold mb-4">Section 4 - Left</h2>
            <p className="text-lg">Final section left</p>
          </div>
        </div>
        <div className="col-span-6 flex items-center justify-center">
          <div className="text-zinc-800 dark:text-zinc-200 text-4xl p-8">
            <h2 className="font-bold mb-4">Section 4 - Right</h2>
            <p className="text-lg">Final section right</p>
          </div>
        </div>
      </div>
    </div>
  );
}
