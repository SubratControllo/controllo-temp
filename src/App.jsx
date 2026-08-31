import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SiteLayout from './components/SiteLayout';
import { MotionProvider } from './context/MotionContext';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import FrameworksPage from './pages/FrameworksPage';
import FrameworkDetailPage from './pages/FrameworkDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import { productRoutePaths } from './data/enterpriseContent';

const IntegrationsPage = lazy(() => import('./pages/IntegrationsPage'));
const ResourcesPage = lazy(() => import('./pages/ResourcesPage'));
const ResourceDetailPage = lazy(() => import('./pages/ResourceDetailPage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const DemoPage = lazy(() => import('./pages/DemoPage'));
const StaticPage = lazy(() => import('./pages/StaticPage'));

const staticPagePaths = ['/company', '/security', '/privacy-policy', '/terms', '/accessibility'];

const routeFallback = (
  <div
    className="grid min-h-screen place-items-center bg-mist font-mono text-[.72rem] font-medium leading-none tracking-[.08em] uppercase text-teal"
    role="status"
  >
    Loading Controllo…
  </div>
);

export default function App() {
  return (
    <MotionProvider>
      <Suspense fallback={routeFallback}>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route index element={<HomePage />} />
            {productRoutePaths.map((path) => (
              <Route path={path} element={<ProductPage />} key={path} />
            ))}
            <Route path="/integrations" element={<IntegrationsPage />} />
            <Route path="/frameworks" element={<FrameworksPage />} />
            <Route path="/frameworks/:slug" element={<FrameworkDetailPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/resources/:slug" element={<ResourceDetailPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/demo" element={<DemoPage />} />
            <Route path="/privacy" element={<Navigate replace to="/solutions/privacy" />} />
            {staticPagePaths.map((path) => (
              <Route path={path} element={<StaticPage path={path} />} key={path} />
            ))}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </MotionProvider>
  );
}
