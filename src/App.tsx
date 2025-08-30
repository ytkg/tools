import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LangGuard from './components/LangGuard';
import Home from './tools/Home';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { tools } from './tools';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <Router>
        <Routes>
          {/* Redirect root to default language (ja) */}
          <Route path="/" element={<Navigate to="/ja" replace />} />

          {/* Backward compatibility: redirect old tool paths to default language */}
          {tools.map(tool => (
            <Route key={`legacy-${tool.path}`} path={`/${tool.path}`} element={<Navigate to={`/ja/${tool.path}`} replace />} />
          ))}

          {/* Language-scoped routes with guard for unsupported locales */}
          <Route path="/:lang" element={<LangGuard />}>
            <Route index element={<Home />} />
            {tools.map(tool => (
              <Route key={tool.path} path={tool.path} element={<tool.component />} />
            ))}
            {/* Redirect any other path under a language to the language root */}
            <Route path="*" element={<Navigate to=".." replace />} />
          </Route>

          {/* Catch-all: send unknown paths to default language home */}
          <Route path="*" element={<Navigate to="/ja" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
