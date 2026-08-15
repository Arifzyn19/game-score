(() => {
  const { useEffect, useRef, useState } = React;
  const { Icon } = SB.components;

  const RoundInput = ({ players, totals, onSubmit, locked }) => {
    const [vals, setVals] = useState(() => players.map(() => ''));
    const inputRefs = useRef([]);

    useEffect(() => {
      setVals(players.map(() => ''));
    }, [players.length]);

    useEffect(() => {
      if (!locked) setTimeout(() => inputRefs.current[0]?.focus(), 120);
    }, [locked, players.length]);

    const moveNext = (i) => {
      if (inputRefs.current[i + 1]) {
        inputRefs.current[i + 1].focus();
      } else {
        submit();
      }
    };

    const onKey = (e, i) => {
      if (e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault();
        moveNext(i);
      }
    };

    const submit = () => {
      const deltas = vals.map((v) => {
        const n = parseFloat(v);
        return isNaN(n) ? 0 : n;
      });
      onSubmit(deltas);
      setVals(players.map(() => ''));
      setTimeout(() => inputRefs.current[0]?.focus(), 50);
    };

    if (locked || players.length === 0) return null;

    return (
      <div className="card p-4 mb-3">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 rounded-xl bg-p-500/15 flex items-center justify-center">
            <Icon name="plus-circle" size={14} cls="text-p-400" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Tambah Ronde</span>
        </div>
        <p className="text-[11px] text-slate-500 mb-4 ml-9">
          Masukkan <strong className="text-slate-300">poin ronde ini</strong> — boleh + atau −, otomatis ditambah ke
          total
        </p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {players.map((player, i) => {
            const cur = totals[i] || 0;
            const delta = parseFloat(vals[i]);
            const filled = vals[i] !== '' && !isNaN(delta);
            const after = filled ? cur + delta : null;

            return (
              <div key={i}>
                <div className="flex items-center justify-between gap-2 mb-2 px-0.5">
                  <span className="text-sm font-extrabold text-slate-100 truncate max-w-[55%]">{player}</span>
                  <span
                    className={`text-xs font-extrabold tabular-nums px-2 py-1 rounded-full leading-none ${
                      cur > 0
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : cur < 0
                          ? 'bg-red-500/10 text-red-400'
                          : 'bg-zinc-800 text-slate-500'
                    }`}
                  >
                    {cur > 0 ? `+${cur}` : cur}
                  </span>
                </div>

                <input
                  ref={(el) => (inputRefs.current[i] = el)}
                  type="number"
                  inputMode="numeric"
                  value={vals[i]}
                  onChange={(e) => setVals((v) => v.map((x, j) => (j === i ? e.target.value : x)))}
                  onKeyDown={(e) => onKey(e, i)}
                  placeholder="0"
                  className={`w-full text-center text-lg font-extrabold border-2 rounded-2xl px-2 py-3 transition-all placeholder:text-zinc-700 placeholder:font-normal bg-zinc-900/60 ${
                    filled
                      ? delta > 0
                        ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                        : delta < 0
                          ? 'border-red-500/40 bg-red-500/10 text-red-400'
                          : 'border-zinc-700 text-slate-400'
                      : 'border-zinc-700 text-slate-100'
                  }`}
                />

                <div className="h-5 flex items-center justify-center gap-1 mt-1">
                  {after !== null && (
                    <>
                      <span
                        className={`text-[10px] font-semibold tabular-nums ${
                          cur > 0 ? 'text-emerald-500' : cur < 0 ? 'text-red-500' : 'text-slate-500'
                        }`}
                      >
                        {cur}
                      </span>
                      <span className="text-[10px] text-slate-600">→</span>
                      <span
                        className={`text-[11px] font-bold tabular-nums ${
                          after > 0 ? 'text-emerald-400' : after < 0 ? 'text-red-400' : 'text-slate-400'
                        }`}
                      >
                        {after.toLocaleString()}
                      </span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={submit}
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-p-600 hover:bg-p-700 active:scale-[.98] text-white text-sm font-bold rounded-2xl transition-all shadow-lg shadow-p-900/40"
        >
          <Icon name="check-circle" size={16} />
          Submit Ronde
        </button>
      </div>
    );
  };

  window.SB.components.RoundInput = RoundInput;
})();