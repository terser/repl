import React from 'react'
import loadScript from 'load-script'

import Repl from './Repl'
import Header from './Header';

import styles from './App.module.css'

export default class App extends React.Component {
  state = {
    loading: true,
    error: null,
    terser: null
  }
  componentDidMount() {
    const scriptPromise = new Promise((resolve, reject) => {
      loadScript('https://cdn.jsdelivr.net/npm/terser/dist/bundle.min.js', (err) => {
        if (err) return reject(err)
        if (!window.Terser) return reject(new Error('Could not load Terser from jsdelivr'))
        resolve(window.Terser)
      })
    })

    scriptPromise
      .then(terser => {
        this.setState({
          loading: false,
          error: null,
          terser
        })
      })
      .catch(error => {
        this.setState({
          loading: false,
          error,
          terser: null
        })
      })
  }
  render() {
    const { loading, error, terser } = this.state

    const body = (() => {
      if (loading) {
        return <div className={styles.message}>Loading...</div>
      } else if (error) {
        return (
          <div className={styles.message + ' ' + styles.error}>{error?.message || 'An error has occurred'}</div>
        )
      } else {
        return <Repl terser={terser} />
      }
    })()

    return (
      <div className={styles.container}>
        <Header />
        {body}
      </div>
    )
  }
}
