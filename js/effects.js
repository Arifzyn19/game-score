/* Confetti burst shown by the winner banner. */
SB.effects = {
  burst() {
    const { COLORS } = SB.CONFIG;
    for (let i = 0; i < 70; i++) {
      const el = document.createElement('div');
      el.className = 'piece';
      const size = 6 + Math.random() * 10;
      Object.assign(el.style, {
        left: Math.random() * 100 + 'vw',
        width: size + 'px',
        height: size + 'px',
        background: COLORS[Math.floor(Math.random() * COLORS.length)],
        borderRadius: Math.random() > 0.5 ? '50%' : '3px',
        animation: `fall ${1.8 + Math.random() * 2}s ${Math.random() * 1.2}s linear forwards`,
      });
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 4200);
    }
  },
};