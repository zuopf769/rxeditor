import { memo, useCallback, useEffect, useMemo, useState } from "react"
import { ComponentController } from "runner/reaction/controllers/ComponentController"
import { IControllerMeta } from "runner/reaction/interfaces/metas"
import { Reactions, ReactionsContext } from "./contexts"
import { useReactions } from "./hooks/useReactions"

export function withController(WrappedComponent: React.FC<any> | React.ComponentClass<any>, meta?: IControllerMeta): React.FC<any> | React.ComponentClass<any> {

  if (!meta?.id) {
    return WrappedComponent
  }

  return memo((props: any) => {
    const [changedProps, setChangeProps] = useState<any>()
    const reactions = useReactions()
    const controller = useMemo(() => new ComponentController(meta, reactions), [reactions])

    const newReactions: Reactions = useMemo(() => {
      return {}
    }, [])

    const newProps = useMemo(() => {
      return { ...props, ...controller.events, ...changedProps }
    }, [changedProps, controller.events, props])

    const handlePropsChange = useCallback((name: string, value: any) => {
      setChangeProps((changedProps: any) => ({ ...changedProps, [name]: value }))
    }, [])

    useEffect(() => {
      const unlistener = controller.subscribeToPropsChange(handlePropsChange)
      return unlistener
    }, [controller, handlePropsChange])

    return <ReactionsContext.Provider value={newReactions}>
      <WrappedComponent {...newProps} />
    </ReactionsContext.Provider>
  })
}
