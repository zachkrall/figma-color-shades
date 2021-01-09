import React, { FC, useCallback } from 'react'
import { useSettings } from '../context'

const ActionBar: FC<{}> = () => {
  const [state] = useSettings()

  const onCreate = useCallback(() => {
    parent.postMessage(
      {
        pluginMessage: {
          type: 'create-rectangles',
          baseColor: state.color.hex,
          variance: state.variance
        }
      },
      '*'
    )
  }, [state])

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
          disabled={!state.color.isValid}
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
