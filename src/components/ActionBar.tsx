import React, { FC, useCallback } from 'react'

const ActionBar: FC<{
  error: boolean
  baseColor: string
  variance: number
}> = ({ error = false, baseColor, variance }) => {
  const onCreate = useCallback(() => {
    parent.postMessage(
      {
        pluginMessage: {
          type: 'create-rectangles',
          baseColor,
          variance
        }
      },
      '*'
    )
  }, [baseColor, variance])

  const onCancel = useCallback(() => {
    parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
  }, [])

  return (
    <div id="action-bar">
      <div className="flex-auto">{'\u00A0'}</div>
      <div>
        <button
          className="btn btn--primary mr"
          onClick={onCreate}
          disabled={error}
        >
          Create
        </button>
        <button className="btn btn--outlined" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default ActionBar
