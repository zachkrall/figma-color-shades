import React, { FC } from 'react'

const ErrorMsg: FC<{ colorCode: string }> = ({ colorCode }) => {
  return (
    <div
      className="flex flex-auto items-center justify-center text-center xyz-in"
      xyz="fade down duration-6"
    >
      <div
        style={{
          dispay: 'inline-block',
          border: '1px solid var(--light-gray)',
          padding: '20px 15px',
          borderRadius: '5px',
          boxShadow: '0px 0px 20px rgba(0,0,0,0.1)'
        }}
      >
        <h2 className="mb">
          <span
            className="mb"
            style={{
              display: 'inline-block',
              background: 'tomato',
              padding: 'var(--spacing)',
              borderRadius: '5px',
              color: '#fff',
              fontWeight: 600
            }}
          >
            {colorCode}
          </span>
          <span
            style={{
              color: 'tomato',
              display: 'block',
              fontSize: '1.3em'
            }}
          >
            Invalid Color
          </span>
        </h2>
        <p style={{ fontSize: '1.3em', color: 'var(--gray)' }}>
          Please use a six character hex color.
          <br />
          (Example: 0000FF)
        </p>
      </div>
    </div>
  )
}

export default ErrorMsg
