(() => {
  const { useRef, useState } = React;
  const { Icon } = SB.components;

  const PlayerManager = ({ players, setPlayers, locked }) => {
    const [val, setVal] = useState('');
    const [err, setErr] = useState('');
    const inputRef = useRef(null);

    const add = () => {
      const name = val.trim();
      if (!name) {
        setErr('Nama tidak boleh kosong');
        return;
      }
      if (players.some((p) => p.toLowerCase() === name.toLowerCase())) {
        setErr(`"${name}" sudah ada`);
        return;
      }
      setPlayers((p) => [...p, name]);
      setVal('');
      setErr('');
      setTimeout(() => inputRef.current?.focus(), 50);
    };

    const rename = (i, v) => {
      const name = v.trim();
      if (!name || players.some((p, j) => j !== i && p.toLowerCase() === name.toLowerCase())) return;
      setPlayers((p) => p.map((x, j) => (j === i ? name : x)));
    };

    const remove = (i) => {
      if (players.length > 1) setPlayers((p) => p.filter((_, j) => j !== i));
    };

    return (
      <div className="card p-4 mb-3">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-xl bg-p-500/15 flex items-center justify-center">
            <Icon name="users" size={14} cls="text-p-400" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Pemain</span>
          <span className="ml-auto text-xs font-bold text-p-400 bg-p-500/10 px-2 py-0.5 rounded-full">
            {players.length}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {players.map((p, i) => (
            <div
              key={i}
              className="group flex items-center gap-1.5 bg-zinc-800/60 border border-zinc-700 rounded-2xl px-2.5 py-1.5 hover:border-p-500 transition-colors"
            >
              <span className="w-4 h-4 rounded-full bg-p-500/20 text-p-400 text-[9px] font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <input
                type="text"
                defaultValue={p}
                onBlur={(e) => rename(i, e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && e.target.blur()}
                disabled={locked}
                className="bg-transparent text-sm font-semibold text-slate-100 w-20 disabled:opacity-60 focus:outline-none border-b border-transparent focus:border-p-400"
              />
              {!locked && players.length > 1 && (
                <button
                  onClick={() => remove(i)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 hover:text-red-400 active:scale-95 ml-0.5"
                >
                  <Icon name="x" size={11} />
                </button>
              )}
            </div>
          ))}
        </div>

        {!locked && (
          <div>
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={val}
                onChange={(e) => {
                  setVal(e.target.value);
                  setErr('');
                }}
                onKeyDown={(e) => e.key === 'Enter' && add()}
                placeholder="Nama pemain baru…"
                className="flex-1 text-sm bg-zinc-800/50 border border-zinc-700 text-slate-100 rounded-2xl px-3 py-2.5 placeholder:text-slate-500 transition-all"
              />
              <button
                onClick={add}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-p-600 hover:bg-p-700 active:scale-95 text-white text-sm font-bold rounded-2xl transition-all"
              >
                <Icon name="user-plus" size={14} />
                Tambah
              </button>
            </div>
            {err && <p className="text-red-400 text-xs mt-1.5 animate-fade-up">{err}</p>}
          </div>
        )}
      </div>
    );
  };

  window.SB.components.PlayerManager = PlayerManager;
})();