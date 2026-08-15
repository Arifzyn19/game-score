(() => {
  const { useMemo } = React;
  const { Icon } = SB.components;
  const { WIN } = SB.CONFIG;

  const ScoreTable = ({ players, rounds, winner, onDelete }) => {
    const running = useMemo(() => {
      return rounds.map((_, rIdx) =>
        players.map((_, pIdx) =>
          rounds.slice(0, rIdx + 1).reduce((sum, round) => sum + (round[pIdx] || 0), 0),
        ),
      );
    }, [rounds, players.length]);

    const totals = players.map((_, pIdx) =>
      rounds.length > 0 ? running[rounds.length - 1]?.[pIdx] || 0 : 0,
    );

    const color = (n) => (n > 0 ? 'text-emerald-400' : n < 0 ? 'text-red-400' : 'text-slate-500');

    if (players.length === 0) return null;

    return (
      <div className="card overflow-hidden mb-3">
        <div className="px-4 py-3.5 border-b border-zinc-800 flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-p-500/15 flex items-center justify-center">
            <Icon name="bar-chart-2" size={14} cls="text-p-400" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Scoreboard</span>
          <span className="ml-auto text-xs font-bold bg-zinc-800 text-slate-400 px-2 py-0.5 rounded-full">
            {rounds.length} ronde
          </span>
        </div>

        {rounds.length === 0 ? (
          <div className="py-14 text-center">
            <span className="text-3xl block mb-2">🎲</span>
            <p className="text-sm text-slate-500">Belum ada ronde — tambah di atas!</p>
          </div>
        ) : (
          <div className="tbl-wrap">
            <table className="w-full text-sm border-collapse" style={{ minWidth: `${80 + players.length * 100}px` }}>
              <thead>
                <tr className="bg-zinc-900/80 border-b border-zinc-800">
                  <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wide w-12 sticky left-0 bg-zinc-900">
                    #
                  </th>
                  {players.map((p, i) => (
                    <th
                      key={i}
                      className={`px-3 py-3 text-center text-xs font-extrabold uppercase tracking-wide whitespace-nowrap ${
                        winner?.idx === i ? 'text-p-400' : 'text-slate-300'
                      }`}
                    >
                      {winner?.idx === i ? '🏆 ' : ''}
                      {p}
                    </th>
                  ))}
                  <th className="w-8 sticky right-0 bg-zinc-900" />
                </tr>
              </thead>
              <tbody>
                {rounds.map((round, rIdx) => (
                  <tr key={rIdx} className="srow border-b border-zinc-800/60 group animate-fade-up">
                    <td className="px-4 py-3 text-[11px] font-mono text-slate-500 sticky left-0 bg-[#121214]">
                      R{rIdx + 1}
                    </td>
                    {players.map((_, pIdx) => {
                      const run = running[rIdx]?.[pIdx] ?? 0;
                      const delta = round[pIdx] || 0;
                      return (
                        <td key={pIdx} className="px-3 py-2.5 text-center">
                          <span className={`block text-base font-extrabold tabular-nums ${color(run)}`}>
                            {run.toLocaleString()}
                          </span>
                          {delta !== 0 && (
                            <span
                              className={`text-[10px] font-semibold tabular-nums ${
                                delta > 0 ? 'text-emerald-500' : 'text-red-500'
                              }`}
                            >
                              {delta > 0 ? `+${delta}` : delta}
                            </span>
                          )}
                        </td>
                      );
                    })}
                    <td className="px-2 py-2.5 sticky right-0 bg-[#121214]">
                      <button
                        onClick={() => onDelete(rIdx)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 active:scale-90"
                      >
                        <Icon name="trash-2" size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-zinc-700 bg-zinc-900/80">
                  <td className="px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wide sticky left-0 bg-zinc-900">
                    Total
                  </td>
                  {totals.map((t, i) => (
                    <td
                      key={i}
                      className={`px-3 py-3 text-center font-extrabold text-base tabular-nums ${color(t)} ${
                        winner?.idx === i ? 'bg-p-500/10' : ''
                      }`}
                    >
                      {t.toLocaleString()}
                      {winner?.idx === i && <span className="ml-1">🏆</span>}
                    </td>
                  ))}
                  <td className="sticky right-0 bg-zinc-900" />
                </tr>
                <tr className="bg-[#121214]">
                  <td className="px-4 py-2 text-[10px] text-slate-500 sticky left-0 bg-[#121214]">/{WIN}</td>
                  {totals.map((t, i) => {
                    const pct = Math.min(100, Math.max(0, (t / WIN) * 100));
                    return (
                      <td key={i} className="px-3 py-2">
                        <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${pct}%`,
                              background: pct >= 100 ? '#6366f1' : pct > 60 ? '#f59e0b' : '#10b981',
                            }}
                          />
                        </div>
                        <p className="text-[10px] text-center text-slate-500 mt-0.5">{Math.round(pct)}%</p>
                      </td>
                    );
                  })}
                  <td className="sticky right-0 bg-[#121214]" />
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    );
  };

  window.SB.components.ScoreTable = ScoreTable;
})();