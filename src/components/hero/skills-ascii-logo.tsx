export function SkillsAsciiLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`py-1 grid grid-cols-1 gap-1 ${className}`}>
      <h1 className="absolute hidden">Skills</h1>
      <div className="relative w-full flex items-start justify-start overflow-hidden">
        <div className="relative max-w-[320px] sm:max-w-[390px] overflow-hidden">
          <pre
            aria-hidden="true"
            className="invisible text-[12px] sm:text-[15px] tracking-[-1px] leading-[125%] select-none whitespace-pre font-mono"
          >
            {`███████╗██╗  ██╗██╗██╗     ██╗     ███████╗
██╔════╝██║ ██╔╝██║██║     ██║     ██╔════╝
███████╗█████╔╝ ██║██║     ██║     ███████╗
╚════██║██╔═██╗ ██║██║     ██║     ╚════██║
███████║██║  ██╗██║███████╗███████╗███████║
╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚══════╝`}
          </pre>
          <pre className="absolute top-0 left-0 text-[12px] sm:text-[15px] tracking-[-1px] leading-[125%] text-[#444444] select-none whitespace-pre font-mono opacity-80">
            {`███████╗██╗  ██╗██╗██╗     ██╗     ███████╗
██╔════╝██║ ██╔╝██║██║     ██║     ██╔════╝
███████╗█████╔╝ ██║██║     ██║     ███████╗
╚════██║██╔═██╗ ██║██║     ██║     ╚════██║
███████║██║  ██╗██║███████╗███████╗███████║
╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚══════╝`}
          </pre>
          <pre className="absolute top-0 left-0 text-[12px] sm:text-[15px] tracking-[-1px] leading-[125%] text-white select-none whitespace-pre font-mono">
            {`███████ ██   ██ ██ ██      ██      ███████
██      ██  ██  ██ ██      ██      ██
███████ █████   ██ ██      ██      ███████
     ██ ██  ██  ██ ██      ██           ██
███████ ██   ██ ██ ███████ ███████ ███████
                                              `}
          </pre>
        </div>
      </div>
      <p className="text-[13px] sm:text-[16px] tracking-tight text-white font-mono font-medium text-left uppercase">
        The Open Agent Skills Ecosystem
      </p>
    </div>
  );
}
