import { memo } from "react"
import { ColorInput } from "../../ColorInput"
import { FoldExtraItem } from "../../Fold/FoldExtraItem"

export const fontColorIcon = `<svg viewBox="0 0 1024 1024" height="1em" width="1em" fill="currentColor" focusable="false" aria-hidden="true"><path d="M685.986014,192 C717.314685,192 738.797203,209.006993 751.328671,236.755245 L751.328671,236.755245 L984.055944,755.916084 C988.531469,763.972028 990.321678,772.027972 990.321678,779.188811 C990.321678,808.727273 967.944056,832 938.405594,832 C912.447552,832 894.545455,816.783217 884.699301,793.51049 L884.699301,793.51049 L833.678322,676.251748 L529.342657,676.251748 L476.531469,797.090909 C467.58042,819.468531 448.783217,832 425.51049,832 C396.867133,832 374.48951,809.622378 374.48951,780.979021 C374.48951,772.923077 377.174825,764.867133 381.65035,755.916084 L381.65035,755.916084 L614.377622,236.755245 C626.909091,209.006993 649.286713,192 680.615385,192 L680.615385,192 Z M242.396756,312 C344.87566,419.590227 396.115112,501.684108 396.115112,558.281644 C396.115112,643.177948 327.29306,712 242.396756,712 C157.500452,712 88.6784003,643.177948 88.6784003,558.281644 C88.6784003,501.684108 139.917852,419.590227 242.396756,312 Z M681.51049,325.370629 L571.412587,578.685315 L791.608392,578.685315 L681.51049,325.370629 Z"></path></svg>`

export const FontColorInput = memo((props: {
  title?: string,
  span?: number,
  value?: string,
  onChange?: (value?: string | null) => void
}) => {
  const { title, span = 24, value, onChange } = props
  return (
    <FoldExtraItem span={span}
      title={title}
      icon={fontColorIcon}
      onFirstLine={false}
    >
      <ColorInput value={value} onChange={onChange} />
    </FoldExtraItem>
  )
})