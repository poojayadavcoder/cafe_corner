import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.tsx'
import HomePage from './pages/HomePage.tsx';
import CafeDetailPage from './pages/CafeDetailPage.tsx';
import FavoritesPage from './pages/FavoritesPage.tsx';
import GalleryPage from './pages/GalleryPage.tsx';
import NearbyCafesPage from './pages/NearbyCafesPage.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';

import { FavoritesProvider } from "./context/FavoritesContext";
import { ThemeProvider } from './context/ThemeContext.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/",          element: <HomePage />       },
      { path: "/cafes/:id", element: <CafeDetailPage /> },
      { path: "/favorites", element: <FavoritesPage />  },
      { path: "/gallery",   element: <GalleryPage />    },
      { path: "/nearby",    element: <NearbyCafesPage /> },
      { path: "*",          element: <NotFoundPage />   },
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
  <FavoritesProvider>
    <RouterProvider router={router} />
  </FavoritesProvider>
  </ThemeProvider>
)
