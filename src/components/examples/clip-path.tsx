export function ClipPath() {
  return (
    <div className="grid place-items-center overflow-clip">
      <h1 className="text-7xl font-bold [grid-area:1/1] text-secondary">
        Shine on you crazy diamond
      </h1>
      <h1 className="text-7xl font-bold [grid-area:1/1] bg-[linear-gradient(72deg,transparent_0%,transparent_35%,rgba(201,198,255,1)_50%,transparent_65%,transparent_100%)] bg-no-repeat bg-clip-text animate-shine [background-size:150px_auto] text-transparent">
        Shine on you crazy diamond
      </h1>
      <h1 className="text-7xl font-bold [grid-area:1/1] bg-[linear-gradient(72deg,transparent_0%,transparent_35%,rgba(255,255,255,0.8)_50%,transparent_65%,transparent_100%)] bg-no-repeat bg-clip-text animate-shine [background-size:150px_auto] text-transparent blur-[4px]">
        Shine on you crazy diamond
      </h1>
    </div>
  );
}
