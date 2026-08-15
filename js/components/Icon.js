(() => {
  const { useEffect, useRef } = React;

  const Icon = ({ name, size = 18, cls = '' }) => {
    const ref = useRef(null);

    useEffect(() => {
      if (!ref.current) return;
      ref.current.innerHTML = `<i data-lucide="${name}"></i>`;
      lucide.createIcons({ nodes: [ref.current] });
      const svg = ref.current.querySelector('svg');
      if (svg) {
        svg.setAttribute('width', size);
        svg.setAttribute('height', size);
      }
    }, [name, size]);

    return <span ref={ref} className={`inline-flex items-center justify-center shrink-0 ${cls}`} />;
  };

  window.SB.components.Icon = Icon;
})();