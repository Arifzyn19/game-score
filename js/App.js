(() => {
  const { useCallback, useEffect, useMemo, useState } = React;
  const { Icon, WinnerBanner, PlayerManager, RoundInput, ScoreTable } = SB.components;
  const { CONFIG, storage } = SB;

  const App = () => {
    const [players, _setPlayers] = useState(() => storage.get(CONFIG.KEYS.P, []));
    const [rounds, _setRounds] = useState(() => storage.get(CONFIG.KEYS.R, []));

    const setPlayers = useCallback((fn) => {
      _setPlayers((prev) => {
        const next = typeof fn === 'function' ? fn(prev) : fn;
        storage.set(CONFIG.KEYS.P, next);
        return next;
      });
    }, []);

    const setRounds = useCallback((fn) => {
      _setRounds((prev) => {
        const next = typeof fn === 'function' ? fn(prev) : fn;
        storage.set(CONFIG.KEYS.R, next);
        return next;
      });
    }, []);

    /* Normalize column width when player count changes. */
    useEffect(() => {
      _setRounds((prev) => {
        const normalized = prev.map((round) => {
          const row = Array(players.length).fill(0);
          round.forEach((value, i) => {
            if (i < players.length) row[i] = value;
          });
          return row;
        });
        storage.set(CONFIG.KEYS.R, normalized);
        return normalized;
      });
    }, [players.length]);

    /* totals = cumulative sum of every round delta. */
    const totals = useMemo(
      () => players.map((_, pIdx) => rounds.reduce((sum, round) => sum + (round[pIdx] || 0), 0)),
      [rounds, players.length],
    );

    /* first player to reach WIN wins. */
    const winner = useMemo(() => {
      const idx = totals.findIndex((total) => total >= CONFIG.WIN);
      return idx >= 0 ? { name: players[idx], total: totals[idx], idx } : null;
    }, [totals]);

    const addRound = (deltas) => setRounds((prev) => [...prev, deltas.slice(0, players.length)]);
    const deleteRound = (idx) => setRounds((prev) => prev.filter((_, i) => i !== idx));
    const newGame = () => setRounds([]);
    const clearAll = () => {
      setPlayers([]);
      setRounds([]);
    };

    return (
      <div className="min-h-dvh bg-black">
        <header className="sticky top-0 z-20 bg-black/85 backdrop-blur-md border-b border-zinc-800/80 px-4 py-3 flex items-center gap-3 safe-pt">
          <div className="w-9 h-9 bg-p-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-p-900/40 shrink-0">
            <Icon name="gamepad-2" size={18} />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-extrabold text-base text-slate-100 leading-tight">ScoreBoard</h1>
            <p className="text-[10px] text-slate-500">First to {CONFIG.WIN.toLocaleString()} wins</p>
          </div>
          <div className="flex gap-1.5">
            {rounds.length > 0 && !winner && (
              <button
                onClick={newGame}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-slate-300 bg-zinc-800 active:scale-95 rounded-xl transition-all"
              >
                <Icon name="rotate-ccw" size={11} />
                Reset
              </button>
            )}
            <button
              onClick={clearAll}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-slate-300 bg-zinc-800 active:scale-95 rounded-xl transition-all"
            >
              <Icon name="trash-2" size={11} />
              Clear
            </button>
          </div>
        </header>

        <main className="max-w-lg mx-auto px-3 pt-4 pb-10 safe-pb">
          {winner && <WinnerBanner winner={winner} onNewGame={newGame} onClearAll={clearAll} />}
          <PlayerManager players={players} setPlayers={setPlayers} locked={!!winner} />
          <RoundInput players={players} totals={totals} onSubmit={addRound} locked={!!winner} />
          <ScoreTable players={players} rounds={rounds} winner={winner} onDelete={deleteRound} />
          <p className="text-center text-[11px] text-slate-500 mt-3">
            {players.length} pemain · {rounds.length} ronde · localStorage
          </p>
        </main>
      </div>
    );
  };

  window.SB.components.App = App;
})();