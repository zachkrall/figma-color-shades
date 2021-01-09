import React, { FC } from 'react'
import { useSettings } from '../context'

const ErrorMsg: FC<{}> = () => {
  const [state] = useSettings()

  return (
    <div
      className="flex flex-column flex-auto items-center justify-center text-center xyz-in"
      xyz="fade small duration-6"
    >
      <div
        className="mb"
        style={{
          dispay: 'inline-block',
          border: '1px solid tomato',
          padding: '20px 15px',
          borderRadius: '5px',
          background: 'rgba(255,0,0,0.1)'
        }}
      >
        <h2 className="flex items-center justify-center">
          <span
            style={{
              color: 'tomato',
              fontSize: '1.3em'
            }}
          >
            Invalid Color
          </span>
          <span
            className="ml"
            style={{
              display: 'inline-block',
              background: 'tomato',
              padding: 'var(--spacing)',
              borderRadius: '5px',
              color: '#fff',
              fontWeight: 600
            }}
          >
            {state.color.hex}
          </span>
        </h2>
      </div>
      <p style={{ fontSize: '1.3em', color: 'var(--gray)' }}>
        Please use a six character hex color.
        <br />
        (Example: 0000FF)
      </p>
    </div>
  )
}

export default ErrorMsg
