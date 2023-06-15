import * as React from 'react'
import ReactDOM from 'react-dom'
import { HelloWorldComponent } from '@esbuild-ts-monorepo/react-lib';

function App() {
    return <HelloWorldComponent />
}

ReactDOM.render(<App />, document.querySelector('#root'))