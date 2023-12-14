import { AppRouter } from './features/Router/AppRouter';
import { LibsProvider } from './utils/LibsProvider';

function App() {
   return (
      <LibsProvider>
         <AppRouter />;
      </LibsProvider>
   );
}

export default App;
