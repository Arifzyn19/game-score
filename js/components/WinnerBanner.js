(() => {
  const { useEffect } = React;

  const WinnerBanner = ({ winner, onNewGame, onClearAll }) => {
    useEffect(() => {
      SB.effects.burst();
    }, []);

    return (
      <div className="animate-bounce-in mb-3">
        <div className="win-border animate-shimmer rounded-[22px] p-[2px]">
          <div className="bg-[#121214] rounded-[20px] p-4 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-2xl shrink-0">🏆</div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-widest text-p-400 mb-0.5">Game Over — Pemenang!</p>
                <h2 className="font-extrabold text-xl text-slate-100 truncate">{winner.name}</h2>
                <p className="text-sm text-slate-400">
                  Score: <span className="text-p-400 font-bold">{winner.total.toLocaleString()} pts</span>
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={onNewGame}
                className="flex-1 py-3 rounded-xl bg-p-600 text-white text-sm font-bold active:scale-95 transition-transform"
              >
                Main Lagi
              </button>
              <button
                onClick={onClearAll}
                className="flex-1 py-3 rounded-xl bg-zinc-800 text-slate-300 text-sm font-bold active:scale-95 transition-transform"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  window.SB.components.WinnerBanner = WinnerBanner;
})();