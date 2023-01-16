import './assets/scss/style.scss'
//TODO: add filter to the reviews, Backend is redy for this
//TODO: add socets for chet

import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { ToyIndex } from './pages/toy-index'
import { AppHeader } from './cmps/app-header'
import { AboutUs } from './pages/about-us'
import { HomePage } from './pages/home-page'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { ToyDetails } from './pages/toy-details'
import { ToyEdit } from './pages/toy-edit'
import { ReviewExplore } from './pages/review-explore'
import { AddReview } from './pages/add-review'

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="main-layout app">
          <AppHeader />
          <main>
            <Routes>
              <Route element={<HomePage />} path="/" />
              <Route element={<AboutUs />} path="/about" />

              <Route element={<ToyIndex />} path="/toy" />
              <Route element={<ToyEdit />} path="/toy/edit" />
              <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
              <Route element={<ToyDetails />} path="/toy/:toyId" />
              <Route element={<ReviewExplore />} path="/review/" />
              <Route element={<AddReview />} path="/review/:toyId" />
            </Routes>
          </main>
        </section>
      </Router>
    </Provider>
  )
}

