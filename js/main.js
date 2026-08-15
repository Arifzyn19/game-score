/* Entry point: mount the app once all components are registered. */
(() => {
  const App = SB.components.App;
  const root = document.getElementById('root');
  ReactDOM.createRoot(root).render(<App />);
})();